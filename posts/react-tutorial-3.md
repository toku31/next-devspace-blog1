---
title: 'React Tutorial -3-'
date: 'September 22, 2022'
excerpt: 'Reatの基礎のメモ書きです 3回目はContext API, useContext Hook & Deployment など学びます'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

https://github.com/bradtraversy/feedback-app  
#### Create a Context & Provider 
参考(Obsidean): 52 Contacts Context & Global State  
~~~js
// \src\context\feedbackContext.js
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=> {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10
    }
  ])

  return <FeedbackContext.Provider value={{feedback:feedback }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
~~~
下のimport { FeedbackProvider } from './context/FeedbackContext' は  
上のexport const FeedbackProvider =({chidlren})=>{} からインポートしているので{ }で囲む必要がある。  
export default 〜なら { } は不要
~~~js
// App.js
import { v4 as uuidv4 } from 'uuid'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import FeedbackForm from './components/ FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from "./components/Header"
import FeedbackData from './data/FeedbackData'
import AboutPage from './pages/AboutPage'
import AbouticonLink from './components/AbouticonLink'
import { FeedbackProvider } from './context/FeedbackContext' // added

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    // console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])
  }

  return(
    <FeedbackProvider> // added
      <Router>
        <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm handleAdd={addFeedback} /> 
                <FeedbackStats feedback={feedback}  /> 
                <FeedbackList feedback={feedback}  handleDelete={deleteFeedback}/> 
              </>
            }></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AbouticonLink />
        </div>
      </Router>
    </FeedbackProvider>  // added
  )
}
export default App
~~~

#### Get Global State with The useContext Hook
前回作成したFeedbackContextをFeedbackListコンポーネントに実装する
~~~js
// components¥FeedbackList.jsx
import {motion, AnimatePresence} from 'framer-motion'
import {useContext} from 'react'　// added
import FeedbackItem from "./FeedbackItem"
import FeedbackContext from '../context/FeedbackContext' // added
// import PropTypes from 'prop-types' // 削除

function FeedbackList({handleDelete}) {  // feedback削除
  const {feedback} = useContext(FeedbackContext) // added

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
 
  return (
  <div className="feedback-list">
    <AnimatePresence>
    {feedback.map((item)=> (
      <motion.div 
        key={item.id} 
        initial={{opacity:0}} 
        animate={{opacity:1}} 
        exit={{opacity:0}}
      >
        <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
      </motion.div>
    ))}
    </AnimatePresence>
  </div>
  )
}

//   return (
//   <div className="feedback-list">
//     {feedback.map((item)=> (
//       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
//     ))}
//   </div>
//   )
// }

// FeedbackList.propTypes = {  // 削除
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       Text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   )

export default FeedbackList
~~~
同様にFeedbackContextをFeedbackStatsコンポーネントに実装する
~~~js
// components¥FeedbackStats.jsx
// import PropTypes from 'prop-types' // 削除
import {useContext} from 'react'　// added
import FeedbackContext from '../context/FeedbackContext' // added

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext) // added
  // Calcurating rating avg
  let average = feedback.reduce((acc, cur) => {
    return acc + cur.rating
  }, 0) / feedback.length
  // 小数第一位まで表示、末尾が０の時は省略
  average = average.toFixed(1).replace(/[.,]0$/, '')
  // console.log(average)
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Review</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

// FeedbackStats.propTypes = {  // deleted
//   feedback: PropTypes.array.isRequired
// }

export default FeedbackStats
~~~

~~~js
function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    // console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])
  }

  return(
    <FeedbackProvider>
      <Router>
        <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={
                <FeedbackForm handleAdd={addFeedback} /> 
                <FeedbackStats /> // feedback={feedback} 削除
                <FeedbackList handleDelete={deleteFeedback}/> //feedback={feedback} 削除
            }></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AbouticonLink />
        </div>
      </Router>
    </FeedbackProvider> 
  )
}

