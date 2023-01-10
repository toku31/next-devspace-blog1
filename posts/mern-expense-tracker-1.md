---
title: 'Mern Expense Tracker'
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
Goal Setter App:  https://github.com/sathyaprakash195/sheymoney-udmey 
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
~~~js
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
# Backend Setup
user@mbp mern-expense-tracker % npm init -y  
user@mbp mern-expense-tracker % npm i nodemon mongoose express dotenv  
dotenvを使うと.envファイルに定義された値を環境変数として使える。システムの環境変数として値が設定されていればそちらを優先して使えるので、開発時はローカルで.envを配置し、本番ではホスティングサービスの機能で環境変数として設定することでリポジトリ内のファイルを変更せずに実行することができる
```js
// server.js
const express = require('express')

const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))
```
user@mbp mern-expense-tracker % nodemon server  
mongoDB の設定  
Browse Collections->Create Database  
Database Access->Add new databaseuser  
Overview->Connect->id + passwordのURLを取得  
Built-in-Role : Read and write to anydatabase  
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
```js
// .env
NODE_ENV = development
PORT =5000
MONGO_URI = 'mongodb+srv://<user>:<password>@cluster========='
```
```js
// dbConnect.js
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', ()=> console.log('Mongo DB Connection successful'))
```
## User Login/Registration UI
#### Login-Register Part1
BootstrapのRegistration Form
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
アニメーション  
LottieFiles:  https://lottiefiles.com/search?q=money&category=animations
web gradient: https://webgradients.com/  
022 Morphrus Den

```js
//src/pages/Registration.js
import {Link} from 'react-router-dom'
import '../resources/authentication.css'
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
    <div className='register'>
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / REGISTER</h1>
            <hr />
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div> */}
            <div className="mb-3">
              <label>Email address</label>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                REGISTER
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/login'>Already registered?, Click here login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
```
```js
//src/pages/Registration.js
import {Link} from 'react-router-dom'
import '../resources/authentication.css'
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
    <div className='register'>
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / LOGIN</h1>
            <hr />
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div> */}
            <div className="mb-3">
              <label>Email address</label>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                LOGIN
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/register'>Not Registered Yet?, Click here register</Link>
            </p>
          </form>
        </div>
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
```
cssの編集
```css
/* src/resources/authentication.css */
.register{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-image: linear-gradient(to left, #9890e3 0%, #b1f4cf 100%); */
  background-image: linear-gradient(to right, #88d3ce 0%, #6e45e2 100%);
}

.lottie{
  height: 400px;
}

.register input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: rgba(255, 255, 255, 0.536);
}

input:focus{
  outline: none !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.784); !important;
}

label, a{
  color: rgba(255, 255, 255, 0.536);
}

.register h1 {
  font-size: 25px;
  color: white;
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
## User Login-Registration API's
#### User Model and API's 
ユーザモデルを作成する
```js
// models/user.js 
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
)

