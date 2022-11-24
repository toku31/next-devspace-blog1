---
title: "Realtor.com Project By React & Firebase -1-
"
date: 'November 6, 2022'
excerpt: 'ReactとFirebaseを用いて不動産物件を売買するサイトを作りました。メールアドレスやGoogleアカウントで認証して、Cloud FireStore(クラウドデータベース)にデータ保存できるようにしました。'
cover_image: '/images/posts/img4.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
参考サイト：
https://github.com/sahandghavidel/realtor-clone-react  
npm start  
npm run server

### Installation and first template
```bash
λ npx create-react-app react-firebase-realtor --use-npm
```
--use-npmというオプションを付けることで、yarnがインストールされていてもnpmをデフォルトで使用できる

faviconの作成  
https://favicon.io/ => Generator  
https://favicon.io/favicon-generator/  
favicon.icoファイルをコピーして使う

Tailwindのインストールと設定  
参考：https://tailwindcss.com/docs/guides/create-react-app
~~~js
user@mbp React % npm install -D tailwindcss postcss autoprefixer
user@mbp github-finder % npx tailwindcss init -p 
~~~
これでpostcss.config.jsとtailwind.config.jsの２ファイルができる

~~~js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
~~~

~~~js
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

npm start
Tailwindが正しくインストールされているか確認

~~~js
// App.js
function App() {
  return (
    <>
      <h1 className='text-2xl bg-red-400'>Hello World</h1>
    </>
  );
}

export default App;
~~~
vscode Extensionのインストール  
Auto Rename Tag  
Code spell Checker  
Dark Low Contrast Themes  
ES7 + React/Redux/React Native snippets  
Prettier-Code formatter  
Tailwind CSS IntelliSense  

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
    <title>Realtor.com</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```
gitインストール  
```bash
user@mbp react-firebase-realtor % git init
user@mbp react-firebase-realtor % git add .
user@mbp react-firebase-realtor % clear
user@mbp react-firebase-realtor % git commit -m "install reactjs and tailwind css and create the first template"
githubで新しいレポジトリを作成する
git remote add origin https://github.com/toku31/react-firebase-realtor.git
git branch -M main
git push -u origin main
```
次回はcommitの後はgit push 
### Create pages and routes
React Router  
https://reactrouter.com/en/main/start/concepts
```bash
npm i react-router-dom
```
または
```bash
npm i react-router　react-router-dom
```
```
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
```
```javascript
// /src/App.js 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
```

### Create the header component
```js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Header />  // added
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/offers' element={<Offers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
```
Headerコンポーネントを作成する  
この時useLocationを用いる  
console.log(location)にpathnameがあるのでこれを使う  
useLocationはURLが変わるたびに再レンダリングして新しいオブジェクトを取得  
useHistoryはURLが変わっても再レンダリングしない 
```
// useLocation
Object
hash: ""key: "default"
pathname: "/offers"　　//
search: ""
state: null
[[Prototype]]: Object
```

```js
import {useLocation} from 'react-router-dom'

function Header() {
  const location = useLocation()
  console.log(location)
  const pathMathRoute=(route)=> {
    if (route === location.pathname){
      return true
    }
  }

  return (
    <div className ="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className="h-5 cursor-pointer"/>
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-black border-b-red-500"}`}>Home</li>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}>Offers</li>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "text-black border-b-red-500"} `}>Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
```
# 3 Authentication using Firebase auth version9
```js
// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: rgb(240, 253, 244);
}
```
ログインページのレイアウト
```js
// src/pages/SignIn.jsx
import keyImgURL from '../assets/jpg/key.jpg'

export default function SignIn() {
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input className="w-full" type="text"></input>
          </form>
        </div>
      </div>
    </section>
  )
}
```
### Create Sign in Page
ログインページの作成
```js
// src/pages/SignIn.jsxの前半
import { useState } from 'react'
import keyImgURL from '../assets/jpg/key.jpg'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData;
  const onChange =(e)=> {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  //   const onChange =(e)=> {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value
  //   }))
  // }

  // const [text, setText] = useState('') 
  // const onChange =(e)=> { 
  //   setText(e.target.value)
  // }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
            />
            <div>
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type={showPassword ? "text" : "password"}
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Password"
            />
　　　　　＝＝＝以下は後半へ＝＝＝
```
パスワードを表示するeyeボタンやOAuthのGoogleデザインに、React Iconsを使う  
https://react-icons.github.io/react-icons/  
npm install react-icons --save
```js
// src/pages/SignIn.jsxの後半
            {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) }
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg" >
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-up" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign in</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

