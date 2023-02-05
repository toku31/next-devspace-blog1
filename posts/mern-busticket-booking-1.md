---
title: 'Mern Bus Ticket Booking-1'
date: 'November 2, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使ってバスチケット予約アプリをつくります。Redux-Tool-Kitを使ってReduxを実装します'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

### Front End Setup
user@mbp mern-busticket-booking % nodemon server  
user@mbp client % npm start
## Reat App Setup
Github:  https://github.com/sathyaprakash195/sheybus-udemy  

MongoDB, Express, React, Node.js

~~~
user@mbp mern-busticket-booking % npx create-react-app client 
>npm run server
~~~

```js
// App.js
function App() {
  return (
    <div className="App">
      <h1>Bus Ticket booking</h1>
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
user@mbp client % npm i react-router-dom axios redux react-redux @reduxjs/toolkit 
~~~
Bootstrap CDN: 
```
// public/index.html に追加
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```
Remix Icon CDN:  https://remixicon.com/  
```
// public/index.html に追加
<link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
```
フォントはGoogle FontsのMontserratを使う
```css
/* index.cssに上書き */
:root {
  --primary: #058359;
  --secondary: #AC4425;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
  font-family: 'Montserrat',sans-serif !important;
  font-size: 16px;
  /* background-color: aqua; */
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
#### Backend Setup
Package.jsonの作成 : user@mbp mern-busticket-booking % npm init -y  
user@mbp mern-busticket-booking % npm i nodemon mongoose express jsonwebtoken bcryptjs   nodemailer dotenv  
__dotenv__  https://www.npmjs.com/package/dotenv  
dotenvを使うと.envファイルに定義された値を環境変数として使える。システムの環境変数として値が設定されていればそちらを優先して使えるので、開発時はローカルで.envを配置し、本番ではホスティングサービスの機能で環境変数として設定することでリポジトリ内のファイルを変更せずに実行することができる
```js
// server.js
const express = require('express')
const app = express();
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`listening on port ${port}!`))
```
user@mbp mern-busticket-booking % nodemon server  
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
user@mbp mern-busticket-booking % nodemon server  
```js
// .env
NODE_ENV = development
PORT =5000
MONGO_URI = 'MONGO_URI = 'mongodb+srv://<username>:<password>@cluster0.7eiib.mongodb.net/busticket-booking?retryWrites=true&w=majority'
```
```js
// config/dbConfig.js
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)

const db= mongoose.connection

db.on('connected', ()=> console.log('Mongo DB Connection successful'))
db.on('error', err => console.log(err))
```
上のdbConfigをserver.jsに追加
```js
// server.js
const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig"); // added

app.listen(port, ()=> console.log(`Node server listening on port ${port}!`));
```
## User Login/Registration UI
#### Login-Register Part1
最初にsrc/pagesの配下にhome.js, Register.js, Login.jsを作成する。その後App.js を以下のように書く
```js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/register" element={<Register />}  />
          <Route path="/login" element={<Login />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
```
BootstrapのRegistration Formのサンプル
```js
  <form>
    <h3>Sign Up</h3>
    <div className="mb-3">
      <label>First name</label>
      <input
        type="text"
        className="form-control"
        placeholder="First name"
      />
    </div>
    <div className="mb-3">
      <label>Last name</label>
      <input type="text" className="form-control" placeholder="Last name" />
    </div>
    <div className="mb-3">
      <label>Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
      />
    </div>
    <div className="d-grid">
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </div>
    <p className="forgot-password text-right">
      Already registered <a href="/sign-in">sign in?</a>
    </p>
  </form>
```
アカウント登録ページ
```js
//src/pages/Register.js
import {Link} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=(e)=> {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className="w-400 card p-3">
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg'>BUS TICKET - 登録</h1>
          <hr />
          <div className="mb-3">
            <label>名前</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link to='/login'>ここをクリックしてログイン</Link>
            <button type="submit" className="secondary-btn">
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
```
ログインページ
```js
//src/pages/Login.js
import {Link} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=(e)=> {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className="w-400 card p-3">
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg'>BUS TICKET - ログイン</h1>
          <hr />
          <div className="mb-3">
            <label>メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link to='/register'>ここをクリックして登録</Link>
            <button type="submit" className="secondary-btn">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
```
cssの編集
```css
// src/resources/global.css
/* heights and widths */

.h-screen {
  height: 100vh;
}

.w-400 {
  width: 400px;
}

/* inputs */
input {
  height: 40px;
  border: 2px solid gray;
  width: 100%;
  padding-left: 20px;
}

/* card */
.card {
  border: 2px solid gray;
  box-shadow: 0 0 2px gray;
}

/* text size */
.text-2xl {
  font-size: 30px;
}

.text-xl {
  font-size: 25px;
}

.text-lg {
  font-size: 20px;
}

.text-md {
  font-size: 18px;
}

/* buttons */
.primary-btn {
  background-color: var(--primary);
  color: white;
  border: 0;
  /* border-radius: 5px; */
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
}

.secondary-btn {
  background-color: var(--secondary);
  color: white;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1);
}

/* anchor */
a {
  text-decoration: none;
  color: var(--primary);
}
```

index.css
```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

body {
  margin: 0;
  font-family: 'Montserrat',sans-serif !important;
}

/* スクロールバー非表示 */
body,html {
  overflow-x: hidden;
}
```
## Authentication Backend
#### User Model and Register API 
**ユーザモデルの作成**
```js
// models/userModel.js 
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
  },{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
```
('User', userSchema)の'User' はモデル名  
**ルーター(userRoute)の作成** 　Mern GoalSetter2を参照
```js
// /routes/userRoute.js
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

// register new user
router.post('/register', async(req, res) => {
  try {
    const existingUser = await User.findOne({email: req.body.email}) 
    if (existingUser){
      return res.send({
        message: 'User already exists',
        success: false,
        data: null,
      })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedPassword;
    const newUser = new User(req.body)
    await newUser.save()
    res.send({
      message: 'User created successfully',
      success: true,
      data: null,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    })
  }
})

module.exports = router
```
server.jsにuserRouteを追加
```js
// server.js
const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");
app.use(express.json())

const userRoute = require('./routes/userRoute') // added

app.use('/api/users/', userRoute)  // added
app.listen(port, ()=> console.log(`Node server listening on port ${port}!`));
// app.get('/', (req, res) => res.send('Hello World'))
```

#### User Registration API Integration
**Proxy**の追加  
https://www.youtube.com/watch?v=OML9f6LXUUs&t=230s
Clientのpackage.jsonの最後にproxyを追加
```
    ＝＝＝省略＝＝＝
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000" // added
}
```
react-toastifyをインストールしてApp.jsに実装する  
user@mbp client % npm install --save react-toastify 
```js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './resources/global.css'
import Register from './pages/ Register';
import Home from './pages/Home';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify' // added
import 'react-toastify/dist/ReactToastify.css'  // added

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/register" element={<Register />}  />
          <Route path="/login" element={<Login />}  />
        </Routes>
      </Router>
      <ToastContainer   // added
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
Register.js ページにaxios をインポートしてusersデータを入力する  
F12=>Networkで確認  
axiosで取り込んだデータのresponseはdataプロパティ(response.data)で確認する
```Js
// src/pages/Register.js
import {Link, useNavigate} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'
import axios from 'axios'  // added
import { toast } from 'react-toastify'
// import { useDispatch } from 'react-redux'
// import { HideLoading, ShowLoading } from '../redux/alertsSlice'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit= async (e) => {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log('values:', values)
    try { // added
      const response = await axios.post('/api/users/register', values)
      if(response.success){
        console.log("register user successfully:", response.data) ;
        toast.success(response.data.message, {theme: "colored"})
        // dispatch(HideLoading())// setLoading(false)
        navigate('/login')
      } else {
        console.log("User already exists:", response.data) ;
        toast.error(response.data.message, {theme: "colored"})
        // setLoading(false)
      }
    } catch (error) {
      // setLoading(false)
      toast.error('ユーザ登録に失敗しました', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
    }
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className="w-400 card p-3">
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg'>BUS TICKET - 登録</h1>
          <hr />
          <div className="mb-3">
            <label>名前</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name='name'
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link to='/login'>ここをクリックしてログイン</Link>
            <button type="submit" className="secondary-btn">
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
```
ユーザーモデルにisAdminプロパティを追加する  
MondoDBに登録したユーザを一旦削除して再度登録する
```Js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    isAdmin: {  // added
      type: Boolean,
      default: false
    },
  },{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
```

### Login API
バックエンドのuserRoute.jsでログイン用のルータを作成する
```Js
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")    // added
// register new user
router.post('/register', async(req, res) => {...}

// login user
router.post('/login', async(req, res) => {     // added
  const {email, password} = req.body
  try {
    const userExists = await User.findOne({email}) 
    if (!userExists){
      console.log('User does not exist')
      return res.send({
        message: 'ユーザが存在しません',
        success: false,
        data: null,
      })
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password)
    if (!passwordMatch){
      return res.send({
        message: 'パスワードが正しくないです',
        success: false,
        data: null,
      })
    }

    const token = jwt.sign(
      { userId: userExists._id}, 
      process.env.JWT_SECRET,
      { expiresIn: "1d"}
    )
    res.send({
      message: "ログインに成功しました",
      success: true,
      data: token,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    })
  }
});

module.exports = router
```
.envファイルにJWT_SECRETを追加
```Js
NODE_ENV = development
PORT =5000
MONGO_URI = 'mongodb+srv://・・・@cluster0.7eiib.mongodb.net/busticket-booking?retryWrites=true&w=majority'
JWT_SECRET = '・・・'
```
フロントエンドLogin.jsのhandleSubmit処理を編集する  
取得したtokenはlocalStrageに保存する  
取得したtokenをJWTページ(https://jwt.io/)で確認することができる
```Js
// src/pages/Login.js
import {Link, useNavigate} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate() // added
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async(e) => {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      const response = await axios.post('/api/users/login', values)
      if(response.data.success){
        console.log("Login user successfully:", response.data) ;
        // toast.success(response.data.message, {theme: "colored"})
        localStorage.setItem("token", response.data.data)
        navigate('/');
      } else {
        console.log("Login error:", response.data) ;
        toast.error(response.data.message, {theme: "colored"})
      }
    } catch (error) {
      toast.error('ログインに失敗しました', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
    }
    // setFormData({
    //   name: '',
    //   email: '',
    //   password: ''
    // })
  };

  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className="w-400 card p-3">
        <form onSubmit={handleSubmit}>
          <h1 className='text-lg'>BUS TICKET - ログイン</h1>
          <hr />
          <div className="mb-3">
            <label>メールアドレス</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name='email'
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name='password'
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link to='/register'>ここをクリックして登録</Link>
            <button type="submit" className="secondary-btn">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
```

### Authorization part-1
誰でもアクセスできるログイン画面や登録画面のルートはPublicRouteで指定する  
ログイン認証したユーザのみHomeページに遷移できるようにする。  
Homeページをリロードするたびにtokenの認証を行う。  
コンポーネントにProtectedRoute.jsとPublicRoute.jsを仮作成する  
```js
// src/components/ProtectedRoute.js
import React from 'react'

function ProtectedRoute() {
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute
```

```Js
// src/components/PublicRoute.js
import React from 'react'

function PublicRoute({children}) {
  return (
    <div>
     {children}
    </div>
  )
}

export default PublicRoute
```
App.jsにPublicRouteとProtectedRouteを実装する
```Js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './resources/global.css'
import Register from './pages/ Register';
import Home from './pages/Home';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './components/PublicRoute'; // added
import ProtectedRoute from './components/ProtectedRoute'; // added

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>　　// Changed
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}  /> // Changed
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}  />  // Changed
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
ProtectedRoute.jsを編集する  
認証した人のみホームページに行けるようにする　認証エラーの場合はログインページへ促す
```js
// src/components/ProtectedRoute.js
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {
  const [loading, setLoading] = useState(true)
  const validateToken=async()=> {
    try {
      const response = await axios.post('/api/users/get-user-by-id', {},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        setLoading(false)
      }else {
        setLoading(false)
        localStorage.removeItem('token') // あとで追加
        toast.error(response.data.error)　// あとで追加
        navigate('/login')
      }
    } catch (error) {
      setLoading(false)
      localStorage.removeItem('token') // あとで追加
      toast.error(response.data.error)　// あとで追加
      navigate('/login')
    }
  }
  const navigate = useNavigate()
  useEffect(()=> {
    if (localStorage.getItem('token')) {
      validateToken()
    } else {
      navigate('login')
    }
  })

  return (
    <div>
      {loading ? <div>...Loading</div> : <>{children}</> }
    </div>
  )
}

export default ProtectedRoute
```
バックエンドでエンドポイント/api/users/get-user-by-idのルートを作成する
```js
// routes/userRoute.js
const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const authMiddleware = require('../middlewares/authMiddleware')

// register new user
router.post('/register', async(req, res) => {...}

// login user
router.post('/login', async(req, res) => {...}

// get user by id
router.post('/get-user-by-id', authMiddleware, async(req, res) => {
  try {
    const user = await User.findById(req.body.userId)  // authMiddlewareを参照
      res.send({
        message: 'ユーザを取得しましました',
        success: true,
        data: user,
      })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    })
  }
});

module.exports = router
```
tokenからIDを取得して認証チェックをするためミドルウェアauthMiddleware.jsの作成  
mern-goal-setter-2のルートのプロテクトを参考
```js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')[1] // Bear△X3mkdilj~~~~
    if (!token) {return res.status(401).send({
      message: "認証に失敗しました",
      success: false,
    })}
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = decoded.userId;
    // Get user from the token　　　　パスワードを含めない ★　★　★　★　★　 ポイント１
    // req.user = await User.findById(decoded.id).select('-password') 
    next()
  } catch (error) {
    return res.status(400).send({
      message: "認証に失敗しました",
      success: false,
    })
  }
}
```
### Authorization Part-2
 PublicRoute.jsの編集
```js
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function PublicRoute({children}) {
  const navigate = useNavigate()

  useEffect(()=> {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [])

  return (
    <div>
     {children}
    </div>
  )
}

export default PublicRoute
```
### Reduxのセットアップ
alertsSliceを作成する
```js
// redux/alertsSlice.js
import {createSlice} from '@reduxjs/toolkit'

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading : false,
  },
  reducers: {
    ShowLoading : (state, action)=> {
      state.loading = true;
    },
    HideLoading : (state, action) => {
      state.loading = false;
    }
  }
});

export const { ShowLoading, HideLoading} = alertsSlice.actions;
export default alertsSlice.reducer;
```
storeを作成する
```js
// redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsSlice from './alertsSlice';

const rootReducer = combineReducers({
  alerts: alertsSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
```

idex.jsに作成したstoreとproviderを実装する
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';　// added
import { Provider } from 'react-redux' // added

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} > // added
      <App />
    </Provider>  // added
  </React.StrictMode>

);
reportWebVitals();
```
usersSliceを作成する
```js
// redux/usersSlice.js
import {createSlice} from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user : null,
  },
  reducers: {
    SetUser : (state, action)=> {
      state.user = action.payload;
    }
  }
});

