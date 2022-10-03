---
title: 'React Tutorial -1-'
date: 'September 21, 2022'
excerpt: 'Reatの基礎のメモ書きです'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

#### 新しい React アプリを作る
https://ja.reactjs.org/docs/create-a-new-react-app.html  
https://github.com/bradtraversy/feedback-app

~~~
user@mbp React % npx create-react-app feedback-app --use-npm
cd feedback-app
code .
npm start
~~~

~~~
¥public¥index.html
  <title>Feedback-UI</title> // 変更
~~~

~~~js
// src¥index.js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<h1>My App</h1>, document.getElementById('root'))
~~~

~~~js
// App.js
function App() {
  return(
    <h1>Hello from the app component</h1>
  )
}
export default App
~~~

~~~js
// src¥index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root'))
~~~
javascriptで書くと以下になる
~~~js
import React from 'react'

function App(){
  return React.createElement('div', {className: 'container'},
  React.createelement('h1', { }, 'My App'))
}
export default App
~~~

~~~js
function App() {
  const title = 'Blog Post'
  const body = 'This is my blog post'
  const comments = [
    {id: 1, text:'Comment one'},
    {id: 2, text:'Comment two'},
    {id: 3, text:'Comment three'},
  ]
  
  return(
    <div className="container">
      <h1>{title.toUpperCase()}</h1>
      <p>{body}</p>
      {/* {Math.random() * (5 + 5)} */}

      <div className="comments">
        <h3>Comments ({comments.length})</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default App
~~~

Conditionals
~~~js
function App() {
  const comments = [
    {id: 1, text:'Comment one'},
    {id: 2, text:'Comment two'},
    {id: 3, text:'Comment three'},
  ]
  const loading = false
  const showComments = true

  if (loading) return <h1>Loading...</h1>

  const commentBlock = (
    <div className="comments">
    <h3>Comments ({comments.length})</h3>
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>{comment.text}</li>
      ))}
    </ul>
  </div>
  )
  
  return(
    <div className="container">
      {/* {showComments ? commentBlock: null)} */}

      {showComments && commentBlock}
    </div>
  )
}
export default App
~~~

#### First Component & Props
~~~js
import Header from "./components/Header"

function App() {
  return(
    <>
      <Header text = "Hello World"/>
      <div className="container">
        <h1>My App</h1>
      </div>
    </> 
  )
}
export default App
~~~

~~~js
// components/Header.js
function Header(props) {
  return (
    <header>
      <div>
        <h2>{props.text}</h2>
      </div>
    </header>
  )
}
export default Header
~~~

