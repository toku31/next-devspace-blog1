---
title: "House Marketplace Project By React & Firebase -1-
"
date: 'September 11, 2022'
excerpt: 'ReactとFirebaseを用いて不動産物件を売買できるアプリをつくりました。メールアドレスやGoogleアカウントで認証して、Cloud FireStore(クラウドデータベース)にデータ保存できるようにしました。'
cover_image: '/images/posts/img4.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
参考サイト：https://gist.github.com/bradtraversy/caab8ebd8ff4b6e947632887e0183761  
https://github.com/toku31/react-house-market  
npm start  
npm run server

### Firebase Setup For House Marketplace
1.Create Firebase Project  
2.Create "web" app within firebase to get config values"  
3.Install firebase9 in your project "npm i firebase  
4.Create a config file in your project  
5.Add authentication for email/password and Google  
6.Create a user from Firebase  
7.Enable Firestore  
8.Add rules for firestore  
9.Enable storage  
10.Add rules for storage  
11.Create 3 composite indexes for advanced querying  

```bash
λ npx create-react-app house-marketplace --use-npm
```
--use-npmというオプションを付けることで、yarnがインストールされていてもnpmをデフォルトで使用できる

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

## 82 Pages & Routes
```bash
npm i react-router-dom
```
```
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
```
```javascript
// react-house-market/src/App.js 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<SignIn />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
      {/* Navbar */}
    </>
  );
}
export default App;
```

## 83 Navbar Component
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
      //toast.error('Something went wrong with registration')
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
~~~


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

~~~javascript
  import React from 'react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
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
      <ToastContainer />
    </>
  );
}

export default App;

~~~

## 89 User Logout
Profile.jsx
~~~javascript
import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const auth = getAuth()
  // const [user, setUser] = useState(null)
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
      // Update display name on fb
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
      }

      // Update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
    
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
          className={!changeDetails ? 'profileName' : 'profileNameActive'}
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
react-router-dom を使って、ログイン時とログアウト時でページ遷移の許可をわける、`PrivateRoute`(`ProtectedRoute`?)を実装する

~~~javascript
import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {

  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
    // return <h3>Loading...</h3>
  }


  // const loggedIn = true 91
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' /> 
}

export default PrivateRoute
~~~

~~~javascript
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
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

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks

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
ドキュメントは値にマッピングされるフィールドを含む軽量のレコードで、JSON によく似ており、基本的にはJSON と同じ


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

~~~

~~~