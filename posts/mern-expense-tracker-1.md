---
title: 'Mern Expense Tracker -1-'
date: 'November 1, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使って経費追跡アプリ リをつくります。1回目はUIとバックエンドを実装していきます'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

# Front End Setup
## Reat App Setup
Goal Setter App:  https://mern-goalsetter01.herokuapp.com/  
email:   
password:   
参考サイト:

MongoDB, Express, React, Node.js

~~~
user@mbp mern-expense-tracker % npx create-react-app client
>npm run server
~~~

~~~bash
user@mbp client % npm i antd react-router-dom aos react-redux redux axios
~~~
Ant Design: https://ant.design/components/overview/  
~~~js
import './App.css';
import {Button} from 'antd'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="App">
      <h1>Expense tracker</h1>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
export default App;
~~~

Bootstrap: 
```
// public/index.html に追加
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```
Google Fonts: Montserrat 

```css
// index.css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

body {
  margin: 0;
  font-family: 'Montserrat',sans-serif !important;
}
```
```js
// src/components/Layout.js
import '../resources/layout.css'

function Layout(props) {
  return (
    <div className='layout'>
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
        </div>
        <div>
          <h1 className='username'>Username</h1>
        </div>
      </div>

      <div className='content'>
          {props.children}
      </div>
      
    </div>
  )
}
```
```css
 /* src¥resources¥layout.css */
.layout {
  margin: 0 100px;
}

.header{
  background-color: #161C51;
  padding: 20px;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
}

.logo{
  font-size: 30px;
  color: rgba(255, 255, 255, 0.716);
  margin: 0 !important;
  cursor: pointer;
}

.username {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.742);
}

.content {
  height: 85vh;
  box-shadow: 0 0 3px gray;
  margin-top: 20px;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 15px;
}

@media screen and (max-width: 700px){
  .layout {
    margin: 0 15px;
  }
}
```
# Backend Setup
user@mbp mern-expense-tracker % npm init -y  
user@mbp mern-expense-tracker % npm i nodemon mongoose express dotenv  
dotenvを使うと.envファイルに定義された値を環境変数として使える。システムの環境変数として値が設定されていればそちらを優先して使えるので、開発時はローカルで.envを配置し、本番ではホスティングサービスの機能で環境変数として設定することでリポジトリ内のファイルを変更せずに実行することができる
```js
// server.js
const express = require('express')

const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))
```
user@mbp mern-expense-tracker % nodemon server  
mongoDB の設定  
Browse Collections->Create Database  
Database Access->Add new databaseuser  
Overview->Connect->id + passwordのURLを取得  
Built-in-Role : Read and write to anydatabase  
```js
// server.js
const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))
```
```js
// .env
NODE_ENV = development
PORT =5000
MONGO_URI = 'mongodb+srv://<user>:<password>@cluster========='
```
```js
// dbConnect.js
const mongoose = require('mongoose')
const dotenv = require("dotenv").config()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', ()=> console.log('Mongo DB Connection successful'))
```
## User Login/Registration UI
#### Login-Register Part1
BootstrapのRegistration Form
```js
  <form>
    <h3>Sign Up</h3>
    <div className="mb-3">
      <label>First name</label>
      <input
        type="text"
        className="form-control"
        placeholder="First name"
      />
    </div>
    <div className="mb-3">
      <label>Last name</label>
      <input type="text" className="form-control" placeholder="Last name" />
    </div>
    <div className="mb-3">
      <label>Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
      />
    </div>
    <div className="mb-3">
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
      />
    </div>
    <div className="d-grid">
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </div>
    <p className="forgot-password text-right">
      Already registered <a href="/sign-in">sign in?</a>
    </p>
  </form>
```
アニメーション  
LottieFiles:  https://lottiefiles.com/search?q=money&category=animations
web gradient: https://webgradients.com/  
022 Morphrus Den

