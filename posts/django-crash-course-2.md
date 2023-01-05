---
title: 'Django Crash Course-2'
date: 'December 19, 2022'
excerpt: 'PythonのフレームワークであるDjangoの基本を学んでいきます。2回目はログイン要求機能から見ていきます'
cover_image: '/images/posts/img3.jpg'
category: 'Python'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/12.jpg'
---
<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
参考：**Udemy**の  [Django 3.0 MasterClass - Learn How To Create Django Apps](https://www.udemy.com/course/django-30-masterclass-learn-how-to-create-django-apps/)  
**Django Girls のチュートリアル**:https://tutorial.djangogirls.org/ja/django_installation/
```python
user@mbp Django-tutorial-blog % source venv/bin/activate
(venv) user@mbp Django-tutorial-blog % python manage.py runserver
```
### ログイン要求機能（Login Required FUnction)
```
(venv) user@mbp Django-tutorial-blog % pip freeze
asgiref==3.5.2
Django==4.1.4
Pillow==9.3.0
sqlparse==0.4.3
```
ログインしていない人がCreateページに遷移できないようにする=>login_requiredデコレータを使う
```python
# posts/views.py
from django.contrib.auth.decorators import login_required # added

@login_required(login_url='/')  # added
def create_view(request):
  form = PostForm(request.POST or None, request.FILES or None)
  
  if form.is_valid():
    post = form.save()
    return HttpResponseRedirect(post.get_absolute_url())
    
  context = {
    'form': form
  }
  return render (request, 'posts/create.html', context)
```
表示するブログをIDの降順にして最新のものを先頭にする  
.order_by('-id')をつける(マイナスをつけることで降順になる)
```python
# posts/views.py
def index(request):
  context = {
    'posts': Post.objects.all().order_by('-id') # Changed
  }
  return render(request, 'posts/index.html', context)
```
Navbarの’Home'をクリックするとHomeページに行くようにする  
```python
# templates/base.html
<li class="nav-item">
  <a class="nav-link active" aria-current="page" href="{% url 'index' %}">Home</a>
</li>
```
Disableのところにログインした人の名前を表示させる
```python
# templates/base.html
<li class="nav-item">
  {% if user.is_authenticated %}
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">{{user.username}}</a>
  {% endif %}
</li>
```

### Postを削除する
```python
# posts.views.py
from django.shortcuts import render, get_object_or_404, HttpResponseRedirect, redirect # redirect added
from django.contrib.auth.decorators import login_required

@login_required(login_url='/')
def delete_view(request, id):
  post = get_object_or_404(Post, id=id)
  post.delete()
  return redirect('/')
```
blog/urls.pyにDelete用のpathを追加する
```python
# blog/urls.py
from django.urls import path
# from posts.views import index
from posts.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="index"),
    path('detail/<int:id>', detail_view, name="detail"),
    path('delete/<int:id>', delete_view, name="delete"),  # added
    path('create/', create_view, name="create")
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
詳細ページのdetail.htmlに削除ボタンを追加する
```python
# templates/posts/detail.html
{% extends 'base.html' %}

{% block body %}
  <div class="container" style="padding-top:45px; padding-bottom:45px">
    <h3>詳細ページ</h3>
        <div class="card" style="width: 48rem; margin-bottom:30px">
          <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
              <small>{{ post.date }}</small>
            <p class="card-text">{{ post.content}}</p>
            <a href="{% url 'index' %}" class="btn btn-primary">戻る</a>
            <a href="{% url 'delete' post.id %}" class="btn btn-danger">削除</a> # added

            # <a href="http://www.google.co.jp/" onclick="return confirm('外部のページへ移動します。よろしいですか？')">リンクをクリックして下さい。</a> 

          </div>
        </div>
  </div>
{% endblock %}
```
上の削除ボタンに削除確認メッセージを追加する
```html
 <!-- templates/posts/detail.html -->
  <a href="{% url 'delete' post.id %}" class="btn btn-danger" 
  onclick="return confirm('削除してもいいですか？')">削除</a>
```

```js
// static/js/jquery-3.6.3.min.jsの末尾に以下を追加する
$(document).on('click', 'btn btn-danger', function(){
  return confirm('削除してもいいですか？');
})
```
### Postをアップデートする
```python
# posts/views.py
@login_required(login_url='/')
def update_view(request, id):
  post = get_object_or_404(Post, id=id)
  form = PostForm(request.POST or None, request.FILES or None, instance=post)
  if form.is_valid():
    post = form.save()
    return HttpResponseRedirect(post.get_absolute_url())
  context = {
    'form': form
  }
  return render (request, 'posts/create.html', context)
```
blog/urls.pyにUpdate用のpathを追加する
```python
# blog/urls.py
from django.contrib import admin
from django.urls import path
from posts.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="index"),
    path('detail/<int:id>', detail_view, name="detail"),
    path('delete/<int:id>', delete_view, name="delete"),
    path('update/<int:id>', update_view, name="update"), # added
    path('create/', create_view, name="create")
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
詳細ページに更新ボタンを追加する
```python
{% extends 'base.html' %}

{% block body %}
  <div class="container" style="padding-top:45px; padding-bottom:45px;">
    <a href="{% url 'index' %}" style="text-decoration:none; color:green; font-size: 18px;" >戻る</a>
    <h3>詳細ページ</h3>
        <div class="card" style="width: 48rem; margin-bottom:30px">
          <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
              <small>{{ post.date }}</small>
            <p class="card-text">{{ post.content}}</p>
            <a href="{% url 'delete' post.id %}" class="btn btn-danger" onclick="return confirm('削除してもいいですか？')">削除</a>
            <a href="{% url 'update' post.id %}" class="btn btn-primary">更新</a> # updated
          </div>
        </div>
  </div>
{% endblock %}
```
#### ページネーションを作る
```python
# posts/views.py
from django.core.paginator import Paginator # added

def index(request):
  post_list = Post.objects.all().order_by('-id')
  paginator = Paginator(post_list, 3)
  page = request.GET.get('page')
  post_list = paginator.get_page(page)
  
  context = {
    'posts': post_list
  }
  return render(request, 'posts/index.html', context)
```
参考：https://docs.djangoproject.com/en/4.1/topics/pagination/
```python
# サンプル
<div class="pagination">
    <span class="step-links">
        {% if page_obj.has_previous %}
            <a href="?page=1">&laquo; first</a>
            <a href="?page={{ page_obj.previous_page_number }}">previous</a>
        {% endif %}

        <span class="current">
            Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}.
        </span>

        {% if page_obj.has_next %}
            <a href="?page={{ page_obj.next_page_number }}">next</a>
            <a href="?page={{ page_obj.paginator.num_pages }}">last &raquo;</a>
        {% endif %}
    </span>
</div>
```
index.htmlの最後に以下のページネーションを追加する
```python
# templates/posts/index.html
<div class="container">
  <div class="pagination">
    <span class="step-links">
        {% if posts.has_previous %}
            <a href="?page=1">&laquo; first</a>
            <a href="?page={{ posts.previous_page_number }}">previous</a>
        {% endif %}

        <span class="current">
            Page {{ posts.number }} of {{ posts.paginator.num_pages }}.
        </span>

        {% if posts.has_next %}
            <a href="?page={{ posts.next_page_number }}">next</a>
            <a href="?page={{ posts.paginator.num_pages }}">last &raquo;</a>
        {% endif %}
    </span>
  </div>
</div>
```
### サーチ機能
サーチのフォームにmethod="get"とname = "q" を追加する  
ボックスに'test'と入力してクリックするとURLがhttp://localhost:8000/?q=test となる  
```python
# templates/base.html
from django.db.models import Q  # added

  <form class="d-flex" method="get">
    <input class="form-control me-2" type="search" name = "q" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
```
icontainsと先頭にiをつけるとinsensitiveになりケースを気にしなくなる  
Qオブジェクトは、モデルのデータの中からor検索をする時に使われる
```python
# posts/views.py
def index(request):
  post_list = Post.objects.all().order_by('-id')
  query = request.GET.get('q')
  if query:
    post_list = post_list.filter(Q(title__icontains=query) | Q(content__icontains=query))
  
  paginator = Paginator(post_list, 2)
  page = request.GET.get('page')
  post_list = paginator.get_page(page)
  
  context = {
    'posts': post_list
  }
  return render(request, 'posts/index.html', context)
```
サーチ結果の出力も正しくページネーションさせる方法は  
{% if request.GET.q %}&q={{ request.GET.q }}{% endif %}を追加する  
URLは　http://localhost:8000/?page=2&q=text　のような形になる
```python
# templates/posts/index.html
<div class="container">
  <div class="pagination">
    <span class="step-links">
        {% if posts.has_previous %}
            <a href="?page=1{% if request.GET.q %}&q={{ request.GET.q }}{% endif %}">&laquo; first</a>
            <a href="?page={{ posts.previous_page_number }}{% if request.GET.q %}&q={{ request.GET.q }}{% endif %}">previous</a>
        {% endif %}

        <span class="current">
            Page {{ posts.number }} of {{ posts.paginator.num_pages }}.
        </span>

        {% if posts.has_next %}
            <a href="?page={{ posts.next_page_number }}{% if request.GET.q %}&q={{ request.GET.q }}{% endif %}">next</a>
            <a href="?page={{ posts.paginator.num_pages }}{% if request.GET.q %}&q={{ request.GET.q }}{% endif %}">last &raquo;</a>
        {% endif %}
    </span>
  </div>
</div>
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






