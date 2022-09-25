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

#### スクロールでフワッと要素が出てくるサイト 
参考にしたサイト：https://www.youtube.com/watch?v=Wt19KoskUAM&t=581s

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Reveal Tutorial</title>
  <link
  rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
  integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
  crossorigin="anonymous"
  />
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <section class="sec-01">
    <div class="container">
      <h2 class="main-title">Scroll Reveal Sample</h2>
        <div class="content">
          <div class="image">
            <img src="./images/img1.jpg" alt="">
          </div>
          <div class="text-box">
            <h3>Scroll Reveal</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio inventore quaerat doloremque obcaecati consequatur aperiam necessitatibus sequi repudiandae praesentium voluptas?
            </p>
          </div>
        </div>
        <div class="media-icons">
          <a href="#" class="icon"><i class="fab fa-facebook"></i></a>
          <a href="#" class="icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="icon"><i class="fab fa-youtube"></i></a>
        </div>
    </div>
  </section>
</body>
</html>
~~~

~~~css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background: linear-gradient(rgb(52, 72, 92), rgb(57, 47, 143));
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 100px;
  color: #fff;
}

.container {
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main-title {
  font-size: 4rem;
  margin-bottom: 50px;
}

.content {
  /* position: relative; */
  width: 1150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content .image {
  position: relative;
  width: 600px;
  height: 400px;
  overflow: hidden;
}

.content .image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  z-index: 10;
}

.content .text-box {
  z-index: 20;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 40px;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transform: translate(-80px, 50px);
}

.content .text-box h3 {
  font-size: 2em;
  margin-bottom: 10px;
}

.media-icons {
  margin-top: 100px;
}

.media-icons a {
  color: #fff;
  font-size: 2em;
  margin: 60px;
}

.section-title {
  font-size: 3em;
  margin-bottom: 80px;
}

.info-title {
  font-size: 1.8em;
  margin-bottom: 10px;
}

.info {
  width: 700px;
  margin-left: 50px;
}

.media-info {
  width: 400px;
  margin-left: 50px;
}

.media-info li {
  list-style: none;
  font-size: 1.4em;
}

.media-info li a {
  text-decoration: none;
  color: #fff;
}

.media-info li:not(:last-child) {
  margin-bottom: 50px;
}

.media-info li:nth-child(1),
.media-info li:nth-child(5) {
  padding-left: 100px;
}

.media-info li:nth-child(2),
.media-info li:nth-child(4) {
  padding-left: 50px;
}

.sec-03 {
  margin-bottom: 100px;
}
~~~

scrollreveal.js: https://scrollrevealjs.org/
~~~html

  <script src="https://unpkg.com/scrollreveal"></script>
  <script>
    ScrollReveal({ 
      reset: true, 
      distance: "60px", 
      duration: 2000,
      delay: 200, 
    });
    ScrollReveal().reveal('.main-title', { delay: 200, origin:"left"});
    ScrollReveal().reveal('.sec-01 .image', { delay: 600, origin:"bottom"});
    ScrollReveal().reveal('.text-box', { delay: 700, origin:"right"});
    ScrollReveal().reveal('.media-icons i', { delay: 500, origin:"bottom", interval: 200});
  </script>
~~~

### ブログを作成する
参考にしたサイト：https://www.youtube.com/watch?v=4zQzPqKyJNk&t=816s  
https://2colum-website.vercel.app/

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dev Blog</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <div class="wrapper">
      <h2>Dev Blog</h2>
    </div>
    <nav>
      <ul class="wrapper">
        <li><a href="#">新着</a></li>
        <li><a href="#">コラム</a></li>
        <li><a href="#">カテゴリ</a></li>
        <li><a href="#">コンタクト</a></li>
      </ul>
    </nav>
  </header>

  <div class="new-article wrapper">
    <article>
      <img src="./images/pc01.jpg" alt="">
      <p>最新のフロントエンド技術について</p>
      <a href="#">続きを読む</a>
    </article>
    <article>
      <img src="./images/pc02.jpg" alt="">
      <p>最新のフロントエンド技術について</p>
      <a href="#">続きを読む</a>
    </article>
    <article>
      <img src="./images/pc03.jpg" alt="">
      <p>最新のフロントエンド技術について</p>
      <a href="#">続きを読む</a>
    </article>
  </div>

  <div class="container wrapper">
    <main>
      <article>
        <h1>フロントエンドの最新技術の動向について</h1>
        <ul>
          <li>2022/09/01</li>
          <li>カテゴリ</li>
        </ul>
        <img src="./images/pc01.jpg" alt="">
        <div class="article-intro">
          <p>今回は最新のWebフロントエンド開発関連技術として特に注目しているフレームワーク・ライブラリツールを紹介していきます</p>
          <div>
            <a href="#">続きを読む</a>
          </div>
        </div>
      </article>
      <article>
        <h1>フロントエンドの最新技術の動向について</h1>
        <ul>
          <li>2022/09/01</li>
          <li>カテゴリ</li>
        </ul>
        <img src="./images/pc02.jpg" alt="">
        <div class="article-intro">
          <p>今回は最新のWebフロントエンド開発関連技術として特に注目しているフレームワーク・ライブラリツールを紹介していきます</p>
          <div>
            <a href="#">続きを読む</a>
          </div>
        </div>
      </article>
      <article>
        <h1>フロントエンドの最新技術</h1>
        <ul>
          <li>2022/09/01</li>
          <li>カテゴリ</li>
        </ul>
        <img src="./images/pc03.jpg" alt="">
        <div class="article-intro">
          <p>今回は最新のWebフロントエンド開発関連技術として特に注目しているフレームワーク・ライブラリツールを紹介していきます</p>
          <div>
            <a href="#">続きを読む</a>
          </div>
        </div>
      </article>
     </main>

    <aside>
      <section class="author">
        <img src="./images/about.jpeg" alt="">
        <h4>John Doe</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente accusantium iste, culpa recusandae neque asperiores.</p>
      </section>

      <section class="ranking">
        <h4>ランキング</h4>
        <div class="ranking-article">
          <a href="#">
            <img src="./images/pc01.jpg" alt="">
            <p>HTML/CSS入門</p>
          </a>
        </div>
        <div class="ranking-article">
          <a href="#">
            <img src="./images/pc02.jpg" alt="">
            <p>JavaScript入門</p>
          </a>
        </div>
        <div class="ranking-article">
          <a href="#">
            <img src="./images/pc03.jpg" alt="">
            <p>Python入門</p>
          </a>
        </div>
      </section>
      <section class="archive">
        <h4>アーカイブ</h4>
        <ul>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
          <li><a href="#">2022/09/05(月曜日)</a></li>
        </ul>
      </section>
    </aside>
  </div>
</body>
</html>
~~~

~~~css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 16px;
}

