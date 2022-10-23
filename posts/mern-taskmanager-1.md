---
title: 'Mern Stack Task Manager'
date: 'October 23, 2022'
excerpt: 'MERNスタックTask Managerのメモ書きです'
cover_image: '/images/posts/img2.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

#### Node.jsでサーバ作成
参考にしたサイト：https://www.youtube.com/watch?v=nSXnif14lVo  
公式：https://nodejs.org/api/synopsis.html

node -v  
npm -v  
npm init -y  
package.jsonができる  
npm install -g nodemon  

~~~Javascript
console.log("welcome nodejs");
const PORT = 8080;
const html = require("fs").readFileSync("./index.html");
const http = require("http");
//webサーバーを作成
const server = http.createServer((req, res) => {
  // console.log(req.url)
  //ブラウザからアクセスが来た時の処理
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); //クライアントに返すヘッダー情報
  // res.write("<h1>Hello</h1>");
  res.write(html);
  res.end();

  if (req.method === "POST") {
    //ここに処理を記述する
  }

  if (req.method === "POST") {
    let postData = "";
    req
      .on("data", function (chunk) {
        postData += chunk;
      })
      .on("end", function () {
        res.end("あなたが送信したのは、" + postData);
      });
  }
});

server.listen(PORT, () => {
  console.log("server running!");
});
~~~

~~~Javascript
{
  "name": "nodejs-tutorial-youtube",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

~~~

~~~Javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nodejs</title>
  </head>
  <body>
    <h1>HTMLファイルです。変更しました!!</h1>
  </body>
</html>
~~~

### Express入門
https://www.youtube.com/watch?v=Zk7tpzaKv0U&t=837s  
https://github.com/Shin-sibainu/express-tutorial  
user@mbp express-tutorial-youtube % npm init -y  
~~~js
// server.js
const express = require("express");
const app = express();

app.listen(3000, console.log("サーバーが起動しました"));
~~~

~~~js
// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Hello Express");
  // res.send("こんにちは");
  // res.send("<h1>Hello NodeJs</h1>");
  res.sendStatus(500);
  //res.status(500).send("Error");
  //res.status(500).json({ msg: "エラー" });
  // res.render("index", { text: "こんにちは" });
});
app.listen(3000, console.log("サーバーが起動しました"));
~~~

~~~js
// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello NodeJs</h1>");
})
app.get("/user", (req, res) => {
	res.send("ユーザです")
})
app.get("/user/info", (req, res) => {
	res.send("ユーザ情報です")
})

app.listen(3000, console.log("サーバーが起動しました"));
~~~

~~~js
// routes/users.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("ユーザーリスト");
});

router.get("/info", (req, res) => {
  res.send("ユーザー情報");
});

module.exports = router;
~~~

~~~js
// server.js
const express = require("express");
const app = express();
const userRouter = require("./routes/user");

app.get("/", (req, res) => {
  res.send("<h1>Hello NodeJs</h1>");
})
//ルーティング
app.use("/user", userRouter);

app.listen(3000, console.log("サーバーが起動しました"));
~~~

~~~js
const express = require("express");
const app = express();
const userRouter = require("./routes/user");

// 静的ファイル（html, css）を置く
app.use(express.static("public"));
~~~

npm -i ejs  
viewsフォルダを作成してindex.htmlを作る  
vscode EJS language supportインストール  
~~~js
const express = require("express");
const app = express();
const userRouter = require("./routes/user");

// 動的ファイルを置く
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "NodeJsとExpress" });
});
~~~

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  Hello <%= text %>
</body>
</html>
~~~

### MongoDB入門
https://www.youtube.com/watch?v=JBCykXLfvv0&t=289s  
https://github.com/Shin-sibainu/mongoDB-tutorial

動的スキーマ設定
~~~js
const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //空白除去
    lowercase: true, //小文字
  },
  calories: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("マイナスのカロリーは存在しません");
    },
  },
});
const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
~~~

~~~js
const express = require('express');
const app = express();
const mongoose = require("mongoose")
const port = process.env.PORT || 8000

const foodRouter = require("./routes/foodRoutes")
app.use(foodRouter)

mongoose.connect(
"mongodb+srv://username:password@cluster0.7eiib.mongodb.net/youtube-food?retryWrites=true&w=majority"
).then(() => console.log("データベースに接続"))
.catch((err)=> console.log(err))

app.listen(port, () => {
  console.log(`Backend started on port ${port}`)})
~~~

~~~js
const express = require("express");
const app = express();
const foodModel = require("../models/Food");

app.use(express.json());
/* データの取得 */
app.get("/foods", async (req, res) => {
  //データベース内のすべてのデータを返す。
  const foods = await foodModel.find({});
  try {
    res.send(foods);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* データの作成 */
app.post("/food", async (req, res) => {
  const food = new foodModel(req.body);
  console.log(req.body);

  try {
    await food.save();
    res.send(food);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* データの部分修正 */
app.patch("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndUpdate(req.params.id, req.body);
    await foodModel.save();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/food/:id", async (req, res) => {
  try {
    const food = await foodModel.findByIdAndDelete(req.params.id);
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = app;
~~~

