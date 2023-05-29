---
title: 'JavaScript Small Project -2-'
date: 'September30, 2022'
excerpt: 'JavaScriptで簡単なプロジェクトを作成していきます。今回はその2回目です'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
Code: https://github.com/bradtraversy/vanillawebprojects
### Section9 Meal Finder | FetchAPI & MealDB
font-awesomeを使う
~~~js
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Meal Finder</title>
  </head>
  <body>
    <div class="container">
      <h1>Meal Finder</h1>
      <div class="flex">
        <form class="flex" id="submit">
          <input
            type="text"
            id="search"
            placeholder="Search for meals or keywords"
          />
          <button class="search-btn" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button class="random-btn" id="random">
          <i class="fas fa-random"></i>
        </button>
      </div>

      <div id="result-heading"></div>
      <div id="meals" class="meals"></div>
      <div id="single-meal"></div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
~~~
~~~css
* {
  box-sizing: border-box;
}

body {
  background: #2d2013;
  color: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0;
}

.container {
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.flex {
  display: flex;
}

input,
button {
  border: 1px solid #dedede;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  padding: 8px 10px;
  margin: 0;
}

input[type='text'] {
  width: 300px;
}

.search-btn {
  cursor: pointer;
  border-left: 0;
  border-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.random-btn {
  cursor: pointer;
  margin-left: 10px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.meals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 20px;
}

.meal {
  cursor: pointer;
  position: relative;
  height: 180px;
  width: 180px;
  text-align: center;
}

.meal img {
  width: 100%;
  height: 100%;
  border: 4px #fff solid;
  border-radius: 2px;
}

.meal-info {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in;
  opacity: 0;
}

.meal:hover .meal-info {
  opacity: 1;
}

.single-meal {
  margin: 30px auto;
  width: 70%;
}

.single-meal img {
  width: 300px;
  margin: 15px;
  border: 4px #fff solid;
  border-radius: 2px;
}

.single-meal-info {
  margin: 20px;
  padding: 10px;
  border: 2px #e09850 dashed;
  border-radius: 5px;
}

.single-meal p {
  margin: o;
  letter-spacing: 0.5px;
  line-height: 1.5;
}

.single-meal ul {
  padding-left: 0;
  list-style-type: none;
}

.single-meal ul li {
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: #fff;
  background-color: pink;
  display: inline-block;
  color: #2d2013;
  font-size: 12px;
  font-weight: bold;
  padding: 5px;
  margin: 0 5px 5px 0;
}

@media (max-width: 800px) {
  .meals {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .meals {
    grid-template-columns: repeat(2, 1fr);
  }

  .meal {
    height: 200px;
    width: 200px;
  }
}
@media (max-width: 500px) {
  input[type='text'] {
    width: 100%;
  }

  .meals {
    grid-template-columns: 1fr;
  }

  .meal {
    height: 300px;
    width: 300px;
  }
}
~~~
MealDB API: https://www.themealdb.com/api.php  
Search meal by name: www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
~~~js
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();
  // Clear single meal
  single_mealEl.innerHTML = '';
  // Get search term
  const term = search.value;
  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}
// Event listeners
submit.addEventListener('submit', searchMeal);
~~~
~~~js
// script.js
const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();
  // Clear single meal
  single_mealEl.innerHTML = '';
  // Get search term
  const term = search.value;
  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    // Clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      console.log('meal1', meal)
      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      console.log('meal', meal)
      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  const measures = [];

  for (key in meal) {
    if (key.includes('strIngredient')){
      if (meal[key]){
        console.log(meal[key]);
        ingredients.push(meal[key]);
      } else {
        console.log('else key', key);
        // break;
      }
    }
    if (key.includes('strMeasure')) {
      if (meal[key]){
        console.log(meal[key]);
        measures.push(meal[key]);
      }
      // console.log(key);
    } else {
      console.log('else key', key);
      // break;
    }
  }
  // for (let i = 1; i <= 20; i++) {
  //   if (meal[`strIngredient${i}`]) {
  //     ingredients.push(
  //       `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
  //     );
  //   } else {
  //     console.log('else key', key);
  //     break;
  //     }
  //   }
  console.log('ingredients', ingredients);
  console.log('measures', measures);

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing, index) => `<li>${ing} - ${measures[index]}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
  const path = e.path || (e.composedPath && e.composedPath());
  // console.log('path', path);
  const mealInfo = path.find(item => {
    console.log('item', item);
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    console.log('mealID', mealID);
    getMealById(mealID);
  }
});
~~~
## Section09 Expense Tracker
家計簿アプリの作成  
UIの編集
~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <title>Expense Tracker</title>
  </head>
  <body>
    <h2>Expense Tracker</h2>

    <div class="container">
      <h4>Your Balance</h4>
      <h1 id="balance">$0.00</h1>

      <div class="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" class="money plus">+$0.00</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" class="money minus">-$0.00</p>
        </div>
      </div>

      <h3>History</h3>
      <ul id="list" class="list">
        <!-- <li class="minus">
          Cash <span>-$400</span><button class="delete-btn">x</button>
        </li> -->
      </ul>

      <h3>Add new transaction</h3>
      <form id="form">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" id="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
          <label for="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" id="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
      </form>
    </div>

    <script src="script.js"></script>
  </body>
</html>
~~~
CSSの編集
~~~css
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

:root {
  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

* {
  box-sizing: border-box;
}

body {
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  font-family: 'Lato', sans-serif;
}

.container {
  margin: 30px auto;
  width: 350px;
}

h1 {
  letter-spacing: 1px;
  margin: 0;
}

h3 {
  border-bottom: 1px solid #bbb;
  padding-bottom: 10px;
  margin: 40px 0 10px;
}

h4 {
  margin: 0;
  text-transform: uppercase;
}

.inc-exp-container {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.inc-exp-container > div {
  flex: 1;
  text-align: center;
}

.inc-exp-container > div:first-of-type {
  border-right: 1px solid #dedede;
}

.money {
  font-size: 20px;
  letter-spacing: 1px;
  margin: 5px 0;
}

.money.plus {
  color: #2ecc71;
}

.money.minus {
  color: #c0392b;
}

label {
  display: inline-block;
  margin: 10px 0;
}

input[type='text'],
input[type='number'] {
  border: 1px solid #dedede;
  border-radius: 2px;
  display: block;
  font-size: 16px;
  padding: 10px;
  width: 100%;
}

.btn {
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 100%;
}

.btn:focus,
.delete-btn:focus {
  outline: 0;
}

.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}

.list li {
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
}

.list li.plus {
  border-right: 5px solid #2ecc71;
}

.list li.minus {
  border-right: 5px solid #c0392b;
}

.delete-btn {
  cursor: pointer;
  background-color: #e74c3c;  // 赤
  border: 0;　// ボータを削除
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.list li:hover .delete-btn {
  opacity: 1;
}
~~~
上のCSSのポイント  
***box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);***    
0 1px 3px rgba(0, 0, 0, 0.12) - x方向の影の位置、y方向の影の位置、ぼかしの量、影の色（黒色の半透明度）  
0 1px 2px rgba(0, 0, 0, 0.24) - x方向の影の位置、y方向の影の位置、ぼかしの量、影の色（黒色の半透明度）  
このコードでは、1つの要素に複数の影を付けています。最初の影は少し大きく、少し薄い色で、2つ目の影は少し小さく、少し濃い色で、より深い影を表現しています。このように、複数の影を組み合わせることで、より自然な影の表現が可能になります。  
***letter-spacing:1px***  
テキストの文字間隔を調整するためのCSSプロパティです。このプロパティは、単位としてピクセル、em、rem、パーセントなどを取ることができますが、ここでは1pxが指定されています。  
letter-spacing: 1pxという指定は、テキストの各文字の間隔を1ピクセル分広げることを意味します。つまり、文字同士が少し離れて表示されるようになります。  
***変数（カスタムプロパティ）の定義***  
:rootは変数を定義するための便利な方法。変数はhtml要素で定義され、全体で共有されます  
例
~~~css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}
~~~
***.inc-exp-container > div {
  flex: 1;
  text-align: center;
}について***  
flex: 1;は、フレックスコンテナ内のアイテムに対して、割り当てるスペースの割合を指定するためのショートハンドプロパティです。ここでは、flex: 1;が指定されているため、このdiv要素はフレックスアイテムとしてフレックスコンテナ内で利用可能なスペースをすべて占めるようになります。つまり、このCSSコードは、div要素をフレックスアイテムとして表示し、その中に含まれるテキストを水平方向に中央揃えにするスタイルを定義しています。  
***.inc-exp-container > div:first-of-type {
  border-right: 1px solid #dedede;
}について***  
CSSのセレクターの1つで、最初にマッチする div 要素にスタイルを適用することを示します。  
***label {
  display: inline-block;
  margin: 10px 0;
}について***  
要素をインラインレベルとして表示しながら、幅と高さの指定が可能なブロックレベル要素にします label要素を、上下に10ピクセルの余白を持つ行内ブロック要素として表示するスタイルを定義しています。たとえば、フォームで使用されるチェックボックスやラジオボタンのラベルを表すためにlabel要素に対して適用されることが多いです  
***.delete-btn {
  cursor: pointer;
  background-color: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}について***  
line-height: 20px;は一般的に以下のような行の高さに使う
~~~html
<!DOCTYPE html>
<html>
<head>
	<style>
		/* 行の高さを20pxに設定 */
		p {
			line-height: 20px;
		}
	</style>
</head>
<body>
	<!-- テキストを含む段落要素 -->
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac neque et </p>
</html>
~~~
***transform: translate(-100%, -50%);について*** 
削除ボタンを入力欄の左側に表示している opacity: 0;にすることで初期時はボタンを隠している  
***.list li:hover .delete-btn {
  opacity: 1;
}について***  
入力らんをホバーするとボタン隠していたボタンが表示できるようにする  
***.delete-btn {
  ・・・
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}について***  
隠れていたボタンが表示される速さをtransition: opacity 0.3s ease;で指定する  
#### script.jsの編集
Step-1 ダミーデータを作って表示する
~~~js
// script.js
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;

  list.appendChild(item);
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
}

init();
~~~
Step-2 残高balance、収入income、支出expenseを表示する
~~~js
// script.js
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense  // Added
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  console.log('amounts', amounts);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // const total1 = amounts.reduce((acc ,cur)=> {
  //   return acc + cur
  // }, 0).toFixed(2)
  // console.log('total1', total1);
  // const total2 = transactions.reduce((acc, tran)=> (acc + tran.amount), 0).toFixed(2)
  // console.log('total2', total2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
    console.log('income', income);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  console.log('expense', expense);

  balance.innerText = '$' + total;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Init app
function init() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues(); // Added
}

init();
~~~
Step-3 トランザクションの追加、削除処理
~~~js
// Add transaction　　追加処理
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();
    // updateLocalStorage();  あとで追加
    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
・・・
init();

form.addEventListener('submit', addTransaction);　// added
~~~
**上のポイント１**  
Reactと異なり、JavaScriptではonChangeを実現するために、input要素に対してvalue属性を設定し、input要素のvalueプロパティを取得する必要があります。以下は、onchangeイベントを使用せずにJavaScriptでinput要素の値を取得する例です。
~~~js
<input type="text" id="myInput">
<div id="output"></div>

<script>
  const inputElement = document.getElementById('myInput');
  const outputElement = document.getElementById('output');

  inputElement.addEventListener('input', (event) => {
    outputElement.textContent = inputElement.value;
  });
</script>
~~~
この例では、input要素に対してinputイベントをリッスンするイベントリスナーを登録し、input要素のvalueプロパティを取得して、div要素に入力値を表示しています。

Reactでは、input要素のvalue属性を直接設定する代わりに、stateやpropsを使用して、コンポーネントの状態を管理することが一般的です。onChangeイベントは、このような状態管理をより簡単にするために使用されます。onChangeイベントがトリガーされるたびに、コンポーネントの状態を更新し、変更された値を反映することができます。  
**上のポイント2**  
amount: +amount.valueとすることで文字列から数値に変換している これをしないとupdateValuesのreduce関数を使うところでエラーになる  
**削除処理**  
削除ボタンにonclick="removeTransaction(${
    transaction.id
  })"を追加
~~~js
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}
~~~
~~~js
// IDでトランジションを削除する
function removeTransaction(id) {
  transactions = transactions.filter(tran=> tran.id !== id)
  init()
  updateLocalStorage();　// あとで追加する
}
~~~
***LocalStorage***
~~~js
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

transactions = localStorage.getItem('transactions') !== null  // nullの代わりに[]を設定したらエラー
  ? localStorageTransactions 
  : dummyTransactions; 　

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
~~~
script.jsの完成形
~~~js
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
~~~
## Section12 Blog Posts - Scroll Fetch, Async/Await, CssLoader
UIの作成
~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="style.css" />
    <title>My Blog</title>
  </head>
  <body>
    <h1>My Blog</h1>

    <div class="filter-container">
      <input
        type="text"
        id="filter"
        class="filter"
        placeholder="Filter posts..."
      />
    </div>

    <div id="posts-container">
      <div class="post">
        <div class="number">1</div>
        <div class="post-info">
          <h2 class="post-title">Post One</h2>
          <p class="post-body">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, cumque necessitatibus? Vero laborum beatae a ab quo dolor itaque suscipit?
          </p>
        </div>
      </div>
      <div class="post">
        <div class="number">2</div>
        <div class="post-info">
          <h2 class="post-title">Post Two</h2>
          <p class="post-body">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, cumque necessitatibus? Vero laborum beatae a ab quo dolor itaque suscipit?
          </p>
        </div>
      </div>
    </div>

    <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
~~~
~~~css
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-color: #296ca8;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding-bottom: 100px;
}

h1 {
  margin-bottom: 0;
  text-align: center;
}

.filter-container {
  margin-top: 20px;
  width: 80vw;
  max-width: 800px;
}

.filter {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

.post {
  position: relative;
  background-color: #4992d3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 20px;
  margin: 40px 0;
  display: flex;
  width: 80vw;
  max-width: 800px;
}

.post .post-title {
  margin: 0;
}

.post .post-body {
  margin: 15px 0 0;
  line-height: 1.3;
}

.post .post-info {
  margin-left: 20px;
}

.post .number {
  position: absolute;
  top: -15px;
  left: -15px;
  font-size: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  color: #296ca8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
}

.loader {
  opacity: 0;
  display: flex;
  position: fixed;
  bottom: 50px;
  transition: opacity 0.3s ease-in;
}

.loader.show {
  opacity: 1;
}

.circle {
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px;
  animation: bounce 0.5s ease-in infinite;
}

.circle:nth-of-type(2) {
  animation-delay: 0.1s;
}

.circle:nth-of-type(3) {
  animation-delay: 0.2s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
~~~
上のポイント  
***.filter-container {
  width: 80vw;
  max-width: 800px;
}について***  
幅をビューポートの幅の80％（vw）に設定し、最大幅を800ピクセルに制限する  
幅を80vwに設定すると、コンテナの幅はビューポート幅の80％になる  
ビューポート幅は、ビューポートの横幅のことであり、ピクセル単位で表されます。例えば、スマートフォンの縦向きのビューポート幅は通常、約320ピクセルから375ピクセルの間であり、デスクトップのビューポート幅は一般的に1200ピクセル以上になる場合があります  
**script.jsの編集**  
https://jsonplaceholder.typicode.com/postsを使う 他にもhttps://jsonplaceholder.typicode.com/todos、https://jsonplaceholder.typicode.com/usersなどある  
https://jsonplaceholder.typicode.com/posts?_limit=3とすると個数制限できる  
https://jsonplaceholder.typicode.com/posts?_limit=3&_page=2とすると次ページにいく  
#### postsをFetchして画面に表示する
~~~js
// scripts.js
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}
// Show posts in DOM
async function showPosts() {
  const posts = await getPosts(); // 上のgetPostsをawaitでコールする
  console,log(posts)
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}
~~~
#### Scroll機能を追加する
~~~js
// Show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts(); // 次ページを表示
    }, 300);
  }, 1000);
}

window.addEventListener('scroll', () => {
  // console.log('scrollTop', document.documentElement.scrollTop)
  // console.log('scrollHeight', document.documentElement.scrollHeight)
  console.log('clientHeight', document.documentElement.clientHeight)
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    console.log(123);
    showLoading();
  }
});
~~~
### フィルター機能を追加する
~~~js
// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      console.log('flex')
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}
~~~
フィルター機能のサンプル
~~~html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>記事検索</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="container">
      <h1>記事検索</h1>
      <input type="text" id="searchBox" placeholder="検索...">
      <ul id="postList"></ul>
    </div>
    <script src="script.js"></script>
  </body>
</html>
~~~
~~~css
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
}
~~~
~~~js
const searchBox = document.getElementById('searchBox');
const postList = document.getElementById('postList');
const posts = [
  {
    title: '最新の技術動向について',
    content: '最近、人工知能やブロックチェーンなど、様々な技術が注目を集めています。'
  },
  {
    title: '旅行記：アジアの美しい景色',
    content: 'アジアには素晴らしい景色がたくさんあります。私が訪れた中で特に印象に残った場所を紹介します。'
  },
  {
    title: '美味しい料理を作るコツ',
    content: '料理初心者でも簡単にできる、美味しい料理の作り方を紹介します。'
  }
];

function searchPosts(e) {
  // const searchWord = searchBox.value.toLowerCase();　　// OK
  const searchWord = e.target.value.toLowerCase()
  postList.innerHTML = '';
  // for (let i = 0; i < posts.length; i++) {
  posts.forEach(post => {
    // const post = posts[i];
    if (post.title.toLowerCase().includes(searchWord) || post.content.toLowerCase().includes(searchWord)) {
      const li = document.createElement('li')
      li.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
      `
      // const li = document.createElement('li');
      // const h2 = document.createElement('h2');
      // h2.textContent = post.title;
      // const p = document.createElement('p');
      // p.innerText = post.content;
      // li.appendChild(h2);
      // li.appendChild(p);
      postList.appendChild(li);
    }
  })
  }

searchBox.addEventListener('keyup', searchPosts);
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


