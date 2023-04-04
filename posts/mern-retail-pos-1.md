---
title: 'Mern Retail Store Pos-1'
date: 'March 3, 2023'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使ってスーパーマーケット向けのPOS(point of sales)アプリを作成します。Reduxを実装して状態管理を行います。'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

https://www.udemy.com/course/mern-stack-retail-store-pos-application-reactreduxnode-d/  
user@mbp mern-busticket-booking % nodemon server  
user@mbp client % npm start
## Reat App Setup
Github:  https://github.com/sathyaprakash195/shey-pos-udemy   

MongoDB, Express, React, Node.js

~~~
user@mbp mern-retail-pos % npx create-react-app client 
user@mbp mern-retail-pos % cd client
user@mbp client % npm start
~~~

```js
// App.js
function App() {
  return (
    <div className="App">
      <h1>Retail Store Pos</h1>
    </div>
  );
}

export default App;
```
```js
// public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Bus Ticket Booking</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```
~~~bash
user@mbp client % npm i react-router-dom axios redux react-redux
~~~
Bootstrap CDN: 
```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```
```html
 <!-- public/index.html に追加 -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <title>Retail Store POS</title>
</head>

<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>
```
Remix Icon CDN:  https://remixicon.com/  
```
// public/index.html に追加
<link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
```
フォントはGoogle FontsのMontserratを使う
```css
/* index.cssに上書き */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
  font-family: 'Montserrat',sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
}
```
srcフォルダの直下にpages, components, resources, reduxフォルダを作成する
```js
// src/components/Layout.js
import '../resources/layout.css'

function Layout(props) {
  return (
    <div className='layout'>
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
        </div>
        <div>
          <h1 className='username'>Username</h1>
        </div>
      </div>

      <div className='content'>
          {props.children}
      </div>
      
    </div>
  )
}
```
```css
 /* src¥resources¥layout.css */
.layout {
  margin: 0 100px;
}

.header{
  background-color: #161C51;
  padding: 20px;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
}

.logo{
  font-size: 30px;
  color: rgba(255, 255, 255, 0.716);
  margin: 0 !important;
  cursor: pointer;
}

.username {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.742);
}

.content {
  height: 85vh;
  box-shadow: 0 0 3px gray;
  margin-top: 20px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 15px;
}

@media screen and (max-width: 700px){
  .layout {
    margin: 0 15px;
  }
}
```
#### Layoutを設計する(DefaultLayout)４
###  メニュー画面（サイドバー）
```js
// src/components/DefaultLayout.js
import React from 'react'
import '../resources/layout.css'

function DefaultLayout({children}) {
  return (
    <div className='layout-parent'>
      <div className="sidebar">
        sidebar
      </div>
      <div className="body">
        <div className="header">
          header
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
```
画面のCSSの編集
```js
// resources/layout.css
.layout-parent{
  display: flex;
  height: 100%;
  width: 100%;
  height: 100vh;
}

.body {
  width: 100%;;
}

.header{
  background-color: gray;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.479);
  width: 100%;
  padding: 20px;
}

.sidebar {
  background-color: gray;
  width: 300px;
  border-radius: 5px;
}

.content {
  background-color: pink;
  padding: 10px;
}
```
defaultLayout.jsのサイドバーの項目を追記する  
最初はadminMenuから  
iconはRemix Iconを使う：https://remixicon.com/
```js
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'
import '../resources/global.css'

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const userMenu = []
  const adminMenu = [
    {
      name: 'Home',
      path: '/home',
      icon: 'ri-home-line'
    },
    {
      name: 'Bills',
      path: '/bills',
      icon: 'ri-bill-line'
    },
    {
      name: 'items',
      path: '/items',
      icon: 'ri-list-check'
    },
    {
      name: 'Customers',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: 'Logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = adminMenu
  const activeRoute = window.location.pathname

  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div>
          <p className="logo">Store POS</p>
          {/* <h3 className='logo'>Store POS</h3> */}
        </div>
          <div className="item-container d-flex flex-column">
            {menuToBeRendered.map((item, index) => {
              return <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                {!collapsed && 
                <span onClick={()=>navigate(item.path)}>{item.name}</span>
                }
                </div>
            })}
          </div>
      </div>
      <div className="body">
      <div className="header" onClick={()=>setCollapsed(!collapsed)}>
          {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
export default DefaultLayout
```
cssの編集
```css
 /* resources/layout.css */
.layout-parent{
  display: flex;
  height: 100%;
  width: 100%;
  padding: 15px 10px;
  height: 100vh;
  /* gap:20px; */
}

.body {
  width: 100%;;
}

.header{
  background-color: #fff;
  box-shadow: 0 0 3px #ccc;
  /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.479); */
  width: 100%;
  padding: 10px;
  margin: 0 10px;
  border-radius: 5px;
}

.content {
  background-color: pink;
  padding: 15px;
  margin: 10px;
  height: 90vh;
}

.sidebar {
  /* width: 300px; */
  background-color: black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 0px 15px;
}

.menu-item {
  color: white;
  background-color: black;
  /* background-color: rgb(38, 197, 168); */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 10px 10px;
  /* width: 100%; */
  cursor: pointer;
  transition: 0.2s;
  /* gap: 15px; */
  margin: 10px 0px;
  /* text-align: center; */
}

.menu-item i {
  font-size: 20px;
  margin-right: 0px;
  color: white;
}

.menu-item span {
  margin-left: 10px;
  width: 130px;
}

.active-menu-item {
  /* border: 2px solid white; */
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #047979;
}

.item-container {
  /* width: 300px; */
  padding: 10px 0px;
  width: 100%;
}

.logo {
  margin-top: 20px;;
  color: #0887ad;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 70px;
}
```
テンプレートリテラル: CMAScriptのバージョン「ES2015」で実装された書き方  
文字列の中に式を埋め込める
```js
${式}
```
```js
let name = 'オレンジ';
let cost = 100;

let msg = `今日の${name}の値段は${Math.trunc(cost*1.1)}円です。`;
console.log(msg);
>> 今日のオレンジの値段は110円です。
```
### Layout Responsive
ヘッダーにハンバーガーメニュー(ri-menu-2-fill)をつける  
トグルで閉じるボタン(ri-close-line)もつける
```js
// components/defaultLayout.js
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  ・・・・
  <div className="body">
  <div className="header" onClick={()=>setCollapsed(!collapsed)}>
    {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
  </div>
  <div className="content">{children}</div>
```
global.cssに iタグのフォントを追加
```css
// resources/global.css
i{
  cursor: pointer;
  font-size: 25px;
}
```
サイドバーのCSSのwidthを修正
```css
// resources/layout.css
.sidebar {
  /* width: 300px; */
  background-color: var(--secondary);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
}
```
#### Backend: Node Server Setup 7
Package.jsonの作成 : user@mbp mern-retail-pos % npm init -y  
user@mbp mern-retail-pos  % npm i nodemon mongoose express 

