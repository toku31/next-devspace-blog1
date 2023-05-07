---
title: 'React Hooks Tutorial'
date: 'September 25, 2022'
excerpt: 'Reat Hooksの基礎のメモ書きです'
cover_image: '/images/posts/img1.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
#### UseRef Example2 Get Previous State
```js
// index.js
import { useState, useEffect, useRef } from 'react'

function UseRefExample2() {
  const [name, setName] = useState('')

  const renders = useRef(1)
  const prevName = useRef('')

  useEffect(() => {
    console.log('renders current1', renders.current);
    console.log('prevName current1', prevName.current);
    renders.current = renders.current + 1 // rederingの後に行われる
    prevName.current = name  // rederingの後に行われる
    console.log('renders current2', renders.current);
    console.log('prevName current2', prevName.current);
  }, [name])

  return (
    <div>
      <h1>Renders: {renders.current}</h1>
      <h2>Prev Name State: {prevName.current}</h2>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}  // nameの値が更新
        className='form-control mb-3'
      />
    </div>
  )
}

export default UseRefExample2
```
この例では、useRefを使ってrendersとprevNameを定義し、それらの値を更新しています。rendersは現在のレンダリング回数を、prevNameは以前のnameの値を保持するために使われます。  
useEffectフックは、Reactコンポーネントがレンダリングされた後に実行されます。つまり、コンポーネントが初回レンダリングされた後、または指定された依存関係が変更された後に、useEffect内のコードが実行されます。

#### UseRef Example3 Memory Leak Error Fix
```js
import { useState, useEffect, useRef } from 'react'

function Todo() {
  const [loading, setLoading] = useState(true)
  const [todo, setTodo] = useState({})  // Empty Object

  const isMounted = useRef(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          if (isMounted.current) {
            setTodo(data)
            setLoading(false)
          }
        }, 2000)
      })

    // Runs when component is unmounted
    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  return loading ? <h3>Loading...</h3> : <h1>{todo.title}</h1>
}

export default Todo
```
### useMemoの使い方
useMemoは、Reactフックの一つで、重い計算や再レンダリングの原因になる処理を最適化するために使用されます。useMemoは、関数の戻り値をメモ化し、その値を再利用することで、パフォーマンスを改善します。

useMemoは以下のように使用します。
```js
import { useMemo } from 'react';

function MyComponent(props) {
  const [value1, value2, value3] = props.values;

  const result = useMemo(() => {
    // 重い処理
    const heavyCalculation = doSomeHeavyCalculation(value1, value2, value3);

    return heavyCalculation;
  }, [value1, value2, value3]);

  return <div>{result}</div>;
}
```
上記の例では、useMemoを使用してheavyCalculationをメモ化し、value1、value2、value3のいずれかが変更された場合にのみ、再計算するようにしています。

useMemoの第1引数には、メモ化したい関数を指定します。第2引数には、メモ化に使用する依存関係の配列を指定します。依存関係のいずれかが変更された場合に、メモ化された値を再計算するようになります。

useMemoは、計算コストの高い関数を最適化するために使用されますが、毎回同じ結果を返すような関数をメモ化すると、パフォーマンスが悪化する場合があります。そのため、useMemoは、必要な場合にのみ使用するようにし、パフォーマンス改善のために使用することをお勧めします。
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