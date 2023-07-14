---
title: "Python Algorithm -1-"
date: "June 14, 2023"
excerpt: "Pythonでアルゴリズムを学習します。"
cover_image: "/images/posts/img1.jpg"
category: "Python"
author: "Toku"
author_image: "https://randomuser.me/api/portraits/men/11.jpg"
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->

### Linked List

```python
class Node:
  def __init__(self, data, next_node=None):
    self.data = data
    self.next = next_node
    

class LinkedList:
  def __init__(self, head=None) -> None:
    self.head = head
    
  def append(self, data):
    new_node = Node(data)
    if self.head is None:
      self.head = new_node
      return
    
    last_node = self.head
    while last_node.next:
      last_node = last_node.next
    last_node.next = new_node
    
  def insert(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
    
  def print(self) -> None:
    current_node = self.head
    while current_node:
      print(current_node.data)
      current_node = current_node.next
      
  def remove(self, data) -> None:
    import gc
    current_node = self.head
    if current_node and current_node.data == data:
      self.head = current_node.next
      # current_node = None
      gc.collect()
      return
    
    previous_node = None
    while current_node and current_node.data != data:
      previous_node = current_node
      current_node  = current_node.next
    
    if current_node is None:
      return
    
    previous_node.next = current_node.next
    current_node = None
  
      
if __name__ == '__main__':
  l = LinkedList()
  l.append(1)
  l.append(2)
  l.append(3)
  l.insert(0)
  # l.print()
  l.remove(2)
  l.print()
  # print(l.head.data)
  # print(l.head.next.data)
  # print(l.head.next.next.data)
```
Python Tutorials:Singly Linked List  
https://www.youtube.com/watch?v=xRTdfZsAz6Y&t=666s
```python
class Node:
  def __init__(self, data):
    self.data = data
    self.ref = None
    
# node1 = Node(10)
# print(node1)

class LinkedList:
  def __init__(self):
    self.head = None
    
  def print_LL(self):
    if self.head == None:
      print('linked list is empty!')
    else:
      n = self.head
      while n is not None:
        print(n.data)
        n = n.ref
        
LL1 = LinkedList()
LL1.print_LL() // linked list is empty!
```
Inserting/Adding Elements At The Beginning Of The Linked List  
https://www.youtube.com/watch?v=B-zO18TJKYQ&t=70s
```python
  def add_begin(self ,data):
    new_node = Node(data)
    new_node.ref = self.head
    self.head = new_node
        
LL1 = LinkedList()
LL1.add_begin(10)
LL1.add_begin(20)
LL1.print_LL()
```
双方向リンクリスト
```python
from __future__ import annotations
from typing import Any, Optional

class Node(object):
  def __init__(self, data: Any, next_node: Node= None, prev_node: Node= None) -> None:
    self.data = data
    self.next = next_node
    self.prev = prev_node
    
class DoublyLInkedList(object):
  def __init__(self, head: Node = None) -> None:
    self.head = head
    
  def append(self, data:Any) -> None:
    new_node = Node(data)
    if self.head is None:
      self.head = new_node
      return
    
    current_node = self.head
    while current_node.next:
      current_node = current_node.next
    current_node.next = new_node
    new_node.prev = current_node
    
  def insert(self, data: Any) -> None:
    new_node = Node(data)
    if self.head is None:
      self.head = new_node
      return
    
    self.head.prev = new_node
    new_node.next = self.head
    self.head = new_node
    
  def print(self) -> None:
    current_node = self.head
    while current_node:
      print(current_node.data)
      current_node = current_node.next
      
      
  def remove(self, data: Any) -> Node:
    current_node = self.head
    if current_node and current_node.data == data:
      if current_node.next is None:
        current_node = None
        self.head = None
        return
      else:
        next_node = current_node.next
        next_node.prev = None
        current_node = None
        self.head = next_node
        return
      
    while current_node and current_node.data != data:
      current_node = current_node.next
      
    if current_node is None:
      return  # 一致するデータがなかった時
    
    if current_node.next is None:  #最後尾のNode
      prev = current_node.prev
      prev.next = None
      current_node = None
      return
    else:
      next_node = current_node.next  # 中間にあるNode
      prev_node = current_node.prev
      prev_node.next = next_node
      next_node.prev = prev_node
      current_node = None
      return
      

if __name__ == '__main__':
  d = DoublyLInkedList()
  d.append(0)
  d.append(1)
  d.append(2)
  d.append(3)
  d.print()
  print("########")
  d.remove(2)
  d.print()
  # print(d.head.data)
  # print(d.head.next.data)
  # print(d.head.next.next.data)
  # print(d.head.next.next.next.data)
  # print(d.head.next.next.prev.prev.data)
```
双方向リンクリストを逆方向に並び変える
```python
  def reverse_iterative(self) ->None:
    previous_node = None
    current_node = self.head
    while current_node:
      previous_node = current_node.prev
      current_node.prev = current_node.next
      current_node.next = previous_node
      
      # 次のカレントノードに移る
      current_node = current_node.prev
    
    if previous_node:
      self.head = previous_node.prev
      
  def reverse_recursive(self) -> None:
    def _reverse_recursive(current_node: Node) -> Optional[Node]:
      if not current_node:
        return Node
      
      previous_node = current_node.prev
      current_node.prev = current_node.next
      current_node.next = previous_node
      
      if current_node.prev is None:
        return current_node
      
      return _reverse_recursive(current_node.prev)
    
    self.head = _reverse_recursive(self.head)

if __name__ == '__main__':
  d = DoublyLInkedList()
  d.append(0)
  d.append(1)
  d.append(2)
  d.append(3)
  d.print()
  print("########")
  # d.remove(2)
  d.reverse_iterative()
  d.print()
  print("########")
  d.reverse_recursive()
  d.print()
```
ソートして並び替える
```python
  def sort(self)-> None:
    if self.head is None:
      return
    
    current_node = self.head
    # 1, 5, 2, 9
    while current_node.next:
      # print(current_node.data)
      next_node = current_node.next
      while next_node:
        if current_node.data > next_node.data:
          current_node.data, next_node.data = next_node.data, current_node.data
        next_node = next_node.next
      
      current_node = current_node.next

if __name__ == '__main__':
  d = DoublyLInkedList()
  d.append(1)
  d.append(5)
  d.append(2)
  d.append(9)
  d.print()
  print("######## Sort")
  d.sort()
  d.print()
```
### ハッシュテーブル
```python
import hashlib

class HashTable(object):
  
  def __init__(self, size = 10) -> None:
    self.size = size
    self.table = [ [] for _ in range(self.size)]  #[[], [], [], [], []]
    
  def hash(self, key) -> int:
    return int(hashlib.md5(key.encode()).hexdigest(), base=16) % self.size
    
if __name__ == '__main__':
  hash_table = HashTable()
  print(hash_table.table)
  print(hash_table.hash('car'))
```
user@mbp hash_table % python main.py
[[], [], [], [], [], [], [], [], [], []]  
user@mbp hash_table % python  
Python 3.10.3 (main, Apr 23 2022, 13:42:19) [Clang 13.1.6 (clang-1316.0.21.2)] on darwin  
Type "help", "copyright", "credits" or "license" for more information.  
```python
>>> import hashlib
>>> hashlib.md5('car')
Traceback (most recent call last):  
  File "<stdin>", line 1, in <module>  
TypeError: Strings must be encoded before hashing  
>>> hashlib.md5('car'.encode())
<md5 _hashlib.HASH object @ 0x102bd05d0>
>>> hashlib.md5('car'.encode()).hexdigest()
'e6d96502596d7e7887b76646c5f615d9'
>>> int(hashlib.md5('car'.encode()).hexdigest())
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: 'e6d96502596d7e7887b76646c5f615d9'
>>> int(hashlib.md5('car'.encode()).hexdigest(), base=16)
306851216158335538240511469114392712665
```
carやPCなどある文字列を入力するとそれぞれ必ず同じ数列が戻ってくる  
Pythonのforループでは、elseブロックを使用することができます。elseブロックは、forループが終了した後に実行されるコードブロックです。forループが正常に終了した場合にのみ実行され、breakステートメントによってループが中断された場合は実行されません。
```python
fruits = ['apple', 'banana', 'orange']

for fruit in fruits:
    if fruit == 'banana':
        print("I found the banana!")
        break
else:
    print("The banana is not in the list.")
```

