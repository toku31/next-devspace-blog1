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

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~


