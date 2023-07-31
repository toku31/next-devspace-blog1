---
title: 'JavaScript Ecommerce Project -1-'
date: 'April 30, 2023'
excerpt: 'JavaScriptでECサイトを作成していきます。今回はその1回目です'
cover_image: '/images/posts/img3.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
https://www.youtube.com/watch?v=N3FDyheHVMM&t=314s  
参考：JavaScript Tutorial - Full ECommerce in 7 Hours 
https://www.youtube.com/watch?v=KVMxj6-aXbI  
https://github.com/basir/node-javascript-ecommerce  
- 👉 Heroku : [https://jsamazona.herokuapp.com](https://jsamazona.herokuapp.com)
- 👉 AWS : [https://jsamazona.webacademy.pro](https://jsamazona.webacademy.pro)

### 1. Create Folder Structure
~~~
   1. create root folder as js_ecommerce
   2. add frontend and backend folder
   3. create src folder in frontend
   4. create index.html with heading jsamazona in src
   5. run npm init in frontend folder
   6. npm install live-server
   7. add start command as live-server src --verbose
   8. run npm start
   9. check result
~~~
ファイル→ファイルでワークスペースを開く→新規フォルダ  
html:5タブ
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" /> // Lesson2で作成する
  <title>JS Eshop</title>
  <script type="module" src="app.js"></script>
</head>
<body>
  <h1>JS Eshop</h1>
</body>
</html>
```
user@mbp js_ecommerce % cd frontend  
user@mbp frontend % npm init -y　　// package.jsonできる  
user@mbp frontend % npm i -D live-server  
~~~css
<!-- package.json -->
"scripts": {
  "start": "live-server src --verbose",  // added
  "test": "echo \"Error: no test specified\" && exit 1"
},
~~~
npm start

## 2. Design Website
https://www.youtube.com/watch?v=yVG7btkkd1g
~~~
   1. create style.css
   2. link style.css to index.html
   3. create div.grid-container
   4. create header, main and footer
   5. style html, body
   6. style grid-container, header, main and footer
~~~
create div.grid-container  
create header, main and footer  
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
  <title>JS Eshop</title>
  <script type="module" src="app.js"></script>
</head>
<body>
  <!-- <h1>JSESHOP</h1> -->
  <div class="grid-container">
    <header>
      <div class="brand">
        <a href="/#/">js-eshop</a>
      </div>
      <div>
        <a href="/#/signin">Sign-In</a>
        <a href="/#/cart">Cart</a>
      </div>
    </header>
    <main>
      <div>
        Product Lists
      </div>
    </main>
    <footer>
      All rights reserved @2023
    </footer>
  </div>
</body>
</html>
```
***create style.css***  
bodyやhtml要素でfont-sizeを62.5%にしておくと、
デフォルト設定の時の基準が16pxの62.5%、つまり10pxになります。
「rem」 は常にhtml 要素のフォントサイズを基準にするのでhtml要素でfont-sizeを62.5%にしておけば、階層が深くなってもフォントサイズが狂うことはありません。   
今回のプロジェクトのcssはpxの代わりに1rem=10pxで表示する時がある  
~~~css
/* style.css */
*{
  box-sizing: border-box;
}
html {
  font-size: 62.5%;  /* 16px * 62.5 = 10px = 1rem */
}
body{
  height: 100vh;
  font: 1.6rem Helvetica, Aria;
  margin: 0;
}
.grid-container{
  display: grid;
  grid-template-areas:
  'header'
  'main'
  'footer';
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 5rem;
  height: 100%;
}
header{
  grid-area: header;
  background-color: #203040;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}
header a{
  color:#ffffff;
  font-weight: bold;
  text-decoration: none;
}
header a:hover{
  color: #f08040;
}
.brand a{
  font-size: 3rem;
}
footer {
  background-color: #203040;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}
~~~
.grid-containerは、グリッドのコンテナ要素を表し、display: gridでグリッドを表示。  
grid-template-areasは、各グリッドエリアの名前を定義するためのプロパティで、'header', 'main', 'footer'という3つのエリアが定義されています。  
grid-template-columnsは、グリッドの列のサイズを定義するためのプロパティで、1frで1つの列が定義されています。  
grid-template-rowsは、グリッドの行のサイズを定義するためのプロパティで、5rem, 1fr, 5remという3つの行が定義されています。  
最後に、height: 100%は、.grid-containerを画面の高さに合わせるために使用されます。つまり、このコードは、headerとfooterに5remの高さを設定し、mainエリアに残りのスペースを割り当てるグリッドレイアウトを作成します。  
header{
  grid-area: header;
  ・・・
の意味は、.grid-containerクラスで定義されたグリッドシステムの中で、header要素に対してgrid-areaプロパティを設定しています。これにより、header要素はグリッドのheaderエリアに配置されます。


## 3. Create Static Home Screen
https://www.youtube.com/watch?v=n8862tvChtg
```
   1. create ul.products
   2. create li
   3. create div.product
   4. add .product-image, .product-name, .product-brand, .product-price
   5. style ul.products and internal divs
   6. duplicate 2 times to show 3 products
```
~~~js
// index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css" />
  <title>JS Eshop</title>
  <script type="module" src="app.js"></script>
</head>
<body>
  <!-- <h1>JSESHOP</h1> -->
  <div class="grid-container">
    <header>
      <div class="brand">
        <a href="/#/">Dev-WebArticles</a>
      </div>
      <div>
        <a href="/#/signin">Sign-In</a>
        <a href="/#/cart">Comment</a>
      </div>
    </header>
    <main>
      <div >
        <ul class="posts">
          <li>
            <div class="post">
              <a href="/#/post/1">
                <img src="/images/post-1.jpg" alt="post 1" />
              </a>
              <div class="post-title">
                <a href="/#/post/1">
                  JavaScript coding
                </a>
              </div>
              <div class="post-category">
                Javascript
              </div>
              <div class="post-date">
                2023年05月04日
              </div>
            </div>
          </li>
          <li>
            <div class="post">
              <a href="/#/post/1">
                <img src="/images/post-1.jpg" alt="post 1" />
              </a>
              <div class="post-title">
                <a href="/#/post/1">
                  JavaScript coding
                </a>
              </div>
              <div class="post-category">
                Javascript
              </div>
              <div class="post-date">
                2023年05月04日
              </div>
            </div>
          </li>
          <li>
            <div class="post">
              <a href="/#/post/1">
                <img src="/images/post-1.jpg" alt="post 1" />
              </a>
              <div class="post-title">
                <a href="/#/post/1">
                  JavaScript coding
                </a>
              </div>
              <div class="post-category">
                Javascript
              </div>
              <div class="post-date">
                2023年05月04日
              </div>
            </div>
          </li>
          <li>
            <div class="post">
              <a href="/#/post/1">
                <img src="/images/post-1.jpg" alt="post 1" />
              </a>
              <div class="post-title">
                <a href="/#/post/1">
                  JavaScript coding
                </a>
              </div>
              <div class="post-category">
                Javascript
              </div>
              <div class="post-date">
                2023年05月04日
              </div>
            </div>
          </li>
          <li>
            <div class="post">
              <a href="/#/post/1">
                <img src="/images/post-1.jpg" alt="post 1" />
              </a>
              <div class="post-title">
                <a href="/#/post/1">
                  JavaScript coding
                </a>
              </div>
              <div class="post-category">
                Javascript
              </div>
              <div class="post-date">
                2023年05月04日
              </div>
            </div>
          </li>
          <li>
            <div class="post">
              <a href="/#/post/1">
                <img src="/images/post-1.jpg" alt="post 1" />
              </a>
              <div class="post-title">
                <a href="/#/post/1">
                  JavaScript coding
                </a>
              </div>
              <div class="post-category">
                Javascript
              </div>
              <div class="post-date">
                2023年05月04日
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
    <footer>
      All rights reserved @2023
    </footer>
  </div>
</body>
</html>
~~~
### 04 Render Home Screen
https://www.youtube.com/watch?v=U55XCQNCdcE&t=182s
~~~js
// screens/data.js
export default {
  products: [
    {
      _id: '1',
      user: 'user',
      title: 'JavaScriptの基本である連想配列をマスターする',
      category: 'JavaScript',
      text:'JavaScriptの連想配列の基本的な知識を学べる記事です',
      link:'https://techplay.jp/column/528',
      tags: ['JavaScript', 'Programming'],
      image: '/images/post-1.jpg',
      brand: 'Hiskywin',
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
    },
    {
      _id: '2',
      name: 'Nike Full-Zip Hoodie Mens Workout Sweatshirt',
      category: 'Shirts',
      image: '/images/product-2.jpg',
      price: 70,
      brand: 'Nike',
      rating: 5,
      numReviews: 51,
    },
    {
      _id: '3',
      name: 'Adidas Mens Long Sleeve Hoodie',
      category: 'Shirts',
      image: '/images/product-3.jpg',
      price: 59,
      brand: 'Adidas',
      rating: 4,
      numReviews: 45,
    },
    {
      _id: '4',
      name: 'Under Armour Mens Sportstyle Tricot Joggers',
      category: 'Pants',
      image: '/images/product-4.jpg',
      price: 90,
      brand: 'Under Armour',
      rating: 2.5,
      numReviews: 198,
      countInStock: 6,
    },
    {
      _id: '5',
      name: 'Champion Mens Graphic Powerblend Fleece Jogger',
      category: 'Pants',
      image: '/images/product-5.jpg',
      price: 119,
      brand: 'Champion',
      rating: 3.5,
      numReviews: 89,
      countInStock: 6,
    },
    {
      _id: '6',
      name: 'Aelfric Eden Mens Joggers Pants Long Multi-Pockets',
      category: 'Pants',
      image: '/images/product-6.jpg',
      price: 85,
      brand: 'Aelfric Eden',
      rating: 4.5,
      numReviews: 45,
      countInStock: 6,
    },
  ],
};
~~~

~~~js
// screens/HomeScreen.js
import data from '../data.js'

const HomeScreen = {
  render: ()=> {
    const {products} = data
    return `
    <ul class="products">
      ${products.map(product => `
      <li>
        <div class="product">
          <a href="/#/product/${product._id}">
            <img src="{product.image}" alt="${product.name}" />
          </a>
        <div class="product-name">
          <a href="/#/product/1">
            ${product.name}
          </a>
        </div>
        <div class="product-brand">
          ${product.brand}
        </div>
        <div class="product-price">
          ${product.price}
        </div>
        </div>
      </li>
      `)}
    `
  }
}
~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~


4. Render Dynamic Home Screen
   1. create data.js
   2. export an array of 6 products
   3. create screens/HomeScreen.js
   4. export HomeScreen as an object with render() method
   5. implement render()
   6. import data.js
   7. return products mapped to lis inside an ul
   8. create app.js
   9. link it to index.html as module
   10. set main id to main-container
   11. create router() function
   12. set main_container innerHTML to HomeScreen.render()
   13. set load event of window to router() function
5. Build Url Router
   1. create routes as route:screen object for home screen
   2. create utils.js
   3. export parseRequestURL()
   4. set url as hash address split by slash
   5. return resource, id and verb of url
   6. update router()
   7. set request as parseRequestURL()
   8. build parsedUrl and compare with routes
   9. if route exists render it, else render Error404
   10. create screens/Error404.js and render error message
6. Create Node.JS Server
   1. run npm init in root jsamazona folder
   2. npm install express
   3. create server.js
   4. add start command as node backend/server.js
   5. require express
   6. move data.js from frontend to backend
   7. create route for /api/products
   8. return products in data.js
   9. run npm start
7. Load Products From Backend
   1. edit HomeScreen.js
   2. make render async
   3. fetch products from '/api/products' in render()
   4. make router() async and call await HomeScreen.render()
   5. use cors on backend
   6. check the result
8. Add Webpack
   1. cd frontend
   2. npm install -D webpack webpack-cli webpack-dev-server
   3. npm uninstall live-server
   4. "start": "webpack-dev-server --mode development --watch-content-base --open"
   5. move index.html, style.css and images to frontend folder
   6. rename app.js to index.js
   7. update index.html
   8. add script main.js before body tag
   9. npm start
   10. npm install axios
   11. change fetch to axios in HomeScreen
9. Install Babel For ES6 Syntax
   1. npm install -D babel core, cli, node, preset-env
   2. Create .babelrc and set presets to @babel/preset-env
   3. npm install -D nodemon
   4. set start: nodemon --watch backend --exec babel-node backend/server.js
   5. convert require to import in server.js
   6. npm start
10. Enable Code Linting
    1. npm install -D eslint
    2. install VSCode eslint extension
    3. create .eslintrc and set module.exports for env to node
    4. Set VSCode setting for editor.codeActionsOnSave source.fixAll.eslint to true
    5. check result for linting error
    6. npm install eslint-config-airbnb-base and eslint-plugin-import
    7. set extends to airbnb-base
    8. set parserOptions to ecmaVersion 11 and sourceType to module
    9. set rules for no-console to 0 to ignore linting error
11. Install VSCode Extension
    1. JavaScript (ES6) code snippets
    2. ES7 React/Redux/GraphQL/React-Native snippets
    3. Prettier - Code formatter
    4. HTML&LESS grammar injections
12. Create Rating Component
    1. create components/Rating.js
    2. link to fontawesome.css in index.html
    3. create div.rating
    4. define Rating object with render()
    5. if !props.value return empty div
    6. else use fa fa-star, fa-star-half-o and fa-star-o
    7. last span for props.text || ''
    8. style div.rating, span and last span
    9. Edit HomeScreen
    10. Add div.product-rating and use Rating component
13. Product Screen
    1. get product id from request
    2. implement /api/product/:id api
    3. send Ajax request to product api
14. Product Screen UI
    1. create back to result link
    2. create div.details with 3 columns
    3. column 1 for product image
    4. column 2 for product information
    5. column 3 form product action
    6. style .details and all columns
    7. create add to cart button with add-button id
15. Product Screen Action
    1. after_render() to add event to the button
    2. add event handler for the button
    3. redirect user to cart/:product_id
    4. implement after_render in index.js
16. Add To Cart Action
    1. create CartScreen.js
    2. parseRequestUrl
    3. getProduct(request.id)
    4. addToCart
    5. getCartItems
    6. cartItems.find
    7. if existItem update qty
    8. else add item
    9. setCartItems
17. Cart Screen UI
    1. cartItems = getCartItems()
    2. create 2 columns for cart items and cart action
    3. cartItems.length === 0 ? cart is empty
    4. show item image, name, qty and price
    5. cart action
    6. Subtotal
    7. Proceed to Checkout button
    8. Add CSS Style
18. Update and Delete Cart Items
    1. add qty select next to each item
    2. after_render()
    3. add change event to qty select
    4. getCartItems() and pass to addToCart()
    5. set force to true to addToCart()
    6. create rerender() as (component, areaName = 'content')
    7. component.render and component.after_render
    8. if force is true then rerender()
    9. add delete button next to each item
    10. add click event to qty button
    11. call removeFromCart(deleteButton.id)
    12. implement removeFromCart(id)
    13. setCartItems( getCartItems().filter)
    14. if id === parseRequestUrl().id? redirect to '/cart'
    15. else rerender(CartScreen);
19. Connect To MongoDB and Create Admin User
    1. npm install mongoose
    2. connect to mongodb
    3. create config.js
    4. npm install dotenv
    5. export MONGODB_URL
    6. create models/userModel.js
    7. create userSchema and userModel
    8. create userRoute
    9. create createadmin route
20. Sign-in Screen UI
    1. create SigninScreen
    2. render email and password fields
    3. style signin form
21. Sign-in Screen Backend
    1. create signin api in backend
    2. create route for /api/users/signin
    3. create check user name and password
    4. if it is not ok the return 401 error
    5. install express-async-handler
    6. wrap it in expressAsyncHandler
    7. add error middleware in server.js
    8. install Postman
    9. send post request
    10. test with invalid user password
    11. otherwise generate token
    12. install jsonwebtoken
    13. set config.JWT_SECRET to somethingsecret
    14. add generateToken to utils.js
    15. return token
    16. test with correct user and password
22. Sign-in Screen Action
    1. after_render handle form submit
    2. create signin request in frontend
    3. show alert if email or password is incorrect
    4. Add getUserInfo and setUserInfo to localStorage
    5. create Header component
    6. if userInfo.email exist show user name otherwise show signin
23. Create Progress Indicator and Alert Component
    1. create overlay loading div in index.html
    2. Style overlay loading
    3. create showLoading() function
    4. set loading-overlay classList add active
    5. create hideLoading() function
    6. create overlay message div in index.html
    7. add style overlay message
    8. create showMessage(message, callback)
    9. document message-overlay set inner HTML
    10. div > div id message-overlay-content
    11. show message
    12. button id message-overlay-close-button OK
    13. add class active to it
    14. add event listener for button to call callback
24. Register Screen
    1. create RegisterScreen.js
    2. add form elements
    3. after_render handle form submit
    4. create register request in frontend
    5. create register api in backend
25. User Profile Screen
    1. create ProfileScreen.js
    2. add form elements
    3. after_render handle form submit
    4. create profile update request in frontend
    5. create profile update api in backend
    6. create isAuth in utils.js and use in update profile
    7. implement sign out
26. Checkout Wizard
    1. create CheckoutSteps.js
    2. create div elements for step 1 to 4
    3. create redirectUser() in utils.js
    4. copy profile screen and as shipping screen
    5. use CheckoutStep
    6. define getShipping and setShipping
    7. copy shipping screen and as payment screen
    8. define getPayment and setPayment
    9. redirect user to PlaceOrder.js
27. PlaceOrder Screen UI
    1. create PlaceOrder.js
    2. style elements
28. PlaceOrder Screen Action
    1. handle place order button click
    2. createOrder api
    3. create orderModel
    4. create orderRouter
    5. create post order route
29. Order Screen
    1. create OrderScreen.js
    2. style elements
30. PayPal Payment
    1. get client id from paypal
    2. set it in .env file
    3. create route form /api/paypal/clientId
    4. create getPaypalClientID in api.js
    5. add paypal checkout script in OrderScreen.js
    6. show paypal button
    7. update order after payment
    8. create payOrder in api.js
    9. create route for /:id/pay in orderRouter.js
    10. rerender after pay order
31. Display Orders History
    1. create customer orders api
    2. create api for getMyOrders
    3. show orders in profile screen
    4. style orders
32. Admin Dashboard UI
    1. Header.js
    2. if user is admin show Dashboard
    3. create DashboardScreen
    4. create DashboardMenu
    5. Style dashboard
33. Admin Products UI
    1. create ProductListScreen.js
    2. show products with edit and delete button
    3. show create product button
34. Create Product
    1. create product model
    2. implement create product route
    3. create product function in api.js
    4. call create product function in ProductListScreen
    5. redirect to edit product
35. Edit Product UI
    1. create ProductEditScreen.js
    2. load product data from backend
    3. handle form submit
    4. save product in backend
36. Edit Product Backend
    1. handle form submit
    2. create updateProduct
    3. save product in backend
37. Upload Product Image
    1. npm install multer
    2. create routes/uploadRoute.js
    3. import express and multer
    4. create disk storage with Date.now().jpg as filename
    5. set upload as multer({ storage })
    6. router.post('/', upload.single('image'))
    7. return req.file.path
    8. app.use('/api/uploads',uploadRoute) in server.js
    9. create uploads folder and put empty file.txt there.
    10. ProductEditScreen.js
    11. create file input and set id to image-file
    12. after_render() handle image-file change
    13. create form data
    14. call uploadProductImage()
    15. create uploadProductImage in api.js
    16. update server.js
38. Build Project
    1. create build script for frontend
    2. create build script for backend
    3. update sever.js to serve frontend build folder and uploads folder
    4. stop running frontend
    5. npm run build
    6. check localhost:5000 for running website and showing images
39. Delete Product
    1. update ProductListScreen.js
    2. handle delete button
    3. rerender after deletion
40. Admin Orders
    1. create Admin Order menu in header
    2. create AdminOrder.js
    3. load orders from backend
    4. list them in the screen
    5. show delete and edit button
    6. redirect to order details on edit action
41. Deliver Order
    1. if order is payed show deliver button for admin
    2. handle click on deliver button
    3. set state to delivered
42. Show Summary Report in Dashboard
    1. create summary section
    2. style summary
    3. create summary backend
    4. create getSummary in api.js
    5. load data in dashboard screen
    6. show 3 boxes for Users, Orders and Sales
43. Show Chart in Dashboard
    1. import chartist
    2. add chartist css to index.html
    3. create linear chart for daily sales
    4. create pie chart for product categories
44. Publish heroku
    1. Create git repository
    2. Create heroku account
    3. install Heroku CLI
    4. heroku login
    5. heroku apps:create <yourname>jsamazona
    6. Edit package.json for heroku-prebuild
    7. Edit package.json for heroku-postbuild
    8. Edit package.json for node engines
    9. Create Procfile
    10. Edit server.js for PORT
    11. Create mongodb atlas database
    12. create MongoDB Account
    13. open cloud.mongodb.com
    14. add new user and save username and password
    15. set Network Access to accept all requests
    16. Create new database
    17. create connection string based on db name and user and password
    18. Set Cloud MongoDB connection in heroku env variables
    19. Commit and push
45. Product Search Bar
    1. create search bar in Header.js
    2. add style
    3. handle submit form
    4. edit parse url to get query string
    5. update product list api for search keyword
46. Show Categories In Sidebar Menu
    1. create aside-open-button in Header.js
    2. add event to open aside
    3. create Aside.js component
    4. Add style aside
    5. after render close it on click on close button
    6. Use it in index.html
    7. Update index.js to render aside 9.
    8. call getCategories
    9. create getCategories in api.js
47. Review Products
    1.  create review model
    2.  create review form
    3.  create review api
    4.  style review form
  
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


