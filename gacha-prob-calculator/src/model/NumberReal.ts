import Real from './Real';

/**
 * KnuthのTwoSumアルゴリズムを利用して加算を行う
 * 注意：
 * JavaScriptの仕様により、Number型はIEEE754の倍精度64bit浮動小数点数型であり、
 * 丸め方向は最近接偶数であることが保証されているので、問題なく利用できる
 * @param a 値1
 * @param b 値2
 * @returns a1が最良近似値、a2が誤差項。a + b = a1 + a2が保証されている
 */
const calcTwoSum = (a: number, b: number): [number, number] => {
  const a1 = a + b;
  let t1 = a1 - a;
  let t2 = a1 - t1;
  t1 = b - t1;
  t2 = a - t2;
  const a2 = t1 + t2;
  return [a1, a2];
};

const DBL_MANT_DIG = 53;  // JavaScriptのNumber型は倍精度64bit浮動小数点数型なので(以下略)
const C = ((1 << (DBL_MANT_DIG + 1) / 2) + 1);

/**
 * Dekkerの乗算アルゴリズムを利用して乗算を行う
 */
const calcTwoProduct = (a: number, b: number): [number, number] => {
  let x1 = a * C;
  let y1 = b * C;
  const m1 = a * b;
  x1 = (a - x1) + x1;
  y1 = (b - y1) + y1;
  const x2 = a - x1;
  const y2 = b - y1;
  const m2 = (((x1 * y1 - m1) + x1 * y2) + x2 * y1) + x2 * y2;

  return [m1, m2];
};

/** Number型で実装された、高精度演算用の実数型(テスト用) */
export class NumberReal implements Real {
  base: number;   // 基準となる整数項
  error: number;  // 誤差項

  constructor(value: string | number | Real = '0') {
    if (value instanceof NumberReal) {
      this.base = value.base;
      this.error = value.error;
      return;
    }
    if (typeof value === 'string') {
      this.base = parseFloat(value);
      this.error = 0;
      return;
    }
    if (typeof value === 'number') {
      this.base = value;
      this.error = 0;
      return;
    }
    throw new Error('型エラーが発生しました.');
  }

  toNumber(): number {
    return this.base;
  }

  toString(digit: number = -1): string {
    if (digit < 0) {
      return this.base.toString();
    } else {
      return this.base.toFixed(digit);
    }
  }

  getInfo(): string {
    return `最良近似値：${this.base.toPrecision(21)} 絶対誤差：${this.error.toPrecision(21)} [${this.base - this.error}～${this.base + this.error}]`;
  }

  add(value: string | number | Real): Real {
    // 加算用の値(Number型)を取得する
    let inputValue = 0;
    if (value instanceof NumberReal) {
      inputValue = value.base;
    } else if (typeof value === 'string') {
      inputValue = parseFloat(value);
    } else if (typeof value === 'number') {
      inputValue = value;
    } else {
      throw new Error('型エラーが発生しました.');
    }

    // KnuthのTwoSumアルゴリズムを利用して加算を行う
    const [a1, a2] = calcTwoSum(this.base, inputValue);

    this.base = a1;
    this.error = this.error + Math.abs(a2);
    if (value instanceof NumberReal) {
      this.error += value.error;
    }
    return this;
  }

  sub(value: string | number | Real): Real {
    // 加算用の値(Number型)を取得する
    let inputValue = 0;
    if (value instanceof NumberReal) {
      inputValue = value.base;
    } else if (typeof value === 'string') {
      inputValue = parseFloat(value);
    } else if (typeof value === 'number') {
      inputValue = value;
    } else {
      throw new Error('型エラーが発生しました.');
    }

    // KnuthのTwoSumアルゴリズムを利用して減算を行う
    const [a1, a2] = calcTwoSum(this.base, -inputValue);

    this.base = a1;
    this.error = this.error + Math.abs(a2);
    if (value instanceof NumberReal) {
      this.error += value.error;
    }
    return this;
  }

  mul(value: string | number | Real): Real {
    // 乗算用の値(Number型)を取得する
    let inputValue = 0;
    if (value instanceof NumberReal) {
      inputValue = value.base;
    } else if (typeof value === 'string') {
      inputValue = parseFloat(value);
    } else if (typeof value === 'number') {
      inputValue = value;
    } else {
      throw new Error('型エラーが発生しました.');
    }

    // Dekkerの乗算アルゴリズムを利用して乗算を行う
    const [m1, m2] = calcTwoProduct(this.base, inputValue);

    this.base = m1;
    if (value instanceof NumberReal) {
      this.error = (this.error / Math.abs(this.base) + value.error / Math.abs(value.base)) * Math.abs(m1) + Math.abs(m2);
    } else {
      this.error = (this.error / Math.abs(this.base)) * Math.abs(m1) + Math.abs(m2);
    }
    return this;
  }

  div(value: string | number | Real): Real {
    // 乗算用の値(Number型)を取得する
    let inputValue = 0;
    if (value instanceof NumberReal) {
      inputValue = value.base;
    } else if (typeof value === 'string') {
      inputValue = parseFloat(value);
    } else if (typeof value === 'number') {
      inputValue = value;
    } else {
      throw new Error('型エラーが発生しました.');
    }

    // Dekkerの乗算アルゴリズムを利用して除算を行う
    const [m1, m2] = calcTwoProduct(this.base, 1.0 / inputValue);

    this.base = m1;
    if (value instanceof NumberReal) {
      this.error = (this.error / Math.abs(this.base) + value.error / Math.abs(value.base)) * Math.abs(m1) + Math.abs(m2);
    } else {
      this.error = (this.error / Math.abs(this.base)) * Math.abs(m1) + Math.abs(m2);
    }
    return this;
  }

  pow(value: string | number | Real): Real {
    // 乗算用の値(Number型)を取得する
    let inputValue = 0;
    if (value instanceof NumberReal) {
      inputValue = value.base;
    } else if (typeof value === 'string') {
      inputValue = parseFloat(value);
    } else if (typeof value === 'number') {
      inputValue = value;
    } else {
      throw new Error('型エラーが発生しました.');
    }

    // 実装の簡易化のため、べき乗部分が0以上の整数の場合のみを扱う
    if (inputValue < 0 || Math.floor(inputValue) !== inputValue) {
      throw new Error('計算できません.');
    }

    // 計算処理
    switch (inputValue) {
      case 0:
        return new NumberReal(1);
      case 1:
        return this;
      case 2:
        return this.mul(new NumberReal(this));
      default: {
        let retValue = new NumberReal(1);
        let x = new NumberReal(this);
        while (inputValue > 0) {
          if (inputValue & 1) {
            retValue = retValue.mul(x) as NumberReal;
          }
          x = x.mul(new NumberReal(x)) as NumberReal;
          inputValue >>= 1;
        }
        return retValue;
      }
    }
  }
}