module.exports = mongoose.model('User', userSchema)
// const usermodel = mongoose.model('Users', userSchema)
// module.exports = usermodel
~~~
('Users', userSchema)の'Goal' はモデル名
```
ルーター(userRoutes)の作成 　　Mern GoalSetter2を参照
```js
// /routes/userRoutes.js
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/login', async function(req, res){
  try {
    const result = await User.findOne({email: req.body.email, password: req.body.password});
    if (result){
      res.send(result)
    } else {
      res.status(500).json('Error')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/register', async(req, res) =>{
  try {
    const newUser = new Users(req.body);
    // const newUser = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password
    // })
    const user = await newUser.save();
    res.send('User Registered Successfully')
    // res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
```
server.jsにuserRouteを追加
```js
// server.js
const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())　// added
const userRoute = require('./routes/userRoute') // added

app.use('/api/users/', userRoute)  // added

// app.get('/', (req, res) => res.send('Hello World')) 削除
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))
```
#### Login Registration Testing
https://www.youtube.com/watch?v=OML9f6LXUUs&t=230s    
Clientのpackage.jsonの最後にproxyを追加
```js
// client/package.json
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
メッセージ出力するためにreact-toastifyをインストール
```
 npm install --save react-toastify
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
```
登録ページでボタンをクリックするとAPIをコールしてユーザ作成する  
axiosをインポート
```js
// pages/Register.js
import {Link, useNavigate} from 'react-router-dom'
import '../resources/authentication.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Register() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      const response = await axios.post('/api/users/register', values)
      console.log("register user successfully:", response.data) ;
      setLoading(false)
      toast.success("Registration successful", {theme: "colored"})
    } catch (error) {
      setLoading(false)
      toast.error('Registration failed', {theme: "colored"})
      throw new Error(`Something went wrong! ${error.message}`);
    }
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  // useEffect(() => {
  //   if(localStorage.getItem('expense-tracker-user')){
  //     navigate('/')
  //   }
  // }, [])

  // if (loading){
  //   return <Spinner />
  // }

  return (
    <div className='register'>
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / 登録</h1>
            <hr />
            <div className="mb-3">
              <label>Name</label>
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
              <label>Email address</label>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                登録
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/login'>既に登録済みですか?, ここをクリックしてログイン</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
```
ログインページも同様にAPIコールでログインしてlocalStorageにパスワード以外の情報を設定する
```js
// pages/Login.js
import {Link, useNavigate} from 'react-router-dom'
import '../resources/authentication.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Login() {
  const [loading, setLoading] = useState(false)
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

  const handleSubmit=async(e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    try {
      const response = await axios.post('/api/users/login', values)
      console.log(response.data) ;
      localStorage.setItem('expense-tracker-user', JSON.stringify({...response.data, password:''}))
      toast.success("login successful", {theme: "colored"})
      // console.log('login successful')
      setLoading(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      toast.error('Login failed', {theme: "colored"})
      // throw new Error(`Something went wrong! ${error.message}`);
    }
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  // useEffect(() => {
  //   if(localStorage.getItem('expense-tracker-user')){
  //     navigate('/')
  //   }
  // }, [])
  
  // if (loading){
  //   return <Spinner />
  // }

  return (
    <div className='register'>
      {/* {loading && <Spinner /> } */}
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / ログイン</h1>
            <hr />
            <div className="mb-3">
              <label>Email address</label>
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
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                ログイン
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/register'>アカウントをお持ちでありませんか?, ここをクリックして登録</Link>
            </p>
          </form>
        </div>
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
```
### Loaders, Messagesを作成する
```
const [loading, setLoading] = useState(false)
```
Spinner を作成
```js
// components/Spinner.js
import spinner from '../resources/spinner.gif'

function Spinner() {
  return (
    <div className="register">
    {/* <div className='w-100 mt-20'> */}
      <img width={180} className="text-center mx-auto" src={spinner} alt="Loading..." />
    </div>
  )
}

export default Spinner
```
### ProtectedRouteを作成する
```js
// App.js
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/test' element={<Test />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
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

export const ProtectedRoute=(props)=>{  // added
  if(localStorage.getItem('expense-tracker-user')){
    // console.log('expense-tracker-user')
    return props.children
  }else {
    return <Navigate to='/login' />
  }
}
export default App;
```
また、pagesフォルダのRegister.jsとLogin.jsにuseEffectをインポートして以下を追加することで、  
ログイン済みのユーザが登録またはログインページに行かずHomeページを開くようにする
```js
  useEffect(() => {
    if(localStorage.getItem('expense-tracker-user')){
      navigate('/')
    }
  }, [])
```

