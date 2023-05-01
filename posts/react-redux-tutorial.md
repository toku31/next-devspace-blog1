---
title: 'React Redux Tutorial -1-'
date: 'April 20, 2023'
excerpt: 'React Reduxの基礎を学びます'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

**参考サイト**：
**セットアップ**
#### インストール
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

以下はTypeScriptとReactを使用してReduxを実装するための簡単なサンプルコードです。
```js
// store.ts
import { createStore } from 'redux';
import { ActionType, CounterAction } from './actions';

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counterReducer = (state = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { count: state.count + 1 };
    case ActionType.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;

```

```js
// actions.ts
export enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

type IncrementAction = {
  type: ActionType.INCREMENT;
};

type DecrementAction = {
  type: ActionType.DECREMENT;
};

export type CounterAction = IncrementAction | DecrementAction;

export const increment = (): IncrementAction => {
  return { type: ActionType.INCREMENT };
};

export const decrement = (): DecrementAction => {
  return { type: ActionType.DECREMENT };
};
```

```js
// App.tsx
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './actions';
import { CounterState } from './store';

const App = () => {
  const count = useSelector((state: CounterState) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default App;
```
上記のコードでは、store.tsファイルでReduxストアを定義し、actions.tsファイルでReduxアクションを定義しています。App.tsxファイルで、useSelectorとuseDispatchフックを使用してReduxストアにアクセスし、Reduxアクションをディスパッチしています。これにより、ReactコンポーネントからReduxの状態管理を実現できます。また、Reduxストアを作成する際に、createStore関数に代わってconfigureStore関数を使用することで、TypeScriptとの統合がさらに強化されます。

以下はTypeScriptとReactを使用してReduxとredux-thunkを実装するためのサンプルコードです。
```js
// store.ts
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction } from 'redux-thunk';
import { ActionType, CounterAction } from './actions';

export type CounterState = {
  count: number;
  loading: boolean;
};

const initialState: CounterState = {
  count: 0,
  loading: false,
};

const counterReducer = (state = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ActionType.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  counter: counterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  CounterAction
>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
```

```js
// actions.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

export enum ActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  SET_LOADING = 'SET_LOADING',
}

type IncrementAction = {
  type: ActionType.INCREMENT;
};

type DecrementAction = {
  type: ActionType.DECREMENT;
};

type SetLoadingAction = {
  type: ActionType.SET_LOADING;
  payload: boolean;
};

export type CounterAction = IncrementAction | DecrementAction | SetLoadingAction;

export const increment = (): IncrementAction => {
  return { type: ActionType.INCREMENT };
};

export const decrement = (): DecrementAction => {
  return { type: ActionType.DECREMENT };
};

export const setLoading = (loading: boolean): SetLoadingAction => {
  return { type: ActionType.SET_LOADING, payload: loading };
};

export const incrementAsync = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(increment());
    dispatch(setLoading(false));
  };
};

```

```js
// App.tsx
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementAsync } from './actions';
import { CounterState } from './store';

const App = () => {
  const { count, loading } = useSelector((state: CounterState) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementAsync = () => {
    dispatch(incrementAsync());
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement} disabled={loading}>
        Increment
      </button>
      <button onClick={handleDecrement} disabled={loading}>
        Decrement
      </button>
      <button onClick={handleIncrementAsync} disabled={loading}>
        Increment Async
      </button>
    </div>
  );
};

export default App;
```
以下はTypeScriptとReactを使用してReduxとredux-thunkを実装したtodolistアプリの例です。

まず、Reduxのアプリケーションステートの形式を定義するために、src/types.tsファイルを作成します。
## その他メモ  
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