user@mbp mern-busticket-booking %jsonwebtoken bcryptjs   nodemailer dotenv  
__dotenv__  https://www.npmjs.com/package/dotenv  
dotenvを使うと.envファイルに定義された値を環境変数として使える。システムの環境変数として値が設定されていればそちらを優先して使えるので、開発時はローカルで.envを配置し、本番ではホスティングサービスの機能で環境変数として設定することでリポジトリ内のファイルを変更せずに実行することができる
```js
// server.js
const express = require('express')
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello World from home api'))
app.listen(port, ()=> console.log(`Node JS Server Running at port ${port}!`))
```
user@mbp mern-retail-pos % nodemon server 
__Backendフォルダ__ の作成  
routers, models, config, utils, middlewears

### mongoDB の設定  
Browse Collections->Create Database  
Database Access->Add new databaseuser でユーザ名とパスワードを設定し、Built-in-Role : Read and write to anydatabase  
Overview->Connect->id + passwordのURLを取得  
```js
// server.js
const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))
```
user@mbp mern-retail-pos　% nodemon server  
```js
// .env
NODE_ENV = development
PORT =5000
MONGO_URI = 'MONGO_URI = 'mongodb+srv://<username>:<password>@cluster0.7eiib.mongodb.net/busticket-booking?retryWrites=true&w=majority'
```
ルート直下にdbConfig.jsを作成する  
下記のURLにuserame, password, databaseを記載する
```js
// dbConfig.js
const mongoose = require('mongoose')
const URL = 'mongodb+srv://<username>:<password>@cluster0.7eiib.mongodb.net/<database>?retryWrites=true&w=majority'
mongoose.connect(URL)
const db= mongoose.connection

db.on('connected', ()=> console.log('Mongo DB Connection successful'))
db.on('error', err => console.log(err))
```
上のdbConfigをserver.jsに追加
```js
// server.js
const express = require('express')
const dbConnect = require('./dbConnect')
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello World from home api'))
app.listen(port, ()=> console.log(`Node JS Server Running at port ${port}!`))
```
MongoDBに以下のjsonファイルをインポートする
```json
[

  {

    "name": "Grapes",

    "image": "https://cf.ltkcdn.net/wine/images/std/165373-800x532r1-grapes.jpg",

    "price": 7,

    "category": "fruits",

  },

  {

    "name": "Oranges",

    "image": "http://orfiagro.com/wp-content/uploads/2020/10/orange-1hoca2l.jpg",

    "price": 5,

    "category": "fruits",

  },

  {

    "name": "Mangoes",

    "image":

      "http://cdn.shopify.com/s/files/1/2785/6868/products/43406-crystallized-citrus_mango_1024x1024.jpg?v=1603740971",

    "price": 10,

    "category": "fruits",

  },



  {

    "name": "Beans",

    "image":

      "https://cdn-prod.medicalnewstoday.com/content/images/articles/285/285753/beans.jpg",

    "price": 8,

    "category": "vegetables",

  },

  {

    "name": "Tomato",

    "image":

      "https://media.istockphoto.com/photos/tomato-with-slice-isolated-with-clipping-path-picture-id941825878?k=20&m=941825878&s=612x612&w=0&h=Qx5wYoEKsig3BGfhHAb2ZUqRBrhi6k64ZbXp3_zhj4o=",

    "price": 4,

    "category": "vegetables",

  },

  {

    "name": "Brinjol",

    "image":

      "https://www.jiomart.com/images/product/original/590004102/brinjal-purple-striped-500-g-0-20201118.jpg",

    "price": 6,

    "category": "vegetables",

  },

]
```
### Front End Folder Structure
最初にsrc/pagesの配下にhomepage.js, Item.jsを作成する。  
App.cssを削除  
その後App.js を以下のように書く
```js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Items from './pages/Items';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage />}  />
          <Route path="/items" element={<Items />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```
