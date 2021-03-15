import Decimal from "decimal.js";

export const APP_TITLE = 'ガチャ確率計算機';
export const LAST_UP_DATE = '2021/03/10';
export const PROJECT_URL = 'https://github.com/YSRKEN/CalcGachaProbTool/tree/develop';
export const APP_URL = 'https://new-calc-gacha-prob-tool.firebaseapp.com/';
const APP_INFO = 'ドロップ率の計算・推定が簡単に行なえます。';
export const TWITTER_SHARE_URL = `https://twitter.com/intent/tweet?text=【${APP_TITLE}】%0a${APP_INFO}%0a&url=${APP_URL}`;

export const ZERO = new Decimal('0');
export const ONE = new Decimal('1');
export const PROB_50_PER = new Decimal('0.5');
export const PROB_95_PER = new Decimal('0.95');
export const PROB_99_PER = new Decimal('0.99');
export const CONFIDENCE_INTERVAL_PER = new Decimal('95');  // 今回は95％信頼区間を用いるのでこうした
export const EPS = new Decimal('0.00001');
