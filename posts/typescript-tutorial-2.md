---
title: 'Typescript Tutorial -2-'
date: 'November 12, 2022'
excerpt: 'Typescriptの基礎のメモ書きです 2回目は実装の仕方などを学びます'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

**参考サイト**：https://www.youtube.com/watch?v=MOO5vrtTUTE&t=1077s  
https://github.com/gitdagray/typescript-course  
**セットアップ**
user@mbp Lesson01 % tsc -w
#### インストール
~~~
npm install -g typescript
または
user@mbp typescript-tutorial % npm i typescript -g
~~~
Lesson01フォルダにindex.htmlとmain.tsファイルを作成
~~~ts
//lesson01/src/main.ts
let username = 'Dave'
console.log(username)
~~~
~~~
user@mbp Lesson01 % tsc main.ts
~~~
main.js ができる
~~~
デベロッパーツールを開く「F12」  
// Ctrl + Shift + I」（MacはControl + Option + I）  
// compiled from typescript

~~~
user@mbp Lesson01 % tsc main.ts -w
user@mbp Lesson01 % tsc --init
~~~
tscofig.jsonができるので以下を修正する
~~~json
 <!-- tscofig.json -->
    /* Modules */
 "rootDir": "./src",   
 "outDir": "./build/js",    
~~~
~~~
user@mbp Lesson01 % tsc -w
~~~
tsconfig.json	の"target"を”es5"にするとlet→varになる
~~~
 <!-- tscofig.json -->
  "target": "es2016",    
~~~
tsconfig.json	の最後に以下を追加するとsrc以外にtsファオイルを作成してもjsファイルが作成されない
~~~
  },
  "include":[
    "src"
  ]
}
~~~
tsconfig.json	で
~~~js
 "noEmitOnError": true, 
~~~
または、コンソールで
~~~js
$tsc --noEmitOnError -w
~~~
とすると型エラーのときエラーになりJsファイルが作成されない
#### 2 Typescript Basic Types
https://www.youtube.com/watch?v=bDCPYSanB7A  
https://github.com/gitdagray/typescript-course  
~~~js
// src/main.ts
let username = 'John'
let myName: string = 'Dave'
let meaningOfLife: number;
let isLoading: boolean;
let album: any;

myName = 'John'
meaningOfLife = 42
isLoading = true
album = 5150

const sum = (a: number, b: string) => {
    return a + b
}

let postId: string | number
let isActive: number | boolean

let re: RegExp = /\w+/g
~~~
/w ・・・アンダースコアを含むあらゆる半角英数字（基本ラテンアルファベット）に一致します。 [A-Za-z0-9_] に相当します。例えば /\w/ は、"apple" の "a"、"$5.28" の "5"、"3D" の "3" に一致します  
フラグg ・・・ global 2番目、3番目... にマッチする部分も検索する  
x+	・・・ 1文字以上のx。最大マッチングで　x?	0文字または1文字のx

#### 3 Typescript Objects, Arrays, Tuples & Enums 
https://www.youtube.com/watch?v=9dw2ik9N8wo  
https://github.com/gitdagray/typescript-course  
配列
~~~js
let stringArr = ['one', 'hey', 'Dave']
let guitars = ['Strat', 'Les Paul', 5150]
let mixedData = ['EVH', 1984, true]

stringArr[0] = 'John'　// Stringのみ
stringArr.push('hey')  // Stringのみ

guitars[0] = 1984　// String たは　Number
guitars.unshift('Jim')　　// String たは　Number

let test = []  // any type
let bands: string[] = []　 // OK
bands.push('Van Halen')  // OK
~~~

~~~js
unshift() メソッドは、配列の最初に 1 つ以上の要素を追加し、新しい配列の長さを返す
const array1 = [1, 2, 3];
console.log(array1.unshift(4, 5));
// expected output: 5
console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
~~~
タプル
~~~js
// Tuple 
let myTuple: [string, number, boolean] = ['Dave', 42, true]  //let myTuple: [string, number, boolean]
let mixed = ['John', 1, false]  //let mixed: (string | number | boolean)[]
mixed = myTuple // OK
myTuple = mixed // NG
myTuple[3] = 42 // NG
myTuple[1] = 42  // OK
~~~
オブジェクト
~~~js
// Objects
let myObj: object
myObj = []
console.log(typeof myObj) // object
myObj = bands
myObj = {}

const exampleObj = {
    prop1: 'Dave',
    prop2: true,
}

// const exampleObj: {
//     prop1: string;
//     prop2: boolean;
// }

exampleObj.prop1 = 'John'

// type  Guitarist = {
//     name?: string,
//     active: boolean,
//     albums: (string | number)[]
// }

interface Guitarist {
    name?: string,
    active: boolean,
    albums: (string | number)[]
}

let evh: Guitarist = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}

let jp: Guitarist = {
    active: true,
    albums: ['I', 'II', 'IV']
}

evh.years = 40 // Error

const greetGuitarist = (guitarist: Guitarist) => {
    return `Hello ${guitarist.name?.toUpperCase()}!`
}

console.log(greetGuitarist(jp)) // Hello undefined!
console.log(greetGuitarist(evh)) // Hello EDDIE!

