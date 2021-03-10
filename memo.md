# 環境構築

- [puku0x/angular-pwa-sample](https://github.com/puku0x/angular-pwa-sample)を参考にすれば問題ない
- 当然、my-app部分は適当に入れ替えることになる

# デバッグビルド・リリースビルド

- 今回の場合、`ng run CalcGachaProbTool:app-shell:production`でリリースビルド可能
- また、`npx pushstate-server ./dist/CalcGachaProbTool`とすれば、リリース用ビルドに対し、デフォルトで[localhostの9000番ポート](http://localhost:9000)に簡易のWebサーバーが起動してくれる
- `ng serve`とすれば、デバッグ用にビルドして、デフォルトで[localhostの4200番ポート](http://localhost:4200)にNode.jsのWebサーバーが起動してくれる
- 出力先は`root.projects.CalcGachaProbTool.architect.build.options.outputPath`で指定する。相対パスの起点は、`angular.json`が存在する位置となる
- デバッグ用とリリース用の違いは、主に「ServiceWorkerが機能するか」というところ

![image](https://user-images.githubusercontent.com/3734392/42000925-47dadeac-7a9d-11e8-8ca5-d348d218e33c.png)

# デプロイ

- 今回はFirebaseを使用
  - [calc-gacha-prob-tool](https://console.firebase.google.com/project/calc-gacha-prob-tool/overview)
 
 - デプロイ自体も、Angularプロジェクト自体に`firebase init`して`firebase.json`を編集して`firebase deploy`するだけなので超簡単！
  - [Firebase CLIでAngularアプリをFirebase Hostingにデプロイする](https://qiita.com/daikiojm/items/89f46bd83c9a2285bbc6)
