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
https://github.com/sathyaprakash195/sheybus-udemy  
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
### 予約ページを作成する1
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
// pages/BookNow.js
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
### 予約ページを作成する2
バスのシート選択画面を作成する
```js
// components/SeatSelection.js
import React from 'react'
import { Col, Row} from 'react-bootstrap';
import '../resources/bus.css'

function SeatSelection({selectedSeats, setSelectedSeats, bus}) {
  console.log('selectedSeats1', selectedSeats)
  const capacity = bus.capacity
  const selectOrUnselectSeats = (seatNumber)=> {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat)=> seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  return (
    <div>
      <div className="bus-container">
        <Row style={{gap:'10px 0px'}}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass=''
            console.log('selectedSeats', selectedSeats)
            if(selectedSeats.includes(seat + 1)){
              seatClass='selected-seat'
            }else if (bus.seatsBooked.includes(seat + 1)){
              seatClass='booked-seat'
            }

            return (
              <Col sm={3}>
              <div 
                className={`seat ${seatClass}`}
                onClick={()=>selectOrUnselectSeats(seat + 1)}
              >
                {seat + 1}
              </div>
            </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default SeatSelection
```
選択すると緑色に変わるようにCSSを編集
```css
/* resources/bus.css */
.bus-container {
  width: 300px;
  border: 2px solid gray;
  padding: 10px;
}

.seat {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 2px;
}

.selected-seat {
  background-color: green;
  color:white
}

.booked-seat {
  background-color: gray;
  color: white;
  pointer-events: none;
  cursor: disabled;
}
```
予約画面にシートのコンポーネントを取り込む
```js
// Pages/BookNow.js
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';

function BookNow() {

  const params = useParams()
  const dispatch = useDispatch()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

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
              <hr />

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">
                  <b>選択したシート</b>: {selectedSeats.join(",")}
                </h1>
                <h1 className="text-2xl mt-2">
                  料金：<b>¥{bus.fare * selectedSeats.length}</b>
                </h1>
              </div>
              <button className='secondary-btn mt-3'>予約する</button>
            </Col>
            <Col lg={6} xs={12} sm={12}>
                <SeatSelection  
                  selectedSeats = {selectedSeats}
                  setSelectedSeats = {setSelectedSeats}
                  bus = {bus}
                />
            </Col>
        </Row>
      }
    </div>
  )
}

export default BookNow
```
### Booking APIを作成する
```js
// models.bookingModel.js
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bus',
      require: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: true
    },
    seats: {
      type: Array,
      require: true
    },
    transactionId : {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema)
```
/routes/userRoute.jsを参考
```js
// routes/bookingsRoute.js
const router = require('express').Router();
const Booking = require('../models/bookingModel')
const Bus = require('../models/busModel')

// Book a seat
router.post('/book-seat', async(req, res) => {
  try {
    // 新規予約を作成する
    const newBooking = new Booking({
      ...req.body,
      transactionId: '1234'
    })
    await newBooking.save()
    // 予約シートをBusモデルに保存する
    const bus = Bus.findById(req.body.busId);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save()

    res.status(200).send({
      message: 'Booking successful',
      success: true,
      data: newBooking,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Booking failed',
      success: false,
      data: error,
    })
  }
})
module.exports = router;
```
server.jsにルートを登録する
```js
// server.js
const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const dbConfig = require("./config/dbConfig");
app.use(express.json())

const usersRoute = require('./routes/usersRoute') 
const busesRoute = require('./routes/busesRoute') 
const bookingsRoute = require('./routes/bookingsRoute') 

app.use('/api/users/', usersRoute)  
app.use('/api/buses/', busesRoute) 
app.use('/api/bookings/', bookingsRoute)  // added

app.listen(port, ()=> console.log(`Node server listening on port ${port}!`));
```

