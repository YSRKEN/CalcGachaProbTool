import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-test-prob',
  templateUrl: './test-prob.component.html',
  styleUrls: ['./test-prob.component.scss']
})
export class TestProbComponent implements OnInit {

  /**
   * ガチャ回数
   */
  gachaCount: string = "100";

  /**
   * gachaCountのエラー欄
   */
  gachaCountError: string = "";

  /**
   * ガチャ回数
   */
  dropCount: string = "10";

  /**
   * dropCountのエラー欄
   */
  dropCountError: string = "";

  /**
   * 1回だけ回してドロップする確率の比較値
   */
  preDropPer: string = "3.0";

  /**
   * preDropPerのエラー欄
   */
  preDropPerError: string = "";

  /**
   * 95％信頼区間の下限値
  */
  confidenceIntervalLB: number = 4.9;

  /**
   * 95％信頼区間の上限値
  */
  confidenceIntervalUB: number = 17.6;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 範囲[a,b]においてシンプソン積分を行う
   * @param a a
   * @param b b
   * @param func 積分する関数
   */
  private simpsonMethod(a: number, b: number, n: number, func: (x: number) => number): number {
    // 分割幅hを求める
    const h = (b - a) / n;

    // ヘルパーメソッド
    const index = (i: number) => a + i * h;

    // 計算を行う
    let sum = func(a) + func(b);
    for (let j = 1; j < n / 2; ++j) {
      sum += 2.0 * func(index(2 * j));
    }
    for (let j = 1; j <= n / 2; ++j) {
      sum += 4.0 * func(index(2 * j - 1));
    }
    sum *= h / 3;
    return sum;
  }

  /**
   * ベータ関数B(a,b)の値を求める
   */
  private betaFunction(a: number, b: number): number {
    // 内部の関数をラムダ式で定義する
    const func = (t) => (Math.pow(t, a - 1.0) * Math.pow(1.0 - t, b - 1.0));

    // シンプソン積分した結果を返す
    return this.simpsonMethod(0.0, 1.0, 100, func);
  }

  /**
   * ベータ分布の累積密度関数(BetaCDF(x,a,b))を求める
   * @param x x
   * @param a a
   * @param b b
   */
  private betaCDF(x: number, a: number, b: number): number {
    const func = (t) => (Math.pow(t, a - 1.0) * Math.pow(1.0 - t, b - 1.0));
    return this.simpsonMethod(0.0, x, 100, func) / this.betaFunction(a, b);
  }

  /**
   * ベータ分布の累積密度関数の逆関数(BetaCDF^-1(p,a,b))を求める
   * @param p p
   * @param a a
   * @param b b
   */
  private inverseBetaCDF(p: number, a: number, b: number): number {
    // 前提となる関数を定義する
    const func = (x) => (this.betaCDF(x, a, b) - p);

    // 初期値を設定する
    let x1 = 0.0;
    let f1 = func(x1);
    let x2 = 1.0;
    let x3 = 0.0;
    let eps = 1.0e-6;

    //二分法で探索する
    while (x2 - x1 > eps) {
      x3 = (x1 + x2) / 2;
      let f3 = func(x3);
      if (f1 * f3 < 0.0) {
        x2 = x3;
      }
      else {
        x1 = x3;
      }
    }

    // 結果を返す
    return x3;
  }

  /**
   * 95％信頼区間を、Clopper-Pearson methodで求める
   */
  private clopperPearsonMethod() {
    const x = 0.95; //95%信頼区間であることを表す
    const a = 1.0 - x;
    const n = parseInt(this.gachaCount);  //ガチャ回数
    const k = parseInt(this.dropCount);   //ドロップ回数
		this.confidenceIntervalLB = 100.0 * (1.0 - this.inverseBetaCDF((1.0 - a / 2), n - k + 1, k));
		this.confidenceIntervalUB = 100.0 * (1.0 - this.inverseBetaCDF((a / 2), n - k, k + 1));
  }

