---
title: 'Mern Expense Tracker -1-'
date: 'November 1, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使って経費追跡アプリ リをつくります。1回目はUIとバックエンドを実装していきます'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

# Front End Setup
## Reat App Setup
Goal Setter App:  https://mern-goalsetter01.herokuapp.com/  
email:   
password:   
参考サイト:

MongoDB, Express, React, Node.js

~~~
user@mbp mern-expense-tracker % npx create-react-app client
>npm run server
~~~

~~~bash
user@mbp client % npm i antd react-router-dom aos react-redux redux axios
~~~
Ant Design: https://ant.design/components/overview/  
~~~
import './App.css';
import {Button} from 'antd'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <h1>Expense tracker</h1>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
export default App;
~~~

Bootstrap: 
```
// public/index.html に追加
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```
Google Fonts: Montserrat 

```css
// index.css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

body {
  margin: 0;
  font-family: 'Montserrat',sans-serif !important;
}
```
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


~~~bash
npm i express dotenv mongoose colors
~~~
dotenvを使うと.envファイルに定義された値を環境変数として使える。システムの環境変数として値が設定されていればそちらを優先して使えるので、開発時はローカルで.envを配置し、本番ではホスティングサービスの機能で環境変数として設定することでリポジトリ内のファイルを変更せずに実行することができる

~~~bash
npm i -D nodemon
~~~


~~~javascript
// package.json
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"
  },
~~~

>>npm run server
~~~bash
git init
git add .
git commit -m "Initial commit" 
~~~

~~~javascript
// mern-goalsetter/backend/server.js
const express = require("express");
const dotenv = require("dotenv").config()
const port = 5000
// const mongoose = require("mongoose")

const app = express();

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

~~~
// .envファイル  
NODE_ENV = development  
PORT = 8000
~~~

#### ルータの作成1
~~~javascript
// routes\goalRoutes.js
const router = require("express").Router()

router.get('/', (req, res) => {
  res.status(200).json({message: 'Get goals'})
})

router.post('/', (req, res) => {
  res.status(200).json({message: 'Set goals'})
})

router.put('/:id', (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
})

module.exports = router
~~~

~~~javascript
// mern-goalsetter/backend/server.js
const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

const app = express();

// middleware
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

#### コントローラの作成1
~~~javascript
// goalController.js
// @desc   Get goals
// @route  GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({message: 'Get goals'})
}

// @desc   Set goal
// @route  POST /api/goals
// @access Private
const setGoal = (req, res) => {
  res.status(200).json({message: 'Set goals'})
}

// @desc   Update goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
}

// @desc   Delete goal
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
}

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
~~~
#### ルータの作成2  
~~~javascript
// routes\goalRoutes.js
const router = require("express").Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")

router.get('/', getGoals)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router
~~~

#### ルータの作成3 (2をより簡潔にする)  
~~~javascript
// routes\goalRoutes.js
const router = require("express").Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router
~~~

~~~javascript
// goalController.js
const setGoal = (req, res) => {
  console.log(req.body)  //undefinedになるのでmiddlewareが必要
  if (!req.body.text) {
    res.status(400).json({message: 'Please add a text field'})
  }
  res.status(200).json({message: 'Set goals'})
}
~~~

middlewareの作成
~~~javascript
// server.js
const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

const app = express();
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~
app.use(express.json()) とは？  
`Body-Parser`を基にExpressに組み込まれた機能でクライアントから送信されたデータを`req.body`経由で取得、操作できる

express.json()を使ってクライアントからデータを受け取る際に urlencoded({ extended: true})とするとx-www-form-urlencoded形式で、  
(urlencoded({ extended: false})とするとJSON形式でデータを受け取ることができる

Expressエラーハンドラーの追加
~~~javascript
// goalController.js
const setGoal = (req, res) => {
  console.log(req.body) 
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')//エラーハンドラーが必要
  }
  res.status(200).json({message: 'Set goals'})
}
~~~

エラーハンドラーのミドルウェア作成
~~~javascript
// errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode :500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = {
  errorHandler,
}
~~~

~~~javascript
// server.js
const express = require("express");
const dotenv = require("dotenv").config()
const {errorHandler} = require('./middleware/errorMiddleware')  // 追加
const port = process.env.PORT || 5000
// const mongoose = require("mongoose")

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler) // 追加

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

#### コントローラの修正  
コントローラはasyncで返す
~~~javascript
// goalController.js
const getGoals = async(req, res) => {
  res.status(200).json({message: 'Get goals'})
}

const setGoal = async(req, res) => {
  res.status(200).json({message: 'Set goals'})
}

const updateGoal = async(req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
}

const deleteGoal = async(req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
}
~~~

express async handlerのインストール
~~~javascript
npm i express-async-handler
~~~

asyncHandlerの実装
~~~javascript
// mern-tutorial/backend/controllers/goalController.js 
const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Get goals'})
})

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  res.status(200).json({ message: 'Set goal'})
})

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
})

const deleteGoal = asyncHandler(async(req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
})
~~~

### データベースの作成
##### MongoDB compass（デスクトップGUI）
https://www.mongodb.com/ja-jp/products/compass

.envファイル
~~~
NODE_ENV = development
PORT =5000
MONGO_URI = monogodb+srv://<user>:<password>~~~~=majority
~~~
#### モデルの作成
~~~javascript
// mern-tutorial/backend/config/db.js 
const mongoose = require('mongoose')

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDB
~~~

スキーマを作成
~~~javascript
// mern-tutorial/backend/models/goalModel.js 
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      reqired: [true, 'Please add a text value']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Goal', goalSchema);
~~~
('Goal', goalSchema)の'Goal' はモデル名
#### CRUD Function for API
~~~js
// mern-tutorial/backend/controllers/goalController.js 
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel') // 追加
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,  // 存在しないときはcreate
  })
  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
~~~