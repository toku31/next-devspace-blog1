---
title: 'Mern Goal Setter -2-'
date: 'September 4, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使って目標を覚書するアプリをつくりました。2回目は認証機能(JWT Authentication)を実装していきます。'
cover_image: '/images/posts/img7.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->


## JWT Authentication
Goal Setter App:  https://mern-goalsetter01.herokuapp.com/  
email: user@gmail.com
password: 12345  
参考サイト:https://www.youtube.com/watch?v=enopDSs3DRw    
https://github.com/bradtraversy/mern-tutorial  
https://dashboard.heroku.com/apps/mern-goalsetter01
https://mern-goalsetter01.herokuapp.com

~~~
// JWTサイト
jwt.io
~~~

#### userModel.jsの作成
~~~js
// mern-tutorial/backend/models/userModel.js 
const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('User', userSchema)　// モデル名
~~~

goalSchemaにモデルUserのIDを追加
~~~js
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {　// ポイント２
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',　// モデル名
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model('Goal', goalSchema)
~~~

ルーター(userRoutes)の作成
~~~js
// mern-tutorial/backend/routes/userRoutes.js
const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
~~~

コントローラ(userController.js)の作成
~~~js
// mern-tutorial/backend/controllers/userController.js
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  res.json({message: 'Register User'})
}
// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
  res.json({message: 'Login User'})
}
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (req, res) => {
  res.json({message: 'User data display'})
}
module.exports = {
  registerUser,
  loginUser,
  getMe
}
~~~

#### registerUser関数
認証の暗号化
npm install bcryptjs
JWT
npm i jsonwebtoken

~~~js
// 別の参考例
const router = require("express").Router()
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    })
    const user = await newUser.save();
    // console.log(user)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err);
  }
})
~~~

ユーザの登録　　userController.js
~~~js
// mern-tutorial/backend/controllers/userController.js 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asncHandler = require('express-async-handler')
const User = require('../models/userModels')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  // バリデーション
  if (!name || !email || !password ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  // Check if user exists
  const userExists = await User.findOne({email})
  if (userExists){
    res.status(400)
    throw new Error('User already exists')
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // Create user　　★　★　★　★　★　★　★　★　★
  const user = await User.create({　// idも自動的に生成される
    name,
    email,
    password: hashedPassword
  })
  if (user) {
    res.status(201).json({
      _id: user.id,　　// ★　★　★　★　★　JSON形式では　_idと定義する
      name: user.name,
      email:user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data!')
  }
})
~~~

~~~js
// userController.js の続き
// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  // res.json({message: 'Login User'})
  const {email, password} = req.body
  // Check for user email
  const user = await User.findOne({email})
  if (user && (await bcrypt.compare(password, user.password))){
    res.json ({
      _id: user.id,
      name: user.name,
      email:user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})
~~~
.env に以下を追加して再起動npm run server
~~~
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://~~~~~~~=majority
JWT_SECRET = XXXX // 追加
~~~

#### JWTの生成
~~~js
// userController.js の続き
const generateToken = (id) => {　// ★★★トークンの生成★★★
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
~~~

~~~js
// userController.js
  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email:user.email,
      token:generateToken(user._id)  // 追加　
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data!')
  }
~~~
token:generateToken(user._id)をloginUserにも追加  
https://jwt.io/ でペイロード確認

### ルートのプロテクト  
 getMe関数のようなログインしてるユーザのみ有効になるように
プロテクト機能を実装するためauthMiddleware.jsの作成
~~~js
// mern-tutorial/backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require=('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {　// ミドルウェアはnextが必要
  let token
  // ヘッダーをチェック　startsWithはJSメソッド
  if(req.headers.authorization && (req.headers.authorization.startsWith('Bear'))){
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1] // Bear△X3mkdilj~~~~
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from the token　　　　パスワードを含めない ★　★　★　★　★　★ ポイント１
      req.user = await User.findById(decoded.id).select('-password') 
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if(!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
 })
module.exports = { protect }
~~~
ミドルウェアの実装
~~~js
// mern-tutorial/backend/routes/userRoutes.js 
const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware') // 追加

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)　// 追加

module.exports = router
~~~

~~~js
//mern-tutorial/backend/controllers/userController.js 
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id) // ポイント１のreq.userを受け取る
  res.status(200).json({
    id: _id,
    name,
    email,
  })
})
~~~

### Goal RoutesもProtectする
~~~js
//mern-tutorial/backend/routes/goalRoutes.js 
const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware') // 追加

router.route('/').get(protect, getGoals).post(protect, setGoal)　　// protectの追加
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)　// protectの追加

module.exports = router
~~~

自分の作成したゴールだけ更新や削除できるようにしたい
~~~js
// mern-tutorial/backend/controllers/goalController.js 
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')　// 追加する

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }) // 追加　ポイント２参照

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
    user: req.user.id,  // 追加
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

  // const user = await User.findById(req.user.id)

  // Check for user
  if (!req.user) {  // tokenより取得したuser(ポイント１)
    res.status(401)
    throw new Error('User not found')
  }
  //ログインしたユーザがゴールを作成しているかをチェックする
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
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

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
   
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
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