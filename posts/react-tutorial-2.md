---
title: 'React Tutorial -2-'
date: 'September 21, 2022'
excerpt: 'Reatの基礎のメモ書きです ２回目はForms,Validation,Animation, Routes, Links など学びます'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

#### Forms,Validation, Simple Animation, Routes, Links
https://github.com/bradtraversy/feedback-app

~~~js
// App.js
import { useState } from 'react'
import FeedbackForm from './components/ FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from "./components/Header"
import FeedbackData from './data/FeedbackData'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  return(
    <>
      <Header />
      <div className="container">
        <FeedbackForm />  // added
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
      </div>
    </> 
  )
}

export default App
~~~

~~~js
// components/FeedbackForm.jsx
import React from 'react'

function  FeedbackForm() {
  return (
    <div> FeedbackForm</div>
  )
}
export default  FeedbackForm
~~~
フォームを作成
~~~js
// components/FeedbackForm.jsx
import Card from "./shared/Card"

function  FeedbackForm() {
  return (
    <Card> 
      <form>
        <h2>How do you rate your service with us?</h2>
          {/* @todo - rating select component */}
        <div className="input-group">
          <input type="text" placeholder="Wite a review"/>
          <button type="submit">Send</button>
        </div>
      </form>
    </Card>
  )
}
export default  FeedbackForm
~~~
useState を用いてinputに入力できるようにする
~~~js
import { useState } from "react" // added
import Card from "./shared/Card"

function  FeedbackForm() {
const [text, setText] = useState('') // added
const handleTextChange =(e)=> {  // added
  setText(e.target.value)
}

  return (
    <Card> 
      <form>
        <h2>How do you rate your service with us?</h2>
          {/* @todo - rating select component */}
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} // added
          placeholder="Wite a review"/>
          <button type="submit">Send</button>
        </div>
      </form>
    </Card>
  )
}
export default  FeedbackForm
~~~

#### Custom Button Component
~~~js
// components¥shared¥Button.jsx
import PropTypes from 'prop-types'

function Button({children, version, type, isDisabled}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false
}

Button.prototype = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
~~~

~~~js
// components/FeedbackForm.jsx
import { useState } from "react"
import Button from "./shared/Button" // added
import Card from "./shared/Card"

function  FeedbackForm() {
const [text, setText] = useState('')

const handleTextChange =(e)=> {
  setText(e.target.value)
}

  return (
    <Card> 
      <form>
        <h2>How do you rate your service with us?</h2>
          {/* @todo - rating select component */}
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} placeholder="Wite a review"/>
          <Button type='submit'>Send</Button>  // changed
        </div>
      </form>
    </Card>
  )
}

export default  FeedbackForm
~~~

#### Real Time validation
~~~js
// components/FeedbackForm.jsx
import { useState } from "react"
import Button from "./shared/Button"
import Card from "./shared/Card"

