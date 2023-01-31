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
### 予約ページを作成する
BookNow.jsをpagesフォルダに作成する
```js
// pages/book-now.js
import React from 'react'

function BookNow() {
  return (
    <div>BookNow</div>
  )
}

export default BookNow

```
App.jsにルートパスを追加する
```js
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './resources/global.css'
import Register from './pages/ Register';
import Home from './pages/Home';
import Login from './pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import AdminHome from './pages/Admin/AdminHome'
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import BookNow from './pages/BookNow';

function App() {
  const {loading} = useSelector(state => state.alerts)

  return (
    <div>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/book-now/:id" element={<ProtectedRoute><BookNow /></ProtectedRoute>}></Route>  // added

          <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>}></Route>
          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>}></Route>
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>}></Route>

          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}  />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}  />
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
```
バス情報取得のAPIエンドポイント(Backend)
```js
// pages/book-now.js
const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const Bus = require('../models/busModel')

// add Bus
router.post('/add-bus', async function (req, res){
     ...
})

// Update bus 21
router.post('/update-bus', authMiddleware, async function (req, res){
     ...
})

// delete bus
router.post('/delete-bus', authMiddleware, async function (req, res){
     ...
})


// get all buses
router.post('/get-all-buses', authMiddleware, async function (req, res){
     ...
})

// get-bus-by-id
router.post('/get-bus-by-id', authMiddleware, async function (req, res){
  console.log('get-bus-buses')
  try {
    const bus = await Bus.findById(req.body._id)
    return res.status(200).send({
      success: true,
      message: 'Busを取得しました',
      data: bus
    });
  } catch (error) {
    res.status(500).send({success:false, message: error.message})
  }
})

module.exports = router;
```
予約ページでバス情報取得のAPIコール(frontend)
```js
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function BookNow() {

  const params = useParams()
  const dispatch = useDispatch()
  const [bus, setBus] = useState(null)

  const getBus = async()=> {
    // console.log('getbus success:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/buses/get-bus-by-id', {_id : params.id})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('getbus success:', response.data.data)
        setBus(response.data.data) 
      }else {
        console.log('getbus else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('getbus error:')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBus()
  }, [])

  return (
    <div>
      {bus &&
        <Row className='mt-3'>
            <Col lg={6} xs={12} sm={12}>
              <h1 className="text-xl text-secondary">{bus.name}</h1>
              <h1 className="text-md">{bus.from}-{bus.to}</h1>
              <hr />

              <div>
                <h1 className="text-lg"><b>出発日</b>: {bus.journeyDate}</h1>
                <h1 className="text-lg"><b>料金</b>: ¥{bus.fare}</h1>
                <h1 className="text-lg"><b>出発時刻</b>: {bus.departure}</h1>
                <h1 className="text-lg"><b>到着時刻</b>: {bus.arrival}</h1>
              </div>
            </Col>
            <Col lg={6} xs={12} sm={12}>

            </Col>
        </Row>
      }
    </div>
  )
}

export default BookNow
```







