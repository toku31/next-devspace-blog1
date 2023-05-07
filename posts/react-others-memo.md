---
title: 'React学習のメモ2023'
date: 'April 20, 2023'
excerpt: 'Reactの学習中でメモしたことを列挙しました'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

**参考サイト**：
#### Redux Thunk
**セットアップ**
```js
user@mbp client % npm i react-router-dom axios redux react-redux
npm install redux-thunk
```
```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
```
次に、redux-thunkを使用して非同期アクションを作成することができます。以下は、APIからデータを取得する非同期アクションの例です。
```js
import axios from 'axios';

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};

export const fetchUsersRequest = () => {
  return {
    type: 'FETCH_USERS_REQUEST'
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: users
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: 'FETCH_USERS_FAILURE',
    payload: error
  };
};
```
この例では、fetchUsers関数が非同期アクションです。この関数は、dispatch関数を引数として受け取ります。APIリクエストを送信し、成功または失敗に応じて、fetchUsersSuccessまたはfetchUsersFailureアクションをディスパッチすることができます。また、fetchUsersRequestアクションもディスパッチされます。これは、APIリクエストが開始されたことを示すために使用されます。

このようにして、redux-thunkを使用することで、非同期処理を含む複雑なReduxアプリケーションを実装することができます。

Reduxは基本的に同期的な処理を前提としているため、Redux単体で非同期処理を行うことはできません。ただし、Reduxを使用する場合でも、非同期処理を行うための他の方法があります。

例えば、Redux-SagaやReact-Redux-Firebaseなどのライブラリを使用することで、Reduxで非同期処理を行うことができます。これらのライブラリは、Reduxと組み合わせて非同期処理を実現するために設計されています。

また、Promiseやasync/awaitなどのJavaScriptの標準機能を使用することもできます。これらの機能を使用することで、非同期処理を直接Reduxアプリケーション内で実装することができます。

しかし、これらの方法はReduxの原則とはやや異なるため、Redux-Thunkのようなミドルウェアを使用することが推奨されます。Redux-Thunkを使用することで、Reduxアプリケーションで非同期処理を扱うことができ、アプリケーションの状態を管理することができます。

Reduxは、JavaScriptのフロントエンドアプリケーションのための状態管理ライブラリです。Reduxは、アプリケーションの状態を単一のオブジェクト（ストア）に格納し、そのオブジェクトをアプリ全体で共有することによって、複雑なアプリケーションの状態を管理します。

Reduxの主要なコンセプトは以下の3つです。

ストア (Store)：アプリケーションの状態を格納するオブジェクトです。
アクション (Action)：アプリケーションで発生するイベントを表すオブジェクトです。
リデューサー (Reducer)：アクションを受け取って、アプリケーションの状態を更新する関数です。
以下はReduxを使った簡単なカウンターアプリのコードです。
```js
// アクション
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// アクションクリエーター
function increment() {
  return {
    type: INCREMENT
  };
}

function decrement() {
  return {
    type: DECREMENT
  };
}

// リデューサー
function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

// ストア
const store = Redux.createStore(counter);

// View
function render() {
  const value = store.getState();
  document.getElementById('counter').textContent = value;
}

// ボタンクリック時の処理
document.getElementById('increment')
  .addEventListener('click', () => {
    store.dispatch(increment());
  });

document.getElementById('decrement')
  .addEventListener('click', () => {
    store.dispatch(decrement());
  });

// Viewの初期化
render();

// ストアの状態が変更されたときにViewを再描画する
store.subscribe(render);

```
このコードでは、ストアはcreateStoreで作成され、リデューサーはcounterという関数で定義されています。アクションはincrementとdecrementという関数で定義されています。Viewの表示はrender関数で行われ、ストアの状態変化に対するViewの再描画はstore.subscribe(render)で実現されています。

このようにReduxは、アプリケーションの状態を一元管理することによって、状態の一貫性を保ち、アプリケーションの複雑性を減らすことができます。  
以下は、ReduxをReactに実装したサンプルコードにredux-thunkを追加したものです。
```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import counterReducer from './reducers/counterReducer';

const store = createStore(counterReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

```

