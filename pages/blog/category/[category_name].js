import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'  // 69
import Layout from '@/components/Layout'
import Post from '@/components/Post'
// import { sortByDate } from '@/utils/index'  //69
import { getPosts } from '@/lib/posts'
import CategoryList from '@/components/CategoryList'


export default function CategoryPage({posts, categoryName, categories}) {
  // console.log(posts)
  // console.log('posts1', posts)
  // console.log(posts.index)
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10" >
          <h1 className='text-5xl border-b-4 p-5 font-bold'>Posts in {categoryName}</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, index) => (
                <Post key={index} post={post} />
              // <h3>{post.frontmatter.title}</h3>
              ))}
            </div>
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

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const {data: frontmatter} = matter(markdownWithMeta)
    // console.log({frontmatter})
    return frontmatter.category.toLowerCase()
  })

  console.log(categories)
  const paths = categories.map(category => ({
    params: {category_name: category}
  }))

  return {
    paths: paths,
    fallback: false
  }

}

export async function getStaticProps({params: {category_name}}) {
  console.log(category_name)

  const files = fs.readdirSync(path.join('posts'))
  const posts = getPosts()  // 69

    // 70 Get categories for sidebar
    const categories = posts.map((post) => post.frontmatter.category)
    // console.log("page_index categories: ", categories)
    const uniqueCategories = [...new Set(categories)]
    console.log("page_index uniqueCategories: ", uniqueCategories)

  // Filter posts by category
  const categoryPosts = posts.filter(post => 
    post.frontmatter.category.toLowerCase()===category_name)

  return {
    props: {
      // posts: categoryPosts.sort(sortByDate),
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories
    },
  }
}