---
title: "Python Tutorial -1-"
date: "April 1, 2023"
excerpt: "Pythonの基礎を学習します"
cover_image: "/images/posts/img1.jpg"
category: "Python"
author: "Toku"
author_image: "https://randomuser.me/api/portraits/men/11.jpg"
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

### Python & VSCode

https://www.youtube.com/watch?v=6i3e-j3wSf0&t=309s  
https://github.com/gitdagray/python-course  
Dev/python/python-basic/lesson01  
Control+Shift+P=>Python:Select Interpreter

```python
user@mbp python-basic % python3 --version
Python 3.10.3
```

windows は py -3 --version  
REPEL = Read-Evaluate-Print-Loop

```python
user@mbp python-basic % python
Python 3.10.3 (main, Apr 23 2022, 13:42:19) [Clang 13.1.6 (clang-1316.0.21.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 2+2
4
>>> name='Dave'
>>> name
'Dave'
>>> quit()
user@mbp python-basic %
```

Control + N で新しいファイルが出てくる

```python
greeting = 'Hello World'
print(greeting)
```

```python
user@mbp Lesson01 % python3 Hello.py
Hello World
```

ファイルを右クリック=＞ターミナルで python ファイルを実行する

```python
user@mbp python-basic % python3
Python 3.10.3 (main, Apr 23 2022, 13:42:19) [Clang 13.1.6 (clang-1316.0.21.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> name='Dave'
>>> name
'Dave'
>>> name001 = 'Dave'
>>> name001
'Dave'
>>> _name='Dave'
>>> _name
'Dave'
>>> name!='Dave'
False
>>> name-first='Dave'
  File "<stdin>", line 1
    name-first='Dave'
    ^^^^^^^^^^
SyntaxError: cannot assign to expression here. Maybe you meant '==' instead of '='?
>>> 1name='Dave'
  File "<stdin>", line 1
    1name='Dave'
    ^
SyntaxError: invalid decimal literal
>>> if = 'Dave'  # 予約語
  File "<stdin>", line 1
    if = 'Dave'
       ^
SyntaxError: invalid syntax
>>> for  = 'Dave'
  File "<stdin>", line 1
    for  = 'Dave'
         ^
SyntaxError: invalid syntax
SyntaxError: invalid syntax
>>> 2 + 2  # Expression
4
>>> "Expression"  # Expression
'Expression'
>>> myname = 'Dave'  # Statement
>>> myname
'Dave'
>>> quit()
```

```python
# Lesson02/welcome.py
line01 = "********************"
line02 = "*                  *"
line03 = "*     WELCOME!     *"

print('')
print(line01)
print(line02)
print(line03)
print(line02)
print(line01)
```

user@mbp Lesson02 % python welcome.py  
Control + , =>　設定画面　=> format on save => Editor ›  
Format On Save
Editor: Format On Save Mode =>file  
python > formatting: => Python › Formatting: Provider
autopep8

# Lesson3 Operators

https://www.youtube.com/watch?v=7BxUaeROVXI

```python
user@mbp Lesson03 % python3
Python 3.10.3 (main, Apr 23 2022, 13:42:19) [Clang 13.1.6 (clang-1316.0.21.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 2 + 2
4
>>> 4 -2
2
>>> 2 * 2
4
>>> 24 / 5
4.8
>>> 24 // 5
4
>>> round(24 / 5)
5
>>> 24 % 5
4
>>> 2 ** 3
8
>>> 2 ** 5
32
>>> meaning = 42
>>> meaning += 1
>>> meaning
43
>>> meaning -= 1
>>> meaning
42
>>> meaning /= 10
>>> meaning
4.2
>>> "Dave " + "Gray"
'Dave Gray'
>>> quit()
```

右にある「・・・」ボタンをクリックするとクリアできる