~~~js
function Header({ text }) {
  return (
    <header>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}

export default Header
~~~

デフォルトProps　App.jsには書き込まない
~~~js
function Header({ text }) {
  return (
    <header>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}

Header.defaultProps = {
  text: 'Feedback UI'
}
export default Header
~~~

propTypes
~~~js
import PropTypes from 'prop-types'

function Header({ text }) {
  return (
    <header>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}

Header.defaultProps = {
  text: 'Feedback UI'
}

Header.propTypes = {
  // text: PropTypes.string.isRequired,
  text: PropTypes.string,
}
export default Header
~~~

#### Cssを適用する
~~~js
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #202142;
  color: #fff;
  line-height: 1.6;
}

ul {
  list-style: none;
}

.container {
  max-width: 768px;
  margin: auto;
  padding: 0 20px;
}

header {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
~~~
ヘッダーにスタイルを適用例１
~~~js
import PropTypes from 'prop-types'

function Header({ text }) {
  return (
    <header style={{ backgroundColor: 'blue', color: 'red'}}> // added
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}
       ~ ~ ~
~~~
ヘッダーにスタイルを適用例２
~~~js
import PropTypes from 'prop-types'

function Header({ text }) {
  const headerStyles = {
    backgroundColor: 'blue',
    color: 'red',
  }

  return (
    <header style={headerStyles}>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}
       ~ ~ ~
~~~
ヘッダーにスタイルを適用例3
~~~js
import Header from "./components/Header"

function App() {
  return(
    <>
      <Header bgColor='red' textColor='blue' />
      <div className="container">
        <h1>My App</h1>
      </div>
    </> 
  )
}
export default App
~~~
ヘッダーにスタイルを適用例4
~~~js
import PropTypes from 'prop-types'

function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyles}>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}
       ~ ~ ~
~~~
ヘッダーにスタイルを適用例5
~~~js
import PropTypes from 'prop-types'

function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  }

  return (
    <header style={headerStyles}>
      <div>
        <h2>{text}</h2>
      </div>
    </header>
  )
}

Header.defaultProps = {
  text: 'Feedback UI',
  bgColor: 'rgba(0, 0, 0, 0.4)',
  textColor: '#ff6a95',
}

Header.propTypes = {
  // text: PropTypes.string.isRequired,
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}
export default Header
~~~

### State & UseState Hook
~~~js
// App.js
import FeedbackItem from "./components/FeedbackItem"
import Header from "./components/Header"

function App() {
  return(
    <>
      <Header />
      <div className="container">
        <FeedbackItem />
      </div>
    </> 
  )
}
export default App
~~~

~~~js
// components/FeedbackItem.jsx
function FeedbackItem() {
  return (
    <div className="card">
      <div className="num-display">10</div>
      <div className="text-display">
        This is an example of a feedback item
      </div>
    </div>
  )
}
export default FeedbackItem
~~~

~~~css
// index.css
.card {
  background-color: #fff;
  color: #333;
  border-radius: 15px;
  padding: 40px 50px;
  margin: 20px 0;
  position: relative;
}

.card.reverse {
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
}

.card h2 {
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px 0 40px;
}

.rating li,
.num-display {
  position: relative;
  background: #f4f4f4;
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
  background: #ff6a95;
  color: #fff;
}
~~~

~~~js
// components/FeedbackItem.jsx
import {useState} from 'react'

function FeedbackItem() {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('This is an example of a feedback item')

  const handleClick = () => {
    // setRating(10)
    setRating((prev)=>{
      console.log(prev)
      return (prev + 1)
    })
  }
    
  return (
    <div className="card">
      <div className="num-display">{rating}</div>
      <div className="text-display">{text}</div>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
export default FeedbackItem
~~~

### Managing Glocal State
~~~js
// data/Feedback.js
const FeedbackData = [
  {
    id: 1,
    rating: 10,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
  },
  {
    id: 2,
    rating: 9,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
  },
  {
    id: 3,
    rating: 8,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
  },
]
export default FeedbackData
~~~

~~~js
// App.js
import { useState } from 'react'
import FeedbackItem from "./components/FeedbackItem"
import Header from "./components/Header"

function App() {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
    },
  ])

  return(
  <>
      ~ ~ ~
~~~

~~~js
import { useState } from 'react'
// import FeedbackItem from "./components/FeedbackItem"
import FeedbackList from './components/FeedbackList'
import Header from "./components/Header"
import FeedbackData from './data/FeedbackData'

function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  return(
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback}/>
      </div>
    </> 
  )
}
export default App
~~~

~~~js
// ¥components/FeedbackList.jsx
function FeedbackList({feedback}) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
  // console.log(feedback)
  return <div className="feedback-list">list</div>
}

export default FeedbackList
~~~
### map関数を使って表示
~~~js
// ¥components/FeedbackList.jsx
function FeedbackList({feedback}) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
  // console.log(feedback)
  return (
  <div className="feedback-list">
    {feedback.map((item)=> (
      <div>{item.id}</div>
    ))}
  </div>
  )
}
export default FeedbackList
~~~

~~~js
// ¥components/FeedbackList.jsx
import FeedbackItem from "./FeedbackItem"

function FeedbackList({feedback}) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
  // console.log(feedback)
  return (
  <div className="feedback-list">
    {feedback.map((item)=> (
      <FeedbackItem key={item.id} item={item}/>
    ))}
  </div>
  )
}
export default FeedbackList
~~~

~~~js
// ¥components/FeedbackItem.jsx 修正前
import {useState} from 'react'

function FeedbackItem() {
  const [rating, setRating] = useState(7)
  const [text, setText] = useState('This is an example of a feedback item')
    
  return (
    <div className="card">
      <div className="num-display">{rating}</div>
      <div className="text-display">{text}</div>
    </div>
  )
}
export default FeedbackItem
~~~

~~~js
// ¥components/FeedbackItem.jsx 修正後
function FeedbackItem({item}) {
  return (
    <div className="card">
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </div>
  )
}
export default FeedbackItem
~~~
### Card Component & Conditional Style
~~~js
// components/shared/Card.js
function Card({children}) {
  return (
    <div className="card">{children}</div>
  )
}
export default Card
~~~

~~~js
import Card from "./shared/Card"

function FeedbackItem({item}) {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}
export default FeedbackItem
~~~
conditional class
~~~js
import Card from "./shared/Card"

