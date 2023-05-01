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
要素をインラインレベルとして表示しながら、幅と高さの指定が可能なブロックレベル要素にします label要素を、上下に10ピクセルの余白を持つ行内ブロック要素として表示するスタイルを定義しています。たとえば、フォームで使用されるチェックボックスやラジオボタンのラベルを表すためにlabel要素に対して適用されることが多いです。

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


