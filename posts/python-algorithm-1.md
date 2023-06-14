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