export default App
~~~
#### Moving Functions to Context
~~~js
// \src\context\feedbackContext.js
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=> {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context',
      rating: 10
    }
  ])
  // App.jsにあったdeleteFeedbackメソットをこちらに移動する
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }
　　// deleteFeedbackをvalueに追加（{feedback, deleteFeedback}のように省略可）
  return <FeedbackContext.Provider value={{feedback:feedback, deleteFeedback:deleteFeedback}}>　 
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
~~~
App.jsの<FeedbackList  handleDelete={deleteFeedback}/>のhandleDelete={deleteFeedback}を削除  
FeedbackList.jsにあるfunction FeedbackList({handleDelete}) の{handleDelete}を削除  
 FeedbackItem key={item.id} item={item} handleDelete={handleDelete} のhandleDelete={handleDelete}を削除   
 function FeedbackItem({item, handleDelete })の handleDeleteを削除
~~~js
// src¥components¥FeedbackItem.jsx
import { FaTimes } from 'react-icons/fa'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'
// import PropTypes from 'prop-types' 削除
import Card from "./shared/Card"

function FeedbackItem({item}) {
  const {deleteFeedback} = useContext(FeedbackContext)

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}>
        <FaTimes color='purple' />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

// FeedbackItem.propTypes = {　　 //削除
//   item: PropTypes.object.isRequired,
// }
export default FeedbackItem
~~~

~~~js
// App.js
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import { useState } from 'react' 削除
import FeedbackForm from './components/ FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from "./components/Header"
// import FeedbackData from './data/FeedbackData' 削除
import AboutPage from './pages/AboutPage'
import AbouticonLink from './components/AbouticonLink'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {
  // const [feedback, setFeedback] = useState(FeedbackData) 削除

  return(
    <FeedbackProvider>
      <Router>
        <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm /> 
                <FeedbackStats />
                <FeedbackList />
              </>
            }></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AbouticonLink />
        </div>
      </Router>
    </FeedbackProvider> 
  )
}

export default App
~~~
FeedbackForm.jsxにFeedbackContextのaddFeedback関数を実装する
~~~js
// components¥FeedbackForm.jsx
import { useState, useContext } from "react" // useContextの追加
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"
import FeedbackContext from '../context/FeedbackContext' // added

function  FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const {addFeedback} = useContext(FeedbackContext) // added

  const handleTextChange =(e)=> {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10 ) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit=(e)=> {
    e.preventDefault()
    if (text.trim().length > 10){
      const newFeedback = {
        text, // 省略形　 text: text
        rating, // 省略形　 rating: rating
      }
      // console.log(newFeedback)
      addFeedback(newFeedback) // handleAddの代わりにaddFeedback を呼ぶ
      setText('')
    }
  }

  return (
    <Card> 
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
          <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} placeholder="Wite a review"/>
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}
export default  FeedbackForm
~~~
#### Edit Feedback Event
編集ボタンの追加
~~~js
// src¥components¥FeedbackItem.jsx
import { FaTimes, FaEdit } from 'react-icons/fa' // FaEdit added
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'
import Card from "./shared/Card"

function FeedbackItem({item}) {
  const {deleteFeedback} = useContext(FeedbackContext)

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}>
        <FaTimes color='purple' />
      </button>
      <button className="edit" > // added
        <FaEdit color='purple' />  // added
      </button>  // added
      <div className="text-display">{item.text}</div>
    </Card>
  )
}
export default FeedbackItem
~~~

