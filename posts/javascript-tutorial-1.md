---
title: 'JavaScript Tutorial -1-'
date: 'September11, 2022'
excerpt: 'JavaScriptの基礎から応用まで要点をメモ書きしていきます。React, jQuery, TypeScript, Node.js, Express, webpackを学習している方にオススメです。'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### Chrome Dev Toolを使ったデバッグの方法
Sourceタブ開く  
ブレークポイントを押してリロードする  
ブレークポイントで止まる  
変数をホバーすると値が表示される  
⏩ぼたんで再実行  
javascriptコード内にdebuggerと書くことでブレークポイントができる  
ステップオーバネクスト、ステップインツー（関数に入る）、ステップアウト(関数から出る), ステップ（F９）（関数に入る）がある  
deactivateボタンでブレークポイントを消すことができる  
Paused on exceptionボタンは、実行してエラーが起きたら一回止めてくれる  
Scopeで変数を確認したり変更できる
Watchで変数の値を監視できる  

### VSCodeのブレークポイントを使ったデバッグの方法
赤いブレークポイントをつける  
デバッグぼたんを押してCreate launch.json fileをクリックしてchromeを選ぶ

### JavaScriptの公式ドキュメント
echma internatinal
https://www.ecma-international.org/publications-and-standards/standards/  
Echma-262 は開発者むけで難しい：　https://tc39.es/ecma262/  
エンジニア向けはMDN Web docsを見る：　https://mdn.dev/  
Web technology references: https://developer.mozilla.org/en-US/docs/Web  
https://developer.mozilla.org/en-US/docs/Web/JavaScript  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference  
参考　https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const  

### 条件分岐
~~~
if (真偽値) {条件}
~~~

~~~
let ok = true;
if (ok) {
  console.log('Ok')
} else {
  console.log('NG')
}
~~~
