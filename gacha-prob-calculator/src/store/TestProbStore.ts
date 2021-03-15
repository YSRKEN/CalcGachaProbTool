import Decimal from "decimal.js";
import { createContext, useEffect, useState } from "react";

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
  dispatch: (action: Action) => void;
}

export const useTestProbStore = (): TestProbStore => {
  const [gachaCount, setGachaCount] = useState('100');
  const [dropCount, setDropCount] = useState('3');
  const [officialDropPer, setOfficialDropPer] = useState('1');
  const [dropPer, setDropPer] = useState('');

  // ドロップする確率の計算
  useEffect(() => {
    try {
      // ドロップ率の計算
      const a = new Decimal(dropCount);
      const b = new Decimal(gachaCount);
      const prob = a.div(b);
      if (prob.lt(0)) {
        setDropPer('---');
        return;
      }
      setDropPer(prob.mul(100).toFixed(2));

    } catch {
      setDropPer('---');
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
    dispatch
  };
};

export const TestProbContext = createContext<TestProbStore>({} as TestProbStore);
