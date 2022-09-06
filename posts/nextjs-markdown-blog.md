---
title: 'Next.js Markdown ブログ'
date: 'August 23, 2022'
excerpt: 'Next.jsを使ってMarkdownブログをつくりました。markdownファイルにはfront-matterを用いて記事のmeta情報を管理しています。'
cover_image: '/images/posts/img3.jpg'
category: 'JavaScript'
author: 'toku'
author_image: 'https://randomuser.me/api/portraits/men/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

https://github.com/toku31/next-devspace-blog  
C:\react\devspave-blog>npm run dev

## Markdownとは
https://www.markdownguide.org/getting-started/

gray-matter
https://github.com/jonschlinkert/gray-matter

### Next.js と gray-matter

```bash
npx create-next-app devspave-blog
```

https://tailwindcss.com/docs/guides/create-react-app

VS Code extention: Markdown Preview Enhanced
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

tailwind.config.js
```javascript
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript
export default function Home() {
  return (
    <div className='bg-blue-500'>
```

## Layout component
```javascript
import Head from 'next/head'

export default function Layout({ title, keywords, description, children }) {
  return (
  <div>
    <Head>
      <title>{ title }</title>
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className='container mx-auto my-7'>{children}</main>
  </div>
  );
}

Layout.defaultProps = {
  title: 'Welcome to DevSpace',
  keywords: 'blog, development, coding',
  description: 'The best info and news in development',
}
```

## Header & Tailwind Styling
```javascript
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className='bg-gray-900 text-gray-100 shadow w-full'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link href='/'>
          <a className='flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0'>
            <Image src='/images/logo.png' width={40} height={40} alt='logo' />
            <span className='ml-3 text-xl'>DevSpace</span>
          </a>
        </Link>
        <nav className='flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto'>
          <Link href='/blog'>
            <a className='mx-5 cursor-pointer uppercase hover:text-indigo-300'>
              Blog
            </a>
          </Link>
          <Link href='/about'>
            <a className='mx-5 cursor-pointer uppercase hover:text-indigo-300'>
              About
            </a>
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

## About & 404 page
```javascript
mport Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>

      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">
          DevSpace Blog
        </h3>

        <p className="mb-3">
          This is a blog built with Next.js and Markdown
        </p>

        <p>
          <span className="font-bold">Version 1.0.0</span>
        </p>
      </div>
    </Layout>
  )
}
```

```javascript
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout';

export default function NotFoundPage() {
  return (
    <Layout title='Page Not Found'>
      <div className="flex flex-col items-center mt-20">
        <Image 
          src='/images/logo.png' 
          width={70} 
          height={70} 
          className='bg-gray-800 rounded-2xl' 
          alt =''
          />

        <h1 className="text-6xl my-5">Whoops!</h1>

        <h2 className="text-4xl text-gray-400 mb-5">
          This page does not exist
        </h2>
      </div>

    </Layout>
  )
}
```

Node.js のfsモジュールとは？
fsモジュールはファイルを扱うためのモジュールで、ファイルから書き出したり、ファイルに書き込んだりするときに使う。
##### fs.readFileSync
##### fs.readdirSync
#### ファイルの読み込み
```javascript
const fs = require('fs');
//fs.readFileSync(ファイルのパス, 文字コード, コールバック関数)
fs.readFileSync('./text.txt', utf-8, (err, data) => {
//dataがファイルの中身、errは読み込み時のエラー
  if(data) {
    console.log(data);
  } else {
    console.log(err);
  }
});
```

フロントマターとは本の前付けの意味で、デジタルツールではそのファイルのメタ情報を記述する場所を指している。
HTMLファイルのhead部分に当たる。

```bash
npm install gray-matter
```
```javascript
import matter from 'gray-matter'

const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename), 'utf-8'
    )