```python
>>> 42 == 41
False
>>> 42 == 42
True
>>> 42 != 41
True
>>> 10 > 5
True
>>> 10 >= 5
True
>>> 10 <= 10
True
>>> x = True
>>> y = False
>>> z = True
>>> not x
False
>>> not y
True
>>> x and y
False
>>> y and x
False
>>> x or y
True
>>> y or x
True
>>> x and z
True
>>> z and y
False
>>> y or z
True
>>> z or y
True
>>>
```

```python
meaning = 8
print('')

if meaning > 10:
    print('Right on!')
else:
    print('Not today')
```

```python
user@mbp python-basic % cd Lesson03
user@mbp Lesson03 % python3 meaning.py

Not today
```

```python
# Ternary Operator
print('Right on!') if meaning > 10 else print('Not today')
```
【VSCode】Python を 1 行毎に変数の中身見ながらステップ実行する方法 => F10

# Lesson4 Data Types
```python
first = "Dave"
last = "Gray"

print(type(first))  # <class 'str'>
```
実行するときは▷ボタンの右の下矢印をクリックして新しいPythonファイル
```python
first = "Dave"
last = "Gray"

print(type(first))
print(type(first) == str)  # True
print(isinstance(first, str))  # # True
```
### constructor function
```python
# constructor function
pizza = str("Pepperoni")   
print(type(pizza))   # <class 'str'>
print(type(pizza) == str)  # True
print(isinstance(pizza, str))  # True
```
### Concatenation
```python
# Concatenation
fullname = first + " " + last 
print(fullname)  # Dave Gray

fullname += "!"
print(fullname)  Dave Gray!
```
### Casting a number to a string
```python
# Casting a number to a string
decade = str(1980)
print(type(decade))  # <class 'str'>
print(decade)  # 1980

statement = "I like rock music from the " + decade + "s."
print(statement)  # I like rock music from the 1980s.
```
### Multiple lines
```python
multiline = '''
Hey, how are you?                                   
I was just checking in.    
                                All good?
'''
print(multiline)
Hey, how are you?                                   
I was just checking in.    
                                All good?
```
### Escaping special characters
```python
# Escaping special characters
sentence = 'I\'m back at work!\tHey!\n\nWhere\'s this at\\located?'
print(sentence) 
I'm back at work!	Hey!

Where's this at\located?
```
### String Methods
```python
print(first)   # Dave
print(first.lower())  # dave
print(first.upper())  # DAVE
print(first)  # Dave
```
```python
print(multiline.title())
Hey, How Are You?                                   
I Was Just Checking In.    
                                All Good?
```

```python
print(multiline.replace("good", "ok"))
Hey, how are you?                                   
I was just checking in.    
                                All ok?
```
```python           
print(multiline)
Hey, how are you?                                   
I was just checking in.    
                                All good?
```
```python
print(len(multiline))  # 124
multiline += "                                        "
multiline = "                  " + multiline
print(len(multiline))  # 182
```
```python
# 両側のスペースを切りとる
print(len(multiline.strip()))　# 122
# 左側のスペースを切りとる
print(len(multiline.lstrip()))  # 163
# 右側のスペースを切りとる
print(len(multiline.rstrip()))  # 141

print("")
```
### Build a menu
```python
# Build a menu
title = "menu".upper()
print(title.center(20, "="))
print("Coffee".ljust(16, ".") + "$1".rjust(4))
print("Muffin".ljust(16, ".") + "$2".rjust(4))
print("Cheesecake".ljust(16, ".") + "$4".rjust(4))

print("")
========MENU========
Coffee..........  $1
Muffin..........  $2
Cheesecake......  $4
```
### string index values
```python
# string index values
first = "Dave"
print(first[1]) # a
print(first[-1])  # e
print(first[1:-1])  # av
print(first[1:])  # ave
```
### Some methods return boolean data
```python
# Some methods return boolean data
print(first.startswith("D")) # True
print(first.endswith("Z"))  # False
```
### Boolean data type
```python
# Some methods return boolean data
myvalue = True
x = bool(False)
print(type(x))  # <class 'bool'>
print(isinstance(myvalue, bool))  # True
```
### Numeric data types
```python
# integer type
price = 100
best_price = int(80)
print(type(price)) # <class 'int'>
print(isinstance(best_price, int)) # True
```