```js
//src/pages/Registration.js
import {Link} from 'react-router-dom'
import '../resources/authentication.css'
import {useState} from 'react'

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=(e)=> {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='register'>
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / REGISTER</h1>
            <hr />
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div> */}
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                REGISTER
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/login'>Already registered?, Click here login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
```
```js
//src/pages/Registration.js
import {Link} from 'react-router-dom'
import '../resources/authentication.css'
import {useState} from 'react'

function Login() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const {name, email, password} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=(e)=> {
    e.preventDefault()
    const values ={
      name: name,
      email: email,
      password: password
    }
    console.log(values)
    setFormData({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className='register'>
      <div className="row justify-content-center  align-items-center w-100 h-100">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <h1>EXPENSE TRACKER / LOGIN</h1>
            <hr />
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3">
              <label>Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div> */}
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                LOGIN
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link to='/register'>Not Registered Yet?, Click here register</Link>
            </p>
          </form>
        </div>
        <div className="col-md-5 ">
          <div className="lottie">
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json"  background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
```
cssの編集
```css
/* src/resources/authentication.css */
.register{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-image: linear-gradient(to left, #9890e3 0%, #b1f4cf 100%); */
  background-image: linear-gradient(to right, #88d3ce 0%, #6e45e2 100%);
}

.lottie{
  height: 400px;
}

.register input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: rgba(255, 255, 255, 0.536);
}

input:focus{
  outline: none !important;
  box-shadow: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.784); !important;
}

label, a{
  color: rgba(255, 255, 255, 0.536);
}

.register h1 {
  font-size: 25px;
  color: white;
}
```
index.css
```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

body {
  margin: 0;
  font-family: 'Montserrat',sans-serif !important;
}

/* スクロールバー非表示 */
body,html {
  overflow-x: hidden;
}
```
## User Login-Registration API's
#### User Model and API's 
```js
// models/user.js 
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
)

module.exports = mongoose.model('User', userSchema)
// const usermodel = mongoose.model('Users', userSchema)
// module.exports = usermodel
~~~
('Users', userSchema)の'Goal' はモデル名
```
ルーター(userRoutes)の作成 　　Mern GoalSetter2を参照
```js
// /routes/userRoutes.js
const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
```
server.jsにuserRouteを追加
```js
// server.js
const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())　// added
const userRoute = require('./routes/userRoute') // added

app.use('/api/users/', userRoute)  // added

// app.get('/', (req, res) => res.send('Hello World')) 削除
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))
```
#### Login Registration Testing
https://www.youtube.com/watch?v=OML9f6LXUUs&t=230s
Clientのpackage.jsonの最後にproxyを追加
```
    ＝＝＝省略＝＝＝
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:5000" // added
}
```
react-toastify
```
 npm install --save react-toastify
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
```

### Add Transaction UI
Homeページにフォーム入力用のモーダルを作成する
```js
// /src/pages/Home.jsx
import {useState} from 'react'
import Layout from '../components/Layout'
import '../resources/transaction.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    date: "",
    reference: "",
    description: "",
  })
  // const navigate = useNavigate()
  const {amount, type, category, date, reference, description} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      amount: amount,
      type: type,
      category: category,
      date: date,
      reference: reference,
      description: description,
    }
    console.log(values)

    setFormData({
      amount: "",
      type: "",
      category: "",
      date: "",
      reference: "",
      description: "",
    })
  }

  return (
    <Layout>
      <div className="filter d-flex justify-content-between align-item-center">
        <div>

        </div>
        <div>
          <button className='primary' onClick={()=>setShowAddEditTransactionModal(true)}>ADD NEW</button>
        </div>

      </div>
      <div className="table-analytics">

      </div>

      <Modal show={showAddEditTransactionModal} onHide={()=>setShowAddEditTransactionModal(false)}>
      <Modal.Header closeButton >
        <Modal.Title>Add Transaction</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Form className='transaction-form' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" placeholder="" value={amount} onChange={handleChange} name="amount"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select id="type" name="type" onChange={handleChange}>
              <option value=''></option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select id="category" name="category" onChange={handleChange}>
              <option value=''></option>
              <option value='salary'>Salary</option>
              <option value='food'>Food</option>
              <option value='entertainment'>Entertainment</option>
              <option value='learning'>Learning</option>
              <option value='medical'>Medical</option>
              <option value='tax'>Tax</option>
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" placeholder="" value={date} name="date" onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="reference">
              <Form.Label>Reference</Form.Label>
              <Form.Control type="text" placeholder="" name="reference" value={reference} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" placeholder="" value={description} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-end" controlId="description">
            <Button className="primary" type="submit">SAVE</Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
    </Modal>

    </Layout>
  )
}

export default Home
```