### Add Transaction UI
Homeページにフォーム入力用のモーダルを作成する
```js
// /src/pages/Home.jsx
import {useState} from 'react'
import Layout from '../components/Layout'
import '../resources/transaction.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    date: "",
    reference: "",
    description: "",
  })
  // const navigate = useNavigate()
  const {amount, type, category, date, reference, description} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      amount: amount,
      type: type,
      category: category,
      date: date,
      reference: reference,
      description: description,
    }
    console.log(values)

    setFormData({
      amount: "",
      type: "",
      category: "",
      date: "",
      reference: "",
      description: "",
    })
  }

  return (
    <Layout>
      <div className="filter d-flex justify-content-between align-item-center">
        <div>

        </div>
        <div>
          <button className='primary' onClick={()=>setShowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>

      </div>
      <div className="table-analytics">

      </div>

      <Modal show={showAddEditTransactionModal} onHide={()=>setShowAddEditTransactionModal(false)}>
      <Modal.Header closeButton >
        <Modal.Title>Add Transaction</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Form className='transaction-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" placeholder="" value={amount} onChange={handleChange} name="amount"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select id="type" name="type" onChange={handleChange}>
              <option value=''></option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select id="category" name="category" onChange={handleChange}>
              <option value=''></option>
              <option value='salary'>Salary</option>
              <option value='food'>Food</option>
              <option value='entertainment'>Entertainment</option>
              <option value='learning'>Learning</option>
              <option value='medical'>Medical</option>
              <option value='tax'>Tax</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="" value={date} name="date" onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control type="text" placeholder="" name="reference" value={reference} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" placeholder="" value={description} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-end" controlId="description">
            <Button className="primary" type="submit">SAVE</Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>

    </Layout>
  )
}

export default Home
```

```js
// resource/transaction.css
.filter {
  box-shadow: 0 0 3px gray;
  padding: 15px 20px;
  border-radius: 10px;
}

.transaction-form label{
  color: rgba(0, 0, 0, 0.77)!important;
}
```
### Add Transaction API
モデルの作成
```js
// models/Transaction.js
const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
)

module.exports = mongoose.model('Transaction', transactionSchema)
```
ルータの作成
```js
// routes/transactionsRoute.jsx
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

router.post('/add-transaction', async function(req, res){
  try {
    const newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save()
    res.status(200).json(transaction)
    // res.send('User Registered Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/get-all-transactions', async(req, res) =>{
  try {
    const transactions = await Transaction.find({});
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
```
エンドポイントの追加
```js
// server.js
const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())
const userRoute = require('./routes/userRoute')
const transactionRoute = require('./routes/transactionsRoute')

app.use('/api/users/', userRoute)
app.use('/api/transactions/', transactionRoute) // added

// app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))
```
Home.jsで作成したモーダルの部分を切り取って別のコンポーネントを作成する
```js
// src¥components/AddEditTransaction.js
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function AddEditTransaction(props) {
  const {showAddEditTransactionModal, setShowAddEditTransactionModal} = props

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    date: "",
    reference: "",
    description: "",
  })
  // const navigate = useNavigate()
  const {amount, type, category, date, reference, description} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      amount: amount,
      type: type,
      category: category,
      date: date,
      reference: reference,
      description: description,
    }
    console.log(values)

    try {
      const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
      setLoading(true)
      const response = await axios.post('/api/transactions/add-transaction', {...values, userid: user._id})
      console.log("transaction added successfully:", response.data) ;
      setShowAddEditTransactionModal(false)
      toast.success("transaction added successfully", {theme: "colored"})
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('transaction failed', {theme: "colored"})
      // throw new Error(`Something went wrong! ${error.message}`);
    }

    setFormData({
      amount: "",
      type: "",
      category: "",
      date: "",
      reference: "",
      description: "",
    })
  }

  if (loading){
    return <Spinner />
  }

  return (
    <Modal show={showAddEditTransactionModal} onHide={()=>setShowAddEditTransactionModal(false)}>
    <Modal.Header closeButton >
      <Modal.Title>Add Transaction</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>
        <Form className='transaction-form' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" placeholder="" value={amount} onChange={handleChange} name="amount"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select id="type" name="type" onChange={handleChange}>
            <option value=''></option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select id="category" name="category" onChange={handleChange}>
            <option value=''></option>
            <option value='salary'>Salary</option>
            <option value='food'>Food</option>
            <option value='entertainment'>Entertainment</option>
            <option value='learning'>Learning</option>
            <option value='medical'>Medical</option>
            <option value='tax'>Tax</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="" value={date} name="date" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reference">
            <Form.Label>Reference</Form.Label>
            <Form.Control type="text" placeholder="" name="reference" value={reference} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" placeholder="" value={description} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-end" controlId="description">
          <Button className="primary" type="submit">SAVE</Button>
          </Form.Group>
        </Form>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default AddEditTransaction
```
### Display Transactions in Table
```js
// /pages/Home.jsx
import {useState, useEffect} from 'react'
import AddEditTransaction from '../components/AddEditTransaction'
import Layout from '../components/Layout'
import '../resources/transaction.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import TransactionsTable from '../components/TransactionsTable'

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])

  const getTransactions = async ()=> {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
      console.log('user', user)
      console.log('user._id', user._id)
      // const response = await axios.get('/api/transactions/get-all-transactions')
      // const response = await axios.get('/api/transactions/get-all-transactions', {params: {userid: user._id}})
     const response = await axios.post(
      '/api/transactions/get-all-transactions',
      {userid: user._id},
     )
      console.log('get-all-transactions', response.data) ;
      setTransactionsData(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong!', {theme: "colored"})
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  if (loading){
    return <Spinner />
  }

  return (
    <Layout>
      <div className="filter d-flex justify-content-between align-item-center">
        <div>

        </div>
        <div>
          <button className='primary' onClick={()=>setShowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>

      </div>
      <div className="table-analytics">
        <TransactionsTable  transactionsData={transactionsData} />
      </div>

      {showAddEditTransactionModal && (
    <AddEditTransaction 
      showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal = {setShowAddEditTransactionModal}
      getTransactions = {getTransactions}
    /> )}

    </Layout>
  )
}

export default Home
```

