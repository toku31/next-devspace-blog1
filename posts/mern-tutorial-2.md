---
title: 'Mern Stack Tutorial -1-'
date: 'September 26, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)のメモ書きです 今回から実際にアプリを作成します'
cover_image: '/images/posts/img2.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

#### Project Set up
ES7+ React/Redux/React-Native snippets

node -v  
npm -v  
user@mbp server % npm init -y  
package.jsonができる  
~~~js
//package.json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module", // 追加
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
~~~
user@mbp server % npm i bcryptjs cors express jsonwebtoken mongoose morgan  
user@mbp server % npm i nodemon --save-dev  
Express Server作成：https://www.youtube.com/watch?v=0ZkUPoeGe5s  
~~~Javascript
// server/index.js
import express from "express";

const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
~~~

~~~Javascript
//package.json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",　// added but deleted later
    ===省略 ===
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js" // 追加
  },
~~~
npm run dev

mongoDB の設定  
Built-in-Role : Read and write to anydatabase  
connectボタンでid + passwordのURLを取得

~~~js
// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import morgan from "morgan"

const port = 5000;
const app = express();

app.use(morgan("dev"))
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

const MONGODB_URL ="mongodb+srv://<username>:<password>@cluster0.7eiib.mongodb.net/news_db?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URL).then(() => {
  app.listen(port, () => 
    console.log(`Server running on port ${port}`)
  )
}).catch((error) => console.log(`${error} did not connect`))
~~~

serverフォルダにcontrollers, middleware, models, routesフォルダを追加
### Auth Model
~~~js
// /models/user.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {type: String, reqired: true},
  email: {type: String, reqired: true},
  password: {type: String, reqired: false},
  googleId: {type: String, reqired: false},
  id : {type: String},
})

export default mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);
~~~
### Sign-Up Controller
~~~js
// server/controllers/userController.js
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import userModal from "../models/user.js"
const jwt = require("jsonwebtoken")
const userModal = require("../models/user");
const bcrypt = require("bcryptjs");

const secret = "test"
// ユーザ登録
const signup = async (req, res) => {
  const {email, password, firstName, lastName}= req.body;
  try {
    const oldUser = await userModal.findOne({email});

    if(oldUser){
      return res.status(400).json({message: "user already exists"})
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await userModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    })

    const token = jwt.sign({email: result.email, id:result._id}, secret, {expiresIn: "1h"})
    res.status(201).json({result, token})
  } catch(error) {
    res.status(500).json({messsage: "something went wrong"})
    console.log(error)
  }
}

module.exports = {
  signup,
}
~~~
### ルーター(Sign-Up Route)の作成
~~~js
// server/routes/userRoutes.js
// import express from "express"
const express = require('express')
const router = express.Router()
// const router = require("express").Router()

// router.post('/signup', (req, res) => {
//   res.status(200).json({message: 'Signup'})
// })

const { signup } = require("../controllers/userController")
// import { signup } from "../controllers/user.js"

router.post("/signup", signup);

module.exports = router
// export default router
~~~
ルータをindex.jsに設定する
~~~js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors"
// import morgan from "morgan"
const express = require("express")
const mongoose = require("mongoose") ;
const cors = require("cors") ;
const morgan = require("morgan") ;
const userRouter = require("./routes/userRoutes") ;

// import userRouter from './routes/user.js'
// apple135
//mongodb+srv://news-user:<password>@cluster0.7eiib.mongodb.net/?retryWrites=true&w=majority
const app = express();

app.use(morgan("dev"))
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/users', userRouter)  // http://localhost:5000/users/signup
// app.use('/users', require('./routes/userRoutes'))  // http://localhost:5000/users/signup

const MONGODB_URL ="mongodb+srv://news-user:apple135@cluster0.7eiib.mongodb.net/news_db?retryWrites=true&w=majority"
const port = 5000;

mongoose.connect(MONGODB_URL).then(() => {
  app.listen(port, () => 
    console.log(`Server running on port ${port}`)
  )
}).catch((error) => console.log(`${error} did not connect`))
~~~

Postmanでユーザ作成してMongoDbで確認  
POST: http://localhost:5000/users/signup  
Body->raw->JSON  
~~~js
{
    "firstName": "John",
    "lastName": "Doe",
    "email" : "johndoe@gmail.com",
    "password": "123456"
}
~~~

### Redux-Toolkit
view/App =>dispatch => Action => Reducer(Handle Action, Change State)
=>Store State =>Subscribe(pass state)  
configureStore()  
createReducer()  
createAction()  
createSlice()  
createAsyncThunk()  
createEntityAdapter()  
Redux Toolkitのわかりやすいサイト：
https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit

~~~
1.  コンポーネントが　Action Creator を呼び出して Action を取得する。
2.  取得した Action を Reducer に渡す。これを dispatch という。
3.  Reducer は、渡された Action に応じて State を更新する。
4.  コンポーネントは State に変更があれば、関連する UI を書き換える。
~~~

### create-react-app and installing packages
user@mbp mern-news-app % npx create-react-app client
user@mbp client % npm i @reduxjs/toolkit react-router-dom mdb-react-ui-kit moment react-file-b
ase64 react-google-login react-redux react-toastify @material-ui/core material-ui-chip-input a
xios
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