header {
  width: 100%;
  position: fixed;
  z-index: 100;
  background-color:white;
}

header h2 {
  padding: 15px;
  font-size: 30px;
  padding-left: 20px;
  font-weight: 400;
}

header nav {
  width: 100%;
  background-color: #000;
  padding-bottom: 10px;
  padding-left: 20px;
}


header li {
  list-style: none;
  display: inline-block;
  margin-top: 10px;
  margin-right: 40px;
}

header li a {
  text-decoration: none;
  color: white;
}


.new-article {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 150px;
  text-align: center;
  margin-bottom: 70px;
}

.new-article  img {
  width: 95%;
  margin-right: 10px;
}

.new-article p {
  font-weight: 700;
  margin-top: 10px;
}

article a {
  text-decoration: none;
  color: black;
  display: block; // インライン要素はブロックにしないと marginが適用できない
  margin-top: 10px;
}

article a::after {
  content: "";  /* 空文字で：インライン要素  */
  display: block;
  width: 80px;
  background-color:black;
  height: 1px;
  margin: 0 auto;
}

/* main aside section */
.container {
  display: flex;
  }

  main {
    flex: 0.66;
    justify-content: space-btween;
  }

  main article {
    margin-bottom: 30px;
  }

  main h1 {
    font-size: 30px;
  }

  main ul {
    list-style: none;
    display: flex;
    padding: 10px 0;
  }

  main li {
    margin-right: 40px;
  }

  main img {
    width: 100%;
  }

  main .article-intro {
    text-align: center;
    padding: 10px 85px 30px 40px
  }

  main .article-intro p {
    font-weight: bold;
    text-align: left;
  }
  
  /* aside */
  aside {
    flex: 0.33;
  }

  aside .author {
    text-align: center;
    margin-bottom: 50px;
  }

  aside. author h4 {
    margin: 20px;
  }

  .author p {
    max-width: 300px;
    margin: 0 auto;
    text-align: left
  }

  .author img {
    width: 40%;
    border-radius: 50%;
  }

  .ranking h4 {
    text-align: center;
    margin-bottom: 20px;
  }

  .ranking-article a {
    text-align: center;
    text-decoration: none;
    color: black;
  }

  .ranking-article img {
    width: 100%;
    padding: 5px;
    margin-left: 10px;
  }

  .ranking-article p {
    padding-right: 10px;
    margin-bottom: 10px;
  }

  .archive {
    margin-top: 40px;
  }

  .archive h4 {
    text-align: center;
    margin-bottom: 30px;
  }

  .archive ul {
    list-style: none;
    width: 70%;
    margin: 0 auto;
    border-bottom: 1px solid black;
  }

  .archive li {
    padding: 25px;
    border-top: 1px solid black;
  }

  .archive li a {
    text-decoration: none;
    color: black;
  }

  /* メディアクエリ設定 */
@media screen and (max-width: 768px){
  .new-article {
    flex-direction: column;
  }

  .container {
    flex-direction: column;
  }
}
~~~