```js
// src/components/TransactionTable.js
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import moment from 'moment';

function TransactionsTable({transactionsData}) {
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>日付</th>
                  <th>金額</th>
                  <th>カテゴリー</th>
                  <th>詳細</th>
                  <th>備考</th>
              </tr>
          </thead>
          <tbody>
              {transactionsData.map((transaction) => 
                  <tr key={transaction._id}>
                      <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
                      <td>{transaction.amount}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.reference}</td>
                      <td>{transaction.description}</td>
                      <td>
                          <Button variant="outline-secondary">編集</Button>
                          <Button variant="outline-danger">削除</Button>
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}

export default TransactionsTable
```

### Date Filters 
JavaScriptの日付操作用ライブラリmomentの利用  
npm install moment --save
```js
  <tr key={transaction._id}>
      <td>{moment(transaction.date).format('YYYY-MM-DD')}</td>
```

```js
// /pages/Home.jsx
import {useState, useEffect} from 'react'
import AddEditTransaction from '../components/AddEditTransaction'
import Layout from '../components/Layout'
import '../resources/transaction.css'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import TransactionsTable from '../components/TransactionsTable'
import Form from 'react-bootstrap/Form';

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [transactionsData, setTransactionsData] = useState([])
  const [frequency, setFrequency] = useState('7')


  const getTransactions = async ()=> {
    setLoading(true)
    try {
      const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
      console.log('user', user)
      console.log('user._id', user._id)
      // const response = await axios.get('/api/transactions/get-all-transactions')
      // const response = await axios.get('/api/transactions/get-all-transactions', {params: {userid: user._id}})
     const response = await axios.post(
      '/api/transactions/get-all-transactions',
      {userid: user._id, frequency},
     )
      console.log('get-all-transactions', response.data) ;
      setTransactionsData(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong!', {theme: "colored"})
    }
  }

  useEffect(() => {
    getTransactions()
  }, [frequency])

  if (loading){
    return <Spinner />
  }

  return (
    <Layout>
      <div className="filter d-flex justify-content-between align-item-center">
        <div>
          <div className="d-flex flex flex-column">
          <Form.Group className="mb-1" controlId="frequency">
            <Form.Label className='text-secondary fs-5'>Select Frequency</Form.Label>
            <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value='7'>Last 1 Week</option>
              <option value='30'>Last 1 Month</option>
              <option value='365'>Last 1 Year</option>
              <option value='custom'>Last 1 Year</option>
            </Form.Select>
          </Form.Group>
          </div>
        </div>
        <div>
          <button className='primary' onClick={()=>setShowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>

      </div>
      <div className="table-analytics">
        <TransactionsTable  transactionsData={transactionsData} />
      </div>

      {showAddEditTransactionModal && (
    <AddEditTransaction 
      showAddEditTransactionModal={showAddEditTransactionModal} setShowAddEditTransactionModal = {setShowAddEditTransactionModal}
      getTransactions = {getTransactions}
    /> )}

    </Layout>
  )
}

export default Home
```