```

#### Install Firebase and react-toastify
firebaseのインストール
```bash
user@mbp react-firebase-realtor % npm install firebase  
```
firebase.jsの作成
~~~js
// react-firebase-realtor/src/firebase.js 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*****************************************",
  authDomain: "*****************************************",
  projectId: "**************************",
  storageBucket: "**************************",
  messagingSenderId: "**************************",
  appId: "**************************"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
~~~
firebase->authenticationでプロバイダの登録  
usersの登録：john@gmail.com  
Cloud Firestore-> データベースの作成ー>本番モード  
Firestore rulesを以下のように変更して公開する
```js
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Listings
    match /listings/{listing} {
    	allow read;
      allow create: if request.auth != null && request.resource.data.imgUrls.size() < 7;
    	allow delete: if resource.data.userRef == request.auth.uid;
      allow update: if resource.data.userRef == request.auth.uid;
    }
   
    // Users
    match /users/{user} {
    	allow read;
    	allow create;
    	allow update: if request.auth.uid == user
    }
  }
}
```
Storageのルールを以下のように変更して公開する
```
// Storage rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.auth != null &&
      request.resource.size < 2 * 1024 * 1024 && //2MB
      request.resource.contentType.matches('image/.*')
    }
  }
}
```
サイト：Firebase Authentication：https://firebase.google.com/docs/auth  
https://firebase.google.com/docs/auth/web/start  
user@mbp react-firebase-realtor % npm i firebase
### Sign Upページの作成
```js
// src/pages/SignUp.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import keyImgURL from '../assets/jpg/key.jpg'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import OAuth from '../components/OAuth'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData;

  const onChange =(e)=> {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async(e)=> {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
    } catch (error) {
      console.log(error);
    }
  }
```
react-toastify: https://github.com/fkhadra/react-toastify  
https://fkhadra.github.io/react-toastify/introduction/
```js
npm install --save react-toastify
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
```
```js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify'  // added
import 'react-toastify/dist/ReactToastify.css'  // added

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/offers' element={<Offers />} />
        </Routes>
      </Router>
      <ToastContainer  // added
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
    </>
  );
}

export default App;
```
#### Google OAuth
説明：https://firebase.google.com/docs/auth/web/google-signin

```js
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
```
```js
// src/components/OAuth.jsx
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {toast} from 'react-toastify'

export default function OAuth() {

  async function onGoogleClick() {
      try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        console.log(user);
      } catch (error) {
        toast.error('Could not authorize with Google')
        console.log(error);
      }
  }

  return (
    <button type="button" onClick={onGoogleClick} className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded">
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with Google
    </button>
  )
}
```

```js
// src/components/OAuth.jsx
import React from 'react'
import {FcGoogle} from 'react-icons/fc'

function OAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded">
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with Google
    </button>
  )
}

export default OAuth
```
Sign upページの作成
```js
// src/pages/SignUp.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import keyImgURL from '../assets/jpg/key.jpg'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData;

  const onChange =(e)=> {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input 
              className="mb-6  w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="text" 
              id="name" 
              value={name} 
              onChange={onChange}
              placeholder="Full name"
            />
            <input 
              className="mb-6  w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
            />
            <div className='relative mb-6'>
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type={showPassword ? "text" : "password"}
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Password"
            />
            {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) }
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg" >
              <p className='mb-6'>Have a account?
                <Link to="/sign-in" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign up</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
