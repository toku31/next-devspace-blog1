---
title: 'Mern Retail Store Pos-2'
date: 'March 4, 2023'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使ってスーパーマーケット向けのPOS(point of sales)アプリを作成します。２回目はカテゴリー別に商品を表示することからです。'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

https://www.udemy.com/course/mern-stack-retail-store-pos-application-reactreduxnode-d/  
Github:  https://github.com/sathyaprakash195/shey-pos-udemy  
user@mbp mern-busticket-booking % nodemon server  
user@mbp client % npm start
## Items Categories
```
<div class={`d-flex category ${selectedCategory===category.name && 'selected-category'}`} >
```
```js
// pages/Homepage.js
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import Item from '../components/Item'
import { useDispatch } from 'react-redux'

function Homepage() {
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('フルーツ')
  const categories = [
    {
      name: 'フルーツ',
      imageURL: 'https://healthnewshub.org/wp-content/uploads/2022/10/Fruit.jpg',
    },
    {
      name: '野菜',
      imageURL: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
    },
    {
      name: '肉',
      imageURL: 'https://cdn.britannica.com/72/143572-050-87DF1262/pork-butcher-shop-Hong-Kong.jpg',
    },
  ]
  
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=> {
      dispatch({type:'hideLoading'})
      // console.log(response.data);
      setItems(response.data)
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      {/* <div>Homepage</div> */}
      <div className="d-flex  px-3">
        {categories.map((category)=> {
          return <div class={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
              <h4>{category.name}</h4>
              <img src={category.imageURL} height='60' width='80' alt='' />
          </div>
        })}
      </div>

      <div className="row m-1">
        {items.map((item)=> {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 px-1" key={item._id}>
              <Item  item={item} />
            </div>
          )
        })}
      </div>
    </DefaultLayout>
  )
}

export default Homepage
```
```css
/* resources/items.css */
.item {
  box-shadow: 0 0 3px black;
  padding: 15px;
  margin: 10px 0px 15px 10px;
  border-radius: 5px;
}

.item .name {
  color: tomato;
  font-size: 20px;
}

.item .price {
  text-align: center;
  color: rgba(0, 0, 0, 0.686);
  font-size: 20px;
}

.item button {
  margin-top: 10px;
  background-color: rgb(43, 197, 43);
  color: white
}

.delete-icon {
  margin-right: 20px;
}

.input-border {
  border: 1px solid rgb(0, 39, 31);
  box-shadow: none;
  outline: none;
}

.input-border:focus{
  box-shadow: none;
  outline: none;
}

.itemTable-row {
  height: 90px;
}

.category {
  border: 2px solid rgb(168, 164, 165);
  margin-right: 50px;
  align-items: center;
  padding-left: 25px;
  border-radius: 10px;
}

.category h4 {
  margin-right: 25px;
  font-size: 22px;
}

.category img {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.selected-category {
  border: 3px solid rgb(50, 111, 201);
}
```
### Categoriesの続き
how to use filter and map simultaneously
```js
const numbers = [2, 7, 5, 10, 3];

const filteredNumbers = numbers.filter(num => num > 5);

const numberSquares = filteredNumbers.map(num => num * num);

const numberList = numberSquares.map((square, index) => {
  return <li key={index}>{square}</li>;
});

return <ul>{numberList}</ul>;
```
```js
  <div className="d-flex  px-3">
    {categories.map((category)=> {
      return <div 
      onClick={()=>setSelectedCategory(category.name)}
      className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
          <h4>{category.name}</h4>
          <img src={category.imageURL} height='60' width='80' alt='' />
      </div>
    })}
  </div>
```
```js
// src/pages/Homepage.js
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios' 
import Item from '../components/Item'
import { useDispatch } from 'react-redux'

function Homepage() {
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('フルーツ')
  const categories = [
    {
      name: 'フルーツ',
      imageURL: 'https://healthnewshub.org/wp-content/uploads/2022/10/Fruit.jpg',
    },
    {
      name: '野菜',
      imageURL: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
    },
    {
      name: '肉',
      imageURL: 'https://cdn.britannica.com/72/143572-050-87DF1262/pork-butcher-shop-Hong-Kong.jpg',
    },
  ]
  
  const dispatch = useDispatch()
  const getAllItems = () => {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response)=> {
      dispatch({type:'hideLoading'})
      // console.log(response.data);
      setItems(response.data)
    }).catch((error)=> {
    dispatch({type:'hideLoading'})
    console.log(error)
    })
  }

  useEffect(()=> {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      {/* <div>Homepage</div> */}
      <div className="d-flex  px-3">
        {categories.map((category)=> {
          return <div 
          onClick={()=>setSelectedCategory(category.name)}
          className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
              <h4>{category.name}</h4>
              <img src={category.imageURL} height='60' width='80' alt='' />
          </div>
        })}
      </div>

      <div className="row m-1">
        {/* {items.map((item)=> { */}
        {items.filter((i)=> i.category === selectedCategory).map((item)=> {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 px-1" key={item._id}>
              <Item  item={item} />
            </div>
          )
        })}
      </div>
    </DefaultLayout>
  )
}

export default Homepage
```
### Login/Register
Sample  how to write react-bootstrap Form Col and Row
```js
<Form>
  <Row>
    <Col>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Enter your phone number" />
      </Form.Group>
    </Col>
  </Row>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

```
Registerページを作成する
```js
// src/pages/Register.js
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col} from 'react-bootstrap'
import '../resources/authentication.css'
import { Link } from 'react-router-dom';

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
  })

  const {name, userId, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      name: name,
      userId: userId,
      password: password,
    }
    console.log('values:', values);
  }

  return (
    <div className='authentication'>
      {/* <Form onSubmit={handleSubmit}> */}
      <Row>
        <Col lg={4} xs={11}>
          <Form onSubmit={handleSubmit}>
            <h1>Retail Store POS</h1>
            <hr />
            <h3>登録</h3>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>名前</Form.Label>
              <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ユーザID</Form.Label>
              <Form.Control type="text" placeholder="" value={userId} onChange={handleChange} name="userId" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="price">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" placeholder="" value={password} onChange={handleChange} name="password" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="register">
              <Link to='/login'>既に登録済みですか？ ログインするにはここをクリック</Link>
              <Button className="primary" type="submit">登録</Button>
            </Form.Group> 
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
```
```css
/* resources/authentication.css */
.authentication {
  align-items: center;
  height: 100vh;
}

.authentication .row{
  align-items: center;
  justify-content: center;
  height: 100vh;
} 
```
登録ページの背景にhttps://bgjar.com/を用いる
```css
/* resources/authentication.css */
.authentication {
  align-items: center;
  height: 100vh;
  background-image: url(./auth.svg);
  background-size: 100% 100%;
}

.authentication .row{
  align-items: center;
  justify-content: center;
  height: 100vh;
} 

.authentication form {
  background-color: white;
  padding: 20px;
}
```
ログインページを作成する
```js
// src/pages/Login.js
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col} from 'react-bootstrap'
import '../resources/authentication.css'
import { Link } from 'react-router-dom';

function Login() {

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
  })

  const {name, userId, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      name: name,
      userId: userId,
      password: password,
    }
    console.log('values:', values);
  }

  return (
    <div className='authentication'>
      {/* <Form onSubmit={handleSubmit}> */}
      <Row>
        <Col lg={4} xs={11}>
          <Form onSubmit={handleSubmit}>
            <h1>Retail Store POS</h1>
            <hr />
            <h3>ログイン</h3>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ユーザID</Form.Label>
              <Form.Control type="text" placeholder="" value={userId} onChange={handleChange} name="userId" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="price">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" placeholder="" value={password} onChange={handleChange} name="password" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="Login">
              <Link to='/register'>まだ登録してないですか？ 登録するにはここをクリック</Link>
              <Button className="primary" type="submit">ログイン</Button>
            </Form.Group> 
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
```
```js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Homepage />}  />
          <Route path="/items" element={<Items />}  />
          <Route path="/cart" element={<CartPage />}  />
          <Route path="/register" element={<Register />}  />
          <Route path="/login" element={<Login />}  />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
```
### Login Register API
ユーザモデルの作成
```js
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    verified : {
      type: Boolean,
      required: false
    }
  }, {timestamps: true})

module.exports = mongoose.model('users', usersSchema)
```
```js
const express = require('express')
const UsersModel = require('../models/usersModel')
const router = express.Router()

router.post('/login', async(req, res)=> {
  try {
    const user = await UsersModel.findOne({userId: req.body.userId, password: req.body.password, verified: true})
    if(user){
      res.send('ログインしました')
    } else {
    res.status(400).json(error)
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/register', async(req, res)=> {
  try {
    const newUser = new UsersModel({...req.body, verified: false})
    await newUser.save()
    res.send('ユーザが登録されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
```
ユーザルーターの作成
```js
// router/usersRouter.js
const express = require('express')
const UsersModel = require('../models/usersModel')
const router = express.Router()

router.post('/login', async(req, res)=> {
  try {
    await UsersModel.findOne({userId: req.body.userId, password: req.body.password, verified: true})
    res.send('ログインしました')
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/register', async(req, res)=> {
  try {
    const newUser = new UsersModel(req.body)
    await newUser.save()
    res.send('ユーザが登録されました')
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = router
```
```js
server.js
const express = require('express')
const dbConnect = require('./dbConnect')

const app = express();
app.use(express.json())
const port = 5000;

const itemsRoute = require('./routes/itemsRoute')
const usersRoute = require('./routes/usersRoute') // added
app.use('/api/items/', itemsRoute)
app.use('/api/users/', usersRoute)  // added

app.get('/', (req, res) => res.send('Hello World from home api'))
app.listen(port, ()=> console.log(`Node JS Server Running at port ${port}!`))
```
```js
// src/pages/Register.js
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col} from 'react-bootstrap'
import '../resources/authentication.css'
import { Link } from 'react-router-dom';
import axios from 'axios'; // added
import { toast } from 'react-toastify'; // added
import { useDispatch } from 'react-redux';  // added

function Register() {
  const dispatch = useDispatch()  // added
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
  })

  const {name, userId, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      name: name,
      userId: userId,
      password: password,
    }
    console.log('values:', values);
    try {  // added
      dispatch({type:'showLoading'})
      await axios.post('/api/users/register', values).then((res)=>{
        dispatch({type:'hideLoading'})
        toast.success("ユーザを登録しました 確認するのでお待ちください", {theme: "colored"})
      })
    } catch (error) {
      dispatch({type:'hideLoading'})
      toast.error("商品の登録に失敗しました", {theme: "colored"})
    }
  }

  return (
    <div className='authentication'>
      {/* <Form onSubmit={handleSubmit}> */}
      <Row>
        <Col lg={4} xs={11}>
          <Form onSubmit={handleSubmit}>
            <h1>Retail Store POS</h1>
            <hr />
            <h3>登録</h3>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>名前</Form.Label>
              <Form.Control type="text" placeholder="" value={name} onChange={handleChange} name="name" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ユーザID</Form.Label>
              <Form.Control type="text" placeholder="" value={userId} onChange={handleChange} name="userId" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="price">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" placeholder="" value={password} onChange={handleChange} name="password" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="register">
              <Link to='/login'>既に登録済みですか？ ログインするにはここをクリック</Link>
              <Button className="primary" type="submit">登録</Button>
            </Form.Group> 
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
```
```js
// src/pages/Login.js
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col} from 'react-bootstrap'
import '../resources/authentication.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function Login() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  })

  const {userId, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      userId: userId,
      password: password,
    }
    console.log('values:', values);
    try {
      dispatch({type:'showLoading'})
      await axios.post('/api/users/login', values).then((res)=>{
        dispatch({type:'hideLoading'})
        toast.success("ログイン処理に成功しました", {theme: "colored"})
      })
    } catch (error) {
      dispatch({type:'hideLoading'})
      toast.error("商品の登録に失敗しました", {theme: "colored"})
    }
  }

  return (
    <div className='authentication'>
      {/* <Form onSubmit={handleSubmit}> */}
      <Row>
        <Col lg={4} xs={11}>
          <Form onSubmit={handleSubmit}>
            <h1>Retail Store POS</h1>
            <hr />
            <h3>ログイン</h3>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ユーザID</Form.Label>
              <Form.Control type="text" placeholder="" value={userId} onChange={handleChange} name="userId" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="price">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" placeholder="" value={password} onChange={handleChange} name="password" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="Login">
              <Link to='/register'>まだ登録してないですか？ 登録するにはここをクリック</Link>
              <Button className="primary" type="submit">ログイン</Button>
            </Form.Group> 
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
```
### Protected Routes
localStorage.setItemを追加する
```js
// src/pages/Login.js
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      userId: userId,
      password: password,
    }
    console.log('values:', values);
    try {
      dispatch({type:'showLoading'})
      await axios.post('/api/users/login', values).then((response)=>{
        console.log('login axios.post res:', response)
        dispatch({type:'hideLoading'})
        toast.success("ログイン処理に成功しました", {theme: "colored"})
        localStorage.setItem('pos-user', JSON.stringify(response.data)) // added
      })
    } catch (error) {
      dispatch({type:'hideLoading'})
      console.log('catch error')
      toast.error("商品の登録に失敗しました", {theme: "colored"})
    }
  }
```
response.dataは以下のようにuserRouter.jsのres.send('ログインしました')が入ってくる  
またresponse.dataのresponseの名前は自由でres.dataでもよい
```js
 console.log('login axios.post res:', response)
{data: 'ログインしました', status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
```
```js
// routes/userRoute.js
const express = require('express')
const UsersModel = require('../models/usersModel')
const router = express.Router()

router.post('/login', async(req, res)=> {
  try {
    console.log('start')
    const user = await UsersModel.findOne({userId: req.body.userId, password: req.body.password, verified:true})
    console.log('user', user)
    if(user){
      // res.send('ログインしました')
      res.send(user) // localStorageに保存 Changed
    } else {
    console.log('else')
    res.status(400).json({message: 'login failed'})
    // res.status(400).json(error)
    }
  } catch (error) {
    console.log('error')
    res.status(400).json(error)
  }
})
```
react-router-domにおけるLinkとnavigateの違いは、ページ間のナビゲーションに使用されるが、目的が異なります。
Linkは、アプリケーション内の異なるページ間のリンクを作成するために使用されるコンポーネントです。ユーザーがLinkをクリックすると、アプリケーションのURLが変更され、対応するコンポーネントがページにレンダリングされます。 Linkは、アプリケーション内のクリッカブルなリンクを作成するために使用され、通常、JSXコード内で異なるルートへのリンクを作成するために使用されます。