```js
// resource/transaction.css
.filter {
  box-shadow: 0 0 3px gray;
  padding: 15px 20px;
  border-radius: 10px;
}

.transaction-form label{
  color: rgba(0, 0, 0, 0.77)!important;
}
```
### Add Transaction API
モデルの作成
```js
// models/Transaction.js
const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
)

module.exports = mongoose.model('Transaction', transactionSchema)
```
ルータの作成
```js
// routes/transactionsRoute.jsx
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

router.post('/add-transaction', async function(req, res){
  try {
    const newTransaction = new Transaction(req.body);
    const transaction = await newTransaction.save()
    res.status(200).json(transaction)
    // res.send('User Registered Successfully')
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/get-all-transactions', async(req, res) =>{
  try {
    const transactions = await Transaction.find({});
    res.status(200).json(transactions)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
```
エンドポイントの追加
```js
// server.js
const express = require('express')
const dbconnect = require('./dbConnect')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json())
const userRoute = require('./routes/userRoute')
const transactionRoute = require('./routes/transactionsRoute')

app.use('/api/users/', userRoute)
app.use('/api/transactions/', transactionRoute) // added

// app.get('/', (req, res) => res.send('Hello World'))
app.listen(port, ()=> console.log(`Node JS Server started at port ${port}!`))
```
Home.jsで作成したモーダルの部分を切り取って別のコンポーネントを作成する
```js
// src¥components/AddEditTransaction.js
import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function AddEditTransaction(props) {
  const {showAddEditTransactionModal, setShowAddEditTransactionModal} = props

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    date: "",
    reference: "",
    description: "",
  })
  // const navigate = useNavigate()
  const {amount, type, category, date, reference, description} = formData

  const handleChange=(e)=> {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit=async (e)=> {
    e.preventDefault()
    setLoading(true)
    const values ={
      amount: amount,
      type: type,
      category: category,
      date: date,
      reference: reference,
      description: description,
    }
    console.log(values)

    try {
      const user = JSON.parse(localStorage.getItem('expense-tracker-user'))
      setLoading(true)
      const response = await axios.post('/api/transactions/add-transaction', {...values, userid: user._id})
      console.log("transaction added successfully:", response.data) ;
      setShowAddEditTransactionModal(false)
      toast.success("transaction added successfully", {theme: "colored"})
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('transaction failed', {theme: "colored"})
      // throw new Error(`Something went wrong! ${error.message}`);
    }

    setFormData({
      amount: "",
      type: "",
      category: "",
      date: "",
      reference: "",
      description: "",
    })
  }

  if (loading){
    return <Spinner />
  }

  return (
    <Modal show={showAddEditTransactionModal} onHide={()=>setShowAddEditTransactionModal(false)}>
    <Modal.Header closeButton >
      <Modal.Title>Add Transaction</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>
        <Form className='transaction-form' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="text" placeholder="" value={amount} onChange={handleChange} name="amount"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select id="type" name="type" onChange={handleChange}>
            <option value=''></option>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select id="category" name="category" onChange={handleChange}>
            <option value=''></option>
            <option value='salary'>Salary</option>
            <option value='food'>Food</option>
            <option value='entertainment'>Entertainment</option>
            <option value='learning'>Learning</option>
            <option value='medical'>Medical</option>
            <option value='tax'>Tax</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" placeholder="" value={date} name="date" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="reference">
            <Form.Label>Reference</Form.Label>
            <Form.Control type="text" placeholder="" name="reference" value={reference} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" placeholder="" value={description} onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-end" controlId="description">
          <Button className="primary" type="submit">SAVE</Button>
          </Form.Group>
        </Form>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default AddEditTransaction

```

```

```

```
```

```
```

```

```

```
```

```
```

```

```

```
```

```
```

