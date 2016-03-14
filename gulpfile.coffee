# ライブラリのロード
gulp   = require "gulp"
coffee = require "gulp-coffee"
plumber = require "gulp-plumber"

# CoffeeScriptをJSに変換し, src/jsに出力
gulp.task "coffee", ->
  gulp.src "assets/src/coffee/*.coffee" #対象ファイル
    .pipe plumber() #エラー出ても落ちない様に
    .pipe coffee({bare: true}) #coffeeをjsにコンパイル
    .pipe gulp.dest "assets/src/js/" #出力先

# CoffeeScriptファイルに変更があったら, jsを随時ビルド(結合圧縮まですると時間がかかるのでしない)
gulp.task "watch", ->
  gulp.watch "assets/src/coffee/*.coffee", ["coffee"]