### item Model & get items api 10
ルート直下にroutesとmodelsのフォルダを作成する
```js
// models/itemsModel.js
const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    category: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    },
  }, {timestamps: true})

module.exports = mongoose.model('items', itemsSchema)
```
```js
// routes/itemsRoute.js
const express = require('express')
const itemsModel = require('../models/itemsModel')
const router = express.Router()

router.get('/get-all-items', async(req, res)=> {
  try {
    const items = await itemsModel.find()
    res.send(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
```
ルータをserver.jsに追加する
```js
//  server.js
const express = require('express')
const dbConnect = require('./dbConnect')

const app = express();
app.use(express.json()) // added
const port = 5000;

const itemsRoute = require('./routes/itemsRoute') // added
app.use('/api/items/', itemsRoute) // added

app.get('/', (req, res) => res.send('Hello World from home api'))
app.listen(port, ()=> console.log(`Node JS Server Running at port ${port}!`))
```
http://localhost:5000/api/items/get-all-itemsにアクセスするとjson形式でitemsが表示される　　
### Get items UI
フロントエンドのpackage.jsonにproxyを設定する
```js
// client/src/package.json
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy" : "http://localhost:5000" // added
}
```
Home画面に商品(items)を表示するgetAllItemsを作成する  
画面はBootstrapで作成する
```js
// src/pages/Homepage.js
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import Item from '../components/Item'

function Homepage() {
  const [items, setItems] = useState([])
  const getAllItems = () => {
    axios.get('/api/items/get-all-items').then((response)=> {
      console.log(response.data);
      setItems(response.data)
    }).catch((error)=> {
    console.log(error)
    })
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      {/* <div>Homepage</div> */}
      <div className="row">
        {items.map((item)=> {
          return (
            <div className="col-md-3" key={item._id}>
              <Item  item={item} />
            </div>
          )
        })}
      </div>
    </DefaultLayout>
  )
}

export default Homepage
```
#### Itemコンポーネントの編集
```js
// component/item.js
import React from 'react'
import '../resources/items.css'

function Item({item}) {
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt='' height='100' width='100' />
      <h4 className='price'><b>価格：</b>¥{item.price}</h4>
      <div className="d-flex justify-content-end">
      <button type="submit" className="btn">カートに追加</button>
      </div>
    </div>
  )
}

export default Item
```

```js
// src/resources/item.css
.item {
  box-shadow: 0 0 3px black;
  padding: 15px;
  margin: 10px 0px 15px 10px;
  border-radius: 5px;
}

.item .name {
  color: tomato;
  font-size: 20px;
}

.item .price {
  text-align: center;
  color: rgba(0, 0, 0, 0.686);
  font-size: 20px;
}

.item button {
  margin-top: 10px;
  background-color: rgb(43, 197, 43);
  color: white
}
```
```js
// src/redux/rootReducer.js
const initialState = {
  loading: false,
  cartItems: []
}

export const rootReducer=(state=initialState, action) => {

  switch(action.type){
    default: return  state

  }
}
```

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { rootReducer } from './redux/rootReducer';

const finalReducer = combineReducers({
  rootReducer : rootReducer
})

const initialState = {
  rootReducer : {
    cartItems:  localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : []
  },
}

