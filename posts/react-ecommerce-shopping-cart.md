---
title: "Build ECommerce Shopping Cart By React & Redux -1-
"
date: 'August 30, 2022'
excerpt: 'React.jsを用いてショッピングカートのサイトを作成しました。値段やサイズで並び変えできるようにしました。'
cover_image: '/images/posts/img4.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
npm start  
npm run server
#### Product Lists Componentを作成する #5

```JSON
// react-shopping-cart/src/data.json
{
    "products": [
      {
        "_id": "dress1",
        "image": "/images/dress1.jpg",
        "title": "Midi sundress with shirring detail",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["X", "L", "XL", "XXL"],
        "price": 29.9
      },
      {
        "_id": "dress2",
        "image": "/images/dress2.jpg",
        "title": "Midi sundress with ruched front",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["X", "M", "L"],
        "price": 18.9
      },
      {
        "_id": "dress3",
        "image": "/images/dress3.jpg",
        "title": "Midi dress in pink ditsy floral",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["X", "M", "L"],
        "price": 14.9
      },
      {
        "_id": "dress4",
        "image": "/images/dress4.jpg",
        "title": "cami maxi dress in polka dot",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["XL"],
        "price": 25.9
      },
      {
        "_id": "dress5",
        "image": "/images/dress5.jpg",
        "title": "Frill mini dress in yellow polka dot",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["X", "L", "XL"],
        "price": 10.9
      },
      {
        "_id": "dress6",
        "image": "/images/dress6.jpg",
        "title": "Midi tea dress in blue and red spot",
        "description": "This is for all the latest trends, no matter who you are, where you’re from and what you’re up to. Exclusive to ASOS, our universal brand is here for you, and comes in all our fit ranges: ASOS Curve, Tall, Petite and Maternity. Created by us, styled by you.",
        "availableSizes": ["XL", "XXL"],
        "price": 49.9
      }
    ]
  }
  
```

```JS
// react-shopping-cart/src/App.js
import React from 'react';
import data from "./data.json";
import Products from "./components/Products";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>
          All right is reserved
        </footer>
      </div>
    );
  }
}
export default App;
```

```CSS
// react-shopping-cart/src/index.css
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap"); 
html{
  font-size: 62.5%;
  box-sizing: border-box;
}
body,
#root {
  height: 100vh;
  margin: 0;
}
body, input, select, button, textarea {
  font-size: 1.6rem;
  font-family: Montserrat, Helvetica, sans-serif;
}

.grid-container{
  display: grid;
  grid-template-areas: "header"
  "main"
  "footer";
  grid-template-rows: 5rem 1fr 5rem;
  grid-template-columns: 1fr;
  height: 100%;
}
a{
  text-decoration: none;
}
a:hover {
  color: #ff8000;
}
header {
  grid-area: header;
  background-color: hsl(210, 33%, 19%);
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
header a {
  color: #ffffff;
  text-decoration: none;
}
main {
  grid-area: main;
}
footer {
  grid-area: footer;
  background-color: #203040;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content{
  display: flex;
  flex-wrap: wrap;
}
.main{
  flex: 3 60rem;
}
.sidebar {
  flex: 1 20rem;
}

/* products */
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.products li {
  flex: 0 1 29rem;
  height: 49rem;
  padding: 1rem;
  /* margin: 1rem; */
}
.product {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.product img {
  max-width: 37rem;
  max-height: 37rem;
}
.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-price div,
.product-price button {
  text-align: center;
  flex: 1;
}
.product-price div {
  font-size: 2rem;
}
.button {
  padding: 1rem;
  border: 0.1rem #c0c0c0 solid;
  background-color: #f0f0f0;
  cursor: pointer;
}
.button:hover{
  border: 0.1rem #808080 solid;
}
.button.primary {
  background-color: #f0c040;
}
```

```Javascript
// react-shopping-cart/src/components/Products.js
import React, { Component } from 'react'
import formatCurrency from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt="{product.title}"></img>
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary">Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
```

```JS
// react-shopping-cart/src/util.js
export default function formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " "; 
}
```

#### Filter機能を追加する  ＃６

```JS
// react-shopping-cart/src/components/Filter.js 
import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-sort">
                    Order{" "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter{" "}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value="">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
            </div>
        );
    }
}
```

```css
// react-shopping-cart/src/index.css
/* Filter */
.filter {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem;
  border-bottom: 0.1rem #c0c0c0 solid;
}
.filter div {
  flex: 1;
}
```

