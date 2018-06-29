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
   * ガチャ回数が変化した際の処理
   */
  changeGachaCount(event: any){
    this.gachaCount = event;

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
    return 10.0;
  }

  /**
   * 95％信頼区間を、Clopper-Pearson methodで求める
   */
  private clopperPearsonMethod() {
    
  }

  /**
   * p値(Sterneの手法で求める)
   */
  get pValue(): number {
    return 0.000874;
  }
}
