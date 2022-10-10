---
title: 'JavaScript Tutorial -1-'
date: 'September27, 2022'
excerpt: 'JavaScriptの基礎から応用まで要点をメモ書きしていきます。React, jQuery, TypeScript, Node.js, Express, webpackの学習にも役立ちます。'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### Chrome Dev Toolを使ったデバッグの方法
Sourceタブ開く  
ブレークポイントを押してリロードする  
ブレークポイントで止まる  
変数をホバーすると値が表示される  
⏩ぼたんで再実行  
javascriptコード内にdebuggerと書くことでブレークポイントができる  
ステップオーバネクスト、ステップインツー（関数に入る）、ステップアウト(関数から出る), ステップ（F９）（関数に入る）がある  
deactivateボタンでブレークポイントを消すことができる  
Paused on exceptionボタンは、実行してエラーが起きたら一回止めてくれる  
Scopeで変数を確認したり変更できる
Watchで変数の値を監視できる  

### VSCodeのブレークポイントを使ったデバッグの方法
赤いブレークポイントをつける  
デバッグぼたんを押してCreate launch.json fileをクリックしてchromeを選ぶ

### JavaScriptの公式ドキュメント
echma internatinal
https://www.ecma-international.org/publications-and-standards/standards/  
Echma-262 は開発者むけで難しい：　https://tc39.es/ecma262/  
エンジニア向けはMDN Web docsを見る：　https://mdn.dev/  
Web technology references: https://developer.mozilla.org/en-US/docs/Web  
https://developer.mozilla.org/en-US/docs/Web/JavaScript  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference  
参考　https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const  

### 条件分岐
~~~
if (真偽値) {条件}
~~~

~~~
let ok = false;
let perhapsOK =false;
let maybeOK = true
if (ok) {
  console.log('Ok')
} elseif(perhapsOK ) {
  console.log('perhaps OK')
}
} else {
  if(maybeOK) {
    console.log('maybe OK')
  }else {
    console.log('NG')
  }
}
~~~

同値演算子 '＝＝＝' & 等値演算子'=='
~~~
let ok = false;
ok = 5 === 5;
ok = 'test' === 'test';
console.log(ok) // true
~~~
~~~
let ok = false;
ok = 5!== 6;
ok = 'test' !== 'morning';
console.log(ok) // true
~~~
等値演算子 型の制約なし
~~~
let ok = false;
ok = 5 == 5;
ok = 5 == '5'; // true
ok = 5 ==＝ '5'; // false
ok = 5 != '4'; // true
console.log(ok) // true
~~~

同値演算子とオブジェクト
~~~
let ok = false;
const flower1 = {name: 'tulip'};
const flower2 = {name: 'tulip'};
ok = flower1 === flower2 // false
const flower3 = flower1
ok = flower1 === flower3 // true
ok = flower1.name === flower2.name // true
~~~
配列もオブジェクトと考える
~~~
let ok
const cars1 = ['toyota', 'ford']
const cars2 = ['toyota', 'ford']
ok = cars1 === cars2
console.log(ok) // false
~~~
大小を比較する演算子
~~~
let ok
ok = 1 > 1;
console.log(ok) // false
ok = 1 >= 1; //true
ok = 1 <= 1; //true
ok = 'a' < 'b'; //true
ok = 'A' < 'a'; //true
~~~
TruthyやFalsy  
https://developer.mozilla.org/en-US/docs/Glossary/Falsy
~~~
let ok = 'test'; // 文字列
if (ok) {
  console.log('Ok')
} else {
  console.log('NG')
}
'test'：OK Truthy
""：NG  Falsy
100:OK Truthy
0:NG   Falsy
null:NG   Falsy
undefined:NG   Falsy
NaN:NG   Falsy
~~~
論理積演算子&論理和演算子
~~~
let ok 
ok = true && false // false 両方がtrueの時のみtrue
ok = true || false // True 両方がfalseの時のみfalse
ok = 'Alise' && 'Bob'  // Bob
ok = true && 'Bob'  // Bob
ok = false && 'Bob'  // false
ok = 0 && 'Bob'  // 0
ok = 'Alise' || 'Bob'  // Alise
ok = 0 || 'Bob'  // Bob
~~~
論理積：左がtruthyなら右を返す　左がfalseyなら左を返す  
論理和: 左がtruthyなら左を返す　左がfalseyなら右を返す
~~~
// 論理和の使い方
const inputName = '';
const Username = inputName || 'User'
console.log(Username) // User
~~~
優先順位　Logical Operators  
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
~~~
const x = 15
const name = 'Steve'
OK = x > 10 && x < 20;
~~~

~~~
ok = x ===10 || x > 12 && name;
1 x > 12  // true
2 x ===10  // false
Ok = false || true && name;
3 true && name // name (|| より　&&の方が優先される)
4 false || name  左がfalseyなら右を返す
5 ok = name
~~~
結合性

Null合体演算子 ??  
左がnullかundefinedなら右を返す、そうでなければ左を返す
~~~
// 論理和の使い方
const inputName = '';
const Username = inputName ?? 'Steve'
console.log(Username) // '' 空文字はNULLでもundefinedでもない
const Username = inputName ?? 'Steve' && 1 // &&や||と一緒に使えない
const Username = inputName ?? ('Steve' && 1) // OK
~~~
論理否定演算子
~~~
let ok
const x = 15
ok = !true;
console.log(ok) // false
ok = !'good'; // Truthyの反転　false
ok = !''; // Falseyの反転　true
ok = !x; // false
ok = !!x; // true 型変換できる
~~~
ChromeのDevtoolでconditional breakpoint がある

