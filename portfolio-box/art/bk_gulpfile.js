//分割代入をして gulp.hoge()と書かずにhoge()と書ける
const {src, dest, task, watch, series, parallel} = require("gulp");

const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
var connectSSI = require('connect-ssi');


// 必要な読み込むファイルpathと出力するファイルpathを変数にする

const distURL='./dist/';
const srcURL='./src/';
const styleSRC = srcURL+"**/*.scss";
const styleURL = distURL+"";
const htmlSRC = srcURL+"**/*.html";
const htmlURL = distURL+"";
const jsSRC = srcURL+"**/*.js";
const jsLibsSRC = srcURL+"js/libs/*.js";
const jsURL = distURL+"";
const jsLibsURL = distURL+"js/libs/";
const imgSRC = srcURL+"**/*.+(jpeg|jpg|gif|png|svg)";
const imgURL = distURL+"";
const fontsSRC = srcURL+"**/*.+(woff|woff2)";
const fontsURL = distURL+"";
const otherSRC=srcURL+"**/*.+(json|pdf)";
const otherURL=distURL+"";



// /dist以下をローカルサーバーのルートにする
function browser_sync() {
  browserSync.init({
    server: {
      baseDir:'./dist/',
      middleware: [
        connectSSI({
          baseDir:'./dist/',
          ext: '.html'
        })
      ]
    },
    startPath:'index.html',
    open: 'external'
  });
};
// 自動でブラウザをリロードする
function reload (done) {
  browserSync.reload();
  done();
}

function css(done) {
  src(styleSRC)
    .pipe(sass({
　　　 // エラーを出力&css圧縮せずcssに展開
      errLogToConsole: true,
      outputStyle: "expanded"
    }))
    //これがないとコンパイルエラーの時にgulpが中断してしまう
    .on('error', console.error.bind(console))
　　 //プレフィックス付与
    .pipe(autoprefixer())
    .pipe(dest(styleURL))
    .pipe(browserSync.stream());
  done();
};

function js(done){
  return src([jsSRC,'!'+jsLibsSRC])
  .pipe(uglify())
  .pipe(rename({extname: '.min.js'}))
  .pipe(dest(jsURL));
}


// watch()を中断させない
function triggerPlumber(src_file, url_file) {
  return src(src_file)
    .pipe(plumber())
    .pipe(dest(url_file));
};
function jsLibs() {
  return triggerPlumber(jsLibsSRC, jsLibsURL);
}

function images() {
  return triggerPlumber(imgSRC, imgURL);
}

function fonts() {
  return triggerPlumber(fontsSRC, fontsURL);
}

function html() {
  return triggerPlumber(htmlSRC, htmlURL);
}
function other() {
  return triggerPlumber(otherSRC, otherURL);
}

function js() {
  return triggerPlumber(jsSRC, jsURL);
}

function watch_files() {
  watch(styleSRC, series(css, reload));
  watch(jsSRC, series(js, reload));
  watch(jsLibsSRC, series(jsLibs, reload));
  watch(imgSRC, series(images, reload));
  watch(fontsSRC, series(fonts, reload));
  watch(htmlSRC, series(html, reload));
  watch(otherSRC, series(other, reload));
}

//上の関数を名前付きで定義する
task("css", css);
task("js", js);
task("jsLibs", jsLibs);
task("images", images);
task("fonts", fonts);
task("html", html);
task("other", other);

task("default", parallel(css, js, jsLibs, images, fonts, html,other,browser_sync, watch_files));