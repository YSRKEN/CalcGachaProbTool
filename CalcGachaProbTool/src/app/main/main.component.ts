import { Component, OnInit } from '@angular/core';
import { parseCookieValue } from '@angular/common/src/cookie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * 1回だけ回してドロップする確率
   */
  dropPer: string = "3.0";

  /**
   * dropPerのエラー欄
   */
  dropPerError: string = "";

  /**
   * ガチャ回数
   */
  gachaCount: string = "100";

  /**
   * gachaCountのエラー欄
   */
  gachaCountError: string = "";

  /**
   * 「X％成功する回数」におけるXのリスト
   */
  perList: number[] = [50, 70, 90, 95, 99];

  constructor() { }

  ngOnInit() {}

  /**
   * 1回以上成功する確率
   */
  get anySuccessPer(): number{
    return (1.0 - Math.pow(((100.0 - parseFloat(this.dropPer)) / 100), parseInt(this.gachaCount))) * 100.0;
  }

  /**
   * 全て失敗する確率
   */
  get allFailPer(): number{
    return 100.0 - this.anySuccessPer;
  }

  /**
   * X％成功する回数
   */
  anySuccessCount(perOfAnySuccess: number): number{
    return Math.ceil(Math.log(1.0 - 1.0 * perOfAnySuccess / 100) / Math.log(1.0 - 1.0 * parseFloat(this.dropPer) / 100));
  }

  /**
   * ガチャ回数-10回
   */
  subGachaCount10(){
    const temp = parseInt(this.gachaCount);
    if(!isNaN(temp)){
      this.gachaCount = "" + Math.max(temp - 10, 0);
    }
  }

  /**
   * ガチャ回数-1回
   */
  subGachaCount1(){
    const temp = parseInt(this.gachaCount);
    if(!isNaN(temp)){
      this.gachaCount = "" + Math.max(temp - 1, 0);
    }
  }

  /**
   * ガチャ回数+1回
   */
  addGachaCount1(){
    const temp = parseInt(this.gachaCount);
    if(!isNaN(temp)){
      this.gachaCount = "" + (temp + 1);
    }
  }

  /**
   * ガチャ回数+10回
   */
  addGachaCount10(){
    const temp = parseInt(this.gachaCount);
    if(!isNaN(temp)){
      this.gachaCount = "" + (temp + 10);
    }
  }

  /**
   * ドロップ率が変化した際の処理
   */
  changeDropPer(event: any){
    this.dropPer = event;

    // そもそも数値なのか？
    const temp = parseFloat(this.dropPer);
    if(isNaN(temp)){
      this.dropPerError = "エラー：数値を入力してください。";
      return;
    }

    // 負数じゃないか？
    if(temp < 0){
      this.dropPerError = "エラー：0以上の実数を入力してください。";
      return;
    }
    
    this.dropPerError = "";
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
}