```js
// pages/BookNow.js
import { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';

function BookNow() {

  const params = useParams()
  const dispatch = useDispatch()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

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
        // console.log(bus)
      }else {
        console.log('getbus else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('getbus error:')
      toast.error(error.message)
    }
  }

  const bookNow = async ()=> {
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/bookings/book-seat', {
        busId : bus._id,
        seats: selectedSeats,
      })
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bookNow success:', response.data.data)
        toast.success(response.data.message)
      }else {
        console.log('bookNow else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bookNow error:')
      toast.error(error.message)
    }
  };

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
                <h1 className="text-lg"><b>残座席</b>: {bus.capacity - bus.seatsBooked.length}</h1>
              </div>
              <hr />

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">
                  選択した座席: {selectedSeats.join(",")}
                </h1>
                <h1 className="text-2xl mt-2">
                  料金：¥{bus.fare * selectedSeats.length}
                </h1>
                <hr />
                 <button 
                  className={`btn btn-primary ${(selectedSeats.length===0) && 'disabled-btn' }`}
                  onClick={()=>bookNow()}
                >予約する</button>
              </div>
            </Col>
            <Col lg={6} xs={12} sm={12}>
                <SeatSelection  
                  selectedSeats = {selectedSeats}
                  setSelectedSeats = {setSelectedSeats}
                  bus = {bus}
                />
            </Col>
        </Row>
      }
    </div>
  )
}
export default BookNow
```
### Payment Part1 Stripeを使う
Stripeのアカウントを作成する  
React Stripe Checkout Component  
https://github.com/azmenak/react-stripe-checkout
```js
npm install react-stripe-checkout
```
frontendの実装例
```js
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
  // ...
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="my_PUBLISHABLE_stripekey"
      />
    )
  }
}
```
上の例のようにBookNow.jsにStripeのフロントエンドを実装する
```js
// pages/BookNow.js
import { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import StripeCheckout from 'react-stripe-checkout'; // added

function BookNow() {

  const params = useParams()
  const dispatch = useDispatch()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

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
        // console.log(bus)
      }else {
        console.log('getbus else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('getbus error:')
      toast.error(error.message)
    }
  }

  const bookNow = async ()=> {
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/bookings/book-seat', {
        busId : bus._id,
        seats: selectedSeats,
      })
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bookNow success:', response.data.data)
        toast.success(response.data.message)
      }else {
        console.log('bookNow else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bookNow error:')
      toast.error(error.message)
    }
  };

  const onToken = (token) => {
    console.log(token)
  }

  useEffect(()=> {
    getBus()
  }, [])

  // {bus && console.log('bookedSeats', bus.journeyDate)}
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
                <h1 className="text-lg"><b>残座席</b>: {bus.capacity - bus.seatsBooked.length}</h1>
              </div>
              <hr />

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">
                  選択した座席: {selectedSeats.join(",")}
                </h1>
                <h1 className="text-2xl mt-2">
                  料金：¥{bus.fare * selectedSeats.length}
                </h1>
                <hr />

                <StripeCheckout
                  token={onToken}
                  stripeKey="・・・公開キー・・・"
                >
                  <button // 座席を選択したら予約ボタンの色がグレーから青になる
                    className={`btn btn-primary ${(selectedSeats.length===0) && 'disabled-btn' }`}
                    // onClick={()=>bookNow()}
                  >予約する</button>
                </StripeCheckout>
              </div>
            </Col>
            <Col lg={6} xs={12} sm={12}>
                <SeatSelection  
                  selectedSeats = {selectedSeats}
                  setSelectedSeats = {setSelectedSeats}
                  bus = {bus}
                />
            </Col>
        </Row>
      }
    </div>
  )
}
export default BookNow
```
test@gmail.com  
4242 4242 4242 4242  
12/25 123
#### Payment Part2 Backend
npm stripe
https://www.npmjs.com/package/stripe
```js
user@mbp mern-busticket-booking % npm install stripe 
```
```js
user@mbp mern-busticket-booking % npm i uuid
```
Stripeのプライベートキーを.envファイルに書く　stripe_key = '・・・・'  
bookingRoutesに支払い用(make payment)のルータを追加する
```js
// routes/bookingRoutes.js
const router = require('express').Router();
const Booking = require("../models/bookingModel")
const Bus = require('../models/busModel')
const authMiddleware = require('../middlewares/authMiddleware') // added
const stripe = require('stripe')(process.env.stripe_key) // added
const {v4: uuidv4} = require('uuid')  // added

// Book a seat
router.post('/book-seat', authMiddleware, async(req, res) => {
  try {
    // 新規予約を作成する
    console.log('book-seat try')
    const newBooking = new Booking({
      ...req.body,
      // transactionId: '1234', // deleted
      userId: req.body.userId // authMiddleware参照
    });
    await newBooking.save()
    console.log('book-seat save', newBooking)
    // 予約シートをBusモデルに保存する
    console.log('req.body.busId', req.body.busId)
    const bus = await Bus.findById(req.body.busId);
    console.log('bus', bus.name)
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    console.log('bus seatsBooked', bus.seatsBooked)
    await bus.save()
    // console.log('res:', res)
    res.status(200).send({
      message: 'Booking successful',
      data: newBooking,
      success: true,
    })
  } catch (error) {
    res.status(500).send({
      message: 'Booking failed',
      data: error,
      success: false,
    })
  }
})

// make payment
router.post('/make-payment', authMiddleware, async(req, res) => {
  try {
    const {token, amount} = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const payment = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      customer: customer.id,
      receipt_email: token.email,
    }, {
      idempotencyKey: uuidv4(),
    })

    if (payment) {
      res.status(200).send({
        message:"支払いが完了しました",
        data: {
          transactionId: payment.source.id,
        },
        success: true,
      })
    }else{
      res.status(500).send({
        message:"支払いに失敗しました",
        data: error,
        success: false
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:"支払いに失敗しました",
      data: error,
      success: false
    })
  }
})
module.exports = router;
```
Stripeで支払いができることを確認したあと予約(bookNow)を続けてコールして予約するようにする  
その際引数にStripe実行後に払い出されたtransactionIdを使う
```js
// pages/BookNow.js
import { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Grid, Col, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import StripeCheckout from 'react-stripe-checkout';

function BookNow() {

  const params = useParams()
  const dispatch = useDispatch()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

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
        // console.log(bus)
      }else {
        console.log('getbus else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('getbus error:')
      toast.error(error.message)
    }
  }

  const bookNow = async (transactionId)=> {  // 引数にtransactionIdを追加
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/bookings/book-seat', {
        busId : bus._id,
        seats: selectedSeats,
        transactionId  // added
      })
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bookNow success:', response.data.data)
        toast.success(response.data.message)
      }else {
        console.log('bookNow else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bookNow error:')
      toast.error(error.message)
    }
  };

  const onToken = async (token) => {
    // console.log(token)
    try {
      dispatch(ShowLoading()) 
      console.log('bookNow token:', token)
      const response = await axiosInstance.post('/api/bookings/make-payment', {
        token,
        amount: selectedSeats.length * bus.fare,
      })
      dispatch(HideLoading());
      if (response.data.success){
        toast.success(response.data.message);
        bookNow(response.data.data.transactionId) // added
      }else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    getBus()
  }, [])
  // {bus && console.log('bookedSeats', bus.journeyDate)}
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
                <h1 className="text-lg"><b>残座席</b>: {bus.capacity - bus.seatsBooked.length}</h1>
              </div>
              <hr />

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl">
                  選択した座席: {selectedSeats.join(",")}
                </h1>
                <h1 className="text-2xl mt-2">
                  料金：¥{bus.fare * selectedSeats.length}
                </h1>
                <hr />

                <StripeCheckout
                  billingAddress
                  token={onToken}
                  amount={bus.fare * selectedSeats.length}
                  currency = "jpy"
                  stripeKey="pk_test_51MZD1gC1IWmbV77mFtIeuHiZNykx2UUfs3cs6odT8DKk2vVQ46kmXTMbb2l2XCEA95kvYXEHZ2njN3oaUfRKqOa200V1QQTJOd"
                >
                  <button // 座席を選択したら予約ボタンの色がグレーから青になる
                    className={`btn btn-primary ${(selectedSeats.length===0) && 'disabled-btn' }`}
                    // onClick={()=>bookNow()}
                  >予約する</button>
                </StripeCheckout>
              </div>
            </Col>
            <Col lg={6} xs={12} sm={12}>
                <SeatSelection  
                  selectedSeats = {selectedSeats}
                  setSelectedSeats = {setSelectedSeats}
                  bus = {bus}
                />
            </Col>
        </Row>
      }
    </div>
  )
}
export default BookNow
```
#### 予約情報を表示する
予約画面が開いたときもメニューの「ホーム」がアクティブになるようにする
```js
// src/components/DefaultLayout.js
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu
  let activeRoute = window.location.pathname
  console.log('activeRoute', activeRoute)
  if (window.location.pathname.includes('book-now')){
    activeRoute=('/')
  }
```
バス予約の座席表の位置を調整するためmx-5を追加
```js
// src/components/SeatSelected.js
import React from 'react'
import { Col, Row} from 'react-bootstrap';
import '../resources/bus.css'

function SeatSelection({selectedSeats, setSelectedSeats, bus}) {
  // console.log('selectedSeats1', selectedSeats)
  const capacity = bus.capacity
  const selectOrUnselectSeats = (seatNumber)=> {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat)=> seat !== seatNumber))
    } else {
      setSelectedSeats([...selectedSeats, seatNumber])
    }
  }

  return (
    <div className='mx-5'>  // changed
      <div className="bus-container">
        <Row style={{gap:'10px 0px'}}>
```
bookingModel.jsを修正する
```js
// models/bookingModel.js
const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.ObjectId,
      ref: 'buses', // model名ではなく、mongodbのコレクション名を指定する
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',　// model名ではなく、mongodbのコレクション名を指定する
      required: true,
    },
    seats: {
      type: Array,
      required: true,
    },
    transactionId : {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Booking', bookingSchema)
```
/bookings用のルートを追加する
```js
// App.js
function App() {
  const {loading} = useSelector(state => state.alerts)

  return (
    <div>
      {loading && <Loader />}
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
          <Route path="/book-now/:id" element={<ProtectedRoute><BookNow /></ProtectedRoute>}></Route>
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>}></Route> // added
```
adminBuses.jsを参照してBooking.jsを作成する
```js
// pages/booking.js
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import BusForm from '../components/ BusForm'
import PageTitle from '../components/PageTitle'
import { axiosInstance } from '../helpers/axiosInstance'
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import BusTable from '../components/BusTable';

function Bookings() {
  const dispatch = useDispatch()
  const [bookings, setBookings] = useState([])

  const getBookings = async()=> {
    console.log('bookings data:')
    try {
      dispatch(ShowLoading()) 
      console.log('bus data success:')
      const response = await axiosInstance.post('/api/bookings/get-bookings-by-user-id', {})
      dispatch(HideLoading())  
      if(response.data.success){
        console.log('bookings data success:', response.data.data)
        setBookings(response.data.data) 
      }else {
        console.log('bookings data else:')
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('bookings data error:')
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getBookings()
  }, [])

  return (
    <div>Bookings</div>
  )
}
export default Bookings
```
ユーザ別予約情報取得のBackendを作成する
```js
// route/bookingsRoute
// get bookings by user id
router.post('/get-bookings-by-user-id', authMiddleware, async(req, res) => {
  try {
    const bookings = await Booking.findById({userId: req.body.userId})
      .populate('bus')
      .populate('user')
    res.status(200).send({
      message:"Bookings fetched successfully",
      data: bookings,
      success: true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:"Bookings fetch failed",
      data: error,
      success: false
    })
  }
})
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






