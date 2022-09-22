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
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~