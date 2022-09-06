import fs from 'fs'
import path from 'path'
// import Link from 'next/link'
// import matter from 'gray-matter'
import Layout from '@/components/Layout'
import Post from '@/components/Post'
// import { sortByDate } from '@/utils/index'
import { POSTS_PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'
import { getPosts } from '@/lib/posts'
import CategoryList from '@/components/CategoryList'

export default function BlogPage({posts, numPages, currentPage, categories}) {
  // console.log(posts)
  // console.log('posts1', posts)
  // console.log(posts.index)
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10" >
            <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, index) => (
                <Post key={index} post={post} />
              // <h3>{post.frontmatter.title}</h3>
              ))}
            </div>
            <Pagination currentPage={currentPage} numPages={numPages}  />
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>

      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: {page_index: i.toString()}
    })
  }

  // console.log('page_index', paths)
  return {
    paths,
    fallback :false,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const page = parseInt((params && params.page_index) || 1)
  
  // console.log(123)
  const files = fs.readdirSync(path.join('posts'))
  // console.log(files)
  const posts = getPosts()  // 69

  // 70 Get categories for sidebar 
  const categories = posts.map((post) => post.frontmatter.category)
  // console.log("page_index categories: ", categories)
  const uniqueCategories = [...new Set(categories)]
  console.log("page_index uniqueCategories: ", uniqueCategories)

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts
    // .sort(sortByDate)  // 69
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  // console.log('posts-terminal', posts) // ターミナル出力

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    },
  }
}