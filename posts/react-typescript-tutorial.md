---
title: 'React & TypeScript Tutorial'
date: 'March 25, 2023'
excerpt: 'ReactとReduxをTypeScripを使いながら作成します'
cover_image: '/images/posts/img5.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
参考にしたサイト：Type script & Typescript React from Scratch

### Create React App with TypeScript
```
user@mbp Typescript % npx create-react-app todo-list --template typescript
cd todo-list
npm start
```

```js
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return <div>TEST</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))

```
### How to use Interface
```js
import React from 'react';
import ReactDOM from 'react-dom'

interface Props {
  color: string;
}

class App extends React.Component<Props> {
  render() {
    return <div>{this.props.color}</div>
  }
}

ReactDOM.render(<App  color="green" />, document.querySelector('#root'))
```
### Dive into States


```js
// ¥src¥App.tsx
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}
export default App;
```

```js
// ¥src¥components¥Calculator.tsx
const Calculator = () => {

})
  return (
    <div>
      <Display />
      <ButtonPanel />
    </div>
  )
}
export default Calculator
```

```js
// ¥src¥components¥Display.tsx
const Display = () => {
  return (
    <div>Display</div>
  )
}
export default Display
```

~~~js
// ¥src¥components¥ButtonPanel.tsx
const ButtonPanel = () => {
  return <div>
    <div>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>AC</button>
    </div>
    <div>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
    </div>
    <div>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
    </div>
    <div>
      <button>0</button>
      <button>.</button>
      <button>D</button>
      <button>=</button>
    </div>
  </div>
}

export default ButtonPanel
~~~

イベント処理の設定:  
Calculatorコンポーネントでイベント処理を行うようにするので、  
ButtonPanelコンポーネントでハンドラーを受けとるためPropsを追加する
~~~js
import { FunctionComponent } from "react";

interface ButtonPanelProps {
  buttonHandler: (code: string) => void;
}

const ButtonPanel: FunctionComponent<ButtonPanelProps> = (props) => {
  return <div>
    <div>
      <button onClick={()=>props.buttonHandler("7")}>7</button>
      <button onClick={()=>props.buttonHandler("8")}>8</button>
      <button onClick={()=>props.buttonHandler("9")}>9</button>
      <button onClick={()=>props.buttonHandler("AC")}>AC</button>
    </div>
    <div>
      <button onClick={()=>props.buttonHandler("4")}>4</button>
      <button onClick={()=>props.buttonHandler("5")}>5</button>
      <button onClick={()=>props.buttonHandler("6")}>6</button>
      <button onClick={()=>props.buttonHandler("-")}>-</button>
    </div>
    <div>
      <button onClick={()=>props.buttonHandler("1")}>1</button>
      <button onClick={()=>props.buttonHandler("2")}>2</button>
      <button onClick={()=>props.buttonHandler("3")}>3</button>
      <button onClick={()=>props.buttonHandler("4")}>+</button>
    </div>
    <div>
      <button onClick={()=>props.buttonHandler("0")}>0</button>
      <button onClick={()=>props.buttonHandler(".")}>.</button>
      <button onClick={()=>props.buttonHandler("D")}>D</button>
      <button onClick={()=>props.buttonHandler("=")}>=</button>
    </div>
  </div>;
}

export default ButtonPanel
~~~

~~~js
// ¥src¥components¥Calculator.tsx
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";

const Calculator = () => {
  const buttonHandler =(code: string)=> {
    console.log(code)
  }

  return (
    <div>
      <Display />
      <ButtonPanel buttonHandler={buttonHandler} />
    </div>
  )
}
export default Calculator
~~~

ロジック部分を作成する
~~~js
¥src¥logic¥calculate.ts (jsxは使わないのでtsでいい)
export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextclear: boolean;
}

export const calculate = (button: string, state: State):State => {
  return state
}
~~~

~~~js
// ¥src¥components¥Calculator.tsx
import { useState } from "react";  //追加
import { calculate, State } from "../logic/calculate";　//追加
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";

const Calculator = () => {
  const [state, setState] = useState<State>({
    current: "0",
    operand: 0,
    operator: null,
    isNextclear: false
  })

  const buttonHandler =(code: string)=> {
    const nextState = calculate(code, state)
    setState(nextState)
  }

  return (
    <div>
      <Display />
      <ButtonPanel buttonHandler={buttonHandler} />
    </div>
  )
}

export default Calculator
~~~

ボタンが数値の時の表示処理
~~~js
¥src¥logic¥calculate.ts 
export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextclear: boolean;
}

