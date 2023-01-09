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
```
(venv) user@mbp Django-tutorial-blog % pip freeze
asgiref==3.5.2
Django==4.1.4
Pillow==9.3.0
sqlparse==0.4.3
```
id:user pass: 123
### ログイン要求機能（Login Required FUnction)
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
### Users Appを作成する
```python
(venv) user@mbp Django-tutorial-blog % python manage.py startapp u
sers
```
```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'posts.apps.PostsConfig',
    'users.apps.UsersConfig'  # added
]
```
### ログインフォームを作成する
formで使用するcleaned_dataってなに？  
1forms.pyでフォームを作成  
2フォームにデータを入力  
3入力データをバリデート(validate)する→login_viewでform.is_valid()と書く   
　ここでデータがフォームに適切か判断  
4適切だった場合、cleaned_dataに入る  
```python
# users/forms.py
from django import forms
from django.contrib.auth import authenticate

class LoginForm(forms.Form):
  username = forms.CharField(max_length=100, label='ユーザ名')
  password = forms.CharField(max_length=100, label='パスワード', widget=forms.PasswordInput)
  
  def clean(self):
    username = self.cleaned_data.get('username')
    password = self.cleaned_data.get('password')
  
    if username and password:
      user = authenticate(username=username,password=password)
      
      if not user:
        raise forms.ValidationError("ユーザネームまたはパスワードが不正です")
      return super(LoginForm, self).clean()
```
ログインのview
```python
# users/views.py
from django.shortcuts import render, redirect
from .forms import LoginForm
from django.contrib.auth import authenticate, login

def login_view(request):
  form = LoginForm(request.POST or None)
  if form.is_valid():
    username = form.cleaned_data.get('username')
    password = form.cleaned_data.get('password')
    
    user = authenticate(username=username,password=password)
    login(request, user)
    return redirect('index')
  
  context = {
    'form': form
  }
  
  return render(request, 'users/login.html', context)
```
ログインのHtmlテンプレートを作成する
```python
# templates/users/login.html
{% extends 'base.html' %}

{% block body %}

<div class="container">
  <h4>ログインフォーム</h4>
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type='submit' value='ログイン' >
  </form>
</div>

{% endblock %}
```
### ユーザ登録用のビューとHtmlを作成する
register_vieｗを作成
```python
# users/views.py
from django.shortcuts import render, redirect
from .forms import LoginForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm # added

def login_view(request):
  ・・・・・・・・

def register_view(request):
  form = UserCreationForm(request.POST or None)
  if form.is_valid():
    username = form.cleaned_data.get('username')
    password = form.cleaned_data.get('password')
    user = form.save()
    login(request, user)
    return redirect('index')
  else:
    form = UserCreationForm()
  
  return render (request, 'users/register.html', {'form': form})
```
request.POST or Noneとすることで、GetのときはNoneとなり引数なしで呼び出したのと同じフォームが作れる
```python
# templates/users/register.html
{% extends 'base.html' %}
{% block body %}

<div class="container">
  <h4>登録フォーム</h4>
  <form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <input type='submit' value='登録' >
  </form>
</div>

{% endblock %}
```
blog/urls.pyにregisterのpathを追加
```python
# blog/urls.py
from django.contrib import admin
from django.urls import path
# from posts.views import index
from posts.views import *
from users.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="index"),
    path('detail/<int:id>', detail_view, name="detail"),
    path('delete/<int:id>', delete_view, name="delete"),
    path('update/<int:id>', update_view, name="update"),
    path('create/', create_view, name="create"),
    path('login/', login_view, name="login"),
    path('register/', register_view, name="register") # added
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
blogフォルダにあるsettings.pyのLANGUAGE_CODE = 'ja'にすることで登録フォームが下記のような日本語表記になる
```python
登録フォーム
ユーザー名: 
 この項目は必須です。半角アルファベット、半角数字、@/./+/-/_ で150文字以下にしてください。
パスワード: 
あなたの他の個人情報と似ているパスワードにはできません。
パスワードは最低 8 文字以上必要です。
よく使われるパスワードにはできません。
数字だけのパスワードにはできません。
パスワード(確認用): 
 確認のため、再度パスワードを入力してください。
```
id: david pass: david12345
### ログアウト用のビューを作成する
```python
# users/views.py
from django.shortcuts import render, redirect
from .forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm

def login_view(request):
  form = LoginForm(request.POST or None)
  if form.is_valid():
    username = form.cleaned_data.get('username')
    password = form.cleaned_data.get('password')
    
    user = authenticate(username=username,password=password)
    login(request, user)
    return redirect('index')
  
  context = {
    'form': form
  }
  
  return render(request, 'users/login.html', context)

def register_view(request):
  form = UserCreationForm(request.POST or None)
  if form.is_valid():
    username = form.cleaned_data.get('username')
    password = form.cleaned_data.get('password')
    user = form.save()
    login(request, user)
    return redirect('index')
  else:
    form = UserCreationForm()
  
  return render(request, 'users/register.html', {'form': form})

def logout_view(request): # added
  logout(request)
  return redirect('index')
```
localhost:8000/logoutと入力するとログアウトされる
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