文(statement)と式(expression)
~~~
// statement
declarations → var let const
functions and classes　→ function, async function, return, class
Iterations →  do...while
control flow →  break continue switch try...catch throw
Other →  debugger
empty → ; (空文)
~~~
~~~
// expression
x = 10 // 右側は式
x = 5 + 4 // 右側は式
~~~

ブロック文： 複数の文組み合わせて書くとき
~~~
{
  const name = 'Bob'
  {
    const name = 'Bob' // 優先される
  }
}
~~~
~~~
const name = 'Bob2'
{
  console.log(hello); エラー　dead zone
  const name = 'Bob1'
}
~~~
三項演算子 値を返す
~~~
let score;
score = 90;
let msg = (score > 60) ? '合格' : '不合格';
console.log(msg); // 合格
~~~
以下と同じ
~~~js
let score
score = 90
if (score > 60) msg = '合格'
else msg = '不合格'
~~~
switch文 (全ての箇所でbreak文が必要)
~~~js
function address(pref) {
  if (pref === 'tokyo') {
    console.log(tokyo is Kanto)
  } else if (pref === 'osaka') {
    console.log(osaka is Kansai)
  }else if (pref === 'fukuoka') {
    console.log(fukuoka is Kyusyu)
  }
}
~~~
以下と同じ
~~~js
function address(pref) {
  switch (pref) {
    case 'tokyo':
      console.log(tokyo is Kanto)
      break;
    case 'hyogo':
    case 'osaka':
      console.log(`${pref} is Kansai`)
      break;
    case 'fukuoka':
      console.log(fukuoka is Kyusyu)
      break;
    default;
      onsole.log(Not found)
  }
}
~~~

~~~js
function address(pref) {
  switch (pref) {
    case 'tokyo': {
      const message = 'tokyo is Kanto'
      console.log(message)
      break;
    }
    case 'hyogo':
    case 'osaka':{
      const message = `${pref} is Kansai`
      console.log(message)
      break;
    }
    case 'fukuoka':{
      const message = 'fukuoka is Kyusyu'
      console.log(message)
      break;
    }
    default;{
      const message = 'not found'
      console.log(message)
    }
  }
}
~~~

ループ文 ：while文
~~~js
let i = 0;
while(i < 10) {
  console.log('Number' + i)
  i ++;
}
~~~

do while文 必ず１回は処理を行う
~~~js
let i = 100;
do {
  console.log('Number' + i)
  i += 1;
} while (i < 10)
~~~

For 文
~~~
for (let i=0; i<10; i++) {
  if (i===2){
    console.log('2 is my favorite number');
  }
}
~~~
let文とカンマ演算子
~~~js
 count=0, i=0; count<10; count+=1,i+=1){
  console.log(count, i)
}
~~~
配列のループ
~~~js
const cars = ['Ford', 'Chevy', 'Honda', 'Toyota']
for (let i=0; i<cars.length; i++) {
  console.log(cars[i])
}
~~~
For-of文で書く(配列、文字列はOK、イテラブルオブジェクトもOK？)
~~~js
const cars = ['Ford', 'Chevy', 'Honda', 'Toyota']
for (const car of cars) {
  console.log(car)
}
~~~
For In Loop　オブジェクト/配列に使う
~~~js
const people = {
  name: 'Bob',
  age: 25,
  isAdult: true,
};
for (const key in people) {
  console.log(key) // key（name, age, isAdult) のみ表示される
  console.log(key.name) // 'Bob','Bob','Bob'
  console.log(people.key) // undefined,undefined,undefined
  console.log(people['name']) //  'Bob','Bob','Bob'
  console.log(`${key}: ${people[key]}`) // 'Bob',25,true
}
// 配列
const cars = ['Ford', 'Chevy', 'Honda', 'Toyota']
for (const key in cars) {
  console.log(key) // key（０, １, ２、３) のみ表示される
  console.log(cars[key]) // 'Ford','Chevy', 'Honda', 'Toyota'
}
~~~
Continue, Break文
~~~js
for(let i=0; i<10; i++){
  if(i===2) {
    console.log('2 is my favorite number');
    continue;
  }
  if(i===5) {
    console.log('stop the loop');
    break;
  }
  console.log('Number' + i);
}
~~~
ラベル文はContinue, Break文に使う

例外処理    
どうしてもエラーの発生が止めれない時  
tryは数行程度を囲む
~~~js
try {
     let result = 100 * num;
     console.log( result );
     return 'hello'
 } catch(e) {
    console.log( e.message ); //num is not defined
 } finally {
  console.log('Finally runs regardless of result');
  return 'helloを上書きする'
 }
 cosole.log('Program continues')
~~~
throw文でエラーを作る
~~~js
try {
  if (!user.name){
    throw 'User has no name'
    throw 'new syntaxError('User has no name')
    throw {err: 'User has no name'} // オブジェクトでもOK
    console.error('try') // 実行されない
  }
 } catch(e) {
  　console.log(e); // 'User has no name'
    console.log(e.message);  // 'User has no name'
    console.log(e.name);  // 'Reference Error'
    console.log(e instance of Reference Error);  // true
 } finally {

 }
~~~