const isNumberButton = (button: string)=> {
  return  (
    button === "0" || button === "1" || button === "2" || 
    button === "3" || button === "4" || button === "5" || 
    button === "6" || button === "7" || button === "8" || 
    button === "9"
  )
}

const handleNumberButton = (button: string, state: State): State => {
  // 今の値が０の時
  if (state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextclear: false
    }
  }
  // 今の値が０以外の時
  return {
  current: state.current + button,
  operand: state.operand,
  operator: state.operator,
  isNextclear: false
  }
}

export const calculate = (button: string, state: State):State => {
  // 数値であるか？
  if (isNumberButton(button)) {
    return handleNumberButton(button, state)
  }
    - - - 
~~~

~~~js
¥src¥logic¥calculate.ts 
export interface State {
  current: string;
  operand: number;
  operator: string | null;
  isNextclear: boolean;
}
// 条件
const isNumberButton = (button: string)=> {
  return  (
    button === "0" || button === "1" || button === "2" || 
    button === "3" || button === "4" || button === "5" || 
    button === "6" || button === "7" || button === "8" || 
    button === "9"
  )
}
const isOperatorButton = (button: string)=> {
  return  (
    button === "+" || button === "-" 
  )
}

const isDotButton = (button: string)=> {
  return  (
    button === "."
  )
}

const isDeleteButton = (button: string)=> {
  return  (
    button === "D"
  )
}
const isAllClearButton = (button: string)=> {
  return  (
    button === "AC"
  )
}
const isEqualButton = (button: string)=> {
  return  (
    button === "="
  )
}
// ハンドラ
const handleNumberButton = (button: string, state: State): State => {
  if(state.isNextclear){
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextclear: false
    }
  } 
  // 今の値が０の時
  if (state.current === "0") {
    return {
      current: button,
      operand: state.operand,
      operator: state.operator,
      isNextclear: false
    }
  }
  // 今の値が０以外の時
  return {
  current: state.current + button,
  operand: state.operand,
  operator: state.operator,
  isNextclear: false
  }
}
const handleOperatorButton = (button: string, state: State): State => {
  // +, - が押される前にオペレータボタンが押されてない時
  if (state.operator === null) {
    return {
      current: state.current,
      operand: parseFloat(state.current),
      operator: button,
      isNextclear: true
    }
  }
  // + または -が続けて押されたとき
  const nextValue = operate(state)
  return {
  current: `${nextValue}`,
  operand: nextValue,
  operator: button,
  isNextclear: true
  }
}

const handleDotButton = (state: State): State => {
  // どこかにドットがある時は状態を変化させる必要がない
  if (state.current.indexOf('.') !== -1) {
    return state
  }
  return {
    current: state.current + ".",
    operand: state.operand,
    operator: state.operator,
    isNextclear: false
    }
}
const handleDeleteButton = (button: string, state: State): State => {
  if (state.current.length === 1) {
    return {
      current: "0",
      operand: state.operand,
      operator: state.operator,
      isNextclear: false
    }
  }
  return {
    current: state.current.substring(0, state.current.length - 1),
    operand: state.operand,
    operator: state.operator,
    isNextclear: false
  }
}
const handleAllClearButton = (): State => {
  return {
    current: "0",
    operand: 0,
    operator: null,
    isNextclear: false
    }
}

const handleEqualButton = (state: State): State => {
  if (state.operator === null) {
    return state
  }
  const nextValue = operate(state)
  return {
    current: `${nextValue}`,
    operand: 0,
    operator: null,
    isNextclear: true
  }
}
const operate = (state: State): number => {
  const current = parseFloat(state.current)
  if (state.operator === "+") {
    return state.operand + current
  }
  if (state.operator === "-") {
    return state.operand - current
  }
  return current
}
// =================
export const calculate = (button: string, state: State):State => {
  // 数値であるか？
  if (isNumberButton(button)) {
    return handleNumberButton(button, state)
  }
  // オペレータかどうか？
  if (isOperatorButton(button)) {
    return handleOperatorButton(button, state)
  }
   // .かどうか？
  if (isDotButton(button)) {
    return handleDotButton(state)
  }
   // 削除ボタンかどうか？
  if (isDeleteButton(button)) {
    return handleDeleteButton(button, state)
  }
  // ACかどうか？
  if (isAllClearButton(button)) {
    return handleAllClearButton()
  }
  // = かどうか？
  if (isEqualButton(button)) {
    return handleEqualButton(state)
  }
  return state
}
~~~

SassをインストールしてCSSを実装する  
npm install sass
~~~

~~~


