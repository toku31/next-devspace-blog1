---
title: 'JavaScript Tutorial -2-'
date: 'September25, 2022'
excerpt: 'JavaScriptの要点をメモ書きしていきます。React, jQuery, TypeScript, Node.jsなどの学習にも役立ちます。今回は関数を中心にみていきます'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### 関数はオブジェクト
オブジェクトから関数はできない
~~~js
function add(a, b) {
  return a + b;
}
console.dir(add)
console.log(add.name) // add
console.log(add.length) // 2
const newAdd = add
// 上は以下と同じ
let add = {}
~~~
関数式を使って関数を変数に代入する  
関数式と関数宣言文は異なり、関数はこの２つの方法で作れる
~~~js
// 名前付関数式
let sayHello = function hello() {
  return 'hello'
}
// 無名関数
let sayHello = function () {
  return 'hello'
}
hello() // エラー
sayHello() // hello
~~~
関数式と関数宣言文の違い
~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~