```
Forgot Passwordのページ作成
```js
// src/pages/ForgotPassword.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import keyImgURL from '../assets/jpg/key.jpg'
import OAuth from '../components/OAuth'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const onChange =(e)=> {
    setEmail(e.target.value)
    }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('could not send reset password')
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input 
              className="mb-6  w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg" >
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-up" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Sign in instead</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Send reset password</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
```
test@gmail.com  
123456
## Profile Pageの作成
```js
// src/pages/profile.jsx
import {useState} from 'react'
import {getAuth} from 'firebase/auth'

function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.Email
  })

  const {name, email} = formData

  return (
    <>
      <section className="max-w-6xl max-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
             <input type="text" id="name" value={name} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             {/* Email input */}
             <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>Edit</span>
              </p>
              <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign out</p>
             </div>
          </form>
        </div>
        
      </section>
    </>
  )
}

export default Profile
```
### Private route for protecting profile page and logout functionality
react-router-dom を使って、ログイン時とログアウト時で遷移できるページのを区別する、PrivateRouteを実装する
```js
// App.jsx
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<PrivateRoute />}>  // added
            <Route path='/profile' element={<Profile />} />
          </Route>   // added
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/offers' element={<Offers />} />
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
        theme="dark"
        />
    </>
  );
}

export default App;
```
PrivateRouteの作成
```js
// /src/comonents/ProvateRoute.jsx
import {Outlet, Navigate} from 'react-router-dom'

function PrivateRoute() {
  const loggedIn = false;
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in/' />
}

export default PrivateRoute
```
ログイン状況を確認するフックuseAuthStatus Hook を作成する  
checkingStatusはloadingと同じ意味  
下のuseAuthStatusは２つ値（loggedIn, checkingStatus）を返したいので、export default constとdefaultをつけることができない
```js
// src/hooks/useAuthStatus.jsx
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true) 

  useEffect(() => {
      const auth = getAuth()
      console.log(auth)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }, [])
  return { loggedIn, checkingStatus }
}
```
作成したuseAuthStatusフックをPrivateRouteに実装する  
useAuthStatusはdefault functionでないのでimportでは{}で囲む
```js
import {Outlet, Navigate} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

