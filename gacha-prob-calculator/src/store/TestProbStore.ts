import Decimal from "decimal.js";
import { createContext, useEffect, useState } from "react";
import { CONFIDENCE_INTERVAL_PER, ONE, ZERO } from "../constant/other";

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
 * Sterne検定に基づく正確な信頼区間を算出する
 * @param prob 
 * @param n 
 * @param ciPer 
 */
const calcConfidenceIntervalBySterne = (prob: Decimal, n: Decimal, ciPer: Decimal): [Decimal, Decimal] | null => {
  // PDFの一覧を算出する
  const pdfList: { x: Decimal, prob: Decimal }[] = [];
  const cdfList: { x: Decimal, prob: Decimal }[] = [];
  let cdfSum = ZERO;
  for (let x = ZERO; x.lte(n); x = x.add(ONE)) {
    const pdf = calcBinomialPDF(x, prob, n);
    pdfList.push({ x, prob: pdf });
    cdfList.push({ x, prob: cdfSum });
    console.log(x.toString() + ' : ' + pdf.toString() + ' / ' + cdfSum.toString())
    cdfSum = cdfSum.add(pdf);
  }

  // PDFの一覧を、確率の降順となるようにソート
  pdfList.sort((a, b) => {
    return a.prob.lt(b.prob) ? 1 : a.prob.gt(b.prob) ? -1 : 0;
  });

  // ソートしたものを上から累計を取っていき、合計値が有意水準を超えるかを判断する
  let probSum = ZERO;
  const ci = ciPer.div(100);
  const xList: Decimal[] = [];
  for (let i = 0; i < pdfList.length; i++) {
    const record = pdfList[i];
    if (probSum.gte(ci)) {
      break;
    }
    xList.push(record.x);
    console.log(record.x.toString() + ' : ' + record.prob.toString() + ' / ' + probSum.toString());
    probSum = probSum.add(record.prob);
  }

  // flgがfalseの箇所＝有意水準内の範囲を出力する
  xList.sort((a, b) => {
    return a.lt(b) ? -1 : a.gt(b) ? 1 : 0;
  });
  if (xList.length === 0) {
    return null;
  } else {
    return [
      cdfList.filter(pair => pair.x.eq(xList[0]))[0].prob,
      cdfList.filter(pair => pair.x.eq(xList[xList.length - 1]))[0].prob,
    ];
  }
};

export const useTestProbStore = (): TestProbStore => {
  const [gachaCount, setGachaCount] = useState('100');
  const [dropCount, setDropCount] = useState('3');
  const [officialDropPer, setOfficialDropPer] = useState('1');
  const [dropPer, setDropPer] = useState('');
  const [confidenceInterval, setConfidenceInterval] = useState<[string, string]>(['', '']);

  // ドロップする確率の計算
  useEffect(() => {
    try {
      // ドロップ率の計算
      const a = new Decimal(dropCount);
      const b = new Decimal(gachaCount);
      if (b.lte(0) || a.lt(0) || a.gt(b)) {
        setDropPer('---');
        setConfidenceInterval(['---', '---']);
        return;
      }
      const prob = a.div(b);
      if (prob.lt(0)) {
        setDropPer('---');
        setConfidenceInterval(['---', '---']);
        return;
      }
      setDropPer(prob.mul(100).toFixed(2));

      /* 95％信頼区間の計算                                   */
      /* 「SASによる二項比率における正確な信頼区間の比較」    */
      /* (https://www.sas.com/content/dam/SAS/ja_jp/doc/event/sas-user-groups/usergroups14-d-05.pdf) */
      /* を参考に、Sterne検定に基づく正確な信頼区間を実装した */
      const result = calcConfidenceIntervalBySterne(prob, b, CONFIDENCE_INTERVAL_PER);
      if (result !== null) {
        setConfidenceInterval([
          result[0].mul(100).toFixed(2),
          result[1].mul(100).toFixed(2)
        ]);
      } else {
        setConfidenceInterval(['---', '---']);
      }
    } catch {
      setDropPer('---');
      setConfidenceInterval(['---', '---']);
    }
  }, [gachaCount, dropCount]);

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
    dispatch
  };
};

export const TestProbContext = createContext<TestProbStore>({} as TestProbStore);
