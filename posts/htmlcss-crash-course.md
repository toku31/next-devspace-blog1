---
title: 'HTML/CSS Crash Course'
date: 'July 21, 2022'
excerpt: 'HTML/CSSの覚書です（基礎から応用まで）'
cover_image: '/images/posts/img3.jpg'
category: 'Style'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/12.jpg'
---
<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
#### 疑似要素の::beforeと::after
参考にしたサイト：https://www.youtube.com/watch?v=EftOi5L40Ls

~~~html
// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Before and After</title>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
      integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="pseudo-element1">
      <h1>CSS Pseudo Element</h1>
    </div>
    <div class="pseudo-element2">
      <h1>CSS Pseudo Element</h1>
    </div>
    <div class="pseudo-element3">
      <h1>CSS Pseudo Element</h1>
    </div>
    <div class="pseudo-element4">
      <!-- <div class="overlay"></div> -->
      <img src="cat-bg.jpg" alt="" />
    </div>
  </body>
</html>
~~~

~~~css
// style.css
* {
  margin: 0;
  padding: 0;
}

body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-color: rgb(183, 221, 221);
}

.pseudo-element1 h1 {
  font-size: 3rem;
}

.pseudo-element2 h1 {
  position: relative;
  font-size: 3rem;
}

.pseudo-element3 h1 {
  font-size: 3rem;
}

.pseudo-element4 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.pseudo-element1 h1::before {
  content: "before--";
  color: blue;
}

.pseudo-element1 h1::after {
  content: "--after";
  color: red;
}

.pseudo-element2 h1::after {
  content: "";  /* 空文字で：インライン要素  */
  display: block;
  width: 50%;
  height: 2px;
  background-color: red;
  position: absolute;
  right: 0;
  /* right: 50%; */
}

.pseudo-element3 h1::before {
  content: "\f00c";
  Font-family: "Font Awesome 5 Free";
  color: antiquewhite;
  margin-right: 20px;
}

.pseudo-element4::before {
  content: "Pretty Cat!";
  position: absolute;
  color: white;
  font-size: 5rem;
  z-index: 1;
}

.pseudo-element4::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  opacity: 0.3;
}
~~~

#### 固定ナビゲーションバー
参考にしたサイト：https://www.youtube.com/watch?v=jknVXr_uMoQ&t=984s

~~~html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>固定ナビゲーションバーウェブサイト</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="header">
      <nav class="navbar">
        <h2 class="logo">Cozy</h2>
        <ul class="menu">
          <li><a href="#">ホーム</a></li>
          <li><a href="#">本サイトについて</a></li>
          <li><a href="#">ブログ</a></li>
          <li><a href="#">オンライン相談</a></li>
          <li><a href="#">お問い合わせ</a></li>
        </ul>
      </nav>
    </div>
    <div class="text-area">
      <p class="text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae at
        enim in eum neque velit tempore dolorum eos quaerat vitae quasi, est
        odit commodi? Praesentium distinctio sunt minima officia ducimus quasi
        magnam soluta in est deserunt eveniet architecto expedita doloribus vel
        laborum natus eius fugit officiis rem, quo accusamus quis odit iste
        dolores. Architecto itaque possimus corporis ullam tempora, blanditiis
        neque optio, accusamus iusto deserunt maiores? Culpa delectus alias
        magni vel velit, odit laudantium libero quas voluptatum fugiat et quos
        doloremque reprehenderit optio molestiae exercitationem, consequuntur
        odio eos quo illum doloribus eaque amet quam. Suscipit tempore
        aspernatur distinctio assumenda magnam!
      </p>
      <p class="text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae at
        enim in eum neque velit tempore dolorum eos quaerat vitae quasi, est
        odit commodi? Praesentium distinctio sunt minima officia ducimus quasi
        magnam soluta in est deserunt eveniet architecto expedita doloribus vel
        laborum natus eius fugit officiis rem, quo accusamus quis odit iste
        dolores. Architecto itaque possimus corporis ullam tempora, blanditiis
        neque optio, accusamus iusto deserunt maiores? Culpa delectus alias
        magni vel velit, odit laudantium libero quas voluptatum fugiat et quos
        doloremque reprehenderit optio molestiae exercitationem, consequuntur
        odio eos quo illum doloribus eaque amet quam. Suscipit tempore
        aspernatur distinctio assumenda magnam!
      </p>
      <p class="text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae at
        enim in eum neque velit tempore dolorum eos quaerat vitae quasi, est
        odit commodi? Praesentium distinctio sunt minima officia ducimus quasi
        magnam soluta in est deserunt eveniet architecto expedita doloribus vel
        laborum natus eius fugit officiis rem, quo accusamus quis odit iste
        dolores. Architecto itaque possimus corporis ullam tempora, blanditiis
        neque optio, accusamus iusto deserunt maiores? Culpa delectus alias
        magni vel velit, odit laudantium libero quas voluptatum fugiat et quos
        doloremque reprehenderit optio molestiae exercitationem, consequuntur
        odio eos quo illum doloribus eaque amet quam. Suscipit tempore
        aspernatur distinctio assumenda magnam!
      </p>
     </div>
    <script>
      const menu = document.querySelector(".menu");
      const navbar = document.querySelector(".navbar");
      window.addEventListener("scroll", () => {
        if (window.pageYOffset >= menu.offsetTop) {
          //stickyクラスをnavbarに付与する。
          navbar.classList.add("sticky");
        } else {
          navbar.classList.remove("sticky");
        }
      });
    </script>
  </body>
</html>
~~~

~~~css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
}

.header {
    width: 100%;
    height: 100vh;
    background-image: url("images/bg.jpg");
    background-position: center;
    background-size: cover;
}

nav {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    /* position: fixed;
    top: 0;
    left: 0; */
}

.logo {
    width: 150px;
    margin: 0 auto 20px auto;
    cursor: pointer;
    font-size: 3rem;
    font-weight: 450;
}

nav ul {
    background: #000;
    width: 100%;
    margin-top: 10px;
}

nav ul li {
    display: inline-block;
    list-style: none;
    margin: 20px 30px;
}

nav ul li a {
    text-decoration: none;
    color: white;
}

.text {
    padding: 20px 10%;
}

nav.sticky {
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 3%;
    max-height: 15%;
    transition: all 0.6s;
}

nav.sticky .logo {
    margin: 20px 0;
}

nav.sticky ul {
    background: transparent;
    font-size: 1.3rem;
}
~~~