```python
import hashlib

class HashTable(object):
  
  def __init__(self, size = 10) -> None:
    self.size = size
    self.table = [ [] for _ in range(self.size)]  #[[], [], [], [], []]
    
  def hash(self, key) -> int:
    return int(hashlib.md5(key.encode()).hexdigest(), base=16) % self.size
  
  def add(self, key, value) -> None:
    index = self.hash(key)
    for data in self.table[index]:
      if data[0] == key:
        data[1] = value
        break
    else:
      self.table[index].append([key, value])
    
if __name__ == '__main__':
  hash_table = HashTable()
  # print(hash_table.table)
  # print(hash_table.hash('car'))
  hash_table.add('car', 'Tesla')
  hash_table.add('car', 'Toyota')
  print(hash_table.table) # [[], [], [], [], [], [['car', 'Toyota']], [], [], [], []]
```
from typing import Anyは、PythonのtypingモジュールからAnyという型ヒントをインポートしていることを示します。  
Anyは、Pythonの型ヒントの一つで、あらゆる型を表す特殊な型です。つまり、変数や関数の引数、戻り値などに対して「どんな型でも良い」という意味を持ちます。具体的な型を指定せずに柔軟性を持たせたい場合に使用されます。
例えば、以下のように関数の引数にAnyを指定することで、どんな型の引数でも受け入れることができます。
```python
def print_value(value: Any) -> None:
    print(value)
```
Getメソッドの作成
```python
  from typing import Any
  def get(self, key) -> Any:
    index = self.hash(key)
    for data in self.table[index]:
      if data[0] == key:
        return data[1]

 print(hash_table.get('car')) # Toyota
```

