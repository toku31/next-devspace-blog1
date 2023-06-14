---
title: "Python Tutorial -2-"
date: "April 2, 2023"
excerpt: "Pythonの基礎を学習します。今回は２回目です"
cover_image: "/images/posts/img1.jpg"
category: "Python"
author: "Toku"
author_image: "https://randomuser.me/api/portraits/men/11.jpg"
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

### Python 標準ライブラリ  
https://docs.python.org/ja/3/library/index.html  
Pythonの組み込み関数  
https://docs.python.org/ja/3/library/functions.html  

```python
A
abs()
aiter()
all()
any()
anext()
ascii()

B
bin()
bool()
breakpoint()
bytearray()
bytes()

C
callable()
chr()
classmethod()
compile()
complex()

D
delattr()
dict()
dir()
divmod()

E
enumerate()
eval()
exec()

F
filter()
float()
format()
frozenset()

G
getattr()
globals()

H
hasattr()
hash()
help()
hex()

I
id()
input()
int()
isinstance()
issubclass()
iter()
L
len()
list()
locals()

M
map()
max()
memoryview()
min()

N
next()

O
object()
oct()
open()
ord()

P
pow()
print()
property()

R
range()
repr()
reversed()
round()

S
set()
setattr()
slice()
sorted()
staticmethod()
str()
sum()
super()

T
tuple()
type()

V
vars()

Z
zip()

_
__import__()
```
### Sortedメソッド
sorted()関数は、イテラブル（リストやタプルなど）の要素をソートした新しいリストを返す関数です。また、リストオブジェクトのsort()メソッドは、元のリスト自体をソートします。
```python
sorted(iterable, key=None, reverse=False)
```
iterable: ソートする要素のイテラブル（リスト、タプル、セットなど）  
key（オプション）: ソートの基準となる関数を指定します。デフォルトはNoneで、要素自体を比較します。keyには関数名やラムダ式を渡すことができます。  
reverse（オプション）: ソート順を逆順にするかどうかを指定します。デフォルトはFalseで昇順です。
```python
numbers = [4, 2, 1, 3]
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # 出力: [1, 2, 3, 4]

fruits = ['apple', 'orange', 'banana']
sorted_fruits = sorted(fruits, key=len)
print(sorted_fruits)  # 出力: ['apple', 'banana', 'orange']

students = [('Alice', 25), ('Bob', 19), ('Charlie', 22)]
sorted_students = sorted(students, key=lambda x: x[1], reverse=True)
print(sorted_students)  # 出力: [('Alice', 25), ('Charlie', 22), ('Bob', 19)]
```
sorted_data = sorted(data.items(), key=data.get, reverse=True)  
としても問題ありません。このコードは、data辞書の値を基準に降順でソートするための別の方法です。key=data.getを指定することで、sorted()関数は各要素に対してdata.getメソッドを適用し、その戻り値を基準にソートします。
```python
import collections

data = collections.defaultdict(int)
data['apple'] = 3
data['banana'] = 2
data['orange'] = 5

# 値で降順にソートされたリストを取得する
sorted_data = sorted(data.items(), key=data.get, reverse=True)

print(sorted_data)
# 出力: [('orange', 5), ('apple', 3), ('banana', 2)]
sorted_data = sorted(data, key=data.get, reverse=True)
print(sorted_data)
# 出力: ['orange', 'apple', 'banana']
```
```python

```

```python

```

```python

```