```js
// transactionRoute.js
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')
const moment = require('moment')

router.post('/add-transaction', async function(req, res){
  try {
    const newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save()
    res.status(200).json(transaction)
    // res.send('User Registered Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/get-all-transactions', async(req, res) =>{
  // console.log('req', req)
  console.log('req.body', req.body)
  // console.log('user._id', user._id)
  now = moment()
  // console.log('moment', now.format() )
  try {
    const transactions = await Transaction.find({
      date: {
        // $gt : moment('2022-11-12').toDate,
        // $gt : '2022-11-12'
        // $gt : '2022-11-01T00:00:00.000Z'
        // $gt : '2022-11-01T00:00:00.000Z'
        // $gt : moment().subtract(7, 'd').toDate()
        $gt : moment().subtract(Number(req.body.frequency), 'd').toDate()
      },
      userid: req.body.userid
    });
    // const transactions = await Transaction.find({userid: "63==================a"});
    // const transactions = await Transaction.find({});

    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
```


カレンダー機能
https://hypeserver.github.io/react-date-range/
https://www.npmjs.com/package/react-date-range
```js
user@mbp client % npm install react-date-range@latest　
npm install --save react date-fns
```
```js
// src/route/transactionRoute.js
router.post('/get-all-transactions', async(req, res) =>{
  
  console.log('req.body', req.body)
  const { frequency, userid, date } = req.body
  // console.log('user._id', user._id)
  now = moment()
  // console.log('moment', now.format() )
  try {
    const transactions = await Transaction.find({
      // date: {
      //   $gt : moment().subtract(Number(req.body.frequency), 'd').toDate()

        // $gt : moment('2022-11-12').toDate,
        // $gt : '2022-11-12'
        // $gt : '2022-11-01T00:00:00.000Z'
        // $gt : '2022-11-01T00:00:00.000Z'
        // $gt : moment().subtract(7, 'd').toDate()

        ...(frequency !== 'custom' ? { 
          date: {
            $gt : moment().subtract(Number(frequency), 'd').toDate(),
          },
        } : {
          date: {
            $gte : date.startDate,
            $lte : date.endDate
          }
        }),
      userid: req.body.userid
    });
    // const transactions = await Transaction.find({userid: "6370aa95898cac633d2e8e0a"});
    // const transactions = await Transaction.find({});

    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})
```
```js
// src/route/transactionRoute.js
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')
const moment = require('moment')

router.post('/add-transaction', async function(req, res){
  try {
    const newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save()
    res.status(200).json(transaction)
    // res.send('User Registered Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/get-all-transactions', async(req, res) =>{
  
  console.log('req.body::', req.body)
  const { frequency, userid, dateRange } = req.body
  // console.log('user._id', user._id)
  now = moment()
  // console.log('moment', now.format() )
  try {
    const transactions = await Transaction.find({
      ...(frequency !== 'custom' ? { 
          date: {
            $gt : moment().subtract(Number(frequency), 'd').toDate(),
          },
        } : {
          date: {
            $gte : dateRange.startDate,
            $lte : dateRange.endDate,
          }
        }),
      userid: userid
    });

    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
```