例えば以下のように書けます：
```js
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>私のウェブサイトへようこそ</h1>
      <nav>
        <ul>
          <li>
            <Link to="/about">紹介</Link>
          </li>
          <li>
            <Link to="/contact">お問い合わせ</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
```
この例では、Linkを使用して/aboutと/contactルートへのリンクを作成しています。

一方、navigateは、useNavigateフックによって提供される関数であり、特定のルートにプログラム的にナビゲートするために使用されます。たとえば、フォームが送信された後や、その他のアクションが実行された後にプログラム的にナビゲーションする必要がある場合に役立ちます。

例えば以下のように書けます：
```js
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // フォームの送信ロジック...
    navigate('/thank-you');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* フォームのフィールドはここに入ります */}
      <button type="submit">送信</button>
    </form>
  );
}
```
この例では、useNavigateを使用してnavigate関数の参照を取得しています。フォームが送信されたとき、navigate関数を使用して/thank-youルートに移動します。

以上のように、Linkはクリッカブルなリンクを作成するために使用され、navigateは特定のルートにプログラム的にナビゲートするために使用されます。
```js
// App.js
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>}  />
          <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/register" element={<Register />}  />
          <Route path="/login" element={<Login />}  />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
export default App;

export function ProtectedRoute({children})  {
  if (localStorage.getItem('pos-user')){
    return children
  } else {
    return <Navigate to='/login' />
  }
}
```
Navigate component can be used to programmatically navigate to a new URL in your React application. The Navigate component is provided by the react-router-dom library, and it can be used in place of calling the navigate function directly.