```js
// actions/counterActions.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increment() {
  return {
    type: INCREMENT,
  };
}

export function decrement() {
  return {
    type: DECREMENT,
  };
}

export function incrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  };
}

export function decrementAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(decrement());
    }, 1000);
  };
}

```
上記のコードでは、redux-thunkをストアのミドルウェアとして適用するために、applyMiddleware関数を使用しています。また、actions/counterActions.jsファイルに、非同期処理を含むアクションincrementAsyncとdecrementAsyncを追加しました。これらのアクションは、1000ミリ秒の遅延を設定した後、通常のincrementとdecrementアクションをディスパッチします。これにより、非同期でカウンターの値を変更することができます。App.jsコンポーネントには、新しい非同期アクションをトリガーするための2つの新しいボタンが追加されています。  

## タグをスタイル
Reactではタグをスタイルするときはキャメルケースで書き{{}} 2
重波括弧を使う
```js
<div>
  <h1 style={{ textDecoration: 'underline' }}>Hello, world!</h1>
  <p style={{ textDecoration: 'line-through' }}>This text is crossed out.</p>
</div>

<span style={{ textDecoration: 'underline' }}>アンダーラインが表示されるテキスト</span>

<span style={{ textDecoration: 'line-through' }}>取り消し線が表示されるテキスト</span>

<span style={{ textDecoration: 'overline' }}>上線が表示されるテキスト</span>

<span style={{ textDecoration: 'none' }}>下線、取り消し線、上線がないテキスト</span>
```

### javascriptでpushを使うのにreactで使わない理由
eactでの配列操作において、直接push()メソッドを使うと、元の配列を変更してしまうため、Reactが正常に機能しなくなる可能性があります。Reactでは、直接配列を変更するのではなく、新しい配列を生成することを推奨しています。このように、新しい配列を生成してから、その新しい配列をReactに渡すことで、Reactのパフォーマンスや機能性を維持することができます。このように、Reactでは、push()メソッドの代わりに、concat()メソッドやスプレッド演算子を使用することが推奨されます。  
Reactでコンポーネントを再描画する場合、そのコンポーネントの状態が変更されたかどうかを判断するために、Reactは内部的に前の状態と現在の状態を比較しています。この比較は非常に高速であり、配列やオブジェクトの変更の検出にも非常に有効ですが、配列のpush()メソッドを使用する場合、Reactはこれを新しい配列に変更されたと誤解してしまうため、再描画されません。
例えば、以下のようなコンポーネントを考えてみましょう。
~~~js
function Example() {
  const [items, setItems] = useState([1, 2, 3]);

  function handleClick() {
    items.push(4);
    setItems(items);
  }

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={handleClick}>Add Item</button>
    </div>
  );
}
~~~
このコンポーネントは、itemsという状態を持ち、ボタンがクリックされたときにitemsに新しい要素を追加することができます。しかし、このコードでは、配列に新しい要素を追加する代わりに、配列自体を変更しています。そのため、Reactは新しい配列を検出せず、再描画が発生しません。  
代わりに、新しい配列を生成してsetItems()関数に渡すことができます。
~~~js
import React, { useState } from 'react'

function ArrayOperation() {
  const [items, setItems] = useState(['item 1', 'item 2', 'item 3'])

  const handleAdd = () => {
    setItems([...items, `item ${items.length + 1}`])
  }

  const handleDelete = (index) => {
    const updatedItems = items.filter((item, i) => i !== index)
    setItems(updatedItems)
  }

  return (
    <div>
      <h2>Items:</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add Item</button>
    </div>
  )
}
export default ArrayOperation
~~~
Reactにおいて、配列から特定の要素を削除するには、配列の操作をする必要があります。具体的には、Array.prototype.filter()を使用して、削除したい要素以外の要素を残した新しい配列を作成することができます。  
~~~js
import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

function ArrayOperation() {
  const [items, setItems] = useState([
    {
    id : 1,
    item : 'item 1'
    },
    {
    id : 2,
    item : 'item 2'
    },
    {
    id : 3,
    item : 'item 3'
    }
  ])

  const handleAdd = () => {
    const newEl = {
      id: uuidv4(),
      item: `item ${items.length + 1}`
    }
    setItems([...items, newEl])
  }

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)
  }

  return (
    <div>
      <h2>Items:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add Item</button>
    </div>
  )
}
export default ArrayOperation
~~~

~~~js

~~~

~~~js

~~~
~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~
~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~
~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~

~~~js

~~~