export const { SetUser } = usersSlice.actions;
export default usersSlice.reducer;
```
storeにusers: usersSliceを追加する
```js
// redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsSlice from './alertsSlice';
import usersSlice from './usersSlice'; // added

const rootReducer = combineReducers({
  alerts: alertsSlice,
  users: usersSlice,  //added
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
```

ProtectedRoute.jsにSetUserアクションを実装する
```js
// src/components/ProtectedRoute.js
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'; // added
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { SetUser } from '../redux/usersSlice';  // added

function ProtectedRoute({children}) {
  const dispatch = useDispatch()   // added
  const [loading, setLoading] = useState(true)
  const validateToken= async()=> {
    try {
      const response = await axios.post('/api/users/get-user-by-id', {},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        setLoading(false)
        dispatch(SetUser(response.data.data))   // added
      }else {
        setLoading(false)
        localStorage.removeItem('token')
        toast.error(response.data.error)
        navigate('/login')
      }
    } catch (error) {
      setLoading(false)
      localStorage.removeItem('token')
      toast.error(error.message)
      navigate('/login')
    }
  }
  const navigate = useNavigate()
  useEffect(()=> {
    if (localStorage.getItem('token')) {
      validateToken()
    } else {
      navigate('login')
    }
  })

  return (
    <div>
      {loading ? <div>...Loading</div> : <>{children}</> }
    </div>
  )
}
export default ProtectedRoute
```
Homeページにログインしたユーザを表示する
```js
import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {user} = useSelector(state => state.users)
  console.log('user:', user)
  return (
    // <div>home</div>
    <div>
      {user && <h1>Welcome {user?.name}</h1>}
    </div>
  )
}

export default Home
```
### Spinner コンポーネント
Bootstrap Spinner:https://getbootstrap.jp/docs/5.0/components/spinners/
```js
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
```
上のBootstrapを参照してLoader.jsコンポーネントを作成する
```js
//src/components/Loader.js
import React from 'react'

function Loader() {
  return (
    <div className='spinner-parent'>
      <div class="spinner-border" role="status">
      </div>
    </div>
  )
}

export default Loader
```
仮にApp.jsの先頭にLoaderコンポーネントを実装する
```js
// App.js
function App() {
  return (
    <div>
      <Loader />  // added
      <Router>
      </Router>
      <ToastContainer
        position="top-center"
      />
    </div>
  );
}

export default App;
```
global.cssにSpinnerのCssを追加する
```js
// resources/global.css
/* Spinner / Loader */
.spinner-parent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.507);
  z-index: 1000
}
.spinner-border {
  color: white;
  height: 80px;
  width: 80px;
}
```
useSelectorを使ってloadingの値をFetchする
```js
import Loader from './components/Loader';
import { useSelector } from 'react-redux';

