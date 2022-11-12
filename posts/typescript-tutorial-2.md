---
title: 'Typescript Tutorial -2-'
date: 'November 12, 2022'
excerpt: 'Typescriptの基礎のメモ書きです 2回目は実装の仕方などを学びます'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

参考サイト：https://www.youtube.com/watch?v=MOO5vrtTUTE&t=1077s
#### インストール
~~~
npm install -g typescript
または
user@mbp typescript-tutorial % npm i typescript -g
~~~
Lesson01フォルダにindex.htmlとmain.tsファイルを作成
~~~ts
//lesson01/src/main.ts
let username = 'Dave'
console.log(username)
~~~
~~~
user@mbp Lesson01 % tsc main.ts
~~~
main.js ができる
~~~
デベロッパーツールを開く「F12」  
// Ctrl + Shift + I」（MacはControl + Option + I）  
// compiled from typescript

~~~
user@mbp Lesson01 % tsc main.ts -w
user@mbp Lesson01 % tsc --init
~~~
tscofig.jsonができるので以下を修正する
~~~json
 <!-- tscofig.json -->
    /* Modules */
 "rootDir": "./src",   
 "outDir": "./build/js",    
~~~
~~~
user@mbp Lesson01 % tsc -w
~~~
tsconfig.json	の"target"を”es5"にするとlet→varになる
~~~
 <!-- tscofig.json -->
  "target": "es2016",    
~~~

~~~

~~~

~~~

~~~

TypeScript Website: https://www.typescriptlang.org/
Compiler Option: https://www.typescriptlang.org/docs/handbook/compiler-options.html

ローカルにインストール
~~~
npm -i typescript
~~~
#### コンパイル
```
1 watch モード
2 tsc --init でtsconfig.jsonを作って全てのファイルをコンパイルする
3 includeとexcludeとfilesを使ってコンパイルするファイルを選ぶ
4target を指定して特定のバージョンのJAVASCRIPTに変換する
5libを指定してTypeScriptが用意している型の定義を追加する
6allowJs, checkJs, jsx, declaration, declaretionMap
7
8
9
10
11綺麗なコード


１ > tsc index.ts --watch

2 複数のtsファイルをまとめてコンパイルする
> tsc compiler.ts  index.ts
> tsc --init でtsconfig.jsonを作成する
 tsc だけ打つとtsconfig.jsonを参照するが tsc index.ts では参照しない
 
 ３ tsconfig.jsonの末尾
 ~~~
   "include": [
    "index.ts"
   ],
   "exclude": [
     "**/compiler.ts", // どのディレクトリのcommiler.tsを除く
     "*.spec.ts",
     "node_modules"
   ],
   "files": [
     "tmp/compiler.ts"
   ]
 ~~~
 ```
## 36 tsconfig.jsonのtargetを指定して特定のJSのバージョンに変換
"target": "es6" とすると　var ⇒let 変換する

## 37 tsconfig.jsonのlibを指定してTypescriptが用意している型の定義を追加する
```
”lib”
let hello='hello'
console.log(hello.toUpperCase())
```

