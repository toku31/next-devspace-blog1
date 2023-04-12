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

#### Operators

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

```python

```

```python

```
