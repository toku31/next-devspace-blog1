---
title: 'JavaScript Tutorial -3-'
date: 'September29, 2022'
excerpt: 'JavaScriptで簡単なプロジェクトを作成していきます。'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
Code: https://github.com/bradtraversy/vanillawebprojects
### Form Validator
~~~html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <title>Form Validator</title>
  </head>
  <body>
    <div class="container">
      <form id="form" class="form">
        <h2>Register With Us</h2>
        <div class="form-control">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="Enter email" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            placeholder="Enter password again"
          />
          <small>Error message</small>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    <script src="script.js"></script>
  </body>
</html>
~~~

~~~css
/* style.css */
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

:root {
  --success-color: #2ecc71;
  --error-color: #e74c3c;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #f9fafb;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

h2 {
  text-align: center;
  margin: 0 0 20px;
}

.form {
  padding: 30px 40px;
}

.form-control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form-control label {
  color: #777;
  display: block;
  margin-bottom: 5px;
}

.form-control input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

/* 入力欄の外枠の色を変える */
.form-control input:focus {
  outline: 0;
  border-color: #777;
}

.form-control.success input {
  border-color: var(--success-color);
}

.form-control.error input {
  border-color: var(--error-color);
}

.form-control small {
  color: var(--error-color);
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

.form button {
  cursor: pointer;
  background-color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}
~~~
エラーメッセージ欄のCSSはposition: absoluteで定義
```css
.form-control small {
  color: var(--error-color);
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}
```
classのプロパティを変更するにはclassNameを使う
~~~js
// script.js
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
~~~
querySelectorの使い方
~~~js
document.querySelector(cssセレクタ);
例 : document.querySelector(“p”);
~~~

~~~js
getElementById(‘id’)	querySelector(‘#id’)	idは一意のためquerySelector()を使用
getElementsByClassName(‘class’)	querySelector(‘.class’)
querySelectorAll(‘.class’)	対象のclass全て取得する場合はquerySelectorAll()を使用
getElementsByName(“name”)	querySelector(“タグ名[name=’name’]”)
querySelectorAll(“タグ名[name=’name’]”)	nameは「 タグ名[name=’name’] 」
~~~
### Section05 exchange-rate
~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Exchange Rate Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <img src="img/money.png" alt="" class="money-img" />
    <h1>Exchange Rate Calculator</h1>
    <p>Choose the currency and the amounts to get the exchange rate</p>

    <div class="container">
      <div class="currency">
        <select id="currency-one">
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="USD" selected>USD</option>
        </select>
        <input type="number" id="amount-one" placeholder="0" value="1" />
      </div>

      <div class="swap-rate-container">
        <button class="btn" id="swap">
          Swap
        </button>
        <div class="rate" id="rate"></div>
      </div>

      <div class="currency">
        <select id="currency-two">
          <option value="EUR" selected>EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="USD">USD</option>
        </select>
        <input type="number" id="amount-two" placeholder="0" />
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
~~~
CSSの編集
appearanceプロパティはベンダープレフィックスと一緒に使う  
セレクトボタンのデザインを appearance: none で無効化し、標準の選択矢印が表示されないようにし、独自デザインの矢印を表示する  
background-image: url('data:image/svg+xml・・・)は選択ボタンの下矢印↓のsvgデザイン
```css
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: inline-block;
  vertical-align: middle;
}

```
~~~css
 /* custom property */
:root {
  --primary-color: #5fbaa7;
}

* {
  box-sizing: border-box;
}

/* 画面の真ん中にツールを設定する */
/* height: 100vhが必要 */
body {
  background-color: #f4f4f4;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  padding: 20px;
}
custome property
h1 {
  color: var(--primary-color); 
}

p {
  text-align: center;
}

.btn {
  color: #fff;
  background: var(--primary-color);
  cursor: pointer;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px 12px;
}

.money-img {
  width: 150px;
}

.currency {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.currency select {
  padding: 10px 20px 10px 10px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #dedede;
  font-size: 16px;
  background: transparent;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-position: right 10px top 50%, 0, 0;
  background-size: 12px auto, 100%;
  background-repeat: no-repeat;
}

.currency input {
  border: 0;
  background: transparent;
  font-size: 30px;
  text-align: right;
}

.swap-rate-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rate {
  color: var(--primary-color);
  font-size: 14px;
  padding: 0 10px;
}

select:focus,
input:focus,
button:focus {
  outline: 0;
}

@media (max-width: 600px) {
  .currency input {
    width: 200px;
  }
}
~~~
tell me how to call Fetch api
~~~js
fetch('https://example.com/data.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
~~~
In this example, we're calling the fetch method with a URL to a JSON file as its argument. The fetch method returns a Promise that resolves with a Response object.

We're then calling the json() method on the Response object to parse the JSON data. This method also returns a Promise that resolves with the parsed data.

Finally, we're logging the parsed data to the console in the then block. If there's an error during the fetch, the catch block will log the error to the console.

This is just a basic example, but the Fetch API provides a lot of flexibility and options for making HTTP requests. You can pass in additional options to the fetch method, such as HTTP headers or request methods, by specifying them in an object as the second argument to the fetch method.
~~~json
// items.json
[
  {"id": 1, "text": "Item One"},
  {"id": 1, "text": "Item Two"},
  {"id": 1, "text": "Item Three"}
]
~~~

~~~js
// sample-scripts.js
function calculate() {
  // fetch('items.json').then(res => console.log(res)) // dataが表示されない
  fetch('items.json')
    .then(res => res.json()
    .then(data => console.log(data))) 

  fetch('items.json')
    .then(response => response.json()
    .then(itemsData => console.log(itemsData)))
    
  fetch('items.json')
  .then(response => response.json()
  .then(itemsData => (document.body.innerHTML = itemsData[0].text))) 

  // fetch('items.json', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type: application/json'
  //   }
  }

  calculate();
~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~