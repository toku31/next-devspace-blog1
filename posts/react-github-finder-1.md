---
title: 'Github Finder -1-'
date: 'October 10, 2022'
excerpt: 'Reactを使ってGithubのユーザを表示するアプリをつくりました。1回目はUIを実装していきます'
cover_image: '/images/posts/img7.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

## Setup Tailwind & Daisy UI
https://codesandbox.io/s/github/bradtraversy/github-finder/tree/master/?file=/src/App.js  
https://github.com/bradtraversy/github-finder-app  
https://tailwindcss.com/docs/guides/create-react-app  
https://daisyui.com
~~~bash
user@mbp React % npx create-react-app github-finder --use-npm
user@mbp React % npm install -D tailwindcss postcss autoprefixer
user@mbp github-finder % npx tailwindcss init -p 
~~~

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

~~~js
user@mbp github-finder % npm i daisyui 
~~~

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
  plugins: [require('daisyui')], // added
}
~~~

~~~js
npm start
~~~
Tailwindが正しくインストールされているか確認
~~~js
// App.js
function App() {
  return (
    <div className="bg-purple-500">
      <h1>Hello World</h1>
      <button className='btn'>Click</button>
    </div>
  );
}

export default App;
~~~
確認後
~~~js
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
~~~
### Navbar Component
npm i react-router-dom react-icons
~~~js
// src/components/layout/Navbar.jsx
function Navbar() {
  return (
    <div>Navbar</div>
  )
}
export default Navbar
~~~

~~~js
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main>Content</main>
      </div>
    </Router>
  );
}
~~~

~~~js
// src/components/layout/Navbar.jsx
import {FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
      Navbar
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder'
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
~~~
Navbarの作成
~~~js
// src/components/layout/Navbar.jsx
import {FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className='inline pr-2 text-3xl'/>
          <Link to='/' className='text-lg font-bold  align-middle'>
            {title}
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to='/' className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link to='/about' className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder'
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
~~~
Footerの作成
~~~js
// src/components/layout/Footer.jsx
function Footer() {
  const footerYear = new Date().getFullYear()

  return (
    <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
      <div>
      <svg
          width='50'
          height='50'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          fillRule='evenodd'
          clipRule='evenodd'
          className='inline-block fill-current'
        >
          <path d='M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z'></path>
        </svg>
        <p>Copyright &copy; {footerYear} All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
~~~
#### Pages & Routes
srcフォルダにpagesフォルダを作成しその中にAbout.jsx, Home.jsx, NotFound.jsxを作成する
~~~js
// App.jsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';

function App() {
  return (
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
  );
}

export default App;
~~~
About.pageの作成
~~~js
function About() {
  return (
    <div>
      <h1 className='text-6xl mb-4'>Github Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a href='https://www.udemy.com/course/modern-react-front-to-back/'>
          {' '}
          React Frontend Projects
        </a>{' '}
        inspired by
        <strong>
          <a href='https://traversymedia.com'> Brad Traversy</a>
        </strong>
        .
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Layout By:
        <a className='text-white' href='https://twitter.com/hassibmoddasser'>
          Hassib Moddasser
        </a>
      </p>
    </div>
  )
}

export default About
~~~
### Github API
http://api.github.com/users  
http://api.github.com/users/bradtraversy  
~~~js
{
  "login": "toku31",
  "id": 49910202,
  "node_id": "MDQ6VXNlcjQ5OTEwMjAy",
  "avatar_url": "https://avatars.githubusercontent.com/u/49910202?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/toku31",
  "html_url": "https://github.com/toku31",
  "followers_url": "https://api.github.com/users/toku31/followers",
  "following_url": "https://api.github.com/users/toku31/following{/other_user}",
  "gists_url": "https://api.github.com/users/toku31/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/toku31/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/toku31/subscriptions",
  "organizations_url": "https://api.github.com/users/toku31/orgs",
  "repos_url": "https://api.github.com/users/toku31/repos",
  "events_url": "https://api.github.com/users/toku31/events{/privacy}",
  "received_events_url": "https://api.github.com/users/toku31/received_events",
  "type": "User",
  "site_admin": false,
  "name": null,
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 46,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2019-04-23T12:59:25Z",
  "updated_at": "2022-10-22T00:04:06Z"
~~~
検索：https://api.github.com/search/users?q=toku

.envファイル作成
~~~js
// .env
REACT_APP_GITHUB_TOKEN = "--省略--"
REACT_APP_GITHUB_URL = "https://api.github.com"
~~~

### UserList component
src/components/users/UserResults.jsxを作成して以下のようにHome.jsxに取り込む
~~~js
import UserResults from "../components/users/UserResults"

function Home() {
  return (
    <div>
    {/* Search Component */}
    <h1>Hello</h1>
    {/* {process.env.REACT_APP_GITHUB_TOKEN} */}
      <UserResults />
    </div>
  )
}

export default Home
~~~
ユーザをコンソールに出力
~~~js
// components/users/UserResults.jsx
import { useEffect } from "react"

function UserResults() {
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async() => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await response.json()
    console.log(data)
  }

  return (
    <div>UserResults</div>
  )
}
export default UserResults
~~~
ユーザを画面に出力
~~~js
// components/users/UserResults.jsx
import { useEffect, useState } from "react"

function UserResults() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async() => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await response.json()
    console.log(data)
    setUsers(data)
    setLoading(false)
  }

  if(!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

export default UserResults
~~~
### Loading Spinner
~~~js
// src/components/layout/Spinner.jsx
import spinner from './assets/spinner.gif'

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img width={180} className="text-center mx-auto" src={spinner} alt="Loading..." />
    </div>
  )
}

export default Spinner
~~~

#### Display Users
~~~js
// src/components/users/UserResults.jsx
import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"

function UserResults() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async() => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await response.json()
    console.log(data)
    setUsers(data)
    setLoading(false)
  }

  if(!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          // <h3>{user.login}</h3>
          <UserItem index={user.id} user={user} /> // Changed
        ))} 
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
~~~