function App() {
  const {loading} = useSelector(state => state.alerts) // added

  return (
    <div>
      {loading && <Loader />} // Changed
       <Router>
      </Router>
      <ToastContainer
        position="top-center"
      />
    </div>
  );
}

export default App;

```
ProtectedRouteにuseSelectorでstoreのloadingの値をとってきた後にHideloading, Showloadingを適用する  
useSelector(state=>state.alerts)のalertsはredux/storeのrootReducer内にある{alerts: alertsSlice,...} を指している  
useEffect(()=> { }, [])の最後の [] を忘れないようにする
```js
// src/components/ProtectedRouter.js
import axios from 'axios'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'; 
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice'; // added

function ProtectedRoute({children}) {
  const dispatch = useDispatch()  
  // const [loading, setLoading] = useState(true)
  const {loading} = useSelector(state=>state.alerts) // added
  const validateToken= async()=> {
    try {
      dispatch(ShowLoading()) // added
      const response = await axios.post('/api/users/get-user-by-id', {},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        console.log('data success')
        dispatch(HideLoading())   // setLoading(false)
        dispatch(SetUser(response.data.data))  
      }else {
        dispatch(HideLoading())  // setLoading(false)
        localStorage.removeItem('token')
        toast.error(response.data.error)
        navigate('/login')
      }
    } catch (error) {
      dispatch(HideLoading())  // setLoading(false)
      localStorage.removeItem('token')
      toast.error(error.message)
      navigate('/login')
    }
  }
  const navigate = useNavigate()
  useEffect(()=> {
    if (localStorage.getItem('token')) {
      validateToken()
    } else {
      navigate('login')
    }
  }, [])

  return (
    <div>
      {loading ? <div>...Loading</div> : <>{children}</> }
    </div>
  )
}
export default ProtectedRoute
```
pages/Login.jsとRegister.sjもuseDispatchを使ってShowLoadingとHideLoadingを設定する
```js
// src/pages/Login.js
import {Link, useNavigate} from 'react-router-dom'
import '../resources/auth.css'
import {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../redux/alertsSlice' // added

function Login() {
  const dispatch = useDispatch() // added
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData
  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async(e) => {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      dispatch(ShowLoading()) // setLoading(false)
      const response = await axios.post('/api/users/login', values)
      if(response.data.success){
        console.log("Login user successfully:", response.data) ;
        // toast.success(response.data.message, {theme: "colored"})
        localStorage.setItem("token", response.data.data)
        navigate('/');
      } else {
        dispatch(HideLoading())  // setLoading(false)
        console.log("Login error:", response.data) ;
        toast.error(response.data.message, {theme: "colored"})
      }
    } catch (error) {
      dispatch(HideLoading()) // setLoading(false)
      toast.error('ログインに失敗しました', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
    }
  };

  return (
```
#### 画面のLayoutを作成する
user用とadmin用で別々の画面を作成する  
左側にサイドバーを設定する  
pagesフォルダの直下にadminフォルダを作成しその中にAdminUsers.js AdminHome.js, AdminUsers.js を作成する
```js
// pages/admin/AdminBuses.js
import React from 'react'

function  AdminBuses() {
  return (
    <div> AdminBuses</div>
  )
}

export default  AdminBuses
```
componentsフォルダの直下にDefaultLayout.jsを作成する
```js
// src/components/DefaultLayout.js
import React from 'react'

function DefaultLayout({children}) {
  return (
    <div>
      <h1>Header</h1>
      {children}
    </div>
  )
}

export default DefaultLayout
```
DefaultLayoutをProtectedRoute.jsに実装する
```js
// src/components/ProtectedRoute.js
import axios from 'axios'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'; 
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';  // added

function ProtectedRoute({children}) {
  const dispatch = useDispatch()  
  // const [loading, setLoading] = useState(true)
  const {loading} = useSelector(state=>state.alerts)
  const validateToken= async()=> {...}
 
  const navigate = useNavigate()
  useEffect(()=> {
  }, [])

  return (
    <div>
      { !loading &&  <DefaultLayout>{children}</DefaultLayout> }  // Changed
    </div>
    // <div>
    //   {loading ? <div>...Loading</div> : <>{children}</> } 
    // </div>
  )
}

export default ProtectedRoute
```
App.jsで"/admin", "/admin/users", "/admin/buses"のパスを追加する
```js
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './resources/global.css'
import Register from './pages/ Register';
import Home from './pages/Home';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/Admin/AdminHome'
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';

function App() {
  const {loading} = useSelector(state => state.alerts)

  return (
    <div>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>

          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>}></Route> // added
          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>}></Route> // added
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>}></Route> // added

          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}  />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}  />
        </Routes>
      </Router>
      <ToastContainer
      />
    </div>
  );
}
```
以下にアクセスして画面が正しく表示されていることを確認  
http://localhost:3001/admin  
http://localhost:3001/admin/buses  
http://localhost:3001/admin/users  
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
  padding: 19px;
  height: 100vh;
  gap:20px;
}

.body {
  width: 100%;;
}

.header{
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.479);
  width: 100%;
  padding: 20px;
}

.sidebar {
  width: 300px;
  background-color: var(--secondary);
  border-radius: 5px;
}

.content {
  padding: 10px;
}
```
defaultLayout.jsのサイドバーの項目を追記する  
最初はadminMenuから  
iconはRemix Iconを使う：https://remixicon.com/
```js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'

function DefaultLayout({children}) {
  const navigate = useNavigate
  const userMenu = []
  const adminMenu = [
    {
      name: 'Home',
      path: '/admin',
      icon: 'ri-home-line'
    },
    {
      name: 'Buses',
      path: '/admin/buses',
      icon: 'ri-bus-line'
    },
    {
      name: 'users',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: 'bookings',
      path: '/admin/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = adminMenu
  const activeRoute = window.location.pathname

  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div className="d-flex flex-column gap-2">
          {menuToBeRendered.map((item, index) => {
            return <div className='menu-item'>
              <i className={item.icon} ></i>
              <span onClick={()=>navigate(item.path)}>{item.name}</span>
              </div>
          })}
        </div>
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
cssの編集
```css
 /* resources/layout.css */
