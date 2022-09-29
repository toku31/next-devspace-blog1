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