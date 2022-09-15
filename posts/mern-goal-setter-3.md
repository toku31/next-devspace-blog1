---
title: 'Mern Goal Setter -3-'
date: 'September 14, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使って目標を覚書するアプリをつくりました。3回目はRedux Toolkitを使ってフロントエンドの認証機能を実装していきます。'
cover_image: '/images/posts/img7.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

## Frontend Authentication | Redux Toolkit
Goal Setter App:  https://mern-goalsetter01.herokuapp.com/  
email: user@gmail.com
password: 12345  
参考サイト:https://www.youtube.com/watch?v=mvfsC66xqj0    
https://github.com/toku31/mern-goalsetter
C:\react\mern-tutorial
>npm run server  
>npm run client  
> npm start --prefix frontend  
JWT   https://jwt.io/
Redux Toolkit

~~~bash
C:\react\mern-tutorial>npx create-react-app@latest frontend --template redux
~~~
~~~
// package.json
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend" // frontendフォルダに移動してnpm startを行う
  },
~~~

>npm run client　で立ち上げる
~~~js
//mern-goalsetter/frontend/src/app/store.js 
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
~~~

~~~js
//mern-goalsetter/frontend/src/App.js
function App() {
  return (
    <div>
      <h1>My App</h1>
    </div>
  );
}
export default App;
~~~

~~~css
// index.css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  height: 100vh;
}

a {
  text-decoration: none;
  color: #000;
}

p {
  line-height: 1.7;
}

ul {
  list-style: none;
}

li {
  line-height: 2.2;
}

h1,
h2,
h3 {
  font-weight: 600;
  margin-bottom: 10px;
}

.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 60px;
}

.header ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header ul li {
  margin-left: 20px;
}

.header ul li a {
  display: flex;
  align-items: center;
}

.header ul li a:hover {
  color: #777;
}

.header ul li a svg {
  margin-right: 5px;
}

.heading {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 50px;
  padding: 0 20px;
}

.heading p {
  color: #828282;
}

.goals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.goal {
  background-color: #f4f4f4;
  margin: 10px 0;
  padding: 20px 0 10px;
  position: relative;
}

.goal .close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  border: none;
  background: none;
}

.form,
.content {
  width: 70%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 10px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 10px;
  font-family: inherit;
}

.form-group label {
  text-align: left;
  display: block;
  margin: 0 0 5px 3px;
}

.btn {
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  appearance: button;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn svg {
  margin-right: 8px;
}

.btn-reverse {
  background: #fff;
  color: #000;
}

.btn-block {
  width: 100%;
  margin-bottom: 20px;
}

.btn:hover {
  transform: scale(0.98);
}

.loadingSpinnerContainer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loadingSpinner {
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #000 transparent #555 transparent;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .form {
    width: 90%;
  }

  .heading h1 {
    font-size: 2rem;
  }

  .heading p {
    font-size: 1.5rem;
  }
}
~~~

pageフォルダの作成
Dashboard.jsx, Login.jsx, Register.jsxファイルの作成

~~~
C:\react\mern-tutorial\frontend>npm i react-router-dom
~~~

~~~js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from  './pages/Dashboard'
import Login from  './pages/Login'
import Register from  './pages/Register'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

~~~


~~~
C:\react\mern-tutorial\frontend>npm i react-icons
~~~


Header.jsxの作成
~~~js
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>Goal Setter</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt />Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser />Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
~~~

Register.jsx
~~~js
import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit =(e) => {
    e.preventDefault()
  }

  return <>
    <section className="heading">
      <h1>
        <FaUser /> 登録
      </h1>
      <p>アカウントを作成してください</p>
    </section>
    <section className="form">
      <form>
        <div className="form-group">
          <input type='text' className='form-control' id='name' name='name' value={name}
          placeholder='名前を入力' onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input type='email' className='form-control' id='email' name='email' value={email}
          placeholder='メールアドレスを入力' onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input type='password' className='form-control' id='password' name='password' value={password}
          placeholder='パスワードを入力' onChange={onChange}
          />
        </div>
        <div className="form-group">
        <input type='password' className='form-control' id='password2' name='password2' value={password2}
          placeholder='確認用パスワードを入力' onChange={onChange}
          />
        </div>
        <div className="form-group">
        <button type='submit' className='btn btn-block'  onChange={onSubmit}>送信</button>
        </div>
      </form>
    </section>
  </>
}

export default Register
~~~

フロントエンドとバックエンドを同時に起動する
C:\react\mern-tutorial>npm i -D concurrently
~~~js
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js",
    "client": "npm start --prefix frontend",
    "dev": "concurrently \"npm run server\" \"npm client\""
  },
~~~


Redux Toolkitを使う
わかりやすいサイト
https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit

~~~
1.  コンポーネントが、Action Creator を呼び出して Action を取得する。
2.  取得した Action を Reducer に渡す。これを dispatch という。
3.  Reducer は、渡された Action に応じて State を更新する。
4.  コンポーネントは State に変更があれば、関連する UI を書き換える。
~~~


\src\features\auth\authSlice.js

~~~js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit' 

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading =false
      state.isSuccess =false
      state.isError =false
      state.message =''
    }
  },
  extraReducers: () => {}
})


export const {reset} = authSlice.actions
export default authSlice.reducer
~~~

~~~js
\src\app\store.js

import { configureStore } from '@reduxjs/toolkit';
import authReuducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReuducer,
  },
});

~~~

~~~bash
C:\react\mern-tutorial\frontend>npm i axios react-toastify
~~~

~~~js
\src\features\auth\authSlice.js
// Register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
~~~

~~~js
import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data) )
  }

  return response.data
}

const authService = {
  register,
}

export default authService
~~~

~~~js
{
  "name": "frontend",
  "version": "0.1.0",
  "proxy": "http://localhost:5000",  //
  "private": true,
  "dependencies": {
~~~

~~~js
createSlice({
  name: "string", // Sliceの名称
  initialState: {
    // Stateの初期状態
  },
  // Reducer
  // Stateに対して許可する更新処理を定義する場所
  reducers: {
    // ここに定義したキーがAction Creator関数の名前となる
    // つまり、Action Creatorは自動生成される
    actionName: (state, action) => {
      // 第一引数は現在（更新前）のState
      // 第二引数は渡されたaction
      // action.payloadプロパティに、Action Creatorに渡された引数が入っている
      // この関数は新しい状態を返却する
    }
  },
  // 必要に応じて追加のReducerを指定できる
  extraReducers: {
    // 別のSliceで生成されたActionに反応したい場合に定義する
    [anotherSlice.actions.actionName]: (state, action) => {
      // 新しい状態を返却する
    }
  }
});
~~~


~~~js
const slice = createSlice(/* ... */);

slice.name; // Sliceの名称
slice.reducer; // Reducer関数
slice.actions; // Action Creator関数
~~~

Action creator
~~~js
function increment() {
  return { type: 'INCREMENT' };
}

function add(number) {
  return { type: 'ADD', payload: number };
}
~~~

Action
~~~js
{ type: 'INCREMENT' } // typeがStateに対する操作を表す
{ type: 'ADD', payload: 3 } // payloadは任意の引数
~~~

~~~js
XHR + Promise
XHR + async await(Promise)
Fetch(fetchAPI + Promise) + async await(Promise)
axios(XHR + Promiseの組み合わせをより扱いやすくするライブラリ)
~~~

react-toastify
~~~js
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
~~~