```JS
// react-shopping-cart/src/App.js
import React from 'react';
import data from "./data.json";
import Products from "./components/Products";
import Filter from './components/Filter';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  
  sortProducts=(event)=>{
    console.log(event.target.value);
    const sort = event.target.value;
    // imp
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) =>
        sort ==="lowest"
        ? a.price > b.price ? 1:-1 
          : sort ==="highest" 
            ? a.price < b.price ? 1:-1 
            : a._id < b._id ? 1:-1
        ),
    }));
  };

  filterProducts = (event) => {
    // impl
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} 
                size={this.state.size} 
                sort={this.state.sort} 
                filterProducts={this.filterProducts} 
                sortProducts={this.sortProducts}>
              </Filter>
              <Products products={this.state.products} >
              </Products>
            </div>
            <div className="sidebar">
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
}

export default App;
```


#### Cart コンポーネントを作成する  ＃7
Show selected items in the cart on the right sidebar

```Javascript
// react-shopping-cart/src/components/Products.js
import React, { Component } from 'react'
import formatCurrency from '../util'

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={()=>this.props.addToCart(product)} className="button primary">Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
```

#### Add cartItems to state as []  
```js
// react-shopping-cart/src/App.js
import React from 'react';
import data from "./data.json";
import Products from "./components/Products";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: [], // 追加
      size: "",
      sort: "",
    };
  }

```
#### create addToCart(product)
#### Slice, Check product existence, add to cartitems
How to add an item to the cart: https://javascript.tutorialink.com/how-to-add-an-item-to-the-cart/  
slice()で配列要素を切り抜く方法  
var array = ['メロン', 'リンゴ', 'イチゴ', 'バナナ'];  
var result2 = array.slice( 1, 3 );  // ["リンゴ", "イチゴ"] 
```js
// react-shopping-cart/src/App.js
      - - -
      size: "",
      sort: "",
    };
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1});
    }
  };

  sortProducts=(event)=>{
    console.log(event.target.value);
    const sort = event.target.value;
      - - -
```

#### Cart.jsの作成
```js
// react-shopping-cart/components/Cart.js
import React, { Component } from "react";

class Cart extends Component {
  render() {
    const { cartItems} = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
      </div>
    );
  }
}
```

```js
// App.js
export default class App extends Component {
  render() {
    return (
      <main>
        <div className='content'>
          <div className='main'>
            <Filter
            count={this.state.products.length}
            size={this.state.size}
            sort={this.state.sort}
            filterProducts={this.filterProducts}
            sortProducts={this.sortProducts}
            ></Filter>
            <Products
              products={this.state.products}
              addToCart={this.addToCart} // 追加
            ></Products>
          </div>
          <div className='sidebar'>
            <Cart cartItems={this.state.cartItems} />　// 追加
          </div>
        </div>
      </main>
      <footer>All right is reserverd.</footer>
    </div>
    )
  }
}

```

```css
/* Index.css */
.cart {
  padding: 1rem;
  margin: 1rem;
  display: flex;
}
.cart-header {
  border-bottom: 0.1rem #c0c0c0 solid;
}
```

```html
// Cart.js
 - - -
<div className="cart">
    <ul className="cart-items">
      {cartItems.map((item) => (
        <li key={item._id}>
          <div>
            <img src={item.image} alt={item.title}></img>
          </div>
          <div>
            <div>{item.title}</div>
            <div className="right">
              {formatCurrency(item.price)} x {item.count}{" "}
              <button
                className="button"
                onClick={() => this.props.removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
```

```css
// index.css
.cart-items {
  padding: 0;
  width: 100%;
  list-style-type: none;
}
.cart-items img {
  width: 5rem;
}
.cart-items li {
  display: flex;
}
.cart-items li div {
  padding: 0.5rem;
}
.cart-items li div:last-child {
  flex: 1;
}
.right {
  text-align: right;
}
```

#### create removeFromCart(product)
```js
class App extends React.Component {
  constructor() {
    super();
     this.state = {
       products: data.products, 
       cartItems: [],
        size: '',
        sort: '',
    };
  }
  // 追加　↓
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
  };

  addToCart = (product) => {
       - - -
```

#### Total金額の出力
```js
// Cart.js
{cartItems.length !== 0 && (
  <div className="cart">
    <div className="total">
      <div>
        Total:{" "}
        {formatCurrency(
          cartItems.reduce((a, c) => a + c.price * c.count, 0)
        )}
      </div>
      <button className="button primary">
        Proceed
      </button>
    </div>
  </div>
)}
```

```css
// index.css
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.total > div {
  font-size: 2rem;
}
.total > div,
.total > button {
  flex: 1;
}

```
## Checkout Formの作成
Make cart items persistent(画面を更新しても Cartの表示が消えないようにする)
```


```


