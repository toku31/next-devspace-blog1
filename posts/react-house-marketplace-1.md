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
~~~
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

firebase authentication userの追加  
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

画像素材　splash
https://unsplash.com/
condoで検索

FirestoreDatabase ⇒インデックスの作成
https://console.firebase.google.com/project/house-marketpalce-app-9e335/firestore/indexes?hl=ja

```bash
npm i react-router-dom
```

```
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
```

## 82 Pages & Routes
```javascript
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


```javascript
import { useNavigate } from 'react-router-dom'
import { ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  const navigate = useNavigate()
  // const location = useLocation()
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

```javascript
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if(route === location.pathname) {
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