~~~js
// \src\context\feedbackContext.js
import { v4 as uuidv4 } from 'uuid'
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=> {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is from context1',
      rating: 10
    },
    {
      id: 2,
      text: 'This item is from context2',
      rating: 9
    },
    {
      id: 3,
      text: 'This item is from context3',
      rating: 7
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }
  // deleet feedback
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }
  // Set item to be updated
  const editFeedback = (item)=> {
    setFeedbackEdit({
      item: item,
      edit: true
    })
  }

  return <FeedbackContext.Provider value={{feedback:feedback, 
    deleteFeedback:deleteFeedback, // deleteFeedbackのみの省略可
    addFeedback: addFeedback,
    editFeedback: editFeedback,  // added
    feedbackEdit: feedbackEdit, // added
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
~~~
### Side Effects with useEffect
useEffectを使ってeditボタンがクリックされるとフォームの入力欄に値が表示されるようにする
~~~js
// components/FeedbackForm.jsx
mport { useState, useContext, useEffect } from "react" // added
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"
import FeedbackContext from '../context/FeedbackContext'

function  FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const {addFeedback, feedbackEdit} = useContext(FeedbackContext)
　// 以下追加
  useEffect(()=> {
    console.log('editbox clicked')
  },[feedbackEdit])

  const handleTextChange =(e)=> {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10 ) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit=(e)=> {
    e.preventDefault()
    if (text.trim().length > 10){
      const newFeedback = {
        text, // 省略形　 text: text
        rating, // 省略形　 rating: rating
      }
      // console.log(newFeedback)
      addFeedback(newFeedback)
      setText('')
    }
  }

  return (
    <Card> 
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
          <RatingSelect select={(rating) => setRating(rating)}/>
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} placeholder="Wite a review"/>
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default  FeedbackForm
~~~

~~~js
// components/FeedbackForm.jsx
  useEffect(()=> {
    // console.log('editbox clicked')
    if (feedbackEdit.edit===true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  },[feedbackEdit])
~~~

上の状態では番号の表示が切り替わらないので、RatingSelect.jsxにFeedbackContextとuseEffectを実装して修正する
~~~js
// components¥RatingSelect.jsx
import { useState, useContext, useEffect } from 'react' // added
import FeedbackContext from '../context/FeedbackContext'

function RatingSelect({select}) {
  const [selected, setSelected] = useState(10)
  const {feedbackEdit} = useContext(FeedbackContext) // added
  const handleChange =(e)=> {
    // console.log(typeof +e.currentTarget.value)
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }

  useEffect(()=> {
    setSelected(feedbackEdit.item.rating)
  },[feedbackEdit])

  return (
    <ul className='rating'>
      <li>
        <input type="radio" id='num1' name='rating' value='1'
          onChange={handleChange} checked={selected === 1}  
        />
        <label htmlFor='num1'>1</label>
      </li>
      <li>
        <input type="radio" id='num2' name='rating' value='2'
          onChange={handleChange} checked={selected === 2}  
        />
        <label htmlFor='num2'>2</label>
      </li>
      <li>
        <input type="radio" id='num3' name='rating' value='3'
          onChange={handleChange} checked={selected === 3}  
        />
        <label htmlFor='num3'>3</label>
      </li>
      <li>
        <input type="radio" id='num4' name='rating' value='4'
          onChange={handleChange} checked={selected === 4}  
        />
        <label htmlFor='num4'>4</label>
      </li>
      <li>
        <input type="radio" id='num5' name='rating' value='5'
          onChange={handleChange} checked={selected === 5}  
        />
        <label htmlFor='num5'>5</label>
      </li>
      <li>
        <input type="radio" id='num6' name='rating' value='6'
          onChange={handleChange} checked={selected === 6}  
        />
        <label htmlFor='num6'>6</label>
      </li>
      <li>
        <input type="radio" id='num7' name='rating' value='7'
          onChange={handleChange} checked={selected === 7}  
        />
        <label htmlFor='num7'>7</label>
      </li>
      <li>
        <input type="radio" id='num8' name='rating' value='8'
          onChange={handleChange} checked={selected === 8}  
        />
        <label htmlFor='num8'>8</label>
      </li>
      <li>
        <input type="radio" id='num9' name='rating' value='9'
          onChange={handleChange} checked={selected === 9}  
        />
        <label htmlFor='num9'>9</label>
      </li>
      <li>
        <input type="radio" id='num10' name='rating' value='10'
          onChange={handleChange} checked={selected === 10}  
        />
        <label htmlFor='num10'>10</label>
      </li>
    </ul>
  )
}

export default RatingSelect
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

~~~

~~~