function PrivateRoute() {
  // const loggedIn = false;
  const { loggedIn, checkingStatus } = useAuthStatus() // 実装
  if (checkingStatus) {
    // return <Spinner />
    return <h3>Loading...</h3>
  }
  console.log('loggedIn', loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute

```

Profile.jsxにログアウト機能を追加
```js
import {useState} from 'react'
import {getAuth} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'　 // added

function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData
  const navigate = useNavigate()

  const onLogout = () => {  // added
    auth.signOut()
    navigate('/')
  }

  return (
    <>
      <section className="max-w-6xl max-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">プロフィール</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
             <input type="text" id="name" value={name} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             {/* Email input */}
             <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">名前を変更しますか？
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>編集</span>
              </p>
              <p onClick = {onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>サインアウト</p>
             </div>
          </form>
        </div>
        
      </section>
    </>
  )
}

export default Profile
```

#### プロファイルページに編集機能を追加する
<span onClick={() => setChangeDetail((prevState)=> !prevState)}は() => をつけないと無限ループしてしまう
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
















#### SVG をコンポーネントとして import
```javascript
import { ReactComponent as Logo } from './logo.svg';
const App = () => (
  <div>
    {/* Logo is an actual React component */}
    <Logo />
  </div>
);
```
★★★★モバイル用のNavbar★★★★
```javascript
// react-house-market/src/App.js 
import { useNavigate } from 'react-router-dom'
import { ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathMatchRoute = (route) => {
    if(route === location.pathname) {
      return true
    }
  }

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon  fill='#2c2c2c' width='36px' heght='36px' />
            <p>Explore</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/offers')}>
            <OfferIcon  fill='#2c2c2c' width='36px' heght='36px' />
            <p>Offer</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon fill='#2c2c2c' width='36px' heght='36px' />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar
```

```js
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if(route === location.pathname) {  // 例　'/profile'
      return true
    }
  }
```

```javascript
     <ul className='navbarListItems'>
          <li className='navbarListItem' >
            <ExploreIcon  fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' heght='36px' onClick={() => navigate('/')}/>
            <p>Explore</p>
          </li>
```


firebaseのインストール
```bash
C:\react\house-marketplace>npm i firebase
```
config fileの作成
~~~js
// react-house-market/src/firebase.config.js 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*****************************************",
  authDomain: "*****************************************",
  projectId: "**************************",
  storageBucket: "**************************",
  messagingSenderId: "**************************",
  appId: "**************************"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
~~~

firebase authentication userの追加  80
firestore rules  Firestore Database & Storage
```
// FIRESTORE RULES
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Listings
    match /listings/{listing} {
    	allow read;
      allow create: if request.auth != null && request.resource.data.imgUrls.size() < 7;
    	allow delete: if resource.data.userRef == request.auth.uid;
      allow update: if resource.data.userRef == request.auth.uid;
    }

    // Users
    match /users/{user} {
    	allow read;
    	allow create;
    	allow update: if request.auth.uid == user
    }
  }
}
```

```
// STORAGE RULES
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.auth != null &&
      request.resource.size < 2 * 1024 * 1024 && //2MB
      request.resource.contentType.matches('image/.*')
    }
  }
}
```

#### Dummy Data & indexes
Cloud Firestore(nonSQL database)  
collection = table  
document  = record  

画像素材　splash
https://unsplash.com/
condoで検索

FirestoreDatabase ⇒インデックスの作成
https://console.firebase.google.com/project/house-marketpalce-app-9e335/firestore/indexes?hl=ja
### Firebase Authentication & Profile
John Doe: john@gmail.com　:test1234
ReactでSVGアイコンコンポーネントを作る

~~~javascript
// react-house-market/src/pages/SignIn.jsx 
import {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const  [showPassword, setShowPassword] = useState(false)
  const  [formData, setFormData] = useState({
    email: '',
    password: ''
  }) 

  const {email, password} = formData
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  return (
  <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>

      <form>
        <input type="email" className='emailInput' placeholder='Email' id="email" value={email} onChange={onChange} />

        <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='Password' id='password'  
          value={password} onChange={onChange} />
          <img src={visibilityIcon} alt="show password" className='showPassword'
             onClick={() => setShowPassword((prevState) => (!prevState))} />
        </div>

        <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>

        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>
      {/* Google OAuth */}
      <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
    </div>
  </>
  )
}
export default SignIn
~~~
ポイント
~~~js
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }
                    ~~ ~~ ~~
  <input type="email" className='emailInput' placeholder='Email' id="email" value={email} onChange={onChange} />
  <div className="passwordInputDiv">
    <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder='Password' id='password'  
    value={password} onChange={onChange} />
    <img src={visibilityIcon} alt="show password" className='showPassword'
        onClick={() => setShowPassword((prevState) => (!prevState))} />
  </div>
~~~

## Firebaseにユーザ登録　85
https://firebase.google.com/docs/auth/web/start  
npm install firebase
~~~js
// react-house-market/src/pages/SignUp.jsx 
import {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // 追加
import { doc, setDoc, serverTimestamp } from "firebase/firestore";　// 追加
import {db} from '../firebase.config'　// 追加
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth';

function SignUp() {
  const  [showPassword, setShowPassword] = useState(false)
  const  [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  }) 
  const {name, email, password} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      // console.log(error)
      toast.error('Something went wrong with registration')
    }
  }
  return (
  <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">ようこそ！</p>
        {/* <p className="pageHeader">Welcome Back!</p> */}
      </header>

      <form onSubmit={onSubmit}>　// 追加
        <input type="text" className='nameInput' placeholder='名前' 
          id="name" value={name} onChange={onChange} />

        <input type="email" className='emailInput' placeholder='メールアドレス' 
          id="email" value={email} onChange={onChange} />

        <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput"
            placeholder='メールアドレス(確認)' id='password' value={password} onChange={onChange} />
          <img src={visibilityIcon} alt="show password" className='showPassword'
             onClick={() => setShowPassword((prevState) => (!prevState))} />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>パスワードを忘れましたか</Link>

        <div className="signUpBar">
          <p className="signUpText">サインアップ</p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>

      <OAuth />

      <Link to='/sign-in' className='registerLink'>サインインする</Link>
      {/* <Link to='/sign-in' className='registerLink'>Sign In Instead</Link> */}
    </div>
  </>
  )
}
export default SignUp
~~~

上記のポイント
~~~javascript
  const onSubmit = async (e) => {
    e.preventDefault()
　　　　       　~ ~ ~ 
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
~~~

John Doe:
john@gmail.com:
test1234:

## Firebaseにユーザを保存
https://firebase.google.com/docs/firestore/manage-data/add-data

Code sample
~~~javascript
// react-house-market/src/pages/SignUp.jsx 
import { doc, setDoc } from "firebase/firestore";

// Add a new document in collection "cities"
await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
~~~
~~~js
import { doc, setDoc, serverTimesstamp } from "firebase/firestore";
// フォームから取得したデータ（メール、名前、パスワード）を別の変数にコピーしてその退避した変数を加工する。  
//パスワードを削除して、タイムsスタンプを付与して、Firebaseのユーザコレクションに格納する
const formDataCopy = {...formData}
delete formDataCopy.password
formDataCopy.timestamp = serverTimestamp()

await setDoc(doc(db, 'users', user.uid), formDataCopy)

~~~

## ユーザのサインイン 87
~~~javascript
// react-house-market/src/pages/SignIn.jsx 
import {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"; // 追加
import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
  const  [showPassword, setShowPassword] = useState(false)
  const  [formData, setFormData] = useState({
    email: '',
    password: ''
  }) 
  const {email, password} = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('Bad User Credentials')
    }
  }

  return (
  <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">ようこそ！</p>
        {/* <p className="pageHeader">Welcome Back!</p> */}
      </header>

      <form onSubmit={onSubmit}>　// 追加
        <input type="email" className='emailInput' placeholder='メールアドレス' 
          id="email" value={email} onChange={onChange} />

        <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className="passwordInput"
            placeholder='メールアドレス(確認)' id='password' value={password} onChange={onChange} />
          <img src={visibilityIcon} alt="show password" className='showPassword'
             onClick={() => setShowPassword((prevState) => (!prevState))} />
        </div>
        <Link to='/forgot-password' className='forgotPasswordLink'>パスワードを忘れましたか</Link>

        <div className="signUpBar">
          <p className="signUpText">サインアップ</p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>

      <OAuth />

      <Link to='/sign-in' className='registerLink'>サインインする</Link>
      {/* <Link to='/sign-in' className='registerLink'>Sign In Instead</Link> */}
    </div>
  </>
  )
}
export default SignUp
~~~

Profileページの編集
~~~js
react-house-market/src/pages/Profile.jsx 
import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'

function Profile() {
  const auth = getAuth()
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('profile', auth.currentUser)
    setUser(auth.currentUser)
  }, [])
  return user ? <h1>{user.displayName}</h1> : 'Not Logged In' 
}
export default Profile
~~~


## 88 Alerts with ReactToastify
https://fkhadra.github.io/react-toastify/introduction/

~~~bash
npm i react-toastify
~~~

~~~javascript
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
~~~
Tostifyの導入例
~~~javascript
  import React from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; // 必要
  
  function App(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
~~~

~~~javascript
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'　 // 追加
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />  // 追加
    </>
  );
}
export default App;
~~~

## 89 User Logout
~~~javascript
react-house-market/src/pages/Profile.jsx 
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData 
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  // useEffect(() => {
  //   console.log('profile', auth.currentUser)
  //   setUser(auth.currentUser)
  // }, [])
  // return user ? <h1>{user.displayName}</h1> : 'Not Logged In' 
  return <div className='profile'>
    <header className='profileHeader'>
      <p className="pageHeader">My Profile</p>
      <button type="button" className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>
  </div> 
}
export default Profile
~~~

##  90 Display & Update User details
~~~javascript
// react-house-market/src/pages/Profile.jsx 
import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name, email} = formData 
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async() => {
    console.log(123)
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name on fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }
    } catch(error) {
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
 
  return <div className='profile'>
    <header className='profileHeader'>
      <p className="pageHeader">My Profile</p>
      <button type="button" className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => (!prevState))
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>

      <div className="profileCard">
        <form>
          <input type="text" id="name" 
          className={!changeDetails ? 'profileName' : 'profileNameActive'}
          disabled={!changeDetails}
          value={name}
          onChange={onChange}
          />

          <input type="text" id="email" 
          className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
          disabled={!changeDetails}
          value={email}
          onChange={onChange}
          />
        </form>
      </div>
    </main>
  </div> 
}
export default Profile
~~~

## 91 PrivateRoute Component & useAuthState Hook
react-router-dom を使って、ログイン時とログアウト時でページ遷移の許可をわける、PrivateRoute(ProtectedRoute?)を実装する
~~~javascript
// react-house-market/src/components/PrivateRoute.jsx 
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = () => {
  const loggedIn = false
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' /> 
}
export default PrivateRoute
~~~

~~~js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute' // added

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />} > // added
            <Route path='/profile' element={<Profile />} />
          </Route>  // added
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
~~~
useAuthStatus Hook を作成する  
checkingStatusはloadingと同じ
~~~javascript
// hooks/useAuthStatus.js
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true) // Loadingと同じ
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return { loggedIn, checkingStatus }
}

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
~~~
PrivateRouteにuseAuthStatusを取り込む
~~~js
import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'　// added
import Spinner from './Spinner'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus() // added
  if (checkingStatus) {
    return <Spinner />
    // return <h3>Loading...</h3>
  }
  // const loggedIn = true 91
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' /> 
}
export default PrivateRoute
~~~

~~~js
// spinner.jsx
import React from 'react'

function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
      <div className="loadingSpinner"></div>
    </div>
  )
}
export default Spinner
~~~
spinnerのcss
~~~css
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
  border-color: #00cc66 transparent #00cc66 transparent;
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
~~~

## 92 Forgot Password Page
~~~javascript
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const onChange = e => setEmail(e.target.value)
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    }catch(error) {
      toast.error('Could not send reset email')
    }
  }

  return (
  <div className='pageContainer'>
    <header>
      <p className="pageHeader">Forgot Password</p>
    </header>
    <main>
      <form onSubmit={onSubmit}>
        <input type='email' className='emailInput' placeholder='Email'
          id='email' value={email} onChange={onChange}  />
        <Link className='forgotPasswordLink' to='/sign-in'>
          Sign In
        </Link>

        <div className="signInBar">
          <div className="signInText">Send Reset Link</div>
          <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
          </button>
        </div>
      </form>
    </main>
  </div>
  )
}
export default ForgotPassword
~~~

## 93 Google OAuth
https://console.firebase.google.com/project/house-marketpalce-app-9e335/authentication/providers?hl=ja  
Google　を有効にする

データは「ドキュメント」に格納し、それが「コレクション」にまとめられている。    
ドキュメントは値にマッピングされるフィールドを含む軽量のレコードで、基本的にはJSON と同じ
~~~js
import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc ,setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async() => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user dosen't ecist, create user
      if(!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {  // 'users'はコレクション名
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname==='/sign-up' ? 'up' : 'in' } with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth
~~~


~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~