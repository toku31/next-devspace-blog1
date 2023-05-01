---
title: 'JavaScript Tutorial -2-'
date: 'September28, 2022'
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
### その他メモ
JavaScriptを使用してDOMから取得したオブジェクトをスタイリングすることができます。  
これは、JavaScriptのstyleプロパティを使用して行われます。  
たとえば、以下のように、JavaScriptを使用してidがexampleの要素の背景色を赤色に変更することができます。
~~~js
var element = document.getElementById("example");
element.style.backgroundColor = "red";
~~~
同様に、以下のように、JavaScriptを使用して要素にスタイルを追加することもできます。
~~~js
var element = document.getElementById("example");
element.style.color = "blue";
element.style.fontSize = "24px";
~~~
このように、DOMから取得したオブジェクトにスタイルを追加することができます。  
ただし、CSSを使用してスタイルを定義し、JavaScriptを使用してスタイルを適用することが一般的です。

モーダル画面のサイズの設定をglobal.cssで行う
```js
/* src/resources/global.css */
.modal-dialog-fluid {
  max-width: inherit;
  width: 800px;
  margin: auto;
  margin-top: 10px;
  /* margin-left: 300px; */
}
```
フォームのサンプル
~~~html
<!DOCTYPE html>
<html>
  <head>
    <title>Form Example</title>
    <style>
      /* フォーム要素のスタイル */
      input,
      select,
      textarea {
        display: block;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-sizing: border-box;
        width: 100%;
        font-size: 16px;
      }
      input[type="submit"] {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="subject">Subject:</label>
      <select id="subject" name="subject" required>
        <option value="">Choose an option</option>
        <option value="general">General Inquiry</option>
        <option value="support">Support</option>
        <option value="feedback">Feedback</option>
      </select>

      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="6" required></textarea>

      <input type="submit" value="Submit">
    </form>

    <script>
      const form = document.querySelector("form");

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.elements["name"].value;
        const email = form.elements["email"].value;
        const subject = form.elements["subject"].value;
        const message = form.elements["message"].value;

        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
      });
    </script>
  </body>
</html>
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