function  FeedbackForm() {
  const [text, setText] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)  // added
  const [message, setMessage] = useState('')  // added

  const handleTextChange =(e)=> {
    if (text === '') {   // added
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10 ) { 　//★★★
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  return (
    <Card> 
      <form>
        <h2>How would you rate your service with us?</h2>
          {/* @todo - rating select component */}
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} placeholder="Wite a review"/>
          {/* <button type="submit">Send</button> */}
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}
export default  FeedbackForm
~~~

disableはHTMLタグを無効（＝非活性）にする属性
~~~html
<button type="submit" disabled>ボタン</button>
~~~
~~~css
.btn:disabled {
  background-color: #cccccc;
  color: #333;
  cursor: auto;
}

.btn:disabled:hover {
  transform: scale(1);
  opacity: 1;
}

.message {
  padding-top: 10px;
  text-align: center;
  color: rebeccapurple;
}
~~~

### Rating Select Component
~~~js
// componments¥RatingSelect.jsx
import { useState } from 'react'

function RatingSelect() {
  const [selected, setSelected] = useState(10)

  return <div>RatingSelect</div>
}
export default RatingSelect
~~~

~~~js
// componments¥RatingSelect.jsx
import { useState } from 'react'

function RatingSelect() {
  const [selected, setSelected] = useState(10)
  const handleChange =(e)=> {
    console.log(e.currentTarget.value)
  }

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

~~~js
// componments¥RatingSelect.jsx
console.log(typeof e.currentTarget.value) // string
console.log(typeof +e.currentTarget.value) // number
~~~

~~~css
.rating {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px 0 40px;
}

.rating li,
.num-display {
  position: relative;
  background: #f4f4f4; // gray
  width: 50px;
  height: 50px;
  padding: 10px;
  text-align: center;
  border-radius: 50%;
  font-size: 19px;
  border: 1px #eee solid;
  transition: 0.3s;
}

.rating li label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.rating li:hover,
.num-display {
  background: #ff6a95;　// pink
  color: #fff;
}

[type='radio'] {
  opacity: 0;
}

[type='radio']:checked ~ label {
  background: #ff6a95;
  color: #fff;
}
~~~

~~~js
// components/FeedbackForm.jsx
    <Card> 
      <form>
        <h2>How would you rate your service with us?</h2>
          <RatingSelect select={(rating) => console.log(rating)}/> // added
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} placeholder="Wite a review"/>
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
~~~

~~~js
// componments¥RatingSelect.jsx
import { useState } from 'react'

function RatingSelect({select}) {
  const [selected, setSelected] = useState(10)
  const handleChange =(e)=> {
    // console.log(typeof +e.currentTarget.value)
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }
~~~

~~~js
// components/FeedbackForm.jsx
  return (
    <Card> 
      <form>
        <h2>How would you rate your service with us?</h2>
          <RatingSelect select={(rating) => setRating(rating)}/> // Changed
        <div className="input-group">
          <input onChange={handleTextChange} type="text" value={text} placeholder="Wite a review"/>
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
~~~

Feedbackの追加機能
~~~js
// components/FeedbackForm.jsx
import { useState } from "react"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"

function  FeedbackForm() {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

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
      console.log(newFeedback)
    }
  }

  return (
    <Card> 
      <form onSubmit={handleSubmit}>　// added
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
// App.js
import { useState } from 'react'
import FeedbackForm from './components/ FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from "./components/Header"
import FeedbackData from './data/FeedbackData'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback =(id) => {
    console.log('App', id)
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item)=> item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {  // added
    console.log(newFeedback)
  }

  return(
    <>
      <Header />
      <div className="container">
        <FeedbackForm handleAdd={addFeedback} /> // added
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
      </div>
    </> 
  )
}
export default App
~~~

~~~js
// components/FeedbackForm.jsx
import { useState } from "react"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"

function  FeedbackForm({ handleAdd }) { // added
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

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
      handleAdd(newFeedback) // added
      setText('')  // added
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
フィードバックにIDを追加したい  
npm i uuid
~~~js
// APP.js
import { v4 as uuidv4 } from 'uuid'

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4() // added
    console.log(newFeedback)
  }
~~~
配列に新しいフィードバックを追加したい
~~~js
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    // console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])  // ★★★
  }
~~~

#### Fade Animation with Framer Motion
https://www.npmjs.com/package/framer-motion  
~~~
user@mbp feedback-app % npm i framer-motion@4.1.17
~~~

~~~js
// components¥FeedbackList.jsx
import {motion, AnimatePresence} from 'framer-motion'  // added
import PropTypes from 'prop-types'
import FeedbackItem from "./FeedbackItem"

function FeedbackList({feedback, handleDelete}) {
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

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      Text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  )
}

export default FeedbackList
~~~

#### Creating Routes(React Router5)
user@mbp feedback-app % npm i react-router-dom
~~~js
// App.js
import { v4 as uuidv4 } from 'uuid'
import {BrowserRouter as Router, Route} from 'react-router-dom' // added

  return(
    <Router>  // added
      <Header />
      <div className="container">
        <Route exact path='/'> // added
          <FeedbackForm handleAdd={addFeedback} />
          <FeedbackStats feedback={feedback} />
          <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
        </Route> // added
        <Route path='/about' component={AboutPage} /> // added
      </div>
    </Router>  // added
  )
~~~

~~~js
// ¥pages¥AboutPage.jsx
import React from 'react'
import Card from '../components/shared/Card'

function AboutPage() {
  return <Card>
    <div className="about">
      <h1>About This Project</h1>
      <p>This is a React app tp leave feedback for a product or service</p>
      <p>Version 1.0.0</p>

      <p>
        <a href="/">Back To Home</a>
      </p>
    </div>
  </Card>
}
export default AboutPage
~~~

#### Routes(React Router6)
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
    <>
      <Router>
        <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm handleAdd={addFeedback} /> 
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
              </>
            }></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </> 

    // <>
    // <Header />
    // <div className="container">
    //   <FeedbackForm handleAdd={addFeedback} /> 
    //   <FeedbackStats feedback={feedback} />
    //   <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
    //   <AboutPage />
    // </div>
    // </> 
  )
}
~~~

Creating Links
~~~js
// src¥components¥AbouticonLink.jsx
import { FaQuestion } from 'react-icons/fa'
function AbouticonLink() {
  return (
    <div className='about-link'>
      <FaQuestion size={30} />
    </div>
  )
}
export default AbouticonLink
~~~

~~~js
// App.js
  return(
    <>
      <Router>
        <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm handleAdd={addFeedback} /> 
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
              </>
            }></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <AbouticonLink /> // added
        </div>
      </Router>
    </> 
  )
