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