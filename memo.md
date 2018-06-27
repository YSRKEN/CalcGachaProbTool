# 環境構築

- [puku0x/angular-pwa-sample](https://github.com/puku0x/angular-pwa-sample)を参考にすれば問題ない
- 当然、my-app部分は適当に入れ替えることになる

# デバッグビルド・リリースビルド

- 今回の場合、`ng run CalcGachaProbTool:app-shell:production`でリリースビルド可能
- また、`npx pushstate-server ./dist/CalcGachaProbTool`とすれば、デフォルトで[localhostの9000番ポート](http://localhost:9000)にWebサーバーが起動してくれる
- 出力先は`root.projects.CalcGachaProbTool.architect.build.options.outputPath`で指定する。相対パスの起点は、`angular.json`が存在する位置となる
- `ng serve`とすれば、デバッグ用にビルドしてWebサーバー上で動作する。前者との違いは、Node.js成分が多いこと？

![image](https://user-images.githubusercontent.com/3734392/42000925-47dadeac-7a9d-11e8-8ca5-d348d218e33c.png)