~~~js
// src/components/users/UserItem.jsx
import Proptypes from 'prop-types'

function UserItem({user}) {
  return (
    <div>{user.login}</div>
  )
}

UserItem.propTypes = {
  user: Proptypes.object.isRequired
}

export default UserItem
~~~

~~~js
// src/components/users/UserItem.jsx
import Proptypes from 'prop-types'
import {Link} from 'react-router-dom'

function UserItem({user: {login, avatar_url}}) {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className='avatar'>
              <div className="rounded-full shadow w-14 h-14">
                <img src={avatar_url} alt="Profile" />
              </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <Link className='text-base-content text-opacity-40' to={`/users/${login}`}>
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: Proptypes.object.isRequired
}
export default UserItem
~~~
#### Setup Github Context
~~~js
//src/context/github/GithubContext.js
import { createContext, useState  } from "react";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async() => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    const data = await response.json()
    console.log(data)
    
    setUsers(data)
    setLoading(false)
  }

  return <GithubContext.Provider value={{
    users, 
    loading
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~

~~~js
// App.jsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import { GithubProvider } from './context/github/githubContext'; // added

function App() {
  return (
    <GithubProvider >  // added
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
    </GithubProvider>  // added
  );
}

export default App;
~~~

~~~js
// src/components/users/UserResults.jsx
import { useEffect, useContext} from "react"
import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"
import GithubContext from "../../context/github/githubContext" // added

function UserResults() {

  const { users, loading, fetchUsers } = useContext(GithubContext) // added

  useEffect(() => {
    fetchUsers()
  }, [])

  if(!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem index={user.id} user={user} />
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }
}

export default UserResults
~~~
#### Reducers & useReducer Hooks
Reducerの参考サイト:https://www.robinwieruch.de/javascript-reducer/  
~~~js
 a reducer is a function which takes two arguments,   
 the current state and an action, 
 and returns based on both arguments a new state. 
 (state, action) => newState
~~~

~~~js
function counterReducer(state, action) {
  return state + 1;
}
~~~
アロー関数
~~~js
const counterReducer = (state, action) => {
  return state + 1;
};
~~~
 The action is normally defined as an object with a type property. 
 Based on the type of the action, the reducer can perform conditional state transitions:
~~~js
const counterReducer = (count, action) => {
  switch (action.type) {
    case 'INCREASE':
      return count + 1;
    case 'DECREASE':
      return count - 1;
    default:
      return count;
  }
};
~~~
GithubReducer.jsを作成する
~~~js
// src/context/github/GithubReducer.js
const githubReducer = (state, action) => {
  switch(action.type) {
    default:
      return state
  }
}
export default githubReducer
~~~
Reducer を用いるのでuseStateの代わりにuseReducerを使う
~~~js
//src/context/github/GithubContext.js
import { createContext, useReducer  } from "react"; // Changed
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)
  const initialState = {
    users: [],
    loading: true
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const fetchUsers = async() => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    const data = await response.json()
    console.log(data)
    
    // setUsers(data)
    // setLoading(false)
    dispatch({   // added
      type: 'GET_USERS',
      payload: data
    })
  }

  return <GithubContext.Provider value={{
    users: state.users,  // Changed
    loading: state.loading,  // Changed
    fetchUsers
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~

~~~js
// src/context/github/GithubReducer.js
const githubReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    default:
      return state
  }
}
export default githubReducer
~~~

#### Clean up FetchUsers
initialStateのloading:true をtue→falseにして、fetchUsers関数が呼ばれるときにfalse→trueになるようにする  
~~~js
// src/context/github/GithubReducer.js
const githubReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case 'SET_LOADING':  // added
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
export default githubReducer
~~~
initialState のloadingをfalseにする  
setLoadingを作成する
~~~js
//src/context/github/GithubContext.js
import { createContext, useReducer  } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false // changed
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)
   // Get initial users (testing purposes)
  const fetchUsers = async() => {
    setLoading()　// added

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    const data = await response.json()
    console.log(data)
    
    dispatch({
      type: 'GET_USERS',
      payload: data
    })
  }

  // Set loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})  // added

  return <GithubContext.Provider value={{
    users: state.users, 
    loading: state.loading,
    fetchUsers,
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~

### User Search Component
~~~js
// src/pages/Home.jsx
import UserResults from "../components/users/UserResults"
import UserSearch from "../components/users/UserSearch"

function Home() {
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  )
}

export default Home
~~~
formがあるとき、useStateを使う
~~~js
// src/components/users/UserSearch.jsx
import {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'

function UserSearch() {
  const [text, setText] = useState('')　// added
  const {users} = useContext(GithubContext)  // added

  const handleChange = (e) => setText(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text ==='') {
      alert('Please enter something')
    } else {
      // @todo - search users
      setText('')
    }
  }
  console.log(users)
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grod-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input 
                type="text" 
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder ="Search"
                value = {text}
                onChange = {handleChange}
              />
              <button 
                type="submit"
                className="absolute top-0 right-0  rounded-l-none w-36 btn btn-lg" 
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (  // added
        <div>
          <button className="btn btn-ghost btn-lg">Clear</button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
~~~
### Search Users
https://api.github.com/search/users?q=brad
~~~js
//src/context/github/GithubContext.js
import { createContext, useReducer  } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get search results  fetchUsers => seachUsers
  const searchUsers = async(text) => {   // Change
    setLoading()
    const params = new URLSearchParams({  // added
      q: text
    })

    // https://api.github.com/search/users?q=brad
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {  // Change
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    // const data = await response.json()
    const {items} = await response.json()  // Change
    console.log(items)
    
    dispatch({
      type: 'GET_USERS',
      payload: items
    })
  }

  // Set loading
  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <GithubContext.Provider value={{
    users: state.users, 
    loading: state.loading,
    searchUsers,  // Change
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~
### Clear users
githubReducerにtype('CLEAR_USERS')を追加
~~~js
// src/context/github/GithubReducer.js
const githubReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'CLEAR_USERS':  // added
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}
export default githubReducer
~~~

GithubContextにclearUser関数を追加
~~~js
//src/context/github/GithubContext.js
import { createContext, useReducer  } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(true)
  const initialState = {
    users: [],
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

  // Clear users from state　　 added
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
    searchUsers,
    clearUsers,  // added
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~

UserSearchコンポーネントにclearUsersを実装する
~~~js
import {useState, useContext} from 'react'
import GithubContext from '../../context/github/GithubContext'

function UserSearch() {
  const [text, setText] = useState('')
  const {users, searchUsers, clearUsers} = useContext(GithubContext)　// Changed

  const handleChange = (e) => setText(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text ==='') {
      alert('Please enter something')
    } else {
      // @todo - search users
      searchUsers(text)
      setText('')
    }
  }
  console.log(users)
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grod-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input 
                type="text" 
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder ="Search"
                value = {text}
                onChange = {handleChange}
              />
              <button 
                type="submit"
                className="absolute top-0 right-0  rounded-l-none w-36 btn btn-lg" 
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button 
            className="btn btn-ghost btn-lg"
            onClick={clearUsers}  // Changed
          >
              Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~