```js
// src/pages/Login.js
import {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col} from 'react-bootstrap'
import '../resources/authentication.css'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  })

  const {userId, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit=async (e)=> {
    e.preventDefault()
    const values ={
      userId: userId,
      password: password,
    }
    console.log('values:', values);
    try {
      dispatch({type:'showLoading'})
      await axios.post('/api/users/login', values).then((response)=>{
        console.log('login axios.post res:', response)
        dispatch({type:'hideLoading'})
        toast.success("ログイン処理に成功しました", {theme: "colored"})
        localStorage.setItem('pos-user', JSON.stringify(response.data))
        navigate('/home')
      })
    } catch (error) {
      dispatch({type:'hideLoading'})
      console.log('catch error')
      toast.error("商品の登録に失敗しました", {theme: "colored"})
    }
  }

  // 追加
  // ローカルストーレジにデータがあればログインページや登録ページに行くことなくホームページに行かせる
  useEffect(()=> {
    if (localStorage.getItem('pos-user')){
      navigate('/home')
    } 
  },[])

  return (
    <div className='authentication'>
      {/* <Form onSubmit={handleSubmit}> */}
      <Row>
        <Col lg={4} xs={11}>
          <Form onSubmit={handleSubmit}>
            <h1>Retail Store POS</h1>
            <hr />
            <h3>ログイン</h3>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>ユーザID</Form.Label>
              <Form.Control type="text" placeholder="" value={userId} onChange={handleChange} name="userId" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="price">
              <Form.Label>パスワード</Form.Label>
              <Form.Control type="password" placeholder="" value={password} onChange={handleChange} name="password" className="input-border"/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-between align-items-center" controlId="Login">
              <Link to='/register'>まだ登録してないですか？ 登録するにはここをクリック</Link>
              <Button className="primary" type="submit">ログイン</Button>
            </Form.Group> 
          </Form>
        </Col>
      </Row>
    </div>
  )
}
```
```js
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../resources/layout.css'
import '../resources/global.css'
import { useSelector } from 'react-redux'

function DefaultLayout({children}) {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { cartItems, loading } = useSelector(state => state.rootReducer)

  // const userMenu = []
  const adminMenu = [
    {
      name: 'Home',
      path: '/home',
      icon: 'ri-home-line'
    },
    {
      name: 'Bills',
      path: '/bills',
      icon: 'ri-bill-line'
    },
    {
      name: 'items',
      path: '/items',
      icon: 'ri-list-check'
    },
    {
      name: 'Customers',
      path: '/admin/users',
      icon: 'ri-user-line'
    },
  ]
  const menuToBeRendered = adminMenu
  const activeRoute = window.location.pathname

  useEffect(()=> {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))

  }, [cartItems])
  console.log('DefaultLayout cartItems:', cartItems)
  
  return (
    <div className='layout-parent'>
      {loading && (
        <div className='spinner'>
          <div className="spinner-border" role="status">
          </div>
        </div>
      )}
      <div className="sidebar">
        <div>
          <p className="logo">Store POS</p>
          {/* <h3 className='logo'>Store POS</h3> */}
        </div>
          <div className="item-container d-flex flex-column">
            {menuToBeRendered.map((item, index) => {
              return <div key={index} className={`${activeRoute===item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon} ></i>
                {!collapsed && 
                <span onClick={()=>navigate(item.path)}>{item.name}</span>
                }
                </div>
            })}
            <div className="menu-item">
            <i className="ri-logout-box-line"></i>
            <span onClick={()=>{
              navigate('/login')
              localStorage.removeItem('pos-user') // added
            }}>Logout</span>
            </div>
          </div>
      </div>
      <div className="body">
        <div className="header" onClick={()=>setCollapsed(!collapsed)}>
            {collapsed ? (<i className="ri-menu-2-fill"></i>) : (<i className="ri-close-line"></i>)}
            <div className="cart-count d-flex align-items-center" onClick={()=>navigate('/cart')}>
              <p className='mt-3 mr-2'>{cartItems.length}</p>
              <i className="ri-shopping-cart-2-line"></i>
            </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default DefaultLayout
```
localhost:3000の時はログインページ誘導する  
ただしログイン状態の時はホームページに行く
```js
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import Items from './pages/Items';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>}  />
          <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/register" element={<Register />}  />
          <Route path="/login" element={<Login />}  />
          <Route path="/" element={<Login />}  />  // added
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
```
# Bills
### Bill Total
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```






