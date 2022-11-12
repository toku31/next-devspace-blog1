---
title: 'Typescript Tutorial -1-'
date: 'November 11, 2022'
excerpt: 'Typescriptの基礎のメモ書きです 1回目は型,クラス,インタフェースを学びます'
cover_image: '/images/posts/img1.jpg'
category: 'JavaScript'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/13.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

## 15\. 「型注釈」と「型推論」
```
Type Annotation  

let hasValue: bool = true;  ⇔　let hasValue= true;　

基本は型推論を使う
```
## 16\. オブジェクトに型推論
```
const person: {
	name:string;
	age: number;
} = {
	name:  'Jack'.
	age: 20
}

const person: object = {
	name:string;
	age: number;
}　や
const person: {} = {
	name:string;
	age: number;
}　
はOKでありだが、
console.log(person.name) はエラー

```
## 17\. 配列 
```
const fruits: string[] = ['Apple', 'Banana', 'Grape']
const fruit = fruit[0]
fruit.toUpperCase()
```
## 18\. Tuple型を使って決まった内容の配列を作る
```
const book: [string, number, boolean] = ['business', 150, false]
book[1] = 700
book.push(21)  ←push はOK
しかし　book[3] はエラーになる
```
## 19\. Enum を使って列挙型
```
Const CoffeeSize = {
	SHORT: 'SHORT',
	TALL:  'TALL',
	GRANDE: 'GRANDE',
	VENTI: 'VENTI'
}

↑のCONSTでは別のサイズを追加できてしまう
ENUMにすると４種類しか選べない

const coffee = {
	hot: true,
	size: CoffeeSize.TALL
}

ENUM CoffeeSize = {
	SHORT,
	TALL,
	GRANDE,
	VENTI
}

SHORT は0がはいる
```
## 20\. any型
```
banana = anything
```
## 21\. union型
```
let unionType: number | string = 10;
let unionTypes: (numbebr | string )[] = [21, 'hello']
```
## 22\. Literal型
```
const apple: 'apple' = 'hello'   エラー　'apple'しか代入できない
const を使うとLiteral型になる
union型と組み合わせると、
let clothes : 'small'  | 'medium' | 'large' = 'large'
```
## 23 Typeエイリアス
```
複雑な型を変数のように扱う
JSに変換すると型は消える
type ClothSize = 'small'  | 'medium' | 'large' 

const cloth: {
	color: string;
	size: ClothSize
} = {
	color: 'white',
	size: 'medium'
}
```
## 24  関数に型をつける方法
```
引数と戻り値に型をつける
戻り値の型は引数の後につける。型推論できるときは省略できる
function add(num1: number, num2: number) : number{
	return num1 + num2
}
add(1, 2)
```
## 25 関数の戻り値にvoid 型を使う方法
```
undefinedは返さない
function sayHello() : void {
	console.log('Hello')
}
returnがあるとundefinedでもOK
function sayHello() : undefined {
	console.log('Hello')
	return;
}
```
## 26 undefined型とnull型の補足
```
let tmp: undefined;
let tmpNull: null = undefined;
```
## 27 関数型
```
特定の関数を代入できる変数を作成する
function add(num1: number, num2: number) : number{
	return num1 + num2
}

const anotherAdd: (n1: number, n2: number) => number = add;
以下でもOK
const anotherAdd: (n1: number, n2: number) => number = function add(num1, num2) {
	return num1 + num2
};
型の情報は左辺のみまたは右辺のみでもよい

アロー関数のとき
const doubleNumber = (number: number): number => number * 2;
または
const doubleNumber: (number: number) => number = num => num * 2;
```
## 28 コールバックの関数型
```
function doubleAndHandle(num: number, cb: (num: number) => number): void {
	const doubleNum = cb(num * 2)
	console.log(num * 2);
}
doubleAndHandle(21, doubleNum => {
	return doubleNum
});
```
## 29 unknown型　any型より少し厳しい
```
let  unknownInput: unknown;
let anyInput: any;
let text: string;

unknownInput = 'hello'   // OK
unknownInput = 21     // OK
unknownInput = true    // OK
text = unknownInput    // エラー
text = anyInput  // OK
if (typeof unknownInput === 'string') {
	text = unknownInput;  // OK
}
```
## 30 never 型　起こりえない型を使用する
```
決して何も返さない
function error(message: string) : never {
	throw new Error(mesage);
}
console.log(error('This is an error'));
version3からneverができた それ以前のバージョンではvoid型になる
```
~~~

