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
/* style.css */
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
### how to call Fetch api
~~~js
fetch(url)
  .then(response => {
    // レスポンスを処理する
    return response.json(); // JSON形式のデータを取得する
  })
  .then(data => {
    // データを処理する
  })
  .catch(error => {
    // エラーを処理する
  });
~~~
Fetch APIは、JavaScriptの標準機能の1つであり、ウェブブラウザで使用できます。上記のコード例は、ES6のPromiseを使用していますが、代替のコールバック関数を使用することもできます。  
代替のコールバック関数で示すと、
```js
fetch(url, function(response) {
  // レスポンスを処理する
  response.json(function(data) {
    // データを処理する
  });
}, function(error) {
  // エラーを処理する
});
```
この場合、fetch()メソッドには、リクエストを送信するためのURLと、成功した場合と失敗した場合に呼び出されるコールバック関数が渡されます。レスポンスが成功した場合、responseオブジェクトがコールバック関数に渡されます。このオブジェクトを使用して、レスポンスのデータを取得し、適切な形式に変換することができます。次に、コールバック関数を使用して、データを処理します。

ただし、Fetch APIのコールバック関数は非推奨とされており、代わりにPromiseを使用することが推奨されています。Promiseを使用することで、コードがより簡潔で読みやすくなり、エラー処理がより簡単になります。  
Fetch APIをasync/awaitを使用して呼び出す場合、以下のようになります。
~~~js
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // データを処理する
  } catch (error) {
    // エラーを処理する
  }
}

fetchData();
~~~
この場合、fetch()メソッドでリクエストを送信し、awaitキーワードを使用してレスポンスを待ちます。次に、json()メソッドでレスポンスをJSON形式に変換し、再びawaitキーワードを使用してデータを待ちます。最後に、データを処理するコードを記述します。

try...catchブロックを使用することで、エラー処理を簡単に行うことができます。tryブロックで例外が発生した場合、catchブロックでエラーをキャッチし、適切に処理することができます。

Fetch APIをasync/awaitを使用して呼び出すことで、Promiseを使用する場合と同様に、コードが簡潔で読みやすくなります。  
axiosを使用してFetch APIを呼び出す場合、以下のようになります。
```js
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get(url);
    const data = response.data;
    // データを処理する
  } catch (error) {
    // エラーを処理する
  }
}
fetchData();
```
この場合、axiosライブラリを使用して、get()メソッドでリクエストを送信します。awaitキーワードを使用して、レスポンスを待ちます。次に、response.dataを使用して、レスポンスのデータを取得します。最後に、データを処理するコードを記述します。

try...catchブロックを使用することで、エラー処理を簡単に行うことができます。tryブロックで例外が発生した場合、catchブロックでエラーをキャッチし、適切に処理することができます。

axiosは、Fetch APIと同様に、PromiseベースのHTTPクライアントライブラリであり、リクエストやレスポンスの処理に便利な機能を提供しています。axiosを使用することで、Fetch APIに比べて、よりシンプルなAPIを使用でき、コードが読みやすくなる場合があります。  
axiosは、Fetch APIと異なり、レスポンスのデータをJSON形式に変換する必要はありません。axiosのresponseオブジェクトには、レスポンスのデータが既に含まれています。
したがって、以下のように、response.dataを使用してレスポンスのデータにアクセスできます。
```js
const response = await axios.get(url);
const data = response.data;
```
ここで、responseオブジェクトのdataプロパティに、レスポンスのデータが含まれています。

一方、Fetch APIでは、レスポンスをJSON形式に変換するには、response.json()メソッドを使用する必要があります。したがって、Fetch APIの場合は、以下のようになります。

```js
const response = await axios.get(url);
const data = response.data;
```
上記のコードでは、fetch()メソッドでリクエストを送信し、レスポンスをawaitキーワードで待ちます。次に、response.json()メソッドを使用して、レスポンスのデータをJSON形式に変換し、再びawaitキーワードを使用してデータを待ちます。最後に、データを処理するコードを記述します。

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
// script.js
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();
~~~
上にconsole.log(date)は以下の通り
Object
WARNING_UPGRADE_TO_V6: "https://www.exchangerate-api.com/docs/free"
base: "USD"
date: "2023-04-23"
provider: "https://www.exchangerate-api.com"
rates: {USD: 1, AED: 3.67, AFN: 85.68, ALL: 102.49, AMD: 387.63, …}
terms: "https://www.exchangerate-api.com/terms"
time_last_updated: 1682208002
[[Prototype]]: Object  
### Section6 Dom Array Methods
~~~js
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <title>DOM Array Methods</title>
  </head>
  <body>
    <h1>DOM Array Methods</h1>

    <div class="container">
      <aside>
        <button id="add-user">Add User 👱‍♂️</button>
        <button id="double">Double Money 💰</button>
        <button id="show-millionaires">Show Only Millionaires 💵</button>
        <button id="sort">Sort by Richest ↓</button>
        <button id="calculate-wealth">Calculate entire Wealth 🧮</button>
      </aside>

      <main id="main">
        <h2><strong>Person</strong> Wealth</h2>
      </main>
    </div>

    <script src="script.js"></script>
  </body>
