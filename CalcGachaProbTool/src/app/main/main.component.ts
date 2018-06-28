import { Component, OnInit } from '@angular/core';

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
   * dropPerのエラー欄
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
    return 95.2;
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
    return perOfAnySuccess;
  }
}
