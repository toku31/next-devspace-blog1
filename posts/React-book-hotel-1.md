---
title: 'React Hotel Booking -1-'
date: 'September 10, 2022'
excerpt: 'Reatを使って旅行先の宿を探すサイトを作成していきます。初回は React, html, CssでUIを構築します。'
cover_image: '/images/posts/hotel.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

https://github.com/safak/youtube2022/tree/react-booking-ui  
https://www.youtube.com/watch?v=RkWpJ4XUHuw

npm install  
react routerを使う  
https://v5.reactrouter.com/web/guides/quick-start  
user@mbp React % npm i react-router-dom

~~~js
// ¥reservation-app¥App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home'
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

function App() {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
      </Routes>
    </Router>
  );
}

export default App;
~~~
#### Navbarの作成: Navbar Design
~~~js
 ¥reservation-app¥src¥components¥navbar¥Navbar.jsx
import './navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navContainer">
            <span className="logo">Ybooking.com</span>
            <div className="navItems">
                <button className="navButton">登録</button>
                <button className="navButton">ログイン</button>
            </div>
        </div>
    </div>
  )
}
~~~
Navbarのcss
~~~css
 ¥reservation-app¥src¥components¥navbar¥Navbar.css
.navbar {
    height: 50px;
    background-color: #003580 ;
    display: flex;
    justify-content: center;
}

.navContainer {
    width: 100%;
    max-width: 1024px;
    background-color: #003580;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-weight: 500;
}

.navButton {
    margin-left: 20px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: #003580;
}
~~~
#### Headerの作成: Header Design
FontAwsomeを使う  
https://fontawesome.com/icons
https://fontawesome.com/docs/web/use-with/react/  

```
1) npm i --save @fortawesome/fontawesome-svg-core
```
```
# Free icons styles
2) npm i --save @fortawesome/free-solid-svg-icons
3) npm i --save @fortawesome/free-regular-svg-icons
```
```
4) npm i --save @fortawesome/react-fontawesome@latest
```
https://fontawesome.com/iconsでアイコンの検索

~~~js
 ¥reservation-app¥src¥components¥header¥Header.jsx
import {useState} from 'react'
import "./header.css"
// 以下はアイコン
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed,faPlane,faCar,faTaxi, faCalendarDays, faPerson, faSwimmer} from '@fortawesome/free-solid-svg-icons'
// 以下はカレンダー機能
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import ja from 'date-fns/locale/ja'

const Header = ()  => {
  return (
    <div className="header">
      <div className={"headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>宿</span>
          </div>
          <div className="headerListItem">
              <FontAwesomeIcon icon={faPlane} />
              <span>フライト</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>レンタカー</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faSwimmer} />
            <span>アクティビティ</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>空港発着タクシー</span>
          </div>
        </div>
        
        { type!== "list" && 
        <>
          <h1 className='headerTitle'>次の滞在先を検索</h1>
          <p className="headerDesc">
          ホテルや旅館、一軒家など、様々な宿のおトクなプランをチェック
          </p>
          <button className="headerBtn">Sign in / Register</button>
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input type="text" placeholder='目的地' className='headerSearchInput'
                onChange={e=>setDestination(e.target.value)} />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span onClick={()=>setOpenDate(!openDate)}   className='headerSearchText'>{`${format(date[0].startDate, "yyyy/MM/dd")} to 
                ${format(date[0].endDate, "yyyy/MM/dd")}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="date"
                minDate={new Date()} 
              />}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span onClick={()=>setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} 大人 ・ ${options.children} 子供 ・ ${options.room} 部屋`}</span>
                {openOptions && <div className="options">
                  <div className="optionItem">
                    <span className="optionText">大人</span>
                    <div className="optionCounter">
                      <button disabled ={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                      <span className="optionCounterNumber">{options.adult}</span>
                      <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">子供</span>
                    <div className="optionCounter">
                      <button disabled ={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                      <span className="optionCounterNumber">{options.children}</span>
                      <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">部屋</span>
                    <div className="optionCounter">
                      <button disabled ={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                      <span className="optionCounterNumber">{options.room}</span>
                      <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                    </div>
                  </div>
                </div>
                }
            </div>
            <div className="headerSearchItem">
              <button className='headerBtn' onClick={handleSearch}>検索</button>
            </div>
          </div>
        </>}
      </div>
    </div>
  )
}
export default Header
~~~

~~~css
¥reservation-app¥src¥components¥header¥Header.css
.header{
  background-color: #003580;
  color: white;
  display: flex;
  justify-content: center;
  position: relative;
}

.headerContainer{
  width: 100%;
  max-width: 1024px;
  margin: 20px 0px 50px 0px;
}

.headerContainer.listMode{
  margin: 20px 0px 40px 0px;
}

.headerList{
  display: flex;
  gap: 40px;
}

.headerListItem{
  display: flex;
  align-items: center;
  gap: 10px;
}

.headerListItem.active{
  border: 1px solid white;
  padding: 10px;
  border-radius: 20px;
}

.headerTitle {
  margin-top: 30px;
  font-size: 40px;
}

.headerDesc{
  margin: 5px 0px;
  font-size: 24px;
}

.headerBtn{
  background-color: #0071c2;
  color: white;
  font-weight: 500;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.headerSearch{
  height: 30px;
  background-color: white;
  border: 3px solid #febb02;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0px;
  border-radius: 5px;
  position: absolute;
  bottom: -25px;
  width: 100%;
  max-width: 1024px;
}

.headerIcon{
  color: lightgray
}

.headerSearchItem{
  display: flex;
  align-items: center;
  gap: 10px;
}

.headerSearchInput{
  border: none;
  outline: none;
}

.headerSearchText{
  color: lightgray;
  cursor: pointer;
}

.date{
  position: absolute;
  top: 50px;
  z-index: 2;
}

.options{
  z-index: 2;
  position: absolute;
  top: 50px;
  background-color: white;
  color: gray;
  border-radius: 5px;
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.optionItem{
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.optionCounter{
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: black;
}

.optionCounterButton{
  width: 30px;
  height: 30px;
  border: 1px solid #0071c2;
  color: #0071c2;
  cursor: pointer;
  background-color: white;
}

/* .optionCounterButton:hover {
  cursor: pointer;
} */

.optionCounterButton:disabled {
  cursor: not-allowed;
}
~~~
カレンダー機能を作るライブラリー：react-date-range  
https://www.npmjs.com/package/react-date-range  
https://hypeserver.github.io/react-date-range/  

user@mbp reservation-app % npm i react-date-range  
user@mbp reservation-app % npm i date-fns
~~~
// サンプル
import {useState} from 'react'
const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  
<DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
/>
~~~

~~~

~~~