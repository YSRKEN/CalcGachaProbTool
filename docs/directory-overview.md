# 既存ディレクトリ説明

このドキュメントでは、リポジトリ直下の主要ディレクトリの役割を整理します。

## ルート構成

- `.git/`
  - Git 管理情報を保持します。
- `.serena/`
  - Serena MCP のプロジェクト情報やメモリを保持します。
- `.vscode/`
  - VS Code のワークスペース設定を保持します。
- `.github/workflows/`
  - Pull Request / master push 時に実行する CI 設定を保持します。
- `CalcGachaProbTool/`
  - Angular 6 ベースの実装です。旧構成のアプリ本体があります。
- `gacha-prob-calculator/`
  - React + TypeScript ベースの実装です。現行側のアプリ本体があります。

## 各アプリの要点

### `CalcGachaProbTool/`（Angular）

- `src/`: アプリケーションコード
- `e2e/`: E2E テスト
- `angular.json`: Angular CLI 設定
- `package.json`: 実行スクリプトと依存関係

主な実行コマンド:

- `npm start`
- `npm run build`
- `npm test`
- `npm run lint`
- `npm run e2e`

### `gacha-prob-calculator/`（React）

- `src/`: アプリケーションコード
- `public/`: 静的ファイル
- `build/`: ビルド成果物
- `index.html`: Vite エントリHTML
- `vite.config.ts`: Vite / Vitest 設定
- `package.json`: 実行スクリプトと依存関係
- `package-lock.json`: npm 依存ロックファイル（正）

主な実行コマンド:

- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run test:ci`

## 補足

- ルートの `README.md` はアプリの目的と機能説明です。
- 実装は Angular 版と React 版が共存しているため、作業対象ディレクトリを先に確認してください。
- CI は `.github/workflows/ci.yml` で管理し、Angular/React を別ジョブで実行します。
- CI の実行環境は、Angular を Node 10、React を Node 20 として分離しています。
- Angular ジョブは既存依存更新で不安定なため、当面は non-blocking（失敗時もPR全体をブロックしない）で運用します。
- 依存更新期間中は、Angular ジョブを `push(master)` 時のみ実行し、PR では React/CodeQL を優先して検証します。
