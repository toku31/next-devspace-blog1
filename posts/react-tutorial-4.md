---
title: 'React Tutorial -4-'
date: 'September 23, 2022'
excerpt: 'Reatの基礎のメモ書きです 4回目はAPIs & HTTp Requests など学びます'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
https://github.com/bradtraversy/feedback-app
https://feedback-app-ten-orpin.vercel.app/  
https://github.com/toku31/feedback-app
#### APIs & Requests Explained

Get  /feedback  
Get  /feedback/1  
POST  /feedback  
PUT  /feedback/1  
DELETE  /feedback/1  

HTT STATUS CODES  
1XX infomational  
2XX Success  
3XX Redirect  
4XX Client Error  
5XX Server Error

#### Setting Up JSON Server Mock Backend
https://www.npmjs.com/package/json-server  

~~~js
user@mbp feedback-app % npm i json-server 
~~~
~~~js
// package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server --watch db.json --port 5000" // added
  },
~~~

~~~
// db.json
{
  "feedback": [
    {
      "id": 1,
      "rating": 10,
      "text": "This is feedback item 1 coming from backend" 
    },
    {
      "id": 2,
      "rating": 8,
      "text": "This is feedback item 2 coming from backend" 
    },
    {
      "id": 3,
      "rating": 8,
      "text": "This is feedback item 3 coming from backend" 
    }
  ]
}
~~~

~~~
user@mbp feedback-app % npm run server
~~~
Postman  
GET:http://localhost:5000/feedback/  
POST:http://localhost:5000/feedback  
Body->x-www-form-urlencoded->rating:9,text:new feedback item
### Run Client & Server Concurrently
~~~
user@mbp feedback-app % npm i concurrently
~~~

~~~js
{
  "name": "feedback-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "concurrently": "^7.4.0",
    "framer-motion": "^4.1.17",
    "json-server": "^0.17.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.4.0",
    "react-router-dom": "^6.4.2",
    "react-scripts": "5.0.1",
    "uuid": "^9.0.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server --watch db.json --port 5000",
    "dev": "concurrently \"npm run server\" \"npm start\""  // added
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
~~~
npm run dev  
npm start & npm run server  
http://localhost:5000/feedback

### Fetch Data from JSON-Server Backend
1 useStateのダミーデータを空にするuseState([])  
2 useEffectを追加してconsole.log(123)で確認  
3 fetchFeedbackを作成とconsole.log(data)確認してuseEffect内に実装する  
4 isLoadingフラグを設定してvalueに追加する

~~~js
// ¥src/context/FeedbackContext.js
import { v4 as uuidv4 } from 'uuid'
import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=> {
  const [isLoading, setIsLoading] = useState(true) // added 4
  const [feedback, setFeedback] = useState([])  // changed 1
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {   // added 2
    console.log(123)
    fetchFeedback()  // added 3
  }, [])

  // Fectch feedback added 3
  const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    console.log(data)
    setFeedback(data)
    setIsLoading(false) // added 4
  }

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    // console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])
  }
  // deleet feedback
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = (id, updItem)=> {
    // console.log(id, updItem)
    setFeedback(feedback.map((item)=> (
      item.id ===id ? {...item, ...updItem} : item
    )))
  }

  // 編集項目　Set item to be updated
  const editFeedback = (item)=> {
    setFeedbackEdit({
      item: item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{feedback:feedback, 
    deleteFeedback:deleteFeedback, // deleteFeedbackのみの省略可
    addFeedback: addFeedback,
    editFeedback: editFeedback,
    feedbackEdit: feedbackEdit,
    updateFeedback: updateFeedback,
    isLoading: isLoading, // added 4
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
~~~
#### Spinnerを作成
1 src/components/assets/spinner.gifを追加  
2 FeedbackList.jsxのuseStateにisLoadingを追加  
3 if (!isLoading && (!やreturn isLoading ? などの条件文を追加  
4 F12 -> Network->No throttingをslow3Gにして確認  
5 Spinnerコンポーネントを作成する  
~~~js
// ¥src/components/shared/Spinner.js
 import spinner from '../assets/spinner.gif'
  
  function Spinner() {
    return <img src={spinner} alt='Loading...' 
    style={{width: '100px', margin: 'auto', display: 'block'}} />
  }
  
  export default Spinner
~~~
6 FeedbackList.jsxにSpinner.jsxを追加
~~~js
// ¥src/components/FeedbackList.js
import {motion, AnimatePresence} from 'framer-motion'
import {useContext} from 'react'
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner' // added

function FeedbackList() {
  const {feedback, isLoading} = useContext(FeedbackContext)

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }
 
  return isLoading ? (
    // <h1>Loading...</h1>
    <Spinner /> // added
    ) :(
    <div className="fee
~~~
### Add Feedback & Setting a Proxy
1 package.jsonに "proxy": "localhost://localhost:5000"を追加  
2 FeedbackContext.jsxのawait fetch(`http:locahhost:5000〜'のhttp:locahhost:5000を削除
~~~js
{
  "name": "feedback-app",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:5000", // added　１
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
~~~

~~~js
//src¥context¥FeedbackContext.jsx
  // Fectch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`) // Changed 2
    const data = await response.json()
    console.log(data)
    setFeedback(data)
    setIsLoading(false)
  }
~~~
3 addFeedbackもJSONサーバーのDBにPOSTする
~~~js
//src¥context¥FeedbackContext.jsx
  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()
    setFeedback([data, ...feedback])
  }

  // const addFeedback = (newFeedback) => {
  //   newFeedback.id = uuidv4()
  //   // console.log(newFeedback)
  //   setFeedback([newFeedback, ...feedback])
  // }
~~~
### Update & Delete from JSON-Server
JSONサーバのDBを削除する
~~~js
//src¥context¥FeedbackContext.jsx
  // deleet feedback
  const deleteFeedback =async (id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'} )  // added
      setFeedback(feedback.filter((item)=> item.id !== id)) 
    }
  }
~~~

~~~js
//src¥context¥FeedbackContext.jsx
  // Update feedback item
  const updateFeedback = async (id, updItem)=> {
    // console.log(id, updItem)
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json() // awaitを忘れない

    setFeedback(feedback.map((item)=> (
      item.id ===id ? {...item, ...data} : item
    )))
  }
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

~~~