import { createContext, useEffect, useState } from "react";
import Decimal from 'decimal.js';

type ActionType = 'setDropPer' | 'setGachaCount';

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
      // ドロップ率の計算
      const xPer = new Decimal(dropPer);
      const x = xPer.div(100);
      const n = new Decimal(gachaCount).round();
      const ONE = new Decimal(1);
      const prob = ONE.sub(ONE.sub(x).pow(n));
      setAnyDropPer(prob.mul(100).toFixed(2));
      setNotDropPer(ONE.sub(prob).mul(100).toFixed(2));

      // 必要なガチャ回数の計算
      let flg50Per = false;
      let flg95Per = false;
      let flg99Per = false;
      const PROB_50_PER = new Decimal('0.5');
      const PROB_95_PER = new Decimal('0.95');
      const PROB_99_PER = new Decimal('0.99');
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
