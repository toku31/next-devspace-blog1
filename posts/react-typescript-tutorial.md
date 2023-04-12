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

```js

```

```

```

```

```

```

```

```

```