const store = createStore(finalReducer, initialState)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
ヘッダーの右側にカートを作成する
```js
// src/component/DefaultLayout.js
  <div className="header" onClick={()=>setCollapsed(!collapsed)}>
      {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
      <div className="cart account d-flex align-items-center"> // added
        <p className='mt-3 mr-2'>{cartItems.length}</p>
        <i class="ri-shopping-cart-2-line"></i>
      </div>
  </div>
```
### Add to Cart 機能
```js
// src/redux/rootReducer.js
const initialState = {
  loading: false,
  cartItems: []
}

export const rootReducer=(state=initialState, action) => {

  switch(action.type){
    case 'addToCart' : return {
      state,
      cartItems: [...state.cartItems, action.payload]
    }

    default: return  state
  }
}
```
Item.jsのボタンにaddToCartを実装する
```js
import '../resources/items.css'
import {useDispatch} from 'react-redux'

function Item({item}) {
  const dispatch = useDispatch()
  const addToCart = ()=> {
    console.log('click: ', item);
    dispatch({type:'addToCart', payload:item})
  }

  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt='' height='100' width='100' />
      <h4 className='price'><b>価格：</b>¥{item.price}</h4>
      <div className="d-flex justify-content-end">
      <button onClick={()=> addToCart()} className="btn">カートに追加</button>
      </div>
    </div>
  )
}
export default Item
```
### Cart Pageを作成する
Cart Pageのリンクを追加する
```js
// src/pages/CartPage.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage />}  />
          <Route path="/items" element={<Items />}  />
          <Route path="/cart" element={<CartPage />}  /> // added
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```
ヘッダーにあるカートをクリックするとCart Pageが開くようにする
```js
// src/components/defaultLayout.js
  <div className="body">
    <div className="header" onClick={()=>setCollapsed(!collapsed)}>
        {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
        <div className="cart-count d-flex align-items-center" onClick={()=>navigate('/cart')}>  // added
          <p className='mt-3 mr-2'>{cartItems.length}</p>
          <i className="ri-shopping-cart-2-line"></i>
        </div>
    </div>
    <div className="content">{children}</div>
  </div>
```
```css
/* resources/layout.css */
cart-count {
  cursor: pointer;
}
```
カートページ
```js
// src/pages/CartPage.js
import { useSelector } from 'react-redux'
import CartTable from '../components/CartTable'
import DefaultLayout from '../components/DefaultLayout'

function CartPage() {
  const cartItems = useSelector(state => state.rootReducer)
  console.log('cartItems:', cartItems);

  const handleDeleteClick = async (id)=> {
  }

  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <CartTable cartItems ={cartItems} handleDeleteClick={handleDeleteClick} />
    </DefaultLayout>
  )
}

export default CartPage
```
カートテーブル  
user@mbp client % npm i react-bootstrap
```js
// src/components/cartTable.js
import { Table} from 'react-bootstrap';

function CartTable({cartItems, handleDeleteClick}) {
  // console.log('table->items', items.cartItems);
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>商品</th>
                  <th>画像</th>
                  <th>価格</th>
                  <th>数量</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
           {cartItems.cartItems.map((item) => {
                  return (
                  <tr key={item._id}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">
                        <img src={item.image} alt="" hight='60' width='60' />
                      </td>
                      <td className="align-middle">{item.price}</td>
                      <td></td>
                      <td>
                          <i className="ri-delete-bin-line"
                             onClick={()=>{handleDeleteClick(item._id)}}                        
                          />
                      </td>
                  </tr>
                  )
                }
              )}
          </tbody>
        </Table>
    </div>
  )
}
export default CartTable
```
#### Cartの数量 (Quantity)
カートテーブルの数量列にプラスマイナスのボタンを追加する
```js
// components/cartTable.js
import React from 'react'
import { Table} from 'react-bootstrap';
import { ReactComponent as MinusIcon } from "../minus_circle_icon.svg";

function CartTable({cartItems, handleDeleteClick}) {
  return (
    <div>
        <Table hover bordered>
          <thead>
              <tr>
                  <th>商品</th>
                  <th>画像</th>
                  <th>価格</th>
                  <th>数量</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
           {cartItems.cartItems.map((item) => {
                  return (
                  <tr key={item._id}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">
                        <img src={item.image} alt="" hight='40' width='60' />
                      </td>
                      <td className="align-middle">{item.price}</td>
                      <td className="align-middle">
                        <div className='d-flex justify-content-center align-items-center'>
                          <i className="plus-icon ri-add-circle-line" />
                          <b>{item.quantity}</b>
                          <MinusIcon width={24} height={24} className="minus-icon" />
                        </div>
                      </td>
                      <td>
                          <i className="ri-delete-bin-line"
                             onClick={()=>{handleDeleteClick(item._id)}}                        
                          />
                      </td>
                  </tr>
                  )
                }
              )}
          </tbody>
        </Table>
    </div>
  )
}
export default CartTable
```
```css
/* resources/layout.css */
.cart-count {
  cursor: pointer;
}

.plus-icon {
  cursor: pointer;
  margin-right: 20px;
}

.minus-icon {
  cursor: pointer;
  margin-left: 20px;
}
```
itemコンポーネントの「カートに追加」ボタンクリック時のディスパッチ時にpayloadとしてpayload:{...item, quantity:1 }とquantity:1 を追加する
```js
// compoments/itemsjs
import '../resources/items.css'
import {useDispatch} from 'react-redux'

function Item({item}) {
  const dispatch = useDispatch()
  const addToCart = ()=> {
    console.log('click: ', item);
    dispatch({type:'addToCart', payload:{...item, quantity:1 }}) // added
  }

  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} alt='' height='100' width='100' />
      <h4 className='price'><b>価格：</b>¥{item.price}</h4>
      <div className="d-flex justify-content-end">
      <button onClick={()=> addToCart()} className="btn">カートに追加</button>
      </div>
    </div>
  )
}
export default Item
```
increaseQuantity(item)とdecreaseQuantity(item) を追加する
```js
// components/cartTable.js
import { Table} from 'react-bootstrap';
import { ReactComponent as MinusIcon } from "../minus_circle_icon.svg";
import {useDispatch}  from 'react-redux'

function CartTable({cartItems}) {
  // console.log('table->items', items.cartItems);
  const dispatch = useDispatch()

  const increaseQuantity = (item) => {
    dispatch({type:'updateCart', payload: {...item, quantity:item.quantity + 1}})
  }
  const decreaseQuantity = (item) => {
    if (item.quantity !== 1){
      dispatch({type:'updateCart', payload: {...item, quantity:item.quantity - 1}})
    }
  }
  const deleteFromCart = (id) => {

  }

  return (
    <div>
        <Table hover bordered>
          <thead>
              <tr>
                  <th>商品</th>
                  <th>画像</th>
                  <th>価格</th>
                  <th>数量</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
           {cartItems.cartItems.map((item) => {
                  return (
                  <tr key={item._id}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">
                        <img src={item.image} alt="" hight='40' width='60' />
                      </td>
                      <td className="align-middle">{item.price}</td>
                      <td className="align-middle">
                        <div className='d-flex justify-content-start align-items-center'>
                          <i className="plus-icon ri-add-circle-line" onClick={()=>increaseQuantity(item)}/>
                          <b>{item.quantity}</b>
                          <MinusIcon width={24} height={24} 
                            className="minus-icon" onClick={()=>decreaseQuantity(item) }/>
                        </div>
                      </td>
                      <td>  // 削除ボタンの作成
                          <i className="ri-delete-bin-line"
                             onClick={()=>{deleteFromCart(item._id)}}                         
                          />
                      </td>
                  </tr>
                  )
                }
              )}
          </tbody>
        </Table>
    </div>
  )
}
export default CartTable
```
```js
// redux/rootReducer.js
const initialState = {
  loading: false,
  cartItems: []
}

export const rootReducer=(state=initialState, action) => {

  switch(action.type){
    case 'addToCart' : return {
      state,
      cartItems: [...state.cartItems, action.payload]
    }
    case 'updateCart': return { //added
      state,
      cartItems: state.cartItems.map((item)=> 
        item._id === action.payload._id 
        ? {...item, quantity: action.payload.quantity } 
        : item
      )
    }
    case 'deleteFromCart': return {  //added
      state,
      cartItems: state.cartItems.filter((item)=>item._id!==action.payload)
    }
    default: return  state
  }
}
```
### Delete item from Cart
上のcartTable.jsとrootReducer.jsに追記
### Loading
```js
// redux/rootReducer.js
const initialState = {
  loading: false,
  cartItems: []
}

export const rootReducer=(state=initialState, action) => {

  switch(action.type){
    case 'addToCart' : return {
      ...state,
      cartItems: [...state.cartItems, action.payload]
    }
    case 'updateCart': return {
      ...state,
      cartItems: state.cartItems.map((item)=> 
        item._id === action.payload._id 
        ? {...item, quantity: action.payload.quantity } 
        : item
      )
    }
    case 'deleteFromCart': return {
      ...state,
      cartItems: state.cartItems.filter((item)=>item._id!==action.payload)
    }
    case 'showLoading': return {
      ...state,
      loading: true
    }
    case 'hideLoading': return {
      ...state,
      loading: false    
    }
    default: return  state

  }
}
```
```js
// pages/Homepage.js
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import Item from '../components/Item'
import { useDispatch } from 'react-redux'

function Homepage() {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=> {
      dispatch({type:'hideLoading'})
      console.log(response.data);
      setItems(response.data)
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      {/* <div>Homepage</div> */}
      <div className="row mx-1">
        {items.map((item)=> {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 px-1" key={item._id}>
              <Item  item={item} />
            </div>
          )
        })}
      </div>
    </DefaultLayout>
  )
}

export default Homepage
```
Spinner コンポーネント  
Bootstrap Spinner:https://getbootstrap.jp/docs/5.0/components/spinners/
```js
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
```
defaltLayout.jsに上のSpinnerを実装する
```js
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'
import '../resources/global.css'
import { useSelector } from 'react-redux'

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { cartItems, loading } = useSelector(state => state.rootReducer)

  const adminMenu = [
    {
      name: 'Home',
      path: '/home',
      icon: 'ri-home-line'
    },
    {
      name: 'Bills',
      path: '/bills',
      icon: 'ri-bill-line'
    },
    {
      name: 'items',
      path: '/items',
      icon: 'ri-list-check'
    },
    {
      name: 'Customers',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: 'Logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = adminMenu
  const activeRoute = window.location.pathname

  useEffect(()=> {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

  }, [cartItems])
  console.log('DefaultLayout cartItems:', cartItems)
  
  return (
    <div className='layout-parent'>
      {loading && (　// Spinner Added
        <div className='spinner'>
          <div class="spinner-border" role="status">
          </div>
        </div>
      )}
      <div className="sidebar">
        <div>
          <p className="logo">Store POS</p>
        </div>
          <div className="item-container d-flex flex-column">
            {menuToBeRendered.map((item, index) => {
              return <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                {!collapsed && 
                <span onClick={()=>navigate(item.path)}>{item.name}</span>
                }
                </div>
            })}
          </div>
      </div>
      <div className="body">
        <div className="header" onClick={()=>setCollapsed(!collapsed)}>
            {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
            <div className="cart-count d-flex align-items-center" onClick={()=>navigate('/cart')}>
              <p className='mt-3 mr-2'>{cartItems.length}</p>
              <i className="ri-shopping-cart-2-line"></i>
            </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
```
SpinnerのCSS編集
```js
// resources/Layout.css
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-border {
  height: 100px;
  width: 100px;
}
```
### items List
```js
// src/pages/Items.js
import { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import { useDispatch } from 'react-redux'
import ItemTable from '../components/ItemTable'

function Items() {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=> {
      dispatch({type:'hideLoading'})
      console.log('items.js', response.data);
      setItems(response.data)
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      <h3>商品リスト</h3>
     <ItemTable items ={items} />
    </DefaultLayout>
  )
}
export default Items
```
```js
// src/components/itemTable.js
import { Table} from 'react-bootstrap';
import {useDispatch}  from 'react-redux'

function ItemTable({items}) {
  // console.log('table->items', items.cartItems);
  const dispatch = useDispatch()

  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>商品</th>
                  <th>画像</th>
                  <th>価格</th>
                  <th>カテゴリー</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
           {items.map((item) => {
                  return (
                  <tr key={item._id}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">
                        <img src={item.image} alt="" hight='40' width='60' />
                      </td>
                      <td className="align-middle">{item.price}</td>
                      <td className="align-middle">{item.category}</td>
                      <td>
                          <i className="ri-delete-bin-line delete-icon" />
                          <i className="ri-edit-line"/>
                      </td>
                  </tr>
                  )
                }
              )}
          </tbody>
        </Table>
    </div>
  )
}
export default ItemTable
```
### Add item Model & item Form
```js
import { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import { useDispatch } from 'react-redux'
import ItemTable from '../components/ItemTable'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Items() {
 const [addEditModalOpen, setAddEditModalOpen] = useState(false)
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=> {
      dispatch({type:'hideLoading'})
      console.log('items.js', response.data);
      setItems(response.data)
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  })
  const {name, price, image, category} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      name: name,
      number: price,
      image: image,
      category: category,
    }
    console.log('value:', values)
    dispatch({type:'showLoading'})
    axios.post('/api/items/add-item', values).then((response)=> {
      dispatch({type:'hideLoading'})
      console.log('items.js add-item', response.data);
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>商品リスト</h3>
        <button className="primary" onClick={()=>setAddEditModalOpen(true)}>商品の追加</button>
      </div>
     <ItemTable items ={items} />

     <Modal show={addEditModalOpen} onHide={()=>setAddEditModalOpen(false)} dialogClassName="modal-dialog-fluid ">
      <Modal.Header closeButton >
        <Modal.Title>商品の追加</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Form className='transaction-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>商品名</Form.Label>
              <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="price">
              <Form.Label>価格</Form.Label>
              <Form.Control type="text" placeholder="" value={price} onChange={handleChange} name="price" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="image">
              <Form.Label>画像URL</Form.Label>
              <Form.Control type="text" placeholder="" value={image} onChange={handleChange} name="image" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="category">
              <Form.Label>カテゴリー</Form.Label>
              <Form.Select className="input-border" name="category" onChange={handleChange} > 
                <option value=""></option>
                <option value="fruits">フルーツ</option>
                <option value="vegetables">野菜</option>
                <option value="meat">肉</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-end" controlId="save">
            <Button className="primary" type="submit">保存</Button>
            </Form.Group> 
          </Form>
        </div>
      </Modal.Body>
    </Modal>

    </DefaultLayout>
  )
}

export default Items
```
```css
/* resources/items.css */
.item {
  box-shadow: 0 0 3px black;
  padding: 15px;
  margin: 10px 0px 15px 10px;
  border-radius: 5px;
}

.item .name {
  color: tomato;
  font-size: 20px;
}

.item .price {
  text-align: center;
  color: rgba(0, 0, 0, 0.686);
  font-size: 20px;
}

.item button {
  margin-top: 10px;
  background-color: rgb(43, 197, 43);
  color: white
}

.delete-icon {
  margin-right: 20px;
}

.input-border {
  border: 1px solid rgb(0, 39, 31);
  box-shadow: none;
  outline: none;
}

.input-border:focus{
  box-shadow: none;
  outline: none;
}
```
### Add Item API
user@mbp client % npm i react-toastify 
```js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage />}  />
          <Route path="/items" element={<Items />}  />
          <Route path="/cart" element={<CartPage />}  />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
```

