import Decimal from "decimal.js";
import { createContext, useEffect, useState } from "react";
import { CONFIDENCE_INTERVAL_PER, EPS, ONE, ZERO } from "../constant/other";

type ActionType = 'setGachaCount' | 'setDropCount' | 'setOfficialDropPer';

interface Action {
  type: ActionType;
  message?: string;
}

interface TestProbStore {
  gachaCount: string;
  dropCount: string;
  officialDropPer: string;
  dropPer: string;
  confidenceInterval: [string, string];
  pValue: string;
  dispatch: (action: Action) => void;
}

/** 組み合わせaCbを求める
 * @param a aの値
 * @param b bの値
 */
const combination = (a: Decimal, b: Decimal): Decimal => {
  let result = new Decimal('1');
  for (let num1 = a, num2 = b, r = ZERO;
    r.lt(b);
    num1 = num1.sub(ONE), num2 = num2.sub(ONE), r = r.add(ONE)) {
    result = result.mul(num1);
    result = result.div(num2);
  }
  return result;
}

/**
 * 二項分布の確率密度関数の値を返す。実装はSASのドキュメントに倣った
 * (https://support.sas.com/documentation/cdl_alternate/ja/lefunctionsref/67960/HTML/default/n164yyfgppedmkn1320boncqkh6r.htm)
 * @param m 二項分布における成功回数。m≧0、m∈Z
 * @param p 二項分布の1試行における成功確率。0≦p≦1
 * @param n 二項分布における試行回数。n≧m、m∈Z
 */
const calcBinomialPDF = (m: Decimal, p: Decimal, n: Decimal): Decimal => {
  // mが負の数、もしくはmがnより大きいならば、確率は0
  if (m.isNeg() || m.gt(n)) {
    return ZERO;
  }

  // それ以外の場合
  const temp1 = combination(n, m);
  const temp2 = p.pow(m);
  const temp3 = ONE.sub(p).pow(n.sub(m));
  return temp1.mul(temp2).mul(temp3);
};

/**
 * Sterneの手法に基づく正確なp値を算出する
 * @param a 二項分布における成功回数(ドロップ回数)
 * @param b 二項分布における試行回数(ガチャ回数)
 * @param x p値を計算したい公称ドロップ率
 * @returns p値
 */
const calcPvalueBySterne = (a: Decimal, b: Decimal, x: Decimal) => {
  const limitProb = calcBinomialPDF(a, x, b);
  let sum = ZERO;
  for (let i = ZERO; i.lte(b); i = i.add(ONE)) {
    const temp = calcBinomialPDF(i, x, b);
    if (limitProb.gte(temp)) {
      sum = sum.add(temp);
    }
  }
  return sum;
};


/**
 * 二分法により、関数値f(x)が0になるxの値を検索する
 * @param minX xの最小値
 * @param maxX xの最大値
 * @param func 関数
 * @param eps しきい値
 */
const findByBisection = (minX: Decimal, maxX: Decimal, func: (x: Decimal) => Decimal, eps: Decimal): Decimal => {
  let x1 = minX;
  let x2 = maxX;
  let x3 = minX;
  let y1 = func(x1);
  while (x2.sub(x1).gt(eps)) {
    x3 = x1.add(x2).div(2);
    const y3 = func(x3);
    if (y1.mul(y3).lt(ZERO)) {
      x2 = x3;
    }
    else {
      x1 = x3;
      y1 = func(x1);
    }
  }
  return x3;
};

/**
 * Sterneの手法に基づく正確な信頼区間を算出する
 * @param a 二項分布における成功回数(ドロップ回数)
 * @param b 二項分布における試行回数(ガチャ回数)
 * @param ciPer 信頼区間のパーセンテージ
 */
const calcConfidenceIntervalBySterne = (a: Decimal, b: Decimal, ciPer: Decimal): [Decimal, Decimal] => {
  const param = ONE.sub(ciPer.div(100)).div(2);
  // 下限の算出を行う
  const ciLB = findByBisection(ZERO, a.div(b), (x: Decimal) => {
    return calcPvalueBySterne(a, b, x).sub(param);
  }, EPS);

  // 上限の算出を行う
  const ciUB = findByBisection(a.div(b), ONE, (x: Decimal) => {
    return calcPvalueBySterne(a, b, x).sub(param);
  }, EPS);
  return [ciLB, ciUB];
};

export const useTestProbStore = (): TestProbStore => {
  const [gachaCount, setGachaCount] = useState('100');
  const [dropCount, setDropCount] = useState('3');
  const [officialDropPer, setOfficialDropPer] = useState('1');
  const [dropPer, setDropPer] = useState('');
  const [confidenceInterval, setConfidenceInterval] = useState<[string, string]>(['', '']);
  const [pValue, setPValue] = useState('');

  // ドロップする確率の計算
  useEffect(() => {
    try {
      // ドロップ率の計算
      const a = new Decimal(dropCount);
      const b = new Decimal(gachaCount);
      if (b.lte(0) || a.lt(0) || a.gt(b)) {
        setDropPer('---');
        setConfidenceInterval(['---', '---']);
        setPValue('---');
        return;
      }
      const prob = a.div(b);
      if (prob.lt(0)) {
        setDropPer('---');
        setConfidenceInterval(['---', '---']);
        setPValue('---');
        return;
      }
      setDropPer(prob.mul(100).toFixed(2));

      /* p値の計算                                                     */
      /* 「検定と区間推定」                                            */
      /* (https://oku.edu.mie-u.ac.jp/~okumura/stat/tests_and_CI.html) */
      /* を参考に、Sterneの手法に基づく正確なp値を実装した */
      const x = new Decimal(officialDropPer).div(100);
      const result2 = calcPvalueBySterne(a, b, x);
      setPValue(result2.toFixed(3));

      /* 95％信頼区間の計算                    */
      /* ↑を応用して、正確な信頼区間を実装した */
      const result = calcConfidenceIntervalBySterne(a, b, CONFIDENCE_INTERVAL_PER);
      setConfidenceInterval([
        result[0].mul(100).toFixed(2),
        result[1].mul(100).toFixed(2)
      ]);
    } catch {
      setDropPer('---');
      setConfidenceInterval(['---', '---']);
      setPValue('---');
    }
  }, [gachaCount, dropCount, officialDropPer]);

  // dispatch関数
  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setGachaCount':
        setGachaCount(action.message as string);
        break;
      case 'setDropCount':
        setDropCount(action.message as string);
        break;
      case 'setOfficialDropPer':
        setOfficialDropPer(action.message as string);
        break;
    }
  };

  return {
    gachaCount,
    dropCount,
    officialDropPer,
    dropPer,
    confidenceInterval,
    pValue,
    dispatch
  };
};

export const TestProbContext = createContext<TestProbStore>({} as TestProbStore);
