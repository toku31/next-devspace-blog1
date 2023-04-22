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
colorを省略できるように?マークをつける
```typescript
import React from 'react';
import ReactDOM from 'react-dom'

interface Props {
  color?: string;
}

class App extends React.Component<Props> {
  render() {
    return <div>{this.props.color}</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```
```typescript
import React from 'react';
import ReactDOM from 'react-dom'

interface Props {
  color?: string;
}

class App extends React.Component<Props> {
  state = {counter : 0}

  onUp = ():void => {
    this.setState({counter: this.state.counter + 1})
  }

  onDown = ():void => {
    this.setState({counter: this.state.counter - 1})
  }

  render() {
    return (
      <div >
        <button onClick={this.onUp}>+</button>
        {this.state.counter}
        <button onClick={this.onDown}>-</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

```js
import React from 'react';
import ReactDOM from 'react-dom'

interface AppProps {
  color?: string;
}

interface AppState {
  counter: number;
}

class App extends React.Component<AppProps, AppState> {
  // state = {counter : 0}

  constructor(props: AppProps) {
    super(props);
    this.state;
    this.state = {counter: 0}
  }

  onUp = ():void => {
    this.setState({counter: this.state.counter + 1})
  }

  onDown = ():void => {
    this.setState({counter: this.state.counter - 1})
  }

  render() {
    return (
      <div >
        <button onClick={this.onUp}>+</button>
        {this.state.counter}
        <button onClick={this.onDown}>-</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```
### Function Component
```js
import React from 'react';
import ReactDOM from 'react-dom'

interface AppProps {
  color?: string;
}

const App = (props: AppProps): JSX.Element => {
  return <div>{props.color}</div>
}

ReactDOM.render(<App color='green' />, document.querySelector('#root'))
```
### Setup Redux
```bash
user@mbp todo-list % npm i redux react-redux axios redux-thunk
```

```js
import React from 'react';
import ReactDOM from 'react-dom'
import {legacy_createStore as createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App color='green' />
  </Provider>,
  document.querySelector('#root'))
```
redux-thunkは、JavaScriptアプリケーションの状態管理ライブラリであるReduxで使用される、Reduxのミドルウェアの1つです。
通常、Reduxは同期的なアクションしか処理できませんが、redux-thunkを使用すると、非同期処理を含む複雑なアクションを処理できます。
具体的には、redux-thunkはアクションの代わりに関数をディスパッチすることを可能にし、その関数は非同期処理を含むことができます。この関数は、必要に応じて、非同期処理が完了した後に別のアクションをディスパッチすることもできます。
たとえば、APIからデータを取得するアクションをredux-thunkで実装する場合、非同期処理であるAPIリクエストを送信し、そのリクエストが完了したら、成功または失敗を示すアクションをディスパッチすることができます。このようにして、redux-thunkを使用することで、Reduxアプリケーションで非同期処理を扱うことができます。

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