```
















~~~bash
npm i express dotenv mongoose colors
~~~

~~~bash
npm i -D nodemon
~~~


~~~javascript
// package.json
  "scripts": {
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"
  },
~~~

>>npm run server
~~~bash
git init
git add .
git commit -m "Initial commit" 
~~~

~~~javascript
// mern-goalsetter/backend/server.js
const express = require("express");
const dotenv = require("dotenv").config()
const port = 5000
// const mongoose = require("mongoose")

const app = express();

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

~~~
// .envファイル  
NODE_ENV = development  
PORT = 8000
~~~

#### ルータの作成1
~~~javascript
// routes\goalRoutes.js
const router = require("express").Router()

router.get('/', (req, res) => {
  res.status(200).json({message: 'Get goals'})
})

router.post('/', (req, res) => {
  res.status(200).json({message: 'Set goals'})
})

router.put('/:id', (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
})

router.delete('/:id', (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
})

module.exports = router
~~~

~~~javascript
// mern-goalsetter/backend/server.js
const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

const app = express();

// middleware
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

#### コントローラの作成1
~~~javascript
// goalController.js
// @desc   Get goals
// @route  GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({message: 'Get goals'})
}

// @desc   Set goal
// @route  POST /api/goals
// @access Private
const setGoal = (req, res) => {
  res.status(200).json({message: 'Set goals'})
}

// @desc   Update goal
// @route  PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
}

// @desc   Delete goal
// @route  DELETE /api/goals/:id
// @access Private
const deleteGoal = (req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
}

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
~~~
#### ルータの作成2  
~~~javascript
// routes\goalRoutes.js
const router = require("express").Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")

router.get('/', getGoals)

router.post('/', setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router
~~~

#### ルータの作成3 (2をより簡潔にする)  
~~~javascript
// routes\goalRoutes.js
const router = require("express").Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require("../controllers/goalController")

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').delete(deleteGoal).put(updateGoal)

module.exports = router
~~~

~~~javascript
// goalController.js
const setGoal = (req, res) => {
  console.log(req.body)  //undefinedになるのでmiddlewareが必要
  if (!req.body.text) {
    res.status(400).json({message: 'Please add a text field'})
  }
  res.status(200).json({message: 'Set goals'})
}
~~~

middlewareの作成
~~~javascript
// server.js
const express = require("express");
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000

const app = express();
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~
app.use(express.json()) とは？  
`Body-Parser`を基にExpressに組み込まれた機能でクライアントから送信されたデータを`req.body`経由で取得、操作できる

express.json()を使ってクライアントからデータを受け取る際に urlencoded({ extended: true})とするとx-www-form-urlencoded形式で、  
(urlencoded({ extended: false})とするとJSON形式でデータを受け取ることができる

Expressエラーハンドラーの追加
~~~javascript
// goalController.js
const setGoal = (req, res) => {
  console.log(req.body) 
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')//エラーハンドラーが必要
  }
  res.status(200).json({message: 'Set goals'})
}
~~~

エラーハンドラーのミドルウェア作成
~~~javascript
// errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode :500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = {
  errorHandler,
}
~~~

~~~javascript
// server.js
const express = require("express");
const dotenv = require("dotenv").config()
const {errorHandler} = require('./middleware/errorMiddleware')  // 追加
const port = process.env.PORT || 5000
// const mongoose = require("mongoose")

const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler) // 追加

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

#### コントローラの修正  
コントローラはasyncで返す
~~~javascript
// goalController.js
const getGoals = async(req, res) => {
  res.status(200).json({message: 'Get goals'})
}

const setGoal = async(req, res) => {
  res.status(200).json({message: 'Set goals'})
}

const updateGoal = async(req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
}

const deleteGoal = async(req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
}
~~~

express async handlerのインストール
~~~javascript
npm i express-async-handler
~~~

asyncHandlerの実装
~~~javascript
// mern-tutorial/backend/controllers/goalController.js 
const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Get goals'})
})

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  res.status(200).json({ message: 'Set goal'})
})

const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Update goal ${req.params.id}` })
})

const deleteGoal = asyncHandler(async(req, res) => {
  res.status(200).json({message: `Delete goal ${req.params.id}` })
})
~~~

### データベースの作成
##### MongoDB compass（デスクトップGUI）
https://www.mongodb.com/ja-jp/products/compass

.envファイル
~~~
NODE_ENV = development
PORT =5000
MONGO_URI = monogodb+srv://<user>:<password>~~~~=majority
~~~
#### モデルの作成
~~~javascript
// mern-tutorial/backend/config/db.js 
const mongoose = require('mongoose')

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch(error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDB
~~~

スキーマを作成
~~~javascript
// mern-tutorial/backend/models/goalModel.js 
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      reqired: [true, 'Please add a text value']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Goal', goalSchema);
~~~
('Goal', goalSchema)の'Goal' はモデル名
#### CRUD Function for API
~~~js
// mern-tutorial/backend/controllers/goalController.js 
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel') // 追加
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(goal)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,  // 存在しないときはcreate
  })
  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
~~~