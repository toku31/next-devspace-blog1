---
title: 'JavaScript Small Project -3-'
date: 'June 10, 2023'
excerpt: 'JavaScriptで簡単なプロジェクトを作成していきます。今回はその3回目です'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### Section9 Shopping List Project
~~~js
// script.js
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault()

  // Validate Input
  if (itemInput.value === "" ){
    alert('Please add an item')
    return;   // Exit Sub
  }

  console.log('success')

// Event Listeners
itemForm.addEventListener('submit', addItem)
~~~
追加ボタンをクリックすると現れるボタンやアイコンを作成する
~~~js
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault()

  const newItem = itemInput.value 
  // Validate Input
  if ( newItem === "" ){
    alert('Please add an item')
    return;   // Exit Sub
  }
  // console.log('success')

  // Create list item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))
  
  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)
  console.log(li)
  itemList.appendChild(li)
  itemInput.value = ""
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
~~~
CSS
~~~css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  background-color: #f5f5f5;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

header h1 {
  font-weight: 300;
  margin-left: 10px;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
}

.edit-mode {
  color: #ccc;
}

/* Form & Input */
.form-input {
  width: 100%;
  font-size: 18px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.form-input-filter {
  margin-top: 20px;
  width: 100%;
  font-size: 18px;
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  outline: none;
}

/* Buttons */
.btn {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn:hover {
  background-color: #444;
}

.btn-link {
  font-size: 16px;
  background-color: transparent;
  color: #333;
  border: none;
  padding: 0;
  cursor: pointer;
}

.btn-clear {
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-clear:hover {
  background-color: #f1f1f1;
}

.text-red {
  color: red;
}

/* Items */

.items {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.items li {
  display: flex;
  justify-content: space-between;
  width: 45%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 0 5px 20px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 500px) {
  .items li {
    width: 100%;
  }
}

~~~

Xボタンをクリックすると１アイテムが削除され Clearボタンをクリックすると全て削除する
~~~js
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

function addItem(e) {
  e.preventDefault()

  const newItem = itemInput.value 
  // Validate Input
  if ( newItem === "" ){
    alert('Please add an item')
    return;   // Exit Sub
  }
  // console.log('success')

  // Create list item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))
  
  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)
  console.log(li)
  itemList.appendChild(li)
  itemInput.value = ""
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// added
function removeItem(e) {
  console.log('classList', e.target.parentElement.classList)
  if (e.target.parentElement.classList.contains('remove-item')){
    console.log('click')
    e.target.parentElement.parentElement.remove()
  }
}

// added
function clearItems(){
  console.log('clearItems')
  // itemList.innerHTML = ""
  while(itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }

}

// Event Listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
~~~
### 検索欄で入力した文字を含むITEMを表示するフィルター機能の追加
~~~js
const filter = document.getElementById('filter');

function filterItems(e) {
  //console.log(filter.value)
  const text = e.target.value.toLowerCase()
  console.log(text);
  // const items = document.querySelectorAll('li')
  // querySelectorAllを使った時はArray.fromは不要　items.forEachでOK
  const items = document.getElementsByTagName('li')
  console.log(items); // htmlElement
  // getElementsByTagNameを使ったときArray.fromが必要
  Array.from(items).forEach((item) => {
      console.log(item)
      console.log('firstChild: ', item.firstChild)
      const itemName = item.firstChild.textContent
      console.log(itemName)
      if (itemName.indexOf(text) != -1){
        console.log(true);
        item.style.display = 'flex'
      }else {
        console.log(false);
        item.style.display = 'none'
      }

  } )

  // console.log(items[0].innerText)
  // for (let item of items) {
  //   console.log(item.innerText)
  //   if (item.innerText.includes(text)){
  //     item.style.display = 'block'
  //   }else  {
  //     item.style.display = 'none'
  //   }
  // }
}

filter.addEventListener('input', filterItems)
~~~
itemをLocal Storageに追加する
~~~js
  // add item to local storage
  addItemToStorage(newItem)

function addItemToStorage(item) {
  let itemsFromStorage

  if(localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  itemsFromStorage.push(item)
  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
~~~
LocalStorageからItemを取得する
~~~js
function getItemFromStorage() {
  let itemsFromStorage

  if(localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  return itemsFromStorage
}
~~~
getItemFromStorageを使ってaddItemToStorage(item) を書き直す
~~~js
function addItemToStorage(item) {
  let itemsFromStorage = getItemFromStorage()

  itemsFromStorage.push(item)
  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
~~~
## 最初にロードされた時にlocasStrageにあるitemsを全て表示するdisplayItems
~~~js
function displayItems(){
  let itemsFromStorage = getItemFromStorage()
  itemsFromStorage.forEach((item)=> addItemToDom(item))
  checkUI()
}

// 各liタグの数をチェックして０個の時はクリアボタンとフィルターボタンを削除する
function checkUI(){
  const items = document.querySelectorAll('li')
  console.log('items', items)
  console.log('items.length', items.length)
  if (items.length==0){
    clearBtn.style.display = 'none'
    filter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    filter.style.display = 'block'
  }
}

document.addEventListener('DOMContentLoaded', displayItems)
~~~
イベントリスナーを全てinit()関数にまとめる
~~~js
// Event Listeners
function init(){
  itemForm.addEventListener('submit', onAddItemSubmit)
  itemList.addEventListener('click', removeItem)
  clearBtn.addEventListener('click', clearItems)
  filter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)
  
  checkUI()
}

init()
~~~
### Remove items from localStorage
↓のremoveItem(item) 処理を修正してonClickItemで呼ぶようにする
~~~js
function removeItem(item) {
  console.log('classList', e.target.parentElement.classList)
  if (e.target.parentElement.classList.contains('remove-item')){
    if (confirm('Are you sure?')){
      console.log('click')
      e.target.parentElement.parentElement.remove()
      checkUI()
    }
  }
}
~~~
修正後はonClickItemからremoveItem(item) を呼んでいる
~~~js
function onClickItem(e){
  console.log('click')
  if (e.target.parentElement.classList.contains('remove-item')){
    console.log('contain')
    removeItem(e.target.parentElement.parentElement)
  }
}

function removeItem(item) {
  console.log(item)
  console.log('item.textContent: ', item.textContent)
  if (confirm('Are you sure?')){
    item.remove()

    // Remove item from storage
    removeItemFromStorage();

    checkUI()
  }


function init(){
  // itemList.addEventListener('click', removeItem)
  itemList.addEventListener('click', onClickItem)

  checkUI()
}

init()
~~~
~~~js
function removeItem(item) {
  console.log(item)
  console.log('item.textContent: ', item.textContent)
  if (confirm('Are you sure?')){
    item.remove()

    // Remove item from storage
    removeItemFromStorage();

    checkUI()
  }
}
~~~
### 各Itemの内容を編集できるようにする 104
~~~js
const formBtn = itemForm.querySelector('Button') // Add Item のボタン
let isEditMode = false

function onClickItem(e){
  console.log('click')
  if (e.target.parentElement.classList.contains('remove-item')){
    console.log('contain')
    removeItem(e.target.parentElement.parentElement)
  } else {
    console.log('not remove-item');
    setItemToEdit(e.target)
  }
}

function setItemToEdit(item) {
  console.log('setItemToEdit', item)
  isEditMode = true;
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))
  // item.style.color = '#ccc'
  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Itemの編集'
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent
}
~~~
### 編集の値の更新とボタンや入力欄の初期化
~~~js
let isEditMode = false

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = itemInput.value 
  // const newItem = e.target.value NG
  // Validate Input
  if ( newItem === "" ){
    alert('Please add an item')
    return;   // Exit Sub
  }
  // console.log('success')

  // Check for edit mode　　　★★★★★　Added
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode')
    removeItemFromStorage(itemToEdit.textContent)
    // itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove()
    isEditMode = false
  }

  // Create list item Dom element
  addItemToDom(newItem)
  // add item to local storage
  addItemToStorage(newItem)

  checkUI()
  itemInput.value = ""
}

// リセットする
function checkUI(){
  itemInput.value = ''  // ★★★★★　Added
  
  const items = document.querySelectorAll('li')
  console.log('items', items)
  console.log('items.length', items.length)
  if (items.length==0){
    clearBtn.style.display = 'none'
    filter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    filter.style.display = 'block'
  }

  // ★★★★★　Added
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Itemの追加'
  formBtn.style.backgroundColor = '#333';
}
~~~
### 重複したitemの入力をさせないようにする
~~~js

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = itemInput.value 
  // const newItem = e.target.value NG
  // Validate Input
  if ( newItem === "" ){
    alert('Please add an item')
    return;   // Exit Sub
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode')
    removeItemFromStorage(itemToEdit.textContent)
    // itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove()
    isEditMode = false
  } else {
    console.log('duplicated')
    if (checkIfItemExists(newItem)){
      alert('既に入力済みの値です')
      return
    }
  }

  // Create list item Dom element
  addItemToDom(newItem)
  // add item to local storage
  addItemToStorage(newItem)
  checkUI()
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  // if (itemsFromStorage.includes(item)){
  //   return true;
  // } else {
  //   return false;
  // }
  return itemsFromStorage.includes(item)
}


~~~
### Fetch Basics
~~~js
fetch('./movies.json')
  .then(response => {
    console.log(response);
  })
~~~
Response {type: 'basic', url: 'http://127.0.0.1:5500/23_10_async-and-async-await/01-fetch-basics/movies.json', redirected: false, status: 200, ok: true, …}
~~~js
// Fetching a JSON file
fetch('./movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data));
  
// Fetching a text file
fetch('./test.txt')
  .then((response) => response.text())
  .then((data) => console.log(data));

// Fetching from an API
fetch('https://api.github.com/users/bradtraversy')
  .then((response) => response.json())
  .then((data) => (document.querySelector('h1').textContent = data.login));

~~~
axios
~~~js
getMovieList(){
  axios.get('https://api.themoviedb.org/3/movie/550?api_key=xxxxxxxxxxxxxxxxxxxxx&language=ja')
  .then(response => {
    console.log(response.data)
  }).catch(err => {
    console.log('err:', err);
  });
}

~~~
### 127 Fetch Options - Method, Body, Headers
~~~js
function createPost({ title, body }) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,  // title: title
      body,   // body: title
    }),
    headers: {
      'Content-Type': 'application/json',
      token: 'abc123',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

createPost({ title: 'My Post', body: 'This is my Post' });
~~~
### Todos 
~~~js
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// const getTodos = () => {
//   fetch(apiUrl + '?_limit=10')
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((todo) => addTodoToDOM(todo));
//     });
// };

// 取得する
const getTodos = async () => {
  const res = await fetch(apiUrl + '?_limit=5')
  console.log('res:', res);
  const data = await res.json()
  console.log('data:', data);
  data.forEach((todo) => addTodoToDOM(todo));
};

// 追加する
const addTodoToDOM = (todo) => {
  const div = document.createElement('div');
  div.classList.add('todo');
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute('data-id', todo.id);

  if (todo.completed) {
    div.classList.add('done');
  }

  document.getElementById('todo-list').appendChild(div);
};

// addボタンを押したとき
const createTodo = async (e) => {
  e.preventDefault();
  // console.log(e.target.firstElementChild.value)
  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  const res = await fetch(apiUrl, {
    method: 'POST',s
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })

 const data = await res.json())
 addTodoToDOM(data);
};

const init = () => {
  document.addEventListener('DOMContentLoaded', getTodos);
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
};

init();
~~~
### todos toggle, update, delete
~~~js
const toggleCompleted = (e) => {
  console.log('toggle', e.target);
  if (e.target.classList.contains('todo')) {
    e.target.classList.toggle('done');
    console.log('id:', e.target.dataset.id);
    console.log('completed:', e.target.classList.contains('done'));
    updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
  }
};

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
      'Content-Type': 'application/json',
    },
  }) // 以下は不要だが、検証用
    .then((res) => res.json())
    .then((data) => console.log('update:', data))
};

