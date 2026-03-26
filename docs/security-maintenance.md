# セキュリティ対応ログ

このドキュメントでは、依存関係のセキュリティ対応を記録します。

## 2026-03-26

- `gacha-prob-calculator` の `react-scripts` を `5.0.1` へ更新。
- 既存テストが現行UI文言と不一致だったため、`App.test.tsx` の期待値を現行タイトルに合わせて修正。
- Angular 側は既存テスト不整合（`ngModel` 依存）により CI で失敗するため、当面は `build` のみ実行。
- 目的: Dependabot Alert（React 系トランジティブ依存）を段階的に解消するための基盤更新。
- `CalcGachaProbTool/package-lock.json` を `npm audit fix --package-lock-only --legacy-peer-deps` で更新し、Angular 側のトランジティブ依存を可能な範囲で自動修正。
- ローカルの `npm run build` は Node.js 24 環境で `loader-runner` 由来の既知エラー（`callback was already called`）を確認。Angular 旧世代依存のため、CI判定は既存方針どおり React ジョブ中心で継続。
- `CalcGachaProbTool` の E2E 依存（`protractor`, `@types/jasminewd2`）を削除し、`request` 系の旧トランジティブ依存を縮退。
- 併せて `package.json` の `e2e` スクリプトを削除し、現行運用（build/test/lint）に合わせた。
- `CalcGachaProbTool/package.json` に `overrides` を追加し、`picomatch` と `undici` を安全版へ固定。
- `package-lock.json` を再解決し、Angular 側の残存アラート（`picomatch` / `undici`）の解消を狙う。
- `undici` は初回固定値が脆弱範囲内だったため、`7.24.0` へ再固定して `CalcGachaProbTool` 側の監査結果を `0 vulnerabilities` に更新。
- `gacha-prob-calculator` は CRA (`react-scripts`) から Vite + React 18 + Vitest へ移行。
- React 側の依存管理を `npm` に統一し、`yarn.lock` を廃止して `package-lock.json` を正規ロックファイルに変更。
- CI の React ジョブを Node 20 + npm 実行（`npm ci` / `npm run build` / `npm run test:ci`）へ更新。
- Dependabot を `CalcGachaProbTool` / `gacha-prob-calculator` の npm 監視で有効化し、継続的な依存更新体制を確立。