```js
// routes/itemsRoute.js
const express = require('express')
const itemModel = require('../models/itemsModel')
const router = express.Router()

router.get('/get-all-items', async(req, res)=> {
  try {
    const items = await itemModel.find()
    res.send(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/add-item', async(req, res)=> {
  try {
    const newItem = new itemModel(req.body)
    await newItem.save()
    res.send('商品が追加されました')
  } catch (error) {
    res.status(400).json(error)
  }
})
module.exports = router
```
### Edit and Delete Items
### Edit Item(FrontEnd)
mern-busticket-booking-1の「Edit Bus バスの編集画面」を参照
```js
// src/components/ItemTable.js
import { Table} from 'react-bootstrap';
import {useDispatch}  from 'react-redux'

function ItemTable({items, handleClickEdit}) {
  // console.log('table->items', items.cartItems);
  const dispatch = useDispatch()

  const deleteFromCart = (id) => {
    dispatch({type:'deleteFromCart', payload:id})
  }

  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>商品</th>
                  <th>画像</th>
                  <th>価格</th>
                  <th>カテゴリー</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
           {items.map((item) => {
                  return (
                  <tr key={item._id}>
                      <td className="align-middle">{item.name}</td>
                      <td className="align-middle">
                        <img src={item.image} alt="" hight='40' width='60' />
                      </td>
                      <td className="align-middle">{item.price}</td>
                      <td className="align-middle">{item.category}</td>
                      <td>
                        <i className="ri-edit-line mx-2" onClick={()=>{ 
                          handleClickEdit(item)   // added
                        }}                        
                        /> 
                        <i className="ri-delete-bin-line delete-icon"
                            onClick={()=>{deleteFromCart(item._id)}}                        
                        />
                      </td>
                  </tr>
                  )
                }
              )}
          </tbody>
        </Table>
    </div>
  )
}
export default ItemTable
```
```js
// src/pages/Item.js
import { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import { useDispatch } from 'react-redux'
import ItemTable from '../components/ItemTable'
import { toast } from 'react-toastify';
import ItemForm from '../components/ItemForm'

function Items() {
  const [addEditModalOpen, setAddEditModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [items, setItems] = useState([])
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=> {
      dispatch({type:'hideLoading'})
      console.log('items.js', response.data);
      setItems(response.data)
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  const [formData, setFormData] = useState({
    name:  "",
    price: "",
    image: "",
    category: "",
  })
  const {name, price, image, category} = formData
  console.log('formData', formData)

  const handleClickEdit = (item) => {
    console.log('item', item)
    setEditItem({...editItem, item})
    // console.log('editItem', editItem) // ここでは表示されない
    setAddEditModalOpen(true)
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  console.log('editItem1', editItem)
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>商品リスト</h3>
        <button className="primary" onClick={()=>setAddEditModalOpen(true)}>商品の追加</button>
      </div>

      {/* 商品テーブル */}
     <ItemTable items ={items} 
      handleClickEdit = {handleClickEdit}
      />

    {addEditModalOpen && (
      <ItemForm 
      addEditModalOpen = {addEditModalOpen}
      setAddEditModalOpen = {setAddEditModalOpen}
      actionType={editItem ? 'edit' : 'add'} 
      editItem = {editItem}
      setEditItem = {setEditItem}
      getData = {getAllItems}
      />
    )}
    </DefaultLayout>
  )
}
export default Items
```

