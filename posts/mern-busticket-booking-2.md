---
title: 'Mern Bus Ticket Booking-2'
date: 'November 3, 2022'
excerpt: 'MERNスタック(MongoDB, Express, React, Node.js)を使ってバスチケット予約アプリをつくります。2回目はバスの予約からです'
cover_image: '/images/posts/img8.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

###　バスの予約
user@mbp mern-busticket-booking % nodemon server  
user@mbp client % npm start
#### バスを全て表示する
```js
// pages/Home.js
import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const {user} = useSelector(state => state.users)
  console.log('user:', user)
  return (
    // <div>home</div>
    <div>
      {user && <h1>Welcome {user?.name}</h1>}
      {user && <h1>{user?.email}</h1>}
    </div>
  )
}

export default Home
```
Homeページを編集する
```js
// pages/Home.js
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import Bus from '../components/Bus';

function Home() {
  const {user} = useSelector(state => state.users)
  console.log('user:', user)
  const dispatch = useDispatch()
  const [buses, setBuses] = useState([])

  const getBuses = async()=> {
    console.log('bus data success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-all-buses', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bus data success:', response.data.data)
        setBuses(response.data.data) 
      }else {
        console.log('bus data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bus data error:')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBuses()
  }, [])

  return (
    <div>
      <div></div>
      <div>
          <Row>
            {buses.map(bus => (
              <Col lg={6} xs={12} sm={12}>
                <Bus bus={bus}/>
              </Col>
            ))}
          </Row>
      </div>
    </div>
  )
}

export default Home
```
```js
// Bus.js
import React from 'react'
import {useNavigate} from 'react-router-dom'

function Bus({bus}) {
  const navigate = useNavigate()

  return (
    <div className='card p-2'>
      <h1 className='text-lg'> {bus.name}</h1>
      <hr />
      <div className='d-flex justify-content-between'>
        <div>
          <p className='text-sm'>出発地：</p>
          <p className='text-sm'>{bus.from}</p>
        </div>

        <div>
          <p className='text-sm'>到着地：</p>
          <p className='text-sm'>{bus.to}</p>
        </div>

        <div>
          <p className='text-sm'>料金：</p>
          <p className='text-sm'>¥{bus.fare}</p>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-end'>
        <div>
          <p className='text-sm'>出発日：</p>
          <p className='text-sm'>{bus.journeyDate}</p>
        </div>
        <h1 className="text-lg underline" onClick={()=>navigate(`/book-now/${bus._id}`)}>予約する</h1>
      </div>
    </div>
  )
}

export default Bus
```
```css
/* globa.css */
.underline {
  text-decoration: underline;
  cursor: pointer;
}

h1, p {
  margin-bottom: 0;
  padding-bottom: 0;
}
```
```css
/* layput.css */
.content {
  padding: 10px 0px;
}
```
```js

```
```js

```

```js

```