</html>
~~~

~~~js
// style.css
* {
  box-sizing: border-box;
}

body {
  background: #f4f4f4;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  display: flex;
  padding: 20px;
  margin: 0 auto;
  max-width: 100%;
  width: 800px;
}

aside {
  padding: 10px 20px;
  width: 250px;
  border-right: 1px solid #111;
}

button {
  cursor: pointer;
  background-color: #fff;
  border: solid 1px #111;
  border-radius: 5px;
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
}

main {
  flex: 1;
  padding: 10px 20px;
}

h2 {
  border-bottom: 1px solid #111;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  margin: 0 0 20px;
}

h3 {
  background-color: #fff;
  border-bottom: 1px solid #111;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  margin: 20px 0 0;
}

.person {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 10px;
}
~~~
"flex: 1"は、CSSフレックスボックス（flexbox）のプロパティで、要素の伸縮性を指定するために使用されます。"main"タグに"flex: 1"を設定することで、その要素を含むフレックスコンテナ内の他の要素と同じ割合でスペースを占有するようになります。

例えば、以下のように"main"タグに"flex: 1"を設定すると、"main"要素は、フレックスコンテナ内の他の要素と同じ割合で高さを調整し、フレックスコンテナ内の残りのスペースを均等に分配します。
~~~js
.container {
  display: flex;
  flex-direction: column;
  height: 500px;
}

header {
  height: 50px;
}

main {
  flex: 1;
}

footer {
  height: 50px;
}
~~~
この例では、"container"クラスを持つ要素がフレックスコンテナであり、その中に"header"、"main"、"footer"の3つの要素が含まれています。"header"と"footer"はそれぞれ50pxの高さを持ち、"main"には"flex: 1"が設定されています。

この場合、"main"要素は高さを自動的に調整し、フレックスコンテナ内の残りのスペースを均等に分配するため、"header"と"footer"の間に残りのスペースが自動的に挿入されます。

つまり、"main"要素に"flex: 1"を設定すると、残りのフレックスコンテナ内のスペースを均等に分配するための自動的な高さ調整が行われることになります。
~~~js
// script.js
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double eveyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  console.log(123);
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
~~~
const element = document.createElement('div'); <= タグの作成  
element.classList.add('person');　<= クラスの追加  
main.appendChild(element);　<= 親のmainに子要素を追加する  
[[Format number as money]](https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string ) : return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
#### 高階関数(high order array method)
JavaScriptには、高階関数と呼ばれる、配列を操作するための便利な関数があります。これらの関数は、コードをよりシンプルで効率的に書くことができ、コードの再利用性を高めることができます。以下は、高階関数の一例です。

map()
map()メソッドは、配列内の各要素を取り出して、与えられた関数によって変換し、新しい配列を生成します。元の配列は変更されず、変換された値を持つ新しい配列が返されます。
~~~js
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);

console.log(doubledNumbers); // [2, 4, 6, 8, 10]
~~~
filter()
filter()メソッドは、配列内の要素を取り出して、与えられた関数によってフィルタリングし、条件に合致する要素のみを含む新しい配列を生成します。
~~~js
filter()
filter()メソッドは、配列内の要素を取り出して、与えられた関数によってフィルタリングし、条件に合致する要素のみを含む新しい配列を生成します。
~~~
reduce()
reduce()メソッドは、配列内の要素を1つずつ取り出して、与えられた関数によって処理し、単一の値にまとめます。初期値を指定することもできます。
~~~js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 15
~~~
forEach()
forEach()メソッドは、配列内の各要素に対して、与えられた関数を実行します。戻り値はありません。
~~~js
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(num => console.log(num));
// 1
// 2
// 3
// 4
// 5
~~~
sort()
sort()メソッドは、配列内の要素をソートします。デフォルトでは、要素は文字列としてソートされます。数値をソートする場合は、比較関数を指定する必要があります。
~~~js
const numbers = [5, 1, 4, 2, 3];

const sortedNumbers = numbers.sort((a, b) => a - b);

console.log(sortedNumbers); // [1, 2, 3, 4, 5]
~~~
~~~js

~~~
