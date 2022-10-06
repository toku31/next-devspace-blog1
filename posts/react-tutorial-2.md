---
title: 'React Tutorial -2-'
date: 'September 21, 2022'
excerpt: 'Reatの基礎のメモ書きです ２回目はForms,Validation,＆Simple Animationなど学びます'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

#### Forms,Validation,＆Simple Animation
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