.sidebar {
  width: 300px;
  background-color: var(--secondary);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 5px 15px;
  width: 100%;
  cursor: pointer;
  transition: 0.2s;
  gap: 15px;
}
.active-menu-item {
  border: 2px solid white;
  border-radius: 5px;
}

.menu-item i {
  font-size: 20px;
  margin-right: 10px;
  color: white;
}

.menu-item span {
  font-size: 18px;
  color: white;
}

```
```js
// src/component/defaultLayout.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const userMenu = []
  const adminMenu = [
    {
      name: 'Home',
      path: '/admin',
      icon: 'ri-home-line'
    },
    {
      name: 'Buses',
      path: '/admin/buses',
      icon: 'ri-bus-line'
    },
    {
      name: 'users',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: 'bookings',
      path: '/admin/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = adminMenu
  const activeRoute = window.location.pathname
  console.log(activeRoute)

  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div className="d-flex flex-column gap-3">
          {menuToBeRendered.map((item, index) => {
            return (
              <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                <span onClick={()=>navigate(item.path)}>{item.name}</span>
              </div>
            )
          })}
        </div>
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
ログアウトの項目をクリックするとlocalStorageの'token'を削除してログイン画面に戻るようにする
```js
// components/defaultLayout.js
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false) // added
  const userMenu = []
  const adminMenu = [
    {
      name: 'Home',
      path: '/admin',
      icon: 'ri-home-line'
    },
    {
      name: 'Buses',
      path: '/admin/buses',
      icon: 'ri-bus-line'
    },
    {
      name: 'users',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: 'bookings',
      path: '/admin/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = adminMenu
  const activeRoute = window.location.pathname
  console.log(activeRoute)
  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div className="d-flex flex-column gap-3">
          {menuToBeRendered.map((item, index) => {
            return (
              <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                {!collapsed && 
                <span onClick={() => {
                  if(item.path==="/logout"){
                    localStorage.removeItem('token')
                    navigate('/login')
                    } else {
                      navigate(item.path)
                    }
                  }}
                >{item.name}</span>}
              </div>
            )
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
ユーザ用のメニュー画面を作成する
```js
// components/defaultLayout.js
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'
import { useSelector } from 'react-redux';  // added

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false) 
  const {user} = useSelector(state => state.users) // added
  const userMenu = [  // added
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: 'Bookings',
      path: '/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-user-line'
    },
    {
      name: 'logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]

  const adminMenu = [
    {
      name: 'Home',
      path: '/admin',
      icon: 'ri-home-line'
    },
    {
      name: 'Buses',
      path: '/admin/buses',
      icon: 'ri-bus-line'
    },
    {
      name: 'users',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
    {
      name: 'bookings',
      path: '/admin/bookings',
      icon: 'ri-file-list-line'
    },
    {
      name: 'logout',
      path: '/logout',
      icon: 'ri-logout-box-line'
    }
  ]
  const menuToBeRendered = user?.isAdmin? adminMenu : userMenu // Changed
  const activeRoute = window.location.pathname
  console.log(activeRoute)
  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div className="d-flex flex-column gap-3">
          {menuToBeRendered.map((item, index) => {
            return (
              <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                {!collapsed && 
                <span onClick={() => {
                  if(item.path==="/logout"){
                    localStorage.removeItem('token')
                    navigate('/login')
                    } else {
                      navigate(item.path)
                    }
                  }}
                >{item.name}</span>}
              </div>
            )
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
サイドバーの先頭にユーザ名とロール名を追加する
```js
// components/defaultLayout.js
・・・・
  return (
    <div className='layout-parent'>
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className='logo'>User</h1> // added
          <h1 className='role'>{user?.isAdmin ? 'Admin' : 'User' }</h1> // added
        </div>
        <div className="d-flex flex-column gap-3 menu">　 // changed
        </div>
      </div>
```
```css
# resources/layout.css
.sidebar {
  /* width: 300px; */
  background-color: var(--secondary);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 5px 20px;
}
.logo {
  color: white;
  font-size: 20px;
}
.role {
  color: white;
  font-size: 18px;
}
.menu {
  margin-top: 150px;
}
```
#### Busの設定画面
ページタイトルのコンポーネントを作成する
```js
// src/components/pageTitle.js
import React from 'react'

function PageTitle({title}) {
  return (
    <div>
     <h1 className='text-xl'>{title}</h1>
    </div>
  )
}
export default PageTitle
```
バス管理画面のページを編集する
```js
// src/pages/Admin/AdminBus.js
import { useState } from 'react'
import BusForm from '../../components/ BusForm'
import PageTitle from '../../components/PageTitle'

function  AdminBuses() {
  const [showBusForm, setShowBusForm] = useState(false)
  const [actionType, setActionType] = useState('')
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <PageTitle title='高速バス' />
        <button className="primary-btn" onClick={()=>setShowBusForm(true)}>
          バスを追加
        </button>
      </div>
      {showBusForm && <BusForm  showBusForm={showBusForm} setShowBusForm ={setShowBusForm} actionType='add' />}
    </div>
  )
}

export default  AdminBuses
```
バスの入力フォームを作成する  
React-Bootstrap: https://react-bootstrap.github.io/getting-started/introduction/  
https://www.e-pokke.com/blog/bootstrap4-modal-width.html
```js
npm install react-bootstrap bootstrap
```
モーダル画面のサイズの設定をglobal.cssで行う
``` css
/* src/resources/global.css */
.modal-dialog-fluid {
  max-width: inherit;
  width: 800px;
  margin: auto;
  margin-top: 10px;
  /* margin-left: 300px; */
}
```

```js
// src/components/BusForm.js
import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../resources/global.css'
import { useDispatch} from 'react-redux'; 
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { toast } from 'react-toastify';

function  BusForm({showBusForm, setShowBusForm, actionType}) {

  actionType='add'
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    capacity: "",
    from: "",
    to: "",
    journeyDate: "",
    departure: "",
    arrival: "",
    type: "",
    fare: ""
  })

  const {name, number, capacity, from, to, journeyDate, departure, arrival, type ,fare} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    // setLoading(true)
    const values ={
      name: name,
      number: number,
      capacity: capacity,
      from: from,
      to: from,
      journeyDate: journeyDate,
      departure: departure,
      arrival: arrival,
      type: type,
      fare: fare
    }
    console.log('value:', values)

    try {
      dispatch(ShowLoading())
      let response = null
        if(actionType==='add'){
          console.log('add')
          response = await axiosInstance.post('/api/buses/add-bus', values)
          console.log('res:',response.data)
        }else{
          console.log('else')
        }
        if (response.data.success){
          console.log('success')
          toast.success(response.data.message)
        } else {
          console.log('error1')
          toast.error(response.data.message)
        }
        dispatch(HideLoading())
    } catch (error) {
      console.log('error2')
      toast.error(error.message)
      dispatch(HideLoading())
    }

    setFormData({
      name: "",
      number: "",
      capacity: "",
      from: "",
      to: "",
      journeyDate: "",
      departure: "",
      arrival: "",
      type: "",
      fare: ""
    })
  }

  return (
<div className="modal-80w">
<Modal show={showBusForm} onHide={()=>setShowBusForm(false)} dialogClassName="modal-dialog-fluid ">
      <Modal.Header closeButton >
        <Modal.Title>バスの追加</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Form className='transaction-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>バス名</Form.Label>
              <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name"/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="number">
                <Form.Label>ナンバー</Form.Label>
                <Form.Control type="text" placeholder="" value={number} onChange={handleChange} name="number"/>
              </Form.Group>

              <Form.Group as={Col} controlId="capacity">
                <Form.Label>乗車人数</Form.Label>
                <Form.Control type="text" placeholder="" value={capacity} onChange={handleChange} name="capacity"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="from">
                <Form.Label>出発地</Form.Label>
                <Form.Control type="text" placeholder="" value={from} onChange={handleChange} name="from"/>
              </Form.Group>

              <Form.Group as={Col} controlId="to">
                <Form.Label>到着地</Form.Label>
                <Form.Control type="text" placeholder="" value={to} onChange={handleChange} name="to"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="journeyDate">
                <Form.Label>出発日</Form.Label>
                <Form.Control type="date" placeholder="" value={journeyDate} onChange={handleChange} name="journeyDate"/>
              </Form.Group>

              <Form.Group as={Col} controlId="departure">
                <Form.Label>出発時間</Form.Label>
                <Form.Control type="text" placeholder="" value={departure} onChange={handleChange} name="departure"/>
              </Form.Group>

              <Form.Group as={Col} controlId="arrival">
                <Form.Label>到着時間</Form.Label>
                <Form.Control type="text" placeholder="" value={arrival} onChange={handleChange} name="arrival"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="type">
                <Form.Label>タイプ</Form.Label>
                <Form.Control type="text" placeholder="" value={type} onChange={handleChange} name="type"/>
              </Form.Group>

              <Form.Group as={Col} controlId="fare">
                <Form.Label>料金</Form.Label>
                <Form.Control type="text" placeholder="" value={fare} onChange={handleChange} name="fare"/>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3 d-flex justify-content-end" controlId="save">
            <Button className="primary" type="submit">保存</Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default  BusForm
```
srcフォルダの直下にhelpersフォルダを作成してその中にaxiosInstance.jsファイルを作成する
```js
// src/helpers/axiosInstance.js
import axios from 'axios'

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",  // ここはproxyで設定する
  headers: {
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }
})
```
### BusのAPIを作成する(Backend)
busモデルを作成する
```js
// models/busModel.js
const mongoose = require('mongoose')

const busSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    number: {
      type: String,
      require: true
    },
    capacity: {
      type: Number,
      require: true
    },
    from: {
      type: String,
      require: true
    },
    to: {
      type: String,
      require: true
    },
    journeyDate: {
      type: String,  // DateはEdit　Bus２１でNG
      require: true
    },
    departure: {
      type: String,
      require: true
    },
    arrival: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    fare: {
      type: Number,
      require: true
    },
    seatsBooked: {
      type: Array,
      default: []
    },
    status: {
      type: String,
      default: '発車前'
    }
})

module.exports = mongoose.model('Bus', busSchema)
```
バスのルータ(busesRouter.js)を作成
```js
// routes/busesRoute.js
const router = require('express').Router()
const Bus = require('../models/busModel')

// add Bus
router.post('/add-bus', async(req, res) => {
  try {
    const existingBus = await Bus.findOne({number: req.body.number})
    if (existingBus){
      return res.status(200).send({success:false, message:'既に存在するバスです'})
    }
    const newBus = new Bus(req.body)
    await newBus.save()
    return res.status(200).send({
      success: true,
      message: 'Busを追加しました'
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

module.exports = router;
```
server.js にbusesRoute を追加する
```js
// server.js
const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");
app.use(express.json())

const usersRoute = require('./routes/usersRoute') 
const busesRoute = require('./routes/busesRoute') // added

app.use('/api/users/', usersRoute)  
app.use('/api/buses/', busesRoute)  // added

app.listen(port, ()=> console.log(`Node server listening on port ${port}!`));
```
### Get All Buses
作成したバスの全リストを取得する
```js
// routes/busesRoute.js
const router = require('express').Router()
const Bus = require('../models/busModel')

// add Bus
router.post('/add-bus', async function (req, res){
　　・・・
})

// get all buses　　Added
router.get('/get-all-buses', async function (req, res){
  console.log('get-all-buses')
  try {
    const allBuses = await Bus.find()
    return res.status(200).send({
      success: true,
      message: 'Busを全て取得しました',
      data: allBuses
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

module.exports = router;
```
ProtectedRoute.jsの const {loading} = useSelector(state=>state.alerts)から const {user} = useSelector(state=>state.users) へ変更する  
同時に{ !loading &&  <DefaultLayout>{children}</DefaultLayout> }から{ user &&  <DefaultLayout>{children}</DefaultLayout> }へ変更する
```js
function ProtectedRoute({children}) {
  const dispatch = useDispatch()  
  // const [loading, setLoading] = useState(true)
  // const {loading} = useSelector(state=>state.alerts) コメントアウト
  const {user} = useSelector(state=>state.users) // added
  　　・・・・
  return (
    <div>
      { user &&  <DefaultLayout>{children}</DefaultLayout> } // Changed
    </div>
  )

```
AdminBus画面のフロントエンドでAPIコールの編集  
```js
// pages/Admin/AdminBuses.js
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BusForm from '../../components/ BusForm'
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../../redux/alertsSlice';

function  AdminBuses() {
  const dispatch = useDispatch()
  const [showBusForm, setShowBusForm] = useState(false)
  const [actionType, setActionType] = useState('')
  const [buses, setBuses] = useState([])

  const getBuses = async()=> {
    try {
      dispatch(ShowLoading()) 
      const response = await axiosInstance.post('/api/buses/get-all-buses', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus data success:', response.data.data)
        setBuses(response.data.data) 
      }else {
        console.log('bus data else:')
        toast.error(response.data.error)
      }
    } catch (error) {
      console.log('bus data error:')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBuses()
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <PageTitle title='高速バス' />
        <button className="primary-btn" onClick={()=>setShowBusForm(true)}>
          バスを追加
        </button>
      </div>

      <div className="bus-table">
        <BusTable  buses={buses} />
      </div>
      {showBusForm && <BusForm  showBusForm={showBusForm} setShowBusForm ={setShowBusForm} actionType='add' />}
    </div>
  )
}
export default  AdminBuses
```
BusTableコンポーネントを作成する  
日付を表示するためmomentをインストール  
user@mbp client % npm i moment
```js
// src/components/BusTable.js
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import moment from 'moment';

function BusTable({buses}) {
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>バス名</th>
                  <th>ナンバー</th>
                  <th>出発地</th>
                  <th>到着地</th>
                  <th>出発日</th>
                  <th>状況</th>
                  <th>編集/削除</th>
              </tr>
          </thead>
          <tbody>
              {buses.map((bus) => 
                  <tr key={bus._id}>
                      <td>{bus.name}</td>
                      <td>{bus.number}</td>
                      <td>{bus.from}</td>
                      <td>{bus.to}</td>
                      <td>
                        {moment(bus.journeyDate).format('YYYY-MM-DD')}
                      </td>
                      <td>{bus.satus}</td>
                      <td>
                          // <Button variant="outline-secondary">編集</Button>
                          // <Button variant="outline-danger">削除</Button>
                          <div className="d-flex gap-3">
                            <i className='ri-delete-bin-line'></i>
                            <i className='ri-pencil-line'></i>
                          </div>
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}
export default BusTable
```
### Edit Bus バスの編集画面
```js
// pages/Admin/AdminBuses.js
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BusForm from '../../components/ BusForm'
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../../redux/alertsSlice';
import BusTable from '../../components/BusTable';

function  AdminBuses() {
  const dispatch = useDispatch()
  const [showBusForm, setShowBusForm] = useState(false)
  const [buses, setBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState(null)

  const getBuses = async()=> {
    console.log('bus data success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-all-buses', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus data success:', response.data.data)
        setBuses(response.data.data) 
      }else {
        console.log('bus data else:')
        toast.error(response.data.error)
      }
    } catch (error) {
      console.log('bus data error:')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBuses()
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <PageTitle title='高速バス' />
        <button className="primary-btn" onClick={()=>setShowBusForm(true)}>
          バスを追加
        </button>
      </div>

      <div className="bus-table">
        <BusTable  
          buses={buses} 
          setSelectedBus={setSelectedBus} 
          setShowBusForm={setShowBusForm}
        />
      </div>
      {showBusForm && (
      <BusForm  
        showBusForm={showBusForm} 
        setShowBusForm ={setShowBusForm} 
        actionType={selectedBus ? 'edit' : 'add'} 
        selectedBus={selectedBus}
        getData = {getBuses}
        setSelectedBus = {setSelectedBus}
      />
      )}
    </div>
  )
}

export default  AdminBuses
```
```js
// components/BusForm.js
import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../resources/global.css'
import { useDispatch} from 'react-redux'; 
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { toast } from 'react-toastify';

function  BusForm(props) {

  // actionType='add'
  const {showBusForm, setShowBusForm, actionType, getData, selectedBus, setSelectedBus} = props
  console.log('actionType:', actionType)
  console.log('selectedBus:', selectedBus)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: actionType==='add' ? "" : selectedBus.name,
    number: actionType==='add' ? "" : selectedBus.number,
    capacity: actionType==='add' ? "" : selectedBus.capacity,
    from: actionType==='add' ? "" : selectedBus.from,
    to: actionType==='add' ? "" : selectedBus.to,
    journeyDate: actionType==='add' ? "" : selectedBus.journeyDate,
    departure: actionType==='add' ? "" : selectedBus.departure,
    arrival: actionType==='add' ? "" : selectedBus.arrival,
    type: actionType==='add' ? "" : selectedBus.type,
    fare: actionType==='add' ? "" : selectedBus.fare,
  })

  const {name, number, capacity, from, to, journeyDate, departure, arrival, type ,fare} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    // setLoading(true)
    const values ={
      name: name,
      number: number,
      capacity: capacity,
      from: from,
      to: to,
      journeyDate: journeyDate,
      departure: departure,
      arrival: arrival,
      type: type,
      fare: fare
    }
    console.log('value:', values)

    try {
      dispatch(ShowLoading())
      let response = null
        if(actionType==='add'){
          console.log('add')
          response = await axiosInstance.post('/api/buses/add-bus', values)
          console.log('res:',response.data)
        }else{
          console.log('edit')
          response = await axiosInstance.post('/api/buses/update-bus', {
            ...values,
            _id: selectedBus._id,
          })
        }
        if (response.data.success){
          console.log('success')
          toast.success(response.data.message)
          getData()
          setShowBusForm(false)
          setSelectedBus(null)
        } else {
          console.log('error1')
          toast.error(response.data.message)
        }
        dispatch(HideLoading())
    } catch (error) {
      console.log('error2')
      toast.error(error.message)
      dispatch(HideLoading())
    }

    // setFormData({
    //   name: "",
    //   number: "",
    //   capacity: "",
    //   from: "",
    //   to: "",
    //   journeyDate: "",
    //   departure: "",
    //   arrival: "",
    //   type: "",
    //   fare: ""
    // })
  }

  const handleClickHide = () => {
    setShowBusForm(false)
    setSelectedBus(null)
  }

  return (
<div className="modal-80w">
<Modal 
  show={showBusForm} 
  // onHide={()=>setShowBusForm(false)} 
  onHide={()=>handleClickHide()} 
  dialogClassName="modal-dialog-fluid "
>
      <Modal.Header closeButton >
        <Modal.Title>{actionType==='add' ? 'バスの追加' : 'バスの編集'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Form className='transaction-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>バス名</Form.Label>
              <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name"/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="number">
                <Form.Label>ナンバー</Form.Label>
                <Form.Control type="text" placeholder="" value={number} onChange={handleChange} name="number"/>
              </Form.Group>

              <Form.Group as={Col} controlId="capacity">
                <Form.Label>乗車人数</Form.Label>
                <Form.Control type="text" placeholder="" value={capacity} onChange={handleChange} name="capacity"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="from">
                <Form.Label>出発地</Form.Label>
                <Form.Control type="text" placeholder="" value={from} onChange={handleChange} name="from"/>
              </Form.Group>

              <Form.Group as={Col} controlId="to">
                <Form.Label>到着地</Form.Label>
                <Form.Control type="text" placeholder="" value={to} onChange={handleChange} name="to"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="journeyDate">
                <Form.Label>出発日</Form.Label>
                <Form.Control type="date" placeholder="" value={journeyDate} onChange={handleChange} name="journeyDate"/>
              </Form.Group>

              <Form.Group as={Col} controlId="departure">
                <Form.Label>出発時間</Form.Label>
                <Form.Control type="text" placeholder="" value={departure} onChange={handleChange} name="departure"/>
              </Form.Group>

              <Form.Group as={Col} controlId="arrival">
                <Form.Label>到着時間</Form.Label>
                <Form.Control type="text" placeholder="" value={arrival} onChange={handleChange} name="arrival"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="type">
                <Form.Label>タイプ</Form.Label>
                <Form.Control type="text" placeholder="" value={type} onChange={handleChange} name="type"/>
              </Form.Group>

              <Form.Group as={Col} controlId="fare">
                <Form.Label>料金</Form.Label>
                <Form.Control type="text" placeholder="" value={fare} onChange={handleChange} name="fare"/>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3 d-flex justify-content-end" controlId="save">
            <Button className="primary" type="submit">保存</Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default  BusForm
```
BackendでUpdate busを追加する
```js
// route/busesRoute.js
const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const Bus = require('../models/busModel')

// add Bus
router.post('/add-bus', async function (req, res){
  console.log('add-bus')
  try {
    const existingBus = await Bus.findOne({number: req.body.number})
    if (existingBus){
      return res.status(200).send({success:false, message:'既に存在するバスです'})
    }
    const newBus = new Bus(req.body)
    await newBus.save()
    return res.status(200).send({
      success: true,
      message: 'Busを追加しました'
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

// Update bus 21　added
router.post('/update-bus', authMiddleware, async function (req, res){
  console.log('update-bus')
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body)
    return res.status(200).send({
      success: true,
      message: 'Busを更新しました'
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

// get all buses
router.post('/get-all-buses', async function (req, res){
  console.log('get-all-buses')
  try {
    const buses = await Bus.find()
    return res.status(200).send({
      success: true,
      message: 'Busを全て取得しました',
      data: buses
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

module.exports = router;
```
### Delete Bus バスの削除
BackendでDelete busを追加する
```js
// route/busesRoute.js
// delete bus
router.post('/delete-bus', authMiddleware, async function (req, res){
  console.log('delete-bus')
  try {
    const buses = await Bus.findOneAndDelete(req.body._id)
    return res.status(200).send({
      success: true,
      message: 'Busを削除しました',
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})
```
バス管理画面から削除をAPIコールする
```js
// pages/Admin/AdminBuses.js
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BusForm from '../../components/ BusForm'
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../../redux/alertsSlice';
import BusTable from '../../components/BusTable';

function  AdminBuses() {
  const dispatch = useDispatch()
  const [showBusForm, setShowBusForm] = useState(false)
  // const [actionType, setActionType] = useState('')
  const [buses, setBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState(null)

  const getBuses = async()=> {
    console.log('bus data success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-all-buses', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus data success:', response.data.data)
        setBuses(response.data.data) 
      }else {
        console.log('bus data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bus data error:')
      toast.error(error.message)
    }
  }

  const deleteBus = async(id) => { // added
    console.log('bus data success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/delete-bus', {_id: id})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus deleted')
        getBuses()
        toast.success(response.data.message)
      }else {
        console.log('bus delete else')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bus delete error')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBuses()
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <PageTitle title='高速バス' />
        <button className="primary-btn" onClick={()=>setShowBusForm(true)}>
          バスを追加
        </button>
      </div>

      <div className="bus-table">
        <BusTable  
          buses={buses} 
          setSelectedBus={setSelectedBus} 
          setShowBusForm={setShowBusForm}
          deleteBus = {deleteBus}  // added
        />
      </div>
      {showBusForm && (
      <BusForm  
        showBusForm={showBusForm} 
        setShowBusForm ={setShowBusForm} 
        actionType={selectedBus ? 'edit' : 'add'} 
        selectedBus={selectedBus}
        getData = {getBuses}
        setSelectedBus = {setSelectedBus}
      />
      )}
    </div>
  )
}

export default  AdminBuses
```
```js
// components/BusTable.js
import React from 'react'
import { Table } from 'react-bootstrap';
import moment from 'moment';

function BusTable({buses, setSelectedBus, setShowBusForm, deleteBus}) {
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>バス名</th>
                  <th>ナンバー</th>
                  <th>出発地</th>
                  <th>到着地</th>
                  <th>出発日</th>
                  <th>状況</th>
                  <th>編集/削除</th>
              </tr>
          </thead>
          <tbody>
              {buses.map((bus) => 
                  <tr key={bus._id}>
                      <td>{bus.name}</td>
                      <td>{bus.number}</td>
                      <td>{bus.from}</td>
                      <td>{bus.to}</td>
                      <td>
                        {moment(bus.journeyDate).format('YYYY-MM-DD')}
                      </td>
                      <td>{bus.status}</td>
                      <td>
                          {/* <Button variant="outline-secondary">編集</Button>
                          <Button variant="outline-danger">削除</Button> */}
`                          <div className="d-flex gap-3">
                            <i 
                              className='ri-pencil-line' 
                              onClick={()=> {
                                setSelectedBus(bus);
                                setShowBusForm(true);
                              }}></i>
                              <i 
                                className='ri-delete-bin-line'
                                onClick={()=> {  // added
                                  deleteBus(bus._id);
                                }}></i>
                          </div>`
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}
```
```js

```
```js

```
```js

```







