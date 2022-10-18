---
title: 'Github Finder -1-'
date: 'October 10, 2022'
excerpt: 'Reactを使ってGithubの表示するアプリをつくりました。1回目はUIを実装していきます'
cover_image: '/images/posts/img7.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

## Setup Tailwind & Daisy UI
https://codesandbox.io/s/github/bradtraversy/github-finder/tree/master/?file=/src/App.js  
https://github.com/bradtraversy/github-finder-app  
https://tailwindcss.com/docs/guides/create-react-app  
https://daisyui.com
~~~bash
user@mbp React % npx create-react-app github-finder --use-npm
user@mbp React % npm install -D tailwindcss postcss autoprefixer
user@mbp github-finder % npx tailwindcss init -p 
~~~

~~~js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
~~~

~~~js
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

~~~js
user@mbp github-finder % npm i daisyui 
~~~

~~~js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')], // added
}
~~~

~~~js
npm start
~~~
Tailwindが正しくインストールされているか確認
~~~js
// App.js
function App() {
  return (
    <div className="bg-purple-500">
      <h1>Hello World</h1>
      <button className='btn'>Click</button>
    </div>
  );
}

export default App;
~~~
確認後
~~~js
function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
~~~
### Navbar Component
npm i react-router-dom react-icons
~~~js
// src/components/layout/Navbar.jsx
function Navbar() {
  return (
    <div>Navbar</div>
  )
}
export default Navbar
~~~

~~~js
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
        <main>Content</main>
      </div>
    </Router>
  );
}
~~~

~~~js
// src/components/layout/Navbar.jsx
import {FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
      Navbar
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder'
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
~~~

~~~js
// src/components/layout/Navbar.jsx
import {FaGithub} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <FaGithub className='inline pr-2 text-3xl'/>
          <Link to='/' className='text-lg font-bold  align-middle'>
            {title}
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder'
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
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