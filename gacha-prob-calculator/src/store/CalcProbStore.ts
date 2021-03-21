import { createContext, useEffect, useState } from "react";
import Decimal from 'decimal.js';
import { ONE, PROB_50_PER, PROB_95_PER, PROB_99_PER } from "../constant/other";
import { NumberReal as Real } from "../model/NumberReal";

type ActionType = 'setDropPer' | 'setGachaCount' | 'addGachaCount';


interface Action {
  type: ActionType;
  message?: string;
}

interface CalcProbStore {
  dropPer: string;
  gachaCount: string;
  anyDropPer: string;
  notDropPer: string;
  gachaCount50Per: string;
  gachaCount95Per: string;
  gachaCount99Per: string;
  dispatch: (action: Action) => void;
}

export const useCalcProbStore = (): CalcProbStore => {
  const [dropPer, setDropPer] = useState('3');
  const [gachaCount, setGachaCount] = useState('100');
  const [anyDropPer, setAnyDropPer] = useState('');
  const [notDropPer, setNotDropPer] = useState('');
  const [gachaCount50Per, setGachaCount50Per] = useState('');
  const [gachaCount95Per, setGachaCount95Per] = useState('');
  const [gachaCount99Per, setGachaCount99Per] = useState('');

  useEffect(() => {
    try {
      // 浮動小数点数演算のテスト
      console.log('加算');
      const a = new Real();
      for (let i = 0; i < 100; i++) {
        a.add('0.1');
      }
      console.log(a.getInfo());

      console.log('減算');
      for (let i = 0; i < 100; i++) {
        a.sub('0.1');
      }
      console.log(a.getInfo());

      console.log('乗算');
      const b = new Real(1);
      for (let i = 0; i < 100; i++) {
        b.mul('1.1');
      }
      console.log(b.getInfo());

      console.log('除算');
      for (let i = 0; i < 100; i++) {
        b.div('1.1');
      }
      console.log(b.getInfo());

      console.log('べき乗');
      console.log((new Real('1.1')).pow(0).getInfo());
      console.log((new Real('1.1')).pow(1).getInfo());
      console.log((new Real('1.1')).pow(2).getInfo());
      console.log((new Real('1.1')).pow(3).getInfo());
      console.log((new Real('1.1')).pow(100).getInfo());

      // ドロップ率の計算
      const xPer = new Decimal(dropPer);
      const x = xPer.div(100);
      if (x.lt(0)) {
        setAnyDropPer('---');
        setNotDropPer('---');
        setGachaCount50Per('---');
        setGachaCount95Per('---');
        setGachaCount99Per('---');
        return;
      }
      const n = new Decimal(gachaCount).round();
      if (n.gte(0)) {
        const prob = ONE.sub(ONE.sub(x).pow(n));
        setAnyDropPer(prob.mul(100).toFixed(2));
        setNotDropPer(ONE.sub(prob).mul(100).toFixed(2));
      } else {
        setAnyDropPer('---');
        setNotDropPer('---');
      }

      // 必要なガチャ回数の計算
      let flg50Per = false;
      let flg95Per = false;
      let flg99Per = false;
      for (let i = 1; i <= 10000; i += 1) {
        const prob2 = ONE.sub(ONE.sub(x).pow(i));
        if (!flg50Per && prob2.gte(PROB_50_PER)) {
          flg50Per = true;
          setGachaCount50Per(`${i}`);
        }
        if (!flg95Per && prob2.gte(PROB_95_PER)) {
          flg95Per = true;
          setGachaCount95Per(`${i}`);
        }
        if (!flg99Per && prob2.gte(PROB_99_PER)) {
          flg99Per = true;
          setGachaCount99Per(`${i}`);
        }
      }
      if (!flg50Per) {
        setGachaCount50Per(`≧10000`);
      }
      if (!flg95Per) {
        setGachaCount95Per(`≧10000`);
      }
      if (!flg99Per) {
        setGachaCount99Per(`≧10000`);
      }
    } catch {
      setAnyDropPer('---');
      setNotDropPer('---');
      setGachaCount50Per('---');
      setGachaCount95Per('---');
      setGachaCount99Per('---');
    }
  }, [dropPer, gachaCount]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setDropPer':
        setDropPer(action.message as string);
        break;
      case 'setGachaCount':
        setGachaCount(action.message as string);
        break;
      case 'addGachaCount': {
        const diff = parseInt((action.message as string), 10);
        try {
          const n = new Decimal(gachaCount).round().add(diff);
          setGachaCount(n.toString());
        } catch { }
        break;
      }
    }
  };

  return {
    dropPer,
    gachaCount,
    anyDropPer,
    notDropPer,
    gachaCount50Per,
    gachaCount95Per,
    gachaCount99Per,
    dispatch
  };
};

export const CalcProbContext = createContext<CalcProbStore>({} as CalcProbStore);
