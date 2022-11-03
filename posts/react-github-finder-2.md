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
ユーザプロファイル情報を追加していく　初めはアバターから
~~~js
// src/pages/User.jsx
import  {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import {useParams} from 'react-router-dom'  // V6
import Spinner from '../components/layout/Spinner'

function User() {
  const {getUser, user, loading} = useContext(GithubContext)
  const params = useParams()

  useEffect(()=> {
    getUser(params.login)
  }, [])

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  if (loading) {
    return <Spinner />
  }

  console.log('params-user: ', user)
  return (
    // <div>{user.login}</div>
    <>
      <div className="w-full max-auto lg:w-10/12" >
        <div className="mb-4">
          <Link to='/' className='btn btn-ghost'>
            Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default User
~~~
その他の情報を表示できるようにする
~~~js
// src/pages/User.jsx
import  {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import {useParams} from 'react-router-dom'  // V6
import Spinner from '../components/layout/Spinner'

function User() {
  const {getUser, user, loading} = useContext(GithubContext)
  const params = useParams()

  useEffect(()=> {
    getUser(params.login)
  }, [])

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user

  if (loading) {
    return <Spinner />
  }

  console.log('params-user: ', user)
  return (
    // <div>{user.login}</div>
    <>
      <div className="w-full max-auto lg:w-10/12" >
        <div className="mb-4">
          <Link to='/' className='btn btn-ghost'>
            Back to Search
          </Link>
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure>
                <img src={avatar_url} alt='' />
              </figure>
              <div className='card-body justify-end'>
                <h2 className='card-title mb-0'>{name}</h2>
                <p className='flex-grow-0'>{login}</p>
              </div>
            </div>
          </div>

          <div className='col-span-2'>
              <div className='mb-6'>
                <h1 className='text-3xl card-title'>
                  {name}
                  <div className='ml-2 mr-1 badge badge-success'>{type}</div>
                  {hireable && (
                    <div className='mx-1 badge badge-info'>Hireable</div>
                  )}
                </h1>
                <p>{bio}</p>
                <div className='mt-4 card-actions'>
                  <a
                    href={html_url}
                    target='_blank'
                    rel='noreferrer'
                    className='btn btn-outline'
                  >
                    Visit Github Profile
                  </a>
                </div>
              </div>

              <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
                {location && (
                  <div className='stat'>
                    <div className='stat-title text-md'>Location</div>
                    <div className='text-lg stat-value'>{location}</div>
                  </div>
                )}
                {blog && (
                  <div className='stat'>
                    <div className='stat-title text-md'>Website</div>
                    <div className='text-lg stat-value'>
                      <a href={`https://${blog}`} target='_blank' rel='noreferrer'>
                        {blog}
                      </a>
                    </div>
                  </div>
                )}
                {twitter_username && (
                  <div className='stat'>
                    <div className='stat-title text-md'>Twitter</div>
                    <div className='text-lg stat-value'>
                      <a
                        href={`https://twitter.com/${twitter_username}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {twitter_username}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
            <div className='grid grid-cols-1 md:grid-cols-4'>
              <div className='stat'>
                <div className='stat-figure text-secondary'>
                  <FaUsers className='text-3xl md:text-5xl' />
                </div>
                <div className='stat-title pr-5'>Followers</div>
                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                  {followers}
                </div>
              </div>

              <div className='stat'>
                <div className='stat-figure text-secondary'>
                  <FaUserFriends className='text-3xl md:text-5xl' />
                </div>
                <div className='stat-title pr-5'>Following</div>
                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                  {following}
                </div>
              </div>

              <div className='stat'>
                <div className='stat-figure text-secondary'>
                  <FaCodepen className='text-3xl md:text-5xl' />
                </div>
                <div className='stat-title pr-5'>Public Repos</div>
                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                  {public_repos}
                </div>
              </div>

              <div className='stat'>
                <div className='stat-figure text-secondary'>
                  <FaStore className='text-3xl md:text-5xl' />
                </div>
                <div className='stat-title pr-5'>Public Gists</div>
                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                  {public_gists}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default User
~~~

### GET USER REPOS
reposとgetUserReposを追加する
~~~js
// /src/context/github/GithubContext.js
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
    user: {},
    repos: [],  // added
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
  const getUser = async(login) => {
    setLoading()

    // https://api.github.com/search/users?q=brad
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

  // Get user repos 64   
  const getUserRepos = async(login) => {　// added loginはユーザネーム
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    const data = await response.json()
      
    dispatch({
      type: 'GET_REPOS',
      payload: data
    })
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
    repos: state.repos,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos,
    }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext
~~~

GithubReducerのaction.typeに'GET_REPOS'を追加する
~~~js
// /src/context/github/GithubReducer.js
const githubReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case 'GET_REPOS':  // added
      return {
        ...state,
        repos: action.payload,
        loading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'CLEAR_USERS':
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
User.jsxにreposとgetUserReposを実装する  
// eslint-disable-next-line react-hooks/exhaustive-depsを付けるとエラーが消える
~~~js
import  {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import {useParams} from 'react-router-dom'  // V6
import Spinner from '../components/layout/Spinner'
import RepoLIst from '../components/repos/RepoLIst' // added

function User() {
  const {getUser, user, loading, getUserRepos, repos} = useContext(GithubContext) // Changed
  const params = useParams()

  useEffect(()=> {
    getUser(params.login)
    getUserRepos(params.login)  // added
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
      ===省略===
              <div className='stat'>
                <div className='stat-figure text-secondary'>
                  <FaStore className='text-3xl md:text-5xl' />
                </div>
                <div className='stat-title pr-5'>Public Gists</div>
                <div className='stat-value pr-5 text-3xl md:text-4xl'>
                  {public_gists}
                </div>
              </div>
            </div>
          </div>

          <RepoLIst repos={repos}/> // added
        </div>
    </>
  )
}
export default User
~~~
getUserReposを最新10個のリポジトリリストを出力するように変更
~~~js
// /src/context/github/GithubContext.js
  const getUserRepos = async(login) => {
    setLoading()

    const params = new URLSearchParams({  // added
      sort: 'created',
      per_page: 10,
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, { // added
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      },
    })
    const data = await response.json()
~~~

~~~js
//src/components/repos/RepoList.jsx
import PropTypes from 'prop-types'

function RepoLIst({repos}) {
  return (
    <div className='rounded-lg shallow-lg card bg-base-100'>
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Reposotories
        </h2>
          {repos.map((repo) => {
            return (
              // <h3>{repo.name}</h3>
              <RepoItem repo={repo}  key={repo.name}/>
            ) 
          })}
      </div>
    </div>
  )
}

RepoLIst.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default RepoLIst
~~~

~~~js
//src/components/repos/RepoItem.jsx
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import PropTyeps from 'prop-types'

function RepoItem({repo}) {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo

  return (
    <div className='mb-2 rounded-md card bg-base-200 hover:bg-base-300'>
      <div className='card-body'>
        <h3 className='mb-2 text-xl font-semibold'>
          <a href={html_url}>
            <FaLink className='inline mr-1' /> {name}
          </a>
        </h3>
        <p className='mb-3'>{description}</p>
        <div>
          <div className='mr-2 badge badge-info badge-lg'>
            <FaEye className='mr-2' /> {watchers_count}
          </div>
          <div className='mr-2 badge badge-success badge-lg'>
            <FaStar className='mr-2' /> {stargazers_count}
          </div>
          <div className='mr-2 badge badge-error badge-lg'>
            <FaInfo className='mr-2' /> {open_issues}
          </div>
          <div className='mr-2 badge badge-warning badge-lg'>
            <FaUtensils className='mr-2' /> {forks}
          </div>
        </div>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTyeps.object.isRequired
}
export default RepoItem
~~~

### Move SearchUsers To Actions
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

~~~js

~~~