```python
# float type
gpa = 3.28
y = float(1.14)
print(type(gpa))  <class 'float'>
```

```python
# complex type
comp_value = 5+3j
print(type(comp_value))  # <class 'complex'>
print(comp_value.real)  # 5.0
print(comp_value.imag)  # 3.0
```

```python
# Built-in functions for numbers
print(abs(gpa)) # 3.28
print(abs(gpa * -1))  # 3.28

print(round(gpa)) # 3
print(round(gpa, 1)) #  3.3

import math
print(math.pi)  # 3.141592653589793
print(math.sqrt(64))  # 8.0
print(math.ceil(gpa))  # 4 切り上げ
print(math.floor(gpa))  # 3　　切り捨て
```
### Casting a string to a number
```python
# Casting a string to a number
zipcode = "10001"
zip_value = int(zipcode)
print(type(zip_value))  <class 'int'>
```
### Error if you attempt to cast incorrect data
```python
# Error if you attempt to cast incorrect data
zip_value = int("New York") # ValueError
```
# Lesson5 User Input
Macのパソコンで[optionキー]を押しながら[￥マークのキー]を押すとバックスラッシュが入力: Alt + ¥   
長いテキストのテキストの折り返し=>［Alt］＋［Z］キーを押す（macOSでは［Option］＋［Z］キー）: Ctrl+Z  
実行するときは▷ボタンの右の下矢印をクリックして新しいPythonファイル  
Mac絵文字はControl＋Command＋スペースバーを押す： Ctrl + Win + Space
```
value = input('Please enter a value\n')
print(value)
```
ランダムに要素を一つ選択: random.choice()  
```python
import random

l = [0, 1, 2, 3, 4]
print(random.choice(l))
# 1
```
タプルや文字列でも同様。文字列の場合は一文字が選択される。
```python
print(random.choice(('xxx', 'yyy', 'zzz')))
# yyy

print(random.choice('abcde'))
# b
```
```python
from enum import Enum
class RPS(Enum):
    ROCK = 1
    PAPER = 2
    SCISSORS = 3

print(RPS(2))  # RPS.PAPER
print(RPS.ROCK)  # RPS.ROCK
print(RPS['ROCK'])  # RPS.ROCK
print(RPS.ROCK.value)   # 1
```
```python
import os, sys
print('環境変数')
for k, v in os.environ.items():
    print(f'{k}={v}')

print('引数')
for i in range(len(sys.argv)):
    print(f'{i}={sys.argv[i]}')
```
```python
import sys
import random
from enum import Enum

class RPS(Enum):
    ROCK = 1
    PAPER = 2
    SCISSORS = 3

print("")
playerchoice = input(
    "Enter...\n1 for Rock,\n2 for Paper, or \n3 for Scissors:\n\n")

if not playerchoice.strip().isnumeric():
  sys.exit("You must enter number")

player = int(playerchoice)

if player < 1 | player > 3:
    sys.exit("You must enter 1, 2, or 3.")

computerchoice = random.choice("123")

computer = int(computerchoice)

print("")
print("You chose " + str(RPS(player)).replace('RPS.', '') + ".")
print("Python chose " + str(RPS(computer)).replace('RPS.', '') + ".")
print("")

if player == 1 and computer == 3:
    print("🎉 You win!")
elif player == 2 and computer == 1:
    print("🎉 You win!")
elif player == 3 and computer == 2:
    print("🎉 You win!")
elif player == computer:
    print("😲 Tie game!")
else:
    print("🐍 Python wins!")
```
## Lesson6 List & Tuples
https://www.youtube.com/@DaveGrayTeachesCode/videos  
https://www.youtube.com/watch?v=KWKWswDfAb0  
ターミナルを右に寄せる: 表示=>外観=>パネルの位置=>右
```python
users = ['Dave', 'John', 'Sara']

data = ['Dave', 42, True]

emptylist = []　

print("Dave" in emptylist)  # False

print(users[0])  # Dave
print(users[-2])  # John

print(users.index('Sara')) # 2

print(users[0:2])  # ['Dave', 'John']
print(users[1:])  #  ['John', 'Sara']
print(users[-3:-1])  # ['Dave', 'John']

print(len(data))  # 3

users.append('Elsa') 　# リストの最後に追加
print(users)  # ['Dave', 'John', 'Sara', 'Elsa']

# users += 'Jason' # ['Bob', 'Dave', 'John', 'Sara', 'Elsa', 'J', 'a', 's', 'o', 'n']
users += ['Jason']　# リストの結合
print(users) # ['Dave', 'John', 'Sara', 'Elsa', 'Jason']

users.extend(['Robert', 'Jimmy'])  # リストを追加する
print(users)  # ['Dave', 'John', 'Sara', 'Elsa', 'Jason', 'Robert', 'Jimmy']

# users.extend(data) 
# print(users) # ['Dave', 'John', 'Sara', 'Elsa', 'Jason', 'Robert', 'Jimmy', 'Dave', 42, True]

users.insert(0, 'Bob')  # 挿入
print(users)  # ['Bob', 'Dave', 'John', 'Sara', 'Elsa', 'Jason', 'Robert', 'Jimmy']

users[2:2] = ['Eddie', 'Alex']   # 複数挿入
print(users)　# ['Bob', 'Dave', 'Eddie', 'Alex', 'John', 'Sara', 'Elsa', 'Jason', 'Robert', 'Jimmy']

users[1:3] = ['Robert', 'JPJ']   # Replace
print(users)  # ['Bob', 'Robert', 'JPJ', 'Alex', 'John', 'Sara', 'Elsa', 'Jason', 'Robert', 'Jimmy']

users.remove('Bob')
print(users)  # ['Robert', 'JPJ', 'Alex', 'John', 'Sara', 'Elsa', 'Jason', 'Robert', 'Jimmy']

print(users.pop())  #  Jimmy  最後の要素取り出す
print(users)  # ['Robert', 'JPJ', 'Alex', 'John', 'Sara', 'Elsa', 'Jason', 'Robert']

del users[0]  # 削除
print(users)　# ['JPJ', 'Alex', 'John', 'Sara', 'Elsa', 'Jason', 'Robert']

# del data　　＃　　変数全体要素を削除
data.clear()
print(data)　# []

users[1:2] = ['dave']  # 最初が小文字のものを挿入
users.sort()
print(users)  # ['Elsa', 'JPJ', 'Jason', 'John', 'Robert', 'Sara', 'dave']　＃　小文字は大文字の後にくる

users.sort(key=str.lower)
print(users)　# ['dave', 'Elsa', 'Jason', 'John', 'JPJ', 'Robert', 'Sara']

nums = [4, 42, 78, 1, 5]
nums.reverse()　# 逆順にする
print(nums)　# [5, 1, 78, 42, 4]

# nums.sort(reverse=True)　＃　ソートしたものを逆順にする
# print(nums)　　＃　[78, 42, 5, 4, 1]　　numsが変わる

print(sorted(nums, reverse=True))　# [78, 42, 5, 4, 1]　　Global Sorted Function
print(nums)  # [5, 1, 78, 42, 4]  # numsは変わらない

# コピー
numscopy = nums.copy()
mynums = list(nums)  # constructor
mycopy = nums[:]  # slice all list

print(numscopy)　　# [5, 1, 78, 42, 4]
print(mynums)   # [5, 1, 78, 42, 4]
mycopy.sort()   
print(mycopy)  # [1, 4, 5, 42, 78]
print(nums)  #  [5, 1, 78, 42, 4]

print(type(nums))  # <class 'list'>

mylist = list([1, "Neil", True])  # コンストラクタでリストを作成する
print(mylist) # [1, 'Neil', True]

# Tuples
mytuple = tuple(('Dave', 42, True)) # コンストラクタでタプルを作成する
print(mytuple)　# ('Dave', 42, True)
print(type(mytuple))　# <class 'tuple'>


# タプルは追加や変更ができない
newlist = list(mytuple)　# タプルをリストに変換
newlist.append('Neil')　　
newtuple = tuple(newlist)　# リストをタプルに変換　
print(newtuple)　# 　('Dave', 42, True, 'Neil')

anothertuple = (1, 4, 2, 8, 2, 2)
print(type(anothertuple))　　# <class 'tuple'>
(one, *two, hey) = anothertuple
print(one)　#️　　1
print(two)　#️　　[4, 2, 8, 2]　　リスト
print(hey)　#️　　２
print(anothertuple.count(2))　#️　２が３個ある
```
### Lesson7 Dictionaries & Sets
```python
# Dictionaries
band = {
    "vocals": "Plant",
    "guitar": "Page"
}
# constructor function
band2 = dict(vocals="Plant", guitar="Page") 

print(band)  # {'vocals': 'Plant', 'guitar': 'Page'}
print(band2)  # {'vocals': 'Plant', 'guitar': 'Page'}
print(type(band))　# <class 'dict'>
print(len(band))  # 2

# Access items
print(band["vocals"])  # Plant
print(band.get("guitar")) # Page

# list all keys
print(band.keys())  # dict_keys(['vocals', 'guitar'])

# list all values
print(band.values()) # dict_values(['Plant', 'Page'])

# list of key/value pairs as tuples
print(band.items())  # dict_items([('vocals', 'Plant'), ('guitar', 'Page')])
True

# verify a key exists
print("guitar" in band)
print("triangle" in band)

# Change values
band["vocals"] = "Coverdale"
band.update({"bass": "JPJ"})

print(band)

# Remove items
print(band.pop("bass"))
print(band)

band["drums"] = "Bonham"
print(band)

print(band.popitem())  # tuple
print(band)

# Delete and clear

band["drums"] = "Bonham"
del band["drums"]
print(band)

band2.clear()
print(band2)

del band2

# Copy dictionaries

# band2 = band  # create a reference
# print("Bad copy!")
# print(band2)
# print(band)

# band2["drums"] = "Dave"
# print(band)

band2 = band.copy()
band2["drums"] = "Dave"
print("Good copy!")
print(band)
print(band2)

# or use the dict() constructor function
band3 = dict(band)
print("Good copy!")
print(band3)

# Nested dictionaries

member1 = {
    "name": "Plant",
    "instrument": "vocals"
}
member2 = {
    "name": "Page",
    "instrument": "guitar"
}
band = {
    "member1": member1,
    "member2": member2
}
print(band)
print(band["member1"]["name"])

# Sets

nums = {1, 2, 3, 4}

nums2 = set((1, 2, 3, 4))

print(nums)
print(nums2)
print(type(nums))
print(len(nums))

# No duplicate allowed
nums = {1, 2, 2, 3}
print(nums)

# True is a dupe of 1, False is a dupe of zero
nums = {1, True, 2, False, 3, 4, 0}
print(nums)

# check if a value is in a set
print(2 in nums)

# but you cannot refer to an element in the set with an index position or a key

# Add a new element to a set
nums.add(8)
print(nums)

# Add elements from one set to another
morenums = {5, 6, 7}
nums.update(morenums)
print(nums)

# you can use update with lists, tuples, and dictionaries, too.

# Merge two sets to create a new set
one = {1, 2, 3}
two = {5, 6, 7}

mynewset = one.union(two)
print(mynewset)

# Keep only the duplicates
one = {1, 2, 3}
two = {2, 3, 4}

one.intersection_update(two)
print(one)

# Keep everything except the duplicates
one = {1, 2, 3}
two = {2, 3, 4}

one.symmetric_difference_update(two)
print(one)
```

```python

```

```python

```
```python

```

```python

```

```python

```