const {data:frontmatter} = matter(markdownWithMeta)
```

### Get Posts & Parse Frontmatter #59
~~~js
// next-devspace-blog/pages/index.js 
import fs from 'fs'
import fs from 'path'
import matter from 'gray-matter'
import Layout from '../components/Layout'

export default function HomePage({ posts }) {
  console.log(posts)
  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts')) 
  console.log(files)

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename), 'utf-8'
    )
    console.log(markdownWithMeta)
    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  console.log(posts)
  return {
    props: {
      posts
    },
  }
~~~
参考: Fetching Paths for getStaticPaths  
postのページが100ページ以上あるとき
```javascript
  return (
    <>
    <h2>
      { post.id } {post.title}
    </h2>
    <h2>
      { post.body }
    </h2>
    </>
  )
}
export default Post

export async function getStaticPaths() {

  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()

  const paths = data.map(post => {
    return (
      {
        params: { postId: `${post.id}`}
      }
    )
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
  const data = await response.json()

  return ({
    props: {
      post: data
    }
  })
}
```
### Display Posts   #60
~~~js
// next-devspace-blog/pages/index.js 
import Link from 'next/link'
import fs from 'fs'
import fs from 'path'
import matter from 'gray-matter'
import Layout from '../components/Layout'

export default function HomePage({ posts }) {
  console.log(posts)
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
        　　<h3>{post.frontmatter.title}</h3>
        ))}
      </div>

      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500  
        ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>All Posts</a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts')) 
  console.log(files)

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename), 'utf-8'
    )
    console.log(markdownWithMeta)
    const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  console.log(posts)
  return {
    props: {
      posts
    },
  }
~~~

~~~js
// next-devspace-blog/components/Post.js 
import Link from 'next/link';
import Image from 'next/image'
import CategoryLabel from './CategoryLabel';

export default function Post({post}) {
  return (
  <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
    <Image 
      src={post.frontmatter.cover_image} 
      alt=''
      height={420}
      width={600}
      className="mt-4 rounded"
    />

    <div className="flex justify-between items-center">
      <span className="font-light text-gray-600">
        {post.frontmatter.date}
      </span>
      <div>{post.frontmatter.category}</div>
    </div>

    <div className="mt-2">
      <Link href={`/blog/${post.slug}`}>
        <a href="" className="text-2xl text-gray-700 font-bold hover:underline">
          {post.frontmatter.title}
        </a>
      </Link>
      <p className="mt-2 text-gray-600">
        {post.frontmatter.excerpt}
      </p>
    </div>

    <div className="flex justify-between items-center mt-6">
      <Link href={`/blog/${post.slug}`}>
        <a className="text-gray-900 hover:text-blue-600">続きを読む</a>
      </Link>
      <div className="flex items-center">
        <img
          src={post.frontmatter.author_image} 
          alt=""
          className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'
        />
        <h3 className="text-grey-700 font-bold">
          {post.frontmatter.author}
        </h3>
      </div>
    </div>
      }
  </div>)
}
~~~

### Sort Posts By Date 61
~~~js
// next-devspace-blog/pages/index.js 
   　　　　　 - - -
  import {sortByDate } from '../utils' // 追加
   　　　　　 - - -
  const {data:frontmatter} = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })
  console.log(posts)
  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6), // 変更
    },
  }
~~~

~~~js
// next-devspace-blog/utils/index.js 
export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
}
~~~

### Category Label Component 62
~~~js
// next-devspace-blog/components/CategoryLabel.js 
import Link from 'next/link'

export default function CategoryLabel({children}) {
  const colorKey = {
    JavaScript: 'bg-yellow-600',
    CSS: 'bg-blue-600',
    Python: 'bg-green-600',
    PHP: 'bg-purple-600',
    Ruby: 'bg-red-600',
    Solidity: 'bg-pink-600',
  }

  return (
    <div className={`px-2 py-1 ${colorKey[children]}  text-gray-100 font-bold rounded`}>
    <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  )
}  
~~~

#### Generate Static Paths & Single Post Data 63
~~~js
import fs from 'fs'
import path from 'path'
export default function PostPage() {
  return (
    <div>

    </div>
  )
}
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  // console.log(files)
  const paths = files.map(filename => {
    return (
      { 
        params: {slug: filename.replace('.md', '')}
      }
    )
  })
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}
~~~