~~~
# クラス
### 48
~~~
>tsc
>node dist/class.js
~~~
クラスはES６から
~~~
class Person {
	name: string;
	constructor(initName: string) {　  // コンストラクタ
		this.name = initName;
	}
	
	greeting() {
		console.log('Hello! My name is ${this.name}')
	}
}
const quill = new Person('Quill')
console.log(quill);
quill.greeting();
~~~

#### 49 クラスのメソッドを追加する方法 / Thisの使い方
tsc -w
~~~
quill.greeting();
const anotherQuill = {
	anotherGreeting: quill.greeting
}
anotherQuill.anotherGreeting();
~~~
~~~
修正のメソッド(Typescriptのみ)
	greeting(this: {name: string}) {  //
		console.log('Hello! My name is ${this.name}')
	}
	const anotherQuill = {
	name: 'anotherQuill'
	anotherGreeting: quill.greeting
}
anotherQuill.anotherGreeting();
~~~

## 50 クラスを型として使う方法
~~~
クラスは型になる
	greeting(this: Person) {
		console.log('Hello! My name is ${this.name}')
	}
~~~
## 51 public 修飾子とprivate修飾子
~~~
	class Person {
	name: string;　　// デフォルトでpublic
	private age: number;
	constructor(initName:string, initAge: number) {　 
		this.name = initName;
		this.age = initAge;		
	}
	
	incrementAge() {
		this.age +=1
	}
	greeting(this: Person) {
		console.log('Hello! My name is ${this.name}. I am &{this.age} years old.')
	}

let person2: Person;
const quill = new Person('Quill', 38);
quill.incrementAge();
quill.age = 41 // エラー　privateにしているから
quill.greeting();
publicやprivateはTypescriptにあるがJavascriptにはない（今後できる予定）
~~~
## 52　初期化の処理を省略する方法
~~~
public とprivateをつけるだけで初期化できる
class Person {
	constructor(public name: string, private age: number ) {　
	}    // コンストラクタ
~~~
## 53 readonly修飾子
~~~
class Person {
	constructor(public name: string, private readonly age: number ) {　
	}    // コンストラクタ
	
readonlyはクラスの中も外も値を代入できない
コンストラクタ内なら代入できる
~~~
## 54継承 extends
~~~
class Teacher extends Person {
	constructor(name: string,  age: number, public subject: string) {
		super(name, age);   <=コンストラクタ関数のことを言っている
	}
	greeting() {
		console.log(`Hello My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`)
	}
}
const teacher = new Teacher('Bob', 38,  'Math');
teacher.greeting();
~~~
## 55 protected 修飾子を利用して継承先までアクセスできる範囲を広げる方法
~~~
Personクラスのageはprivateなので、継承先からはアクセスできない。コンストラクタからのみ
⇓
protectedにすると継承先からアクセスできる
~~~
## 56 ゲッターとセッター
~~~
class Teacher extends Person {
	get subject() {    // ゲッター
		if (!this._subject_) {
			throw new Error('There is no subject')
		}
		return this._subject_
	}
	
	set subject(value) {  // セッター　
		if (!value) {　　　// 名前が同じときは型も同じになる
			throw new Error('There is no subject')
		}
		this._subject = value
	}
	
	constructor(name: string,  age: number, private _subject: string) {
		super(name, age);   <=コンストラクタ関数のことを言っている
	}
	greeting() {
		console.log(`Hello My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`)
	}
}
const teacher = new Teacher('Bob', 38,  'Math');
console.log(teacher.subject)   // Math　// ゲッター
teacher.subject = 'Music'  // セッター
console.log(teacher.subject)   // Music
teacher.greeting();
~~~
## 57  staticを利用してインスタンスを作らずにクラスを使う方法
~~~
Math.random()
ES6特有のもの
	class Person {
	static species = 'Home sapiens';
	static isAdult {age: number} {
		if (age > 17) return true;
		return false;
	}
	constructor(readonly name: string, protected age: number) {
	}
	incrementAge() {
		Person.species // static はインスタンスを作らないのでThisが使えない
		this.age +=1
	}
	greeting(this: Person) {
		console.log('Hello! My name is ${this.name}. I am &{this.age} years old.')
	}
	
console.log(Person.speicies); // Homo Sapience
console.log(Person.isAdult(38)); // True
console.log(Teacher.speicies); // Homo Sapience  継承先
console.log(Teacher.isAdult(38)); // True
~~~
## 58  Abstract
Abstractクラスはインスタンスを生成できない  
継承するときのみに使われるから
~~~
abstract class Person {   //
static species = 'Home sapiens';
static isAdult {age: number} {
	if (age > 17) return true;
	return false;
}
constructor(readonly name: string, protected age: number) {
}
greeting(this: Person) {
	console.log('Hello! My name is ${this.name}. I am &{this.age} years old.');
	this.explainJob();	
}
abstract explainJob(): void;  //
~~~
~~~
class Teacher extends Person {
	explainJob() {
	console.log(`I am a teacher and I teach ${this.subject}.`)
}
~~~
## 59 private をconstructorにつけてシングルトンパターンを実装する
クラスからインスタンスを１つしかつくらない
~~~
class Teacher extends Person {
	private static instance: Teacher; //
	
	get subject() {    // ゲッター
		if (!this._subject_) {
			throw new Error('There is no subject')
		}
		return this._subject_
	}
	
	set subject(value) {  // セッター　
		if (!value) {　　　// 名前が同じときは型も同じになる
			throw new Error('There is no subject')
		}
		this._subject = value
	}
	
	private constructor(name: string,  age: number, private _subject: string) {
		super(name, age);   <=コンストラクタ関数のことを言っている
	}
	static getInstance() {
		if (Teacher.instance) return Teacher.instance;
		Teacher.instance = new Teacher('Quill', 38, 'Math')
		return Teacher.instance;
	}

}
~~~
外部でnewを使ってインスタンスがつくれない  
const teacher = Teacher.getInstance();  
teacher.greeting();  

## インターフェース
#### 61 typeエイリアスのオブジェクトバージョン
~~~
type ClothSize = 'small'  | 'medium' | 'large' 

const cloth: {
	color: string;
	size: ClothSize
} = {
	color: 'white',
	size: 'medium'
}
Typeの例２
type Human = {
name: string;
age: number;
}

const human: Human = {
name: "Bob",
age: 30
}
let developer: Human

interface Human = {
name: string;
age: number;
}
~~~

#### 63 メソッドをオブジェクトの型に指定する方法
~~~
interface Human = {
	name: string;
	age: number;
	greeting: (message: string)=> void;  //
}

const human: Human = {
	name: "Bob",
	age: 30,
	greeting(message: string) {
		console.log(message);
	}
}
interface Human = {
	name: string;
	age: number;
	greeting(message: string):void;  //
}

const human: Human = {
	name: "Bob",
	age: 30,
	greeting(message: string) {
		console.log(message);
	}
}
ES5の書き方
greeting: function (message: string) {
console.log(message)
}
~~~
#### 64 implements を使ってクラスに対してinterfaceの条件を適用させる
~~~
interface Human = {
	name: string;
	age: number;
	greeting(message: string):void;  //
}

class Developer implements Human {
	constructor(public name: string, public age: number, public experience: number)
	greeting(message: string) {
		console.log('Hello')
 }
}


~~~

~~~

~~~

~~~

~~~

~~~