const deleteTodo = (e) => {
  if (e.target.classList.contains('todo')) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
};


const init = () => {
  document
    .querySelector('#todo-list')
    .addEventListener('click', toggleCompleted);
  document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo);
};

init();
~~~
### Fetch Error handling
~~~js
// Success
fetch('http://httpstat.us/200')
  .then((response) => {
    return response;
  })
  .then(() => {
    console.log('success');
  });
~~~
The issue here is that the 'success' shows and the .catch() does NOT run for an error status like 404 or 500  
throw Errorを書かないとcatch(error)を通らないでsuccessが表示される
~~~js
// Check for specific Code
fetch('http://httpstat.us/404')
  .then((response) => {
    // console.log(response.status); // 404
    // console.log(response.ok); // false
    // console.log(response.statusText); // not Found
    // if(!response.ok) {
    //   throw new Error('Request Failed') // catchに送る
    // }
    if (response.status === 404){
      throw new Error('Not Found')
    } else if (response.status === 500) {
      throw new Error('ServerError')
    } else if (response.status !== 200) {
      throw new Error('Request Failed') 
    }
    return response;
  })
  .then(() => {
    console.log('success'); // 表示される
  })
  .catch((error) => {  // ここを通らない
    console.log('catch', error);
  });
~~~
~~~js
function fetchUser() {
  showSpinner();
  fetch('https://randomuser.me/api')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Request Failed');
      }

      return res.json();
    })
    .then((data) => {
      hideSpinner();
      displayUser(data.results[0]);
    })
    .catch((error) => {
      hideSpinner();
      document.querySelector('#user').innerHTML = `
      <p class="text-xl text-center text-red-500 mb-5">
      ${error}</p>`;
    });
}
~~~
### Async & Await
~~~js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'John', age: 20 });
  }, 1000);
});

promise.then((data) => console.log(data)); // { name: 'John', age: 20 }
~~~
~~~js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: 'John', age: 20 });
  }, 1000);
});

async function getPromise() {
  const response = await promise;
  console.log(response);
}

getPromise();
~~~
~~~js
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  console.log(data);
}
getUsers();
~~~
### Try Catch 
~~~js
function double(number) {
  if (isNaN(number)) {
    throw new Error(number + ' is not a number');
  }

  return number * 2;
}

try {
  const y = double('hello');
  console.log(y);
} catch (error) {
  console.log(error);
}
~~~
### async-await-error-handling
~~~js
const getUsers = async () => {
  try {
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const response = await fetch('http://httpstat.us/500');

    if (!response.ok) {
      throw new Error('Request Failed');
    }

    const data = await response.text();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
~~~
### Multiple Promises with Async & Await
~~~js
const getPosts = async () => {
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const response = await fetch('http://httpstat.us/500');
  if (!response.ok) {
    throw new Error('Request Failed');
  }

  const data = await response.text();
  console.log(data);
};
// getUsers();
getPosts().catch((error) => console.log(error));
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