```js
// src/components/ItemForm.js
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useState} from 'react'
import axios from 'axios' 
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

function ItemForm(props) {
  const {addEditModalOpen, 
        setAddEditModalOpen, 
        actionType, 
        editItem,
        setEditItem,
        getData
      } = props

  const [formData, setFormData] = useState({
    name: actionType==='add' ? "" : editItem.item.name,
    price: actionType==='add' ? "" : editItem.item.price,
    image: actionType==='add' ? "" : editItem.item.image,
    category: actionType==='add' ? "" : editItem.item.category,
  })
  console.log('formData', formData)
  console.log('actionType', actionType)
  const {name, price, image, category} = formData
  const dispatch = useDispatch()

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      name: name,
      price: price,
      image: image,
      category: category,
    }
    console.log('value:', values)
    dispatch({type:'showLoading'})
    if (editItem==null) {
      axios.post('/api/items/add-item', values).then((response)=> {
        console.log('items.js add-item', response.data);
        dispatch({type:'hideLoading'})
        toast.success("商品を追加しました", {theme: "colored"})
        setAddEditModalOpen(false)
        getData()
      }).catch((error)=> {
        dispatch({type:'hideLoading'})
        toast.error('商品の追加に失敗しました')
        console.log(error)
      })
    } else {
      axios.post('/api/items/edit-item', {...values, itemId:editItem.item._id}).then((response)=> {
        console.log('items.js edit-item', response.data);
        dispatch({type:'hideLoading'})
        toast.success("商品を更新しました", {theme: "colored"})
        setAddEditModalOpen(false)
        getData()
      }).catch((error)=> {
        dispatch({type:'hideLoading'})
        toast.error('商品の更新に失敗しました')
        console.log(error)
      })
    }
  }

  return (
   <Modal show={addEditModalOpen} 
   onHide={()=>{ 
     setAddEditModalOpen(false)
     setEditItem(null)
   }}
   dialogClassName="modal-dialog-fluid "
>
<Modal.Header closeButton >
 <Modal.Title>{actionType==='add' ? '商品の追加' : '商品の編集'}</Modal.Title>
</Modal.Header>

<Modal.Body>
 <div>
   <Form className='transaction-form' onSubmit={handleSubmit}>
     <Form.Group className="mb-3" controlId="name">
       <Form.Label>商品名</Form.Label>
       <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name" className="input-border"/>
     </Form.Group>

     <Form.Group className="mb-3" as={Col} controlId="price">
       <Form.Label>価格</Form.Label>
       <Form.Control type="text" placeholder="" value={price} onChange={handleChange} name="price" className="input-border"/>
     </Form.Group>

     <Form.Group className="mb-3" as={Col} controlId="image">
       <Form.Label>画像URL</Form.Label>
       <Form.Control type="text" placeholder="" value={image} onChange={handleChange} name="image" className="input-border"/>
     </Form.Group>

     <Form.Group className="mb-3" as={Col} controlId="category">
       <Form.Label>カテゴリー</Form.Label>
       <Form.Select className="input-border" name="category" value={category} onChange={handleChange} > 
         <option value=""></option>
         <option value="fruits">フルーツ</option>
         <option value="vegetables">野菜</option>
         <option value="meat">肉</option>
       </Form.Select>
     </Form.Group>

     <Form.Group className="mb-3 d-flex justify-content-end" controlId="save">
     <Button className="primary" type="submit">保存</Button>
     </Form.Group> 
   </Form>
 </div>
</Modal.Body>
</Modal>
  )
}

export default ItemForm
```
### Edit Item(BackEnd)
edit-itemのルータを追加する
```js
// routes/itemRoute.js
const express = require('express')
const { findOneAndUpdate } = require('../models/itemsModel')
const itemModel = require('../models/itemsModel')
const router = express.Router()

router.get('/get-all-items', async(req, res)=> {
  try {
    const items = await itemModel.find()
    res.send(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/add-item', async(req, res)=> {
  try {
    const newItem = new itemModel(req.body)
    await newItem.save()
    res.send('商品が追加されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/edit-item', async(req, res)=> {
  try {
    await itemModel.findOneAndUpdate({_id: req.body.itemId}, req.body)
    res.send('商品が更新されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
```
### Delete Item
delete-itemのルータを追加する
```js
// routes/itemsRoute.js
const express = require('express')
const { findOneAndUpdate } = require('../models/itemsModel')
const itemModel = require('../models/itemsModel')
const router = express.Router()

router.get('/get-all-items', async(req, res)=> {
  try {
    const items = await itemModel.find()
    res.send(items)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/add-item', async(req, res)=> {
  try {
    const newItem = new itemModel(req.body)
    await newItem.save()
    res.send('商品が追加されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/edit-item', async(req, res)=> { 
  try {
    await itemModel.findOneAndUpdate({_id: req.body.itemId}, req.body)
    res.send('商品が更新されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/delete-item', async(req, res)=> { // added
  try {
    await itemModel.findOneAndDelete({_id: req.body.itemId})
    res.send('商品が削除されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```






