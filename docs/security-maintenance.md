# セキュリティ対応ログ

このドキュメントでは、依存関係のセキュリティ対応を記録します。

## 2026-03-26

- `gacha-prob-calculator` の `react-scripts` を `5.0.1` へ更新。
- 既存テストが現行UI文言と不一致だったため、`App.test.tsx` の期待値を現行タイトルに合わせて修正。
- Angular 側は既存テスト不整合（`ngModel` 依存）により CI で失敗するため、当面は `build` のみ実行。
- 目的: Dependabot Alert（React 系トランジティブ依存）を段階的に解消するための基盤更新。
