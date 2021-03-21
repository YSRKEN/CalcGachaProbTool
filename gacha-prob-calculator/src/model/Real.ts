/** 高精度演算用の実数型 */
interface Real {
  /**
   * number型に変換する
   */
  toNumber(): number;
  /**
   * 小数点以下の桁数をdigit桁にして文字列化する
   * @param digit 小数点以下の桁数
   */
  toString(digit: number): string;
  /**
   * 型についての詳細な情報を得る
   */
  getInfo(): string;
  /**
   * 加算
   * @param value 加算する値
   */
  add(value: Real | number | string): Real;
  /**
   * 減算
   * @param value 減算する値
   */
  sub(value: Real | number | string): Real;
  /**
   * 乗算
   * @param value 乗算する値
   */
  mul(value: Real | number | string): Real;
  /**
   * 除算
   * @param value 除算する値
   */
  div(value: Real | number | string): Real;
  /**
   * べき乗
   * @param value べき乗の指数
   */
  pow(value: Real | number | string): Real;
  /**
   * 比較演算(引数より小さい場合はtrue)
   * @param value 引数
   */
  lt(value: Real | number | string): boolean;
  /**
   * 比較演算(引数以下の場合はtrue)
   * @param value 引数
   */
  lte(value: Real | number | string): boolean;
  /**
   * 比較演算(引数より大きい場合はtrue)
   * @param value 引数
   */
  gt(value: Real | number | string): boolean;
  /**
   * 比較演算(引数以上の場合はtrue)
   * @param value 引数
   */
  gte(value: Real | number | string): boolean;
  /**
   * 比較演算(引数と等しい場合はtrue)
   * @param value 引数
   */
  equal(value: Real | number | string): boolean;
  /**
   * NaNならばtrue
   * @param value 引数
   */
  isNaN(): boolean;
  /**
   * 正の数ならばtrue
   * @param value 引数
   */
  isPos(): boolean;
}

export default Real;
