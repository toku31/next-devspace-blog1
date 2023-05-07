---
title: 'React Tutorial SandBox'
date: 'September 24, 2022'
excerpt: 'Reatの基礎のメモ書きです Redux, Screen, Codetest などで分類しています'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
## Redux & Todo List
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { todoReducer } from './reducer/todoReducer'

// const store = createStore(todoReducer)
const initialState = {
  todos: [],
  // todoReducer
}

const rootReducer = combineReducers({
  todoReducer : todoReducer
})
const store = createStore(rootReducer, initialState)

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

```js
// actions/actions.js
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    payload: {
      id: Math.random(),
      text: text,
      completed: false
    }
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    payload: {
      id: id
    }
  }
}
```

```js
// reducer/todoReducer.js
import { createStore } from "redux";

const initialState = {
  todos: [
    {
      id: 1,
      text: "ブログを確認",
      completed: false,
    },
    {
      id: 2,
      text: "メールの返信",
      completed: false,
    },

  ]
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('action.type', action.type)
      console.log('action.payload', action.payload)
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed }
          } else {
            return todo
          }
        })
      }
    default:
      return state
  }
}
```

```js
// todoReduxExample1.js
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo } from '../actions/actions'

function TodoRedux() {
  // const todos = useSelector(state => state.rootReducer)
  const [text, setText] = useState('')
  const todos = useSelector(state => state.todoReducer.todos)
  console.log('todos', todos)
  const dispatch = useDispatch()

  const handleAddTodo = () => {
    if (text.trim()) {
      console.log(text.trim())
      dispatch(addTodo(text))
      setText('')
    }
  }

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id))
  }
  console.log('todos2', todos);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
      {todos && todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => handleToggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoRedux
```
## Code Test
### Counterプログラム
```js
// 以下の仕様を満たすカウンターを作成してください。

// カウンターの初期値は0です。
// 「+1」、「-1」、「リセット」の3つのボタンを作成してください。
// 「+1」ボタンをクリックすると、カウンターの値が1増加します。
// 「-1」ボタンをクリックすると、カウンターの値が1減少します。
// 「リセット」ボタンをクリックすると、カウンターの値が0にリセットされます。

     // backgroundColor:'pink'

import { useState } from 'react'
import '../../resources/codetest.css'

function Counter() {
  const [number, setNumber] = useState(0)

  const Increment = () => {
    // setNumber(number + 1)
    setNumber(prev => prev + 1)
  }
  const Decrement = () => {
    // setNumber(number  - 1)
    setNumber(prev => prev  - 1)
  }
  const Reset = () => {
    setNumber(0)
  }

  return (
    <>
    <div className="container"  style={{margin:'auto', maxWidth:'768px',  display:'flex', flexDirection: 'column', alignItems:'center'}}>
      <h3>カウンター:{number}</h3>
      <div className="btn-group"  
        style={{display:'flex', width:'200px', justifyContent: 'space-between',margin: '20px 0'}}
      >
        <button class="counter-btn" onClick={Increment}>+1</button>
        <button class="counter-btn" onClick={Decrement}>-1</button>
        <button class="counter-btn" onClick={Reset}>リセット</button>
      </div>
    </div>
    </>
  )
}

export default Counter
```
### API 通信プログラム
```js
// 以下の仕様を満たすユーザー一覧の表示を実装してください。

// APIエンドポイント https://jsonplaceholder.typicode.com/users からユーザー一覧を取得してください。
// 取得したユーザー一覧を表示してください。表示する内容は、ユーザー名、メールアドレス、電話番号のみです。
// 取得中は「Loading...」と表示し、取得完了後には「Loaded!」と表示してください。
// 取得に失敗した場合は、「Failed to load data.」と表示してください。
// UIデザインに関しては指定がない場合があります。自由に実装してください。

// fetch('https://randomuser.me/api/?results=10')

import React, { useEffect, useState } from 'react'

function Api() {
  const  [users, setUsers] = useState([])

  const fetchUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json()) // ★★★
          .then(data => setUsers(data))
          .catch(err => {    // ★★★
        })

  console.log(users);
 
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      {(users.length > 0)? (
        <div className="container">
          <h2>Fetch Api</h2>
          <ul>
              {users.map((user) => {
                return (
                  <li key={user.id}>{user.name}</li>
                )
              } )
              }
            </ul>
        </div>
      ): (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Api
```
テーブルを使って表示
```js
import React, { useEffect, useState } from 'react'
import '../../resources/codetest.css'

function Api() {
  const  [users, setUsers] = useState([])
  const  [isError, setIsError] = useState(false)

  const fetchUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json()) // ★★★
          .then(data => setUsers(data))
          .catch(err => {    // ★★★
            setIsError(true)
        })
  console.log(users);
 
  useEffect(() => {
    fetchUsers()
  }, [])

  if (isError) {
    return <div>Failed to load data</div> 
  }

  return (
    <div>
    {(users.length > 0)? (
      <div className="container">
        <h2>Fetch Api</h2>
        <table style={{borderCollapse:'collapse', borderSPacing:'0', border:'1px solid #ccc'}}>
          <thead>
            <tr>
              <th>名前</th>
              <th>メールアドレス</th>
              <th>電話番号</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id}>
                  <td >{user.name}</td>
                  <td >{user.email}</td>
                  <td >{user.phone}</td>
                </tr>
              )
            } )
            }
          </tbody>
        </table>
      </div>
    ): (
      <p>Loading...</p>
    )}
    </div>
  )
}
export default Api
```
axiosを使ってAPI callする例  
useStateにisErrorとisLoading使用
```js

```
### フォームバリデーション
```js
// 課題3: フォームバリデーション
// 以下の仕様を満たすフォームバリデーションを実装してください。

// 名前とメールアドレスを入力するフォームを作成してください。
// 名前は必須項目です。未入力の場合は、「名前を入力してください。」とエラーメッセージを表示してください。
// メールアドレスは必須項目です。未入力の場合は、「メールアドレスを入力してください。」とエラーメッセージを表示してください。
// メールアドレスは正しい形式で入力されているかをバリデーションしてください。不正な形式の場合は、「メールアドレスが正しくありません。」とエラーメッセージを表示してください。
// 入力値が正しい場合は、フォームの下に「登録しました。」と表示してください。
// UIデザインに関しては指定がない場合があります。自由に実装してください。

import { useState } from 'react'
import '../../resources/codetest.css'

function FormValidation() {
  const [nameErrMsg, setNameErrMsg] = useState("")
  const [emailErrMsg, setEmailErrMsg] = useState("")
  // const [isSuccess, setIsSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const {name, email} = formData

  const handleChange =(e) => {
    setFormData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    console.log(formData);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    // console.log(formData)
      const values = {
      name: name,
      email: email
    }
    console.log('submit_value:', values)

    if (name.trim() === ""){
      setNameErrMsg("名前を入力してください。")
    } else {
      setNameErrMsg("")
    }

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (email.trim() === ""){
      console.log(111);
      setEmailErrMsg("メールアドレスを入力してください。");
    } else if (!emailRegex.test(email.trim())){
      setEmailErrMsg('メールアドレスが正しくありません。')
    } else {
      console.log(222);
      setEmailErrMsg('')
      console.log('emailErrMsg',emailErrMsg);
    }

    if (email && name && !emailErrMsg) {
       setSuccessMsg('OK')
    }else{
      console.log(email)
      console.log(name)
      console.log(emailErrMsg)
      setSuccessMsg('')
    }
  }

  return (
    <div className='login-form-container'>
      <form className="form" onSubmit={handleSubmit}>
      <h2>Form Validation</h2>
        <div className="input-group">
          <label htmlFor='name'>名前</label>
          <input type="text" id="name" name="name" value= {name} onChange={handleChange}/>
          <small>{nameErrMsg.length > 0 ?nameErrMsg: ""}</small>
        </div>
        <div className="input-group">
          <label>メール</label>
          <input type="text" id="email" name='email' value={email} onChange={handleChange} />
          <small>{emailErrMsg.length > 0 ?emailErrMsg: ""}</small>
        </div>
        <div className="msg-btn">
          {/* <h5>{(!nameErrMsg) && (!emailErrMsg) && isSuccess && "登録しました"}</h5> */}
          <h5>{successMsg}</h5>
          <button className='form-validation'type="submit" >
            ログイン
          </button>
        </div>
      </form>
    </div>
  )
}
export default FormValidation
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