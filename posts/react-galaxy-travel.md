---
title: "Build React JS Webste
"
date: 'September 26, 2022'
excerpt: 'React.jsを用いてGalaxy Travelのサイトを作成しました。Navbarのハンバーガーメニューなど機能実装してます'
cover_image: '/images/posts/img4.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

参考にしたサイト：https://www.youtube.com/watch?v=utfRnLJTIsc&t=2312s  
user@mbp react % npx create-react-app react-galaxy-travel  
user@mbp react-galaxy-travel % npm i react-icons --save  
user@mbp react-galaxy-travel % npm i react-router-dom@v6  
~~~js
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~