~~~
以下のようにaタグを付けると動作するたびにリフレッシュしてしまう
~~~js
// src¥components¥AbouticonLink.jsx
import { FaQuestion } from 'react-icons/fa'
function AbouticonLink() {
  return (
    <div className='about-link'>
      <a href="/about">　　// added
       <FaQuestion size={30} />
      </a>
    </div>
  )
}
export default AbouticonLink
~~~
代わりに以下のLinkタグを使うとリフレッシュなしに素早く切り替わる
~~~js
// src¥components¥AbouticonLink.jsx
import { FaQuestion } from 'react-icons/fa'
import {Link} from 'react-router-dom'

function AbouticonLink() {
  return (
    <div className='about-link'>
      <Link to="/about">  // Changed
       <FaQuestion size={30} />
      </Link>
    </div>
  )
}
export default AbouticonLink
~~~
Linkタグは他にいろんなプロパティを設定することができる  
http://localhost:3001/about?sort=name#hello
~~~js
import { FaQuestion } from 'react-icons/fa'
import {Link} from 'react-router-dom'

function AbouticonLink() {
  return (
    <div className='about-link'>
      {/* <Link to="/about"> */}
      <Link to={{
        pathname: '/about',
        search: '?sort=name',
        hash: '#hello'
        }}
      >
       <FaQuestion size={30} />
      </Link>
    </div>
  )
}
export default AbouticonLink
~~~

### NavLink 
~~~js
// App.js
import { v4 as uuidv4 } from 'uuid'
import {BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom' // added
import Card from './components/shared/Card' // added
import { useState } from 'react'
import FeedbackForm from './components/ FeedbackForm'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from "./components/Header"
import FeedbackData from './data/FeedbackData'
import AboutPage from './pages/AboutPage'

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
    <>
      <Router>
        <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm handleAdd={addFeedback} /> 
                <FeedbackStats feedback={feedback} />
                <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
              </>
            }></Route>

            <Route path='/about' element={<AboutPage />} />
          </Routes>

          <Card>  // added ↓
            <NavLInk to='/' activeClassName='active'>
              Home
            </NavLink>
            <NavLInk to='/about' activeClassName='active'>
              About
            </NavLink>
          <Card>
        </div>
      </Router>
    </> 
  )
}
~~~

~~~css
.active {
  background: #000;
  color: red;
}
~~~

####  useParams
~~~js
// App.js
    <Routes>
      <Route exact path='/' element={
        <>
          <FeedbackForm handleAdd={addFeedback} /> 
          <FeedbackStats feedback={feedback} />
          <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
        </>
      }></Route>

      <Route path='/about' element={<AboutPage />} />
      <Route path='/post/:id' element={<Post />} /> // added idの代わりにslugでも良い
      // <Route path='/post/:id/:name' element={<Post />} />
    </Routes>
~~~

~~~js
// ¥components¥Post.jsx
import {useParams} from 'react-router-dom'

function Post() {
  const Params = useParams()

  return (
    <div>
      <h1>Post {params.id}</h1>
      <p>Post {params.name}</p>
    </div>
  )
}

export default Post
~~~

#### Navigate & Nested Routes
Redirectの代わりにNavigateが使われるようになった
~~~js
// ¥components¥Post.jsx
import {Navigate, useNavigate} from 'react-router-dom'

function Post() {
  const status = 200

  const navigate = useNavigate()

  const onClick =()=> {
    console.log('Hello')
    navigate('/about')
  }

  if(status === 404) {
    return <Navigate to='/notfound' />
  }

  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}
export default Post
~~~

nested Routes
~~~js
// ¥components¥Post.jsx
import {Navigate, useNavigate, Routes, Route} from 'react-router-dom'

function Post() {
  const status = 200

  const navigate = useNavigate()

  const onClick =()=> {
    console.log('Hello')
    navigate('/about')
  }

  if(status === 404) {
    return <Navigate to='/notfound' />
  }

  return (
    <div>
      <h1>Post</h1>
      <button onClick={onClick}>Click</button>
      <Routes>
        <Route path='/show' element={<h1>Hello World</h1>} />  // 'localhost:300/post/show'
      </Routes>
    </div>
  )
}
export default Post
~~~
/post/の後にアスタリスクをつける
~~~js
// App.js
    <Routes>
      <Route exact path='/' element={
        <>
          <FeedbackForm handleAdd={addFeedback} /> 
          <FeedbackStats feedback={feedback} />
          <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
        </>
      }></Route>

      <Route path='/about' element={<AboutPage />} />
      <Route path='/post/*' element={<Post />} /> // Changed
      // <Route path='/post/:id/:name' element={<Post />} />
    </Routes>
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