  /** 組み合わせaCbを実数で求める
   * ※精度を犠牲にして楽な実装を取った
   * @param a aの値
   * @param b bの値
   */
  private comb(a: number, b: number): number{
    let result: number = 1.0;
    for (let num1 = a, num2 = b, r = 0; r < b; --num1, --num2, ++r) {
      result *= 1.0 * num1;
      result /= 1.0 * num2;
    }
    return result;
  }

  /**
   * ベルヌーイ試行の確率を求める関数
   * @param a 試行回数
   * @param b 成功回数
   * @param s 成功確率
  */
  private prob(a: number, b: number, s: number): number{
    let result = this.comb(a, b);
    for (let i = 0; i < b; ++i)
      result *= s;
    for (let i = 0; i < a - b; ++i)
      result *= (1.0 - s);
    return result;
  }

  /**
   * ガチャ回数が変化した際の処理
   */
  changeGachaCount(event: any){
    this.gachaCount = event;
    this.clopperPearsonMethod();

    // そもそも数値なのか？
    const temp = parseInt(this.gachaCount);
    if(isNaN(temp)){
      this.gachaCountError = "エラー：数値を入力してください。";
      return;
    }

    // 整数入力か？
    const temp2 = parseFloat(this.gachaCount);
    if(temp != temp2){
      this.gachaCountError = "エラー：整数で入力してください。";
      return;
    }

    // 負数じゃないか？
    if(temp < 0){
      this.gachaCountError = "エラー：0以上の数を入力してください。";
      return;
    }

    this.gachaCountError = "";
  }

  /**
   * ドロップ回数が変化した際の処理
   */
  changeDropCount(event: any){
    this.dropCount = event;
    this.clopperPearsonMethod();

    // そもそも数値なのか？
    const temp = parseInt(this.dropCount);
    if(isNaN(temp)){
      this.dropCountError = "エラー：数値を入力してください。";
      return;
    }

    // 整数入力か？
    const temp2 = parseFloat(this.dropCount);
    if(temp != temp2){
      this.dropCountError = "エラー：整数で入力してください。";
      return;
    }

    // 負数じゃないか？
    if(temp < 0){
      this.dropCountError = "エラー：0以上の数を入力してください。";
      return;
    }

    // ガチャ回数より多くないか？
    if(temp > parseInt(this.gachaCount)){
      this.dropCountError = "エラー：ガチャ回数より大きな値になっています。";
      return;
    }

    this.dropCountError = "";
  }

  /**
   * ドロップ率が変化した際の処理
   */
  changePreDropPer(event: any){
    this.preDropPer = event;

    // そもそも数値なのか？
    const temp = parseFloat(this.preDropPer);
    if(isNaN(temp)){
      this.preDropPerError = "エラー：数値を入力してください。";
      return;
    }

    // 負数じゃないか？
    if(temp < 0){
      this.preDropPerError = "エラー：0以上の実数を入力してください。";
      return;
    }
    
    // 100％より大きくなっていないか？
    if(temp > 100){
      this.preDropPerError = "エラー：パーセンテージは100％までです。";
      return;
    }

    this.preDropPerError = "";
  }

  /**
   * ドロップ率
   */
  get dropPer(): number {
    return 100.0 * parseInt(this.dropCount) / parseInt(this.gachaCount);
  }

  /**
   * p値(Sterneの手法で求める)
   */
  get pValue(): number {
    // 地道に計算する
    let sum = 0.0;
    const x = parseFloat(this.preDropPer)  / 100.0;
    const n = parseInt(this.gachaCount);
    const k = parseInt(this.dropCount);
    let limitprob = this.prob(n, k, x);
    for (let i = 0; i <= n; ++i) {
      let temp = this.prob(n, i, x);
      if (limitprob >= temp)
        sum += temp;
    }
    return sum;
  }
}