function FeedbackItem({item}) {
  return (
    <Card reverse={true}>  //追加
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}
export default FeedbackItem
~~~

~~~js
// components/shared/Card.js
function Card({children, reverse}) {
  return (
    <div className={`card ${reverse && 'reverse'}`}>{children}</div>
  )
}
export default Card
~~~

conditional Style
~~~js
function Card({children, reverse}) {
  return (
    <div className='card' style={{
      backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
      color: reverse ? '#fff' : '#000',
    }}>{children}</div>
  )
}
export default Card
~~~
親のFeedbackItemでreverseのpropsをコールしないやり方
~~~js
import PropTypes from 'prop-types'

function Card({children, reverse}) {
  return (
    <div className='card' style={{
      backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
      color: reverse ? '#fff' : '#000',
    }}>{children}</div>
  )
}

Card.defaultProps = {
  reverse: false
}
Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
}
export default Card
~~~

~~~js
// ¥components/FeedbackItem.jsx 
import PropTypes from 'prop-types'　// 追加
import Card from "./shared/Card"

function FeedbackItem({item}) {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}
// 以下追加
FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}
export default FeedbackItem
~~~

~~~js
// ¥components/FeedbackList.jsx 
import PropTypes from 'prop-types'
import FeedbackItem from "./FeedbackItem"

function FeedbackList({feedback}) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
  // console.log(feedback)
  return (
  <div className="feedback-list">
    {feedback.map((item)=> (
      <FeedbackItem key={item.id} item={item}/>
    ))}
  </div>
  )
}
// 以下追加
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
#### Events & Prop Drilling
リストを削除する　削除ボタンにfontawsomeのXマーク(FaTimes)  
user@mbp feedback-app % npm i react-icons
~~~js
// ¥components/FeedbackItem.jsx 
import { FaTimes } from 'react-icons/fa' // added
import PropTypes from 'prop-types'
import Card from "./shared/Card"

function FeedbackItem({item}) {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={()=>console.log(item.id)}> ★★★
        <FaTimes color='purple' />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}
export default FeedbackItem
~~~
上のonClickの箇所は以下のようにもできる
~~~js
function FeedbackItem({item}) {
  const handleClick = () => {   // added
    console.log(item.id)
  }
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={handleClick}>　★★★
        <FaTimes color='purple' />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}
   ~ ~ ~
~~~
但し、handleClickに引数を設定して、onClick={()=>handleClick(item.id)}とアロー関数にすることで const handleClick = (id) => {
    console.log(id)
  }を呼ぶこともできる  
こうすることでクローズボタン（X）をクリックするとそのfeedbackのIdがログに出る  
#### Prop Drilling
次はクローズボタン（X）をクリックするとfeedbackItemの親のFeedbackListにIDを伝達してログ出力させたい
~~~js
// ¥components/FeedbackList.jsx 
  <div className="feedback-list">
    {feedback.map((item)=> (
      <FeedbackItem key={item.id} item={item} handleDelete={(id)=>console.log(id)} />
    ))}
  </div>
~~~

~~~js
// ¥components/FeedbackItem.jsx 
function FeedbackItem({item, handleDelete }) {
  // 削除
  // const handleClick = (id) => {
  //   console.log(id)
  // }

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => handleDelete(item.id)}>　// 変更
        <FaTimes color='purple' />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}
export default FeedbackItem
~~~
さらにクローズボタン（X）をクリックするとFeedbackListの親のApp.jsにIDを伝達してログ出力させたい
~~~js
// ¥components/FeedbackList.jsx 
function FeedbackList({feedback, handleDelete}) { // added
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
  return (
  <div className="feedback-list">
    {feedback.map((item)=> (
      <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />   // 変更
    ))}
  </div>
~~~

~~~js
// App.js
function App() {
  const [feedback, setFeedback] = useState(FeedbackData)
  const deleteFeedback =(id) => { // added
    console.log('App',id)
  }

  return(
    <>
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/> // added
      </div>
    </> 
  )
}
export default App
~~~
#### filter関数を使った削除処理
~~~js
// App.js
import { useState } from 'react'
import FeedbackList from './components/FeedbackList'
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
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
      </div>
    </> 
  )
}
export default App
~~~
#### FeedbackStats Component & Reactivity
~~~js
import PropTypes from 'prop-types'

function FeedbackStats({feedback}) {
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
FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired
}
export default FeedbackStats
~~~

~~~js

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