```python
import hashlib

class HashTable(object):
  
  def __init__(self, size = 10) -> None:
    self.size = size
    self.table = [ [] for _ in range(self.size)]  #[[], [], [], [], []]
    
  def hash(self, key) -> int:
    return int(hashlib.md5(key.encode()).hexdigest(), base=16) % self.size
  
  def add(self, key, value) -> None:
    index = self.hash(key)
    for data in self.table[index]:
      if data[0] == key:
        data[1] = value
        break
    else:
      self.table[index].append([key, value])
      
  def print(self) -> None:
    for index in range(self.size):
      print(index, end=' ')  # 改行されなくなる
      for data in self.table[index]:
        print("===>", end=' ')
        print(data, end=' ')
      print()
      
      
  from typing import Any
  def get(self, key) -> Any:
    index = self.hash(key)
    for data in self.table[index]:
      if data[0] == key:
        return data[1]
      
   # hash_table['car'] = 'Tesla' という形式で設定できる
  def __setitem__(self, key, value) -> None:
    self.add(key, value)
    
  # hash_table['sns'] という形式で取得できる
  def __getitem__(self, key):
    return self.get(key)
    
    
if __name__ == '__main__':
  hash_table = HashTable()
  # print(hash_table.table)
  # print(hash_table.hash('car'))
  hash_table['car'] = 'Tesla'
  hash_table.add('car', 'Toyota')
  hash_table.add('pc', 'Mac')
  hash_table.add('sns', 'Youtube')
  # print(hash_table.table)
  hash_table.print()
  print(hash_table.get('car'))
  print(hash_table['sns'])
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
