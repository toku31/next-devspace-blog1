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
// index.css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

h1, p, a {
  color: #fff;
}

body {
  margin: 0;
  font-family: 'Outfit', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: black;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.btn {
  padding: 12px 32px;
  font-size: 1.2rem;
  text-transform: uppercase;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
}

.btn-light {
  background: rgba(255,255,255,.2);
}

.btn:hover{
  background: rgba(255,255,255,.2);
}
~~~

~~~js
// pages/Home.js
import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
    </>
  )
}
export default Home
~~~

~~~js
// ¥components¥Navbar.js
import { Link } from 'react-router-dom'
import './navbar.css'
import {FaBars, FaTimes} from 'react-icons/fa'
import {useState} from 'react'

const Navbar = () => {

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  return (
    <div className='header'>
      <Link to='/'><h1>GALAXY TRAVEL</h1></Link>
      <ul className={click ? 'nav-menu  active' : 'nav-menu'}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pricing'>Pricing</Link>
        </li>
        <li>
          <Link to='/training'>Training</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (<FaTimes style={{color: '#fff'}} size={20}  />) : (
          <FaBars  style={{color: '#fff'}} size={20} />
        )}
      </div>
    </div>
  )
}

export default Navbar
~~~

~~~js
// ¥components¥navbar.css
.header {
  position: fixed;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  z-index: 10;
}

.nav-menu {
  display: flex;
}

.nav-menu li {
  padding: 0 1rem;
}

.nav-menu a {
  font-size: 1.2rem;
  font-weight: 500;
}

.hamburger {
  display: none;
}

@media screen and (max-width:1240px) {
  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: -100%;
    text-align: center;
    width: 100%;
    height: 100vh;
    transition: 0.3s;
    z-index: -1;
    background: rgba(0, 0, 0, .9);
  }

  .nav-menu.active {
    left: 0
  }

  .nav-menu li {
    padding: 1rem 0;
  }

  .nav-menu a {
    font-size: 2rem;
  }
}
~~~