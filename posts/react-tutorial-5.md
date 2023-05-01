---
title: 'React Tutorial -5-'
date: 'September 24, 2022'
excerpt: 'Reatの基礎のメモ書きです 5回目はRedux & Todo List など学びます'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
https://github.com/bradtraversy/feedback-app
https://feedback-app-ten-orpin.vercel.app/  
https://github.com/toku31/feedback-app
#### Redux & Todo List

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

```js

```

```js

```

```js

```