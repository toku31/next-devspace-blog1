---
title: 'Github Finder -2-'
date: 'October 11, 2022'
excerpt: 'Reactを使ってGithubのユーザを表示するアプリをつくりました。2回目はユーザプロファイルやアラートなどを実装していきます'
cover_image: '/images/posts/img7.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

https://codesandbox.io/s/github/bradtraversy/github-finder/tree/master/?file=/src/App.js  
https://github.com/bradtraversy/github-finder-app  
https://tailwindcss.com/docs/guides/create-react-app  
https://daisyui.com
### Alert Context & Reducer
AlertContext, AlerProvider を作成
~~~js
// /src/context/alert/AlertContext.js
import { createContext, useReducer  } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext()

export const AlerProvider = ({children})=> {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  return <AlertContext.Provider value={{alert: state }} >
    {children}
  </AlertContext.Provider>
}

export default AlertContext
~~~
setAlert 関数を追加
~~~js
// /src/context/alert/AlertContext.js
import { createContext, useReducer  } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext()

export const AlerProvider = ({children})=> {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // Set an alert 
  const setAlert = (msg, type) => {
    dispatch({
    type: 'SET_ALERT',
    payload: {msg, type},
    })
    setTimeout(() => dispatch({type: 'REMOVE_ALERT'}), 3000)
  }

  return <AlertContext.Provider value={{alert: state, setAlert }} >
    {children}
  </AlertContext.Provider>
}

export default AlertContext
~~~
alertReducerを作成
~~~js
// /src/context/alert/AlertReducer.js
const alertReducer = (state, action) => {
  switch(action.type) {
    case 'SET_ALERT':
      return action.payload
    case 'REMOVE_ALERT':
      return null
    default:
      return state
  }
}
export default alertReducer
~~~

App.jsxにAlertProviderを実装する
~~~js
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { GithubProvider } from './context/github/GithubContext';
import { AlerProvider } from './context/alert/AlertContext';

function App() {
  return (
    <GithubProvider >
      <AlerProvider >　// Added
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlerProvider>
    </GithubProvider>
  );
}

export default App;
~~~
#### Alert Component
userSeachコンポーネントにAlertContext, setAlert関数を実装する
~~~js
import {useState, useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext' // added
import GithubContext from '../../context/github/GithubContext' 

function UserSearch() {
  const [text, setText] = useState('')
  const {users, searchUsers, clearUsers} = useContext(GithubContext)
  const {setAlert} = useContext(AlertContext)

  const handleChange = (e) => setText(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text ==='') {
      // alert('Please enter something')
      setAlert('Please enter something', 'error') // added
    } else {
      searchUsers(text)
      setText('')
    }
  }
  console.log(users)
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grod-cols-2 md:grid-cols-2 mb-8 gap-8">
    　　＝＝＝省略＝＝＝
~~~
Alertコンポーネントを作成する
~~~js
// /src/components/layout/Alert.jsx
function Alert() {
  return (
    <div>Alert</div>
  )
}

export default Alert
~~~
App.jsxにAlertコンポーネントを実装する
~~~js
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { GithubProvider } from './context/github/GithubContext';
import { AlerProvider } from './context/alert/AlertContext';
import Alert from './components/layout/Alert'; // added

function App() {
  return (
    <GithubProvider >
      <AlerProvider >
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />  // added
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlerProvider>
    </GithubProvider>
  );
}

export default App;
~~~
Alert.jsxにAlertContextを実装する
~~~js
// /src/components/layout/Alert.jsx
import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"

function Alert() {
  const {alert} = useContext(AlertContext)

  return (alert !==null) && (
      <p className="flex items-start mb-4 space-x-2">
      {alert.type==='error' && (
        console.log('error msg')
      )}
      </p>
  )
}
export default Alert
~~~
Alert.jsxにエラーメッセージの画像SVGを追加する
~~~js
// /src/components/layout/Alert.jsx
import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"

function Alert() {
  const {alert} = useContext(AlertContext)

  return (alert !==null) && (
      <p className="flex items-start mb-4 space-x-2">
      {alert.type==='error' && (
        // console.log('error msg')
        <svg
        fill='none'
        viewBox='0 0 24 24'
        className='w-6 h-6 stroke-current mr-3'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
        ></path>
      </svg>
      )}
      <p className="flex-1 text-base font-semibold leading-7 text-white">
        <strong>{alert.msg}</strong>
      </p>
      </p>
  )
}

export default Alert
~~~

### Get Single User
 User.jsxを作成
~~~js
// src/pages/User.jsx
function User() {
  return (
    <div>User</div>
  )
}

export default User
~~~
App.jsxにUserコンポーネントを取り込む　ルートはpath='/user/:login'
~~~js
import About from './pages/About';
import { GithubProvider } from './context/github/GithubContext';
import { AlerProvider } from './context/alert/AlertContext';
import Alert from './components/layout/Alert';
import User from './pages/User';  // added

function App() {
  return (
    <GithubProvider >
      <AlerProvider >
        <Router>
          <div className="bg-gray-300 flex flex-col justify-between h-screen">
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/user/:login' element={<User />} />   // added
                <Route path='/notfound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlerProvider>
    </GithubProvider>
  );
}

export default App;
~~~



single userを取得するgetUser関数を作成
~~~js
// /src/context/github/GithubContext.js
import { createContext, useReducer  } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},　// added
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results  fetchUsers => seachUsers
  const searchUsers = async(text) => {
    setLoading()
    const params = new URLSearchParams({
      q: text
    })

    // https://api.github.com/search/users?q=brad
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    // const data = await response.json()
    const {items} = await response.json()
    console.log(items)
    
    // setUsers(data)
    // setLoading(false)
    dispatch({
      type: 'GET_USERS',
      payload: items
    })
  }

  // Get single user
  const getUser = async(login) => {   // added

    setLoading()

    // https://api.github.com/search/users?brad
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })

    if (response.status===404) {
      window.location = '/notfound'
    } else {
      const data = await response.json()
      dispatch({
        type: 'GET_USER',
        payload: data
      })
    }
  }

  // Clear users from state
  const clearUsers = async() => {
    dispatch({
      type: 'CLEAR_USERS'
    })
  }

  // Set loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <GithubContext.Provider value={{
    users: state.users, 
    loading: state.loading,
    user: state.user,
    searchUsers,
    clearUsers,
    getUser,
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~

UserコンポーネントにuseEffectとuseContextを使ってuserを取得する  
paramsの取得がV5とv6で異なる  
V5のときmatch.params.loginを使う
~~~js
// src/pages/User.jsx
import {useEffect, useContext} from 'react'
import GithubContext from '../context/github/GithubContext'

function User({match}) {　　// added
  const {getUser, user} = useContext(GithubContext)

  useEffect(()=> {
    getUser(match.params.login)　// V5のとき
  }, [])

  return (
    <div>User</div>
  )
}

export default User
~~~
V6のときuseParamsを使う
~~~js
// src/pages/User.jsx
import {useEffect, useContext} from 'react'
import GithubContext from '../context/github/GithubContext'
import {useParams} from 'react-router-dom'  // V6

function User() {
  const {getUser, user} = useContext(GithubContext)
  const params = useParams()   // V6の時

  useEffect(()=> {
    getUser(params.login)
  }, [])
  console.log('params-user: ', user)
  return (
    <div>{user.login}</div>
    // <div>User</div>
  )
}

export default User
~~~

### User Profile Top
~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~