```js
// Home.js
        <div>
          <div className="d-flex flex flex-column">
            {/* <h6>Select Frequency</h6> */}
            {/* <select value={frequency} onChange={(value)=>setFrequency(value)}  class="form-select" aria-label="Default select example">
              <option value="7">Last 1 Week</option>
              <option value="30">Last 1 Month</option>
              <option value="365">Last 1 Year</option>
            </select> */}

          <Form.Group className="mb-3" controlId="frequency">
            <Form.Label className='text-secondary fs-5'>Select Frequency</Form.Label>
            <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value='7'>Last 1 Week</option>
              <option value='30'>Last 1 Month</option>
              <option value='365'>Last 1 Year</option>
              <option value='custom'>Custom</option>
            </Form.Select>
            {/* https://hypeserver.github.io/react-date-range/ */}


            {/* {frequency === 'custom' && (
            <span onClick={()=>setOpenDate(!openDate)} 
            className='headerSearchText'>{`${format(date[0].startDate, "M月dd日(ccc)")} -- ${format(date[0].endDate, "M月dd日(ccc)")}`}</span>
            )} */}

            {frequency === 'custom' && (
              <div className="mt-2">
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setDate([item.selection])}
                  // onChange={() => setDate(date)}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date"
                  // minDate={new Date()} 
                  locale={ja} // 言語設定
                />
              </div>
            )}
          </Form.Group>
         
          </div>
        </div>
```
#### react-icons
```js
$ npm install react-icons --save
AiOutlineUnorderedList
import { FaGithub } from "react-icons/fa"
```
#### React Circular Progressbar  
https://www.npmjs.com/package/react-circular-progressbar
```js
npm install --save react-circular-progressbar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
```
Total Transactionの編集
```js
import React from 'react'
import  '../resources/analytics.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Analytics({transactions}) {
  const totalTransactions = transactions.length
  console.log(totalTransactions);
  console.log(transactions);
  
  const totalIncomeTransactions = transactions.filter(transaction => transaction.type==='income')
  console.log('total', totalIncomeTransactions.length);

  const totalExpenseTransactions = transactions.filter(transaction => transaction.type==='expense')
  console.log(totalExpenseTransactions);
  const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length/totalTransactions) * 100
  const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length/totalTransactions) * 100
  
  return (
    <div className='analytics'>
      <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="transactions-count">
              <h4>Total Transactions  : {totalTransactions}</h4>
              <hr />
              <h5>Income: {totalIncomeTransactions.length}</h5> 
              <h5>Expense: {totalExpenseTransactions.length}</h5>
              <div className="progress-bars d-flex" style={{ width: 250, height: 125  }}>
                <CircularProgressbar
                  className='mx-1'
                  value={totalIncomeTransactionsPercentage} 
                  text={`${totalIncomeTransactionsPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(0, 255, 0, ${totalIncomeTransactionsPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
                <CircularProgressbar  
                  value={totalExpenseTransactionsPercentage} 
                  text={`${totalExpenseTransactionsPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(255, 0, 0, ${totalExpenseTransactionsPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
              </div>
            </div>
          </div>
       </div>
    </div>
  )
}

export default Analytics
```
Turn overを編集する  
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);
// expected output: 10
```
Analytics.js の作成
```js
import React from 'react'
import  '../resources/analytics.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Analytics({transactions}) {
  const totalTransactions = transactions.length
  // console.log(totalTransactions);
  // console.log(transactions);
  
  const totalIncomeTransactions = transactions.filter(transaction => transaction.type==='income')
  console.log('total', totalIncomeTransactions.length);
  // const totalIncomeTransactions = transactions.filer((transaction) => {return transaction.type==='income'})
  const totalExpenseTransactions = transactions.filter(transaction => transaction.type==='expense')
  console.log(totalExpenseTransactions);
  const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length/totalTransactions) * 100
  const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length/totalTransactions) * 100

  const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnover = transactions.filter(transaction=>transaction.type==='income').reduce((acc, transaction) =>  acc + transaction.amount, 0);
  const totalExpenseTurnover = transactions.filter(transaction=>transaction.type==='expense').reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage = (totalIncomeTurnover/totalTurnover) * 100
  const totalExpenseTurnoverPercentage = (totalExpenseTurnover/totalTurnover) * 100

  const categories = ['salary', 'entertainment', 'food', 'travel', 'investment', 'learning', 'medical', 'tax']
   // console.log('totalIncomeTurnover：', totalIncomeTurnover);
  // console.log('totalExpenseTurnover：', totalExpenseTurnover);

  return (
    <div className='analytics'>
      <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="transactions-count">
              <h4>Total Transactions  : {totalTransactions}</h4>
              <hr />
              <h5>Income: {totalIncomeTransactions.length}</h5> 
              <h5>Expense: {totalExpenseTransactions.length}</h5>
              <div className="progress-bars d-flex" style={{ width: 250, height: 125  }}>
                <CircularProgressbar
                  className='mx-1'
                  value={totalIncomeTransactionsPercentage} 
                  text={`${totalIncomeTransactionsPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(0, 255, 0, ${totalIncomeTransactionsPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
                <CircularProgressbar  
                  value={totalExpenseTransactionsPercentage} 
                  text={`${totalExpenseTransactionsPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(255, 0, 0, ${totalExpenseTransactionsPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="transactions-count">
              <h4>Total Turnover  : {totalTurnover}</h4>
              <hr />
              <h5>Income: {totalIncomeTurnover}</h5> 
              <h5>Expense: {totalExpenseTurnover}</h5>
              <div className="progress-bars d-flex" style={{ width: 250, height: 125  }}>
                <CircularProgressbar
                  className='mx-1'
                  value={totalIncomeTurnoverPercentage} 
                  text={`${totalIncomeTurnoverPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(0, 255, 0, ${totalIncomeTurnoverPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
                <CircularProgressbar  
                  value={totalExpenseTurnoverPercentage} 
                  text={`${totalExpenseTurnoverPercentage.toFixed(0)}%`} 
                  styles={buildStyles({
                    pathColor: `rgba(255, 0, 0, ${totalExpenseTurnoverPercentage / 100})`,
                    textColor: 'gray',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7'
                  })}
                />
              </div>
            </div>
          </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>収入</h4>
            {categories.map((category)=> {
              const amount = transactions.filter(t => t.type==='income' && t.category===category).reduce((ac,t)=> ac + t.amount , 0)
              return (
                (amount> 0) && <div className='category-card'>
                <h5>{category}</h5>
              
                <ProgressBar now={amount / totalIncomeTurnover * 100} label={`${(amount / totalIncomeTurnover * 100).toFixed(0)}%`} />
              </div>
              )
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>支出</h4>
            {categories.map((category)=> {
              const amount = transactions.filter(t => t.type==='expense' && t.category===category).reduce((ac,t)=> ac + t.amount , 0)
              return (
                (amount> 0) && <div className='category-card'>
                <h5>{category}</h5>
              
                <ProgressBar now={amount / totalIncomeTurnover * 100} label={`${(amount / totalExpenseTurnover * 100).toFixed(0)}%`} />
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
```
```js

```











