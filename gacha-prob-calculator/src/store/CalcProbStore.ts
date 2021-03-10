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
  dispatch: (action: Action) => void;
}

export const useCalcProbStore = (): CalcProbStore => {
  const [dropPer, setDropPer] = useState('3');
  const [gachaCount, setGachaCount] = useState('100');
  const [anyDropPer, setAnyDropPer] = useState('');
  const [notDropPer, setNotDropPer] = useState('');

  useEffect(() => {
    try {
      const xPer = new Decimal(dropPer);
      const x = xPer.div(100);
      const n = new Decimal(gachaCount).round();
      const ONE = new Decimal(1);
      const prob = ONE.sub(ONE.sub(x).pow(n));
      setAnyDropPer(prob.mul(100).toFixed(2));
      setNotDropPer(ONE.sub(prob).mul(100).toFixed(2));
    } catch {
      setAnyDropPer('---');
      setNotDropPer('---');
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
    dispatch
  };
};

export const CalcProbContext = createContext<CalcProbStore>({} as CalcProbStore);
