---
title: 'Mern Bus Ticket Booking-2'
date: 'November 3, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使ってバスチケット予約アプリをつくります。2回目はバスの予約からです'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

###　バスの予約
user@mbp mern-busticket-booking % nodemon server  
user@mbp client % npm start
#### バスを全て表示する
```js
// pages/Home.js
import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {user} = useSelector(state => state.users)
  console.log('user:', user)
  return (
    // <div>home</div>
    <div>
      {user && <h1>Welcome {user?.name}</h1>}
      {user && <h1>{user?.email}</h1>}
    </div>
  )
}

export default Home
```
```js

```
```js

```