const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) {  // Narrowing
        return `Hello ${guitarist.name.toUpperCase()}!`
    }
    return 'Hello!'
}

console.log(greetGuitarist(jp)) // Hello
console.log(greetGuitarist(evh))  // Hello EDDIE!
~~~
ENUM
~~~js
// Enums 
// "Unlike most TypeScript features, Enums are not a type-level 
// addition to JavaScript but something added to the language and runtime."
enum Grade {
    U = 1,
    D,
    C,
    B,
    A,
}

console.log(Grade.U) // 1
console.log(Grade.A) // 5
~~~
#### 4 Typescript Functions
https://www.youtube.com/watch?v=s7kyOtFF120  
https://github.com/gitdagray/typescript-course  
https://github.com/gitdagray/typescript-course/tree/main/lesson04  
~~~js
// Type Aliases 
type stringOrNumber = string | number

type stringOrNumberArray = (string | number)[]

type Guitarist = {
    name?: string,
    active: boolean,
    albums: stringOrNumberArray
}

type UserId = stringOrNumber

// Literal types
let myName: 'Dave'

let userName: 'Dave' | 'John' | 'Amy'
userName = 'Amy'

// functions 
const add = (a: number, b: number): number => {
    return a + b
}

const logMsg = (message: any): void => {
    console.log(message)
}

logMsg('Hello!')
logMsg(add(2, 3))

let subtract = function (c: number, d: number): number {
    return c - d
}

type mathFunction = (a: number, b: number) => number
// interface mathFunction {
//     (a: number, b: number): number
// }

let multiply: mathFunction = function (c, d) {
    return c * d
}

logMsg(multiply(2, 2))

// optional parameters 
const addAll = (a: number, b: number, c?: number): number => {
    if (typeof c !== 'undefined') {
        return a + b + c
    }
    return a + b
}

// default param value
const sumAll = (a: number = 10, b: number, c: number = 2): number => {
    return a + b + c
}

logMsg(addAll(2, 3, 2))
logMsg(addAll(2, 3))
logMsg(sumAll(2, 3))
logMsg(sumAll(undefined, 3))

// Rest Parameters 
const total = (a: number, ...nums: number[]): number => {
    return a + nums.reduce((prev, curr) => prev + curr)
}

logMsg(total(10, 2, 3))

const createError = (errMsg: string): never => {
    throw new Error(errMsg)
}

const infinite = () => {
    let i: number = 1
    while (true) {
        i++
        if (i > 100) break
    }
}

// custom type guard 
const isNumber = (value: any): boolean => {
    return typeof value === 'number'
        ? true : false
}

// use of the never type 
const numberOrString = (value: number | string): string => {
    if (typeof value === 'string') return 'string'
    if (isNumber(value)) return 'number'
    return createError('This should never happen!')
}
~~~
#### Typescript Classes 
(from udemy) 45 Modifiers: public, private, protected  
46 Fields
~~~js
class Employee {
  age: number＝41;

  protected endshift(): void {
    console.log('Shift has been ended')
  }
}
const emoloyee = new Employee();
console.log(employee.age)  // 41
~~~
コンストラクタを使ってageを初期化する
~~~js
class Employee {
  age: number;
  constructor(age:number){
    this.age = age;
  }

  protected endshift(): void {
    console.log('Shift has been ended')
  }
}
const emoloyee = new Employee(29);
console.log(employee.age) // 29
~~~

modifierはメソッドだけでなくフィールドなどにも使える
~~~js
class Employee {
  constructor(public age:number){}  // public追加

  protected endshift(): void {
    console.log('Shift has been ended')
  }
}
const emoloyee = new Employee(29);
console.log(employee.age) // 29
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

TypeScript Website: https://www.typescriptlang.org/
Compiler Option: https://www.typescriptlang.org/docs/handbook/compiler-options.html

ローカルにインストール
~~~
npm -i typescript
~~~
#### コンパイル
```
1 watch モード
2 tsc --init でtsconfig.jsonを作って全てのファイルをコンパイルする
3 includeとexcludeとfilesを使ってコンパイルするファイルを選ぶ
4target を指定して特定のバージョンのJAVASCRIPTに変換する
5libを指定してTypeScriptが用意している型の定義を追加する
6allowJs, checkJs, jsx, declaration, declaretionMap
7
8
9
10
11綺麗なコード


１ > tsc index.ts --watch

2 複数のtsファイルをまとめてコンパイルする
> tsc compiler.ts  index.ts
> tsc --init でtsconfig.jsonを作成する
 tsc だけ打つとtsconfig.jsonを参照するが tsc index.ts では参照しない
 
 ３ tsconfig.jsonの末尾
 ~~~
   "include": [
    "index.ts"
   ],
   "exclude": [
     "**/compiler.ts", // どのディレクトリのcommiler.tsを除く
     "*.spec.ts",
     "node_modules"
   ],
   "files": [
     "tmp/compiler.ts"
   ]
 ~~~
 ```
## 36 tsconfig.jsonのtargetを指定して特定のJSのバージョンに変換
"target": "es6" とすると　var ⇒let 変換する

## 37 tsconfig.jsonのlibを指定してTypescriptが用意している型の定義を追加する
```
”lib”
let hello='hello'
console.log(hello.toUpperCase())
```

