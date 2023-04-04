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
}

.category img {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.selected-category {
  border: 3px solid rgb(50, 111, 201);
}
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
```js

```
```js

```
```js

```






