---
title: 'Django Fantom Blog-1'
date: 'December 25, 2022'
excerpt: 'PythonのフレームワークであるDjangoを使って本格的なブログサイトを作成します。１回目は仮想環境の設定から新しいPostを作成までです'
cover_image: '/images/posts/img6.jpg'
category: 'Python'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/7.jpg'
---
<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### プロジェクトの作成
参考：Udemyの  [Django 3.0 MasterClass - Learn How To Create Django Apps](https://www.udemy.com/course/django-30-masterclass-learn-how-to-create-django-apps/)
pythonのバージョン確認
```python
user@mbp Django-tutorial-blog % python -m django --version 
4.0.4
```
**Django Girls のチュートリアル**を参考  
仮想環境:https://tutorial.djangogirls.org/ja/django_installation/
```python
$ python3 -m venv myvenv
```

```python
user@mbp Django % django-admin startproject Django_fantom_blog
# プロジェクト名にハイフンを使ってはいかない　アンダースコアならOK
user@mbp Django % cd Django_fantom_blog
user@mbp Django-tutorial-blog  % python3 -m venv venv
user@mbp Django-tutorial-blog % source venv/bin/activate
(venv) user@mbp Django-tutorial-blog % pip install Django
(venv) user@mbp Django-tutorial-blog %code .
(venv) user@mbp Django-tutorial-blog % pip freeze
asgiref==3.6.0
Django==4.1.5
sqlparse==0.4.3
(venv) user@mbp Django-tutorial-blog % django-admin startproject Django_fantom_blog .
# プロジェクト名にハイフンを使ってはいかない　アンダースコアならOK
(venv) user@mbp Django-tutorial-blog % python manage.py runserver
user@mbp Django-tutorial-blog % git init
```

```python
(venv) user@mbp Django-tutorial-blog % python manage.py runserver 7000
```
Starting development server at http://127.0.0.1:7000/
### データベース　sqlite3
```python
(venv) user@mbp Django-tutorial-blog % python manage.py migrate 
```
db.qlite3を右クリック→Open Database→SQLITE EXPLORER  
### Django Appの作成
```python
(venv) user@mbp Django-tutorial-blog % python manage.py startapp posts
```
### SuperUserの作成
```python
(venv) user@mbp Django-tutorial-blog % python manage.py createsuperuser 
Username (leave blank to use 'user'): user
Email address: 
Password: 123
```
### Templates Directoryの作成
```python
// settings.py
import os
   . . .
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], // 追加
        'APP_DIRS': True,
```
ルートにtemplatesフォルダを作成し配下にblogフォルダを作成する
### Htmlファイルの作成
blogのurls.py
```python
from django.contrib import admin
from django.urls import path
from posts.views import index // added

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index)  // added
]
```
```python
#  posts/views.py
from django.shortcuts import render

def index(request):
  context = {
    'message': 'first message',
    'message2': 'second message'
  }
  return render(request, 'post/index.html', context)
```

```python
# templates/post/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts</title>
</head>
<body>
  <div>{{message}}</div>
  <div>{{message2}}</div>
</body>
</html>
```
### Modelの作成
```python
# posts/models.py
from django.db import models

class Post(models.Model):
  title = models.CharField(max_length=50)
  content = models.TextField()
  date=models.DateField(auto_now_add=True)
```
date=models.DateField(auto_now_add=True)にすると自動的に日付が適用される  
__appをsetting.pyに登録する__
```python
settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'posts.apps.PostsConfig'　// added
]
```
__テーブルを作成する__  
(venv) user@mbp Django-tutorial-blog % python manage.py makemigrations  
__DBに登録する__  
(venv) user@mbp Django-tutorial-blog % python manage.py migrate  
__admin画面で登録したPostテーブルが見れるようにする__
```python
# posts/admin.py 
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```
### Models Admin Pageの編集
Django administrationにtitleを表示させる
```python
# posts/models.py
from django.db import models

class Post(models.Model):
  title = models.CharField(max_length=50)
  content = models.TextField()
  date=models.DateField(auto_now_add=True)
  
  def __str__(self):　 # 追加
    return self.title
```
タイトル以外に日付やリンクを追加する
```python
# posts/admin.py 
from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
  list_display = ['title', 'date']
  list_display_links = ['title', 'date']

admin.site.register(Post, PostAdmin)
```
さらにDjango administrationにサーチフィールドやフィルターを追加する
```python
# posts/admin.py 
from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
  list_display = ['title', 'date']
  list_display_links = ['title', 'date']
  search_fields = ['title', 'content']
  list_filter = ['date']

admin.site.register(Post, PostAdmin)
```
### Static Files Directory の作成
https://docs.djangoproject.com/en/4.1/howto/static-files/
```python
# settings.py
STATIC_URL = 'static/'
STATICFILES_DIRS = [  # add
    BASE_DIR / "static",
]
```
画像を載せる時に使うディレクりは以下を使って設定する
```python
{% load static %}
<img src="{% static 'my_app/example.jpg' %}" alt="My image">
```
ルートにstaticフォルダを作成し直下にimg,css,jsフォルダを作成する
```python
# templates/post/index.html
{% load static %}　# added
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts</title>
</head>
<body>
  <h3>This is main page</h3>
  <div>{{message}}</div>
  <div>{{message2}}</div>
   <img src="{% static 'img/e.jpg' %}" alt="My image"> # added
</body>
</html>
```
アップロードした時に使うmediaディレクトリをsettings.pyに設定する
```python
# settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```
main(blog)のurls.pyに以下を追加
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... the rest of your URLconf goes here ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

```python
# blog/blog/urls.py
from django.contrib import admin
from django.urls import path
from posts.views import index
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
### Modelにimagesをアップロードする
```python
(venv) user@mbp Django-tutorial-blog % pip install Pillow
```
posts/models.py
```python
from django.db import models

class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=50)
  content = models.TextField(verbose_name='内容')
  date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='images') # added 　
  # ’images'は画像を格納するフォルダ名
  
  def __str__(self):
    return self.title
```
```python
(venv) user@mbp Django-tutorial-blog % python manage.py makemigrations
(venv) user@mbp Django-tutorial-blog % python manage.py migrate 
```
http://127.0.0.1:8000/adminを開いて画像をアップロードするとmedia/imagesフォルダが作成されている
### テンプレートファイルにPostsを表示する(2種類の方法)
その１：SQL Query文を使う
```python
from django.shortcuts import render
import sqlite3

con = sqlite3.connect("db.sqlite3", check_same_thread=False)
cur = con.cursor()

def index(request):
  query = "SELECT * FROM posts_post"
  posts = cur.execute(query).fetchall()
  for post in posts:
    # print(post)
    print(post[1])

  context = {
    'message': 'first message',
    'message2': 'second message'
  }
  return render(request, 'post/index.html', context)
```
その２:QuerySet API リファレンス https://man.plustar.jp/django/ref/models/querysets.html  
list() を呼び出すことで、 QuerySet の評価を矯正する  
entry_list = list(Entry.objects.all())
```python
from django.shortcuts import render
from .models import Post
# from posts.models import Post

def index(request):
  context = {
    'posts': Post.objects.all()
  }
  return render(request, 'post/index.html', context)
```
For文を使ってPOSTを全部表示する
```python
# templates/post/index.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts</title>
</head>
<body>
  <h3>This is main page</h3>
    {% for post in posts %}
      <img src="{{ post.image.url }}" alt="Post image">
      <h3>{{post.title}}</h3>
      <small>{{ post.date }}</small>
      <p>{{ post.content }}</p>
    {% endfor %}
</body>
</html>
```
#### Bootstrapを使う
コンパイルされた CSS と JSダウンロード：https://getbootstrap.jp/docs/5.0/getting-started/download/  
static/cssにbootstrap.min.cssを格納し、static/jsにbootstrap.min.jsを格納する、
```python
# templates/post/index.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts</title>
  <link rel="stylesheet" href="{% static 'css/bootstrap.min.css'%}"> # added
</head>
<body>
  <h3>This is main page</h3>
    {% for post in posts %}
      <img src="{{ post.image.url }}" alt="Post image">
      <h3>{{post.title}}</h3>
      <small>{{ post.date }}</small>
      <p>{{ post.content }}</p>
    {% endfor %}

    <script src="{% static 'js/bootstrap.min.js' %}"></script> # added
</body>
</html>
```
#### Bootstrapコンポーネントを使う
https://getbootstrap.jp/docs/5.0/components/card/  
**カード**のサンプル
```python
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

```python
# templates/post/index.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Posts</title>
  <link rel="stylesheet" href="{% static "css/bootstrap.min.css" %}">
</head>
<body>
  <div class="container" style="background-color:pink; padding-top:45px; padding-bottom:45px">
    <h3>This is main page</h3>
      {% for post in posts %}
        <div class="card" style="width: 48rem; margin-bottom:30px">
          <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
            <p class="card-text">{{ post.content|truncatechars:150 }}</p>
            <a href="#" class="btn btn-primary">More</a>
          </div>
        </div>
      {% endfor %}
  </div>

  <script src="{% static 'js/bootstrap.min.js' %}"></script>
</body>
</html>
```
#### Post Detail Pageを作成する
urls.pyにpath を追加する  
'detail/<int:id>'のidはdetail_viewの引数のidと同じ  
またname="detail"をつけることで遷移先のURLを指定できる
```python
# blog/settings.py
from django.contrib import admin
from django.urls import path
# from posts.views import index
from posts.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name="index"), # nameを追加
    path('detail/<int:id>', detail_view, name="detail")  # added
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
posts/views.pyにdetail_viewを追加する
```python
# posts/views.py
from django.shortcuts import render
from .models import Post
# from posts.models import Post

def index(request):
  context = {
    'posts': Post.objects.all()
  }
  return render(request, 'posts/index.html', context)

def detail_view(request, id):
  post = Post.objects.get(id=id)
  context = {
    'post':post
  }
  return render(request, 'posts/detail.html', context)
```
```python
# index.html
  <div class="container" style="padding-top:45px; padding-bottom:45px">
    <h3>This is main page</h3>
      {% for post in posts %}
        <div class="card" style="width: 48rem; margin-bottom:30px">
          <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
              <small>{{ post.date }}</small>
            <p class="card-text">{{ post.content|truncatechars:150 }}</p>
            <a href="/detail/{{post.id}}" class="btn btn-primary">More</a>
          </div>
        </div>
      {% endfor %}
  </div>
```
```python
上のindex.htmlで、
<a href="/detail/{{post.id}}" class="btn btn-primary">More</a>
の代わりに、
<a href="{% url 'detail' post.id %}" class="btn btn-primary">More</a>
を使う
```
detailページでidに存在しないページを指定したときエラーになるので、get_object_or_404を使うと「Page not found (404)」を表示する
```python
# posts/views.py
from django.shortcuts import render, get_object_or_404
from .models import Post
# from posts.models import Post

def index(request):
  
  context = {
    'posts': Post.objects.all()
  }
  return render(request, 'posts/index.html', context)

def detail_view(request, id):
  # post = Post.objects.get(id=id)
  post = get_object_or_404(Post, id=id) # change
  context = {
    'post':post
  }
  return render(request, 'posts/detail.html', context)
```

```python
# template/posts/detail.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>詳細ページ</title>
  <link rel="stylesheet" href="{% static "css/bootstrap.min.css" %}">
</head>
<body>
  <div class="container" style="padding-top:45px; padding-bottom:45px">
    <h3>詳細ページ</h3>
        <div class="card" style="width: 48rem; margin-bottom:30px">
          <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
              <small>{{ post.date }}</small>
            <p class="card-text">{{ post.content}}</p>
            <a href="{% url 'index' %}" class="btn btn-primary">戻る</a>
          </div>
        </div>
  </div>
  <script src="{% static 'js/bootstrap.min.js' %}"></script>
</body>
</html>
```
### Navbarを作成する
https://getbootstrap.jp/docs/5.0/components/navbar/  
dropdownが効かない時はjQueryをstatic/js に入れる:
https://jquery.com/download/ のDownload the compressed, production jQuery 3.6.3
```python
# index.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ブログページ</title>
  <link rel="stylesheet" href="{% static "css/bootstrap.min.css" %}">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="container" style="padding-top:45px; padding-bottom:45px">
    <h3>This is main page</h3>
      {% for post in posts %}
        <div class="card" style="width: 48rem; margin-bottom:30px">
          <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
              <small>{{ post.date }}</small>
            <p class="card-text">{{ post.content|truncatechars:150 }}</p>
            {% comment %} <a href="/detail/{{post.id}}" class="btn btn-primary">More</a> {% endcomment %}
            <a href="{% url 'detail' post.id %}" class="btn btn-primary">More</a>
          </div>
        </div>
      {% endfor %}
  </div>

  <script src="{% static 'js/jquery-3.6.3.min.js' %}"></script>
  <script src="{% static 'js/bootstrap.min.js' %}"></script>
</body>
</html>
```

### Template Extendingを利用する
```python
# tenplates/base.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ブログページ</title>
  <link rel="stylesheet" href="{% static "css/bootstrap.min.css" %}">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  {% block body %}

  {% endblock %}

  <script src="{% static 'js/jquery-3.6.3.min.js' %}"></script>　# added
  <script src="{% static 'js/bootstrap.min.js' %}"></script>
</body>
</html>
```

```python
# templates/posts/index.html
{% extends 'base.html' %}

{% block body %}
<div class="container" style="padding-top:45px; padding-bottom:45px">
  <h3>This is main page</h3>
    {% for post in posts %}
      <div class="card" style="width: 48rem; margin-bottom:30px">
        <img src="{{ post.image.url }}" class="card-img-top" alt="Post image">
        <div class="card-body">
          <h5 class="card-title">{{post.title}}</h5>
            <small>{{ post.date }}</small>
          <p class="card-text">{{ post.content|truncatechars:150 }}</p>
          {% comment %} <a href="/detail/{{post.id}}" class="btn btn-primary">More</a> {% endcomment %}
          <a href="{% url 'detail' post.id %}" class="btn btn-primary">More</a>
        </div>
      </div>
    {% endfor %}
</div>

{% endblock %}

```
#### フォームを作成する
modelForm用いたforms.pyのExample
~~~python
class ReviewForm(ModelForm):
  class Meta:
    model = Review
    fields = ['value', 'body']
    
    labels = {
      'value':'評価してください',
      'body': 'コメントお願いします'
    }

  def __init__(self, *args, **kwargs):
    super(ReviewForm, self).__init__(*args, **kwargs)
    
    for name, field in self.fields.items():
      field.widget.attrs.update({'class': 'form-input'})
      
class CategoryForm(ModelForm):
  class Meta:
      model = Category
      fields = ['name']
      
  def __init__(self, *args, **kwargs):
    super(CategoryForm, self).__init__(*args, **kwargs)
    
    self.fields['name'].widget.attrs.update(
      { 'class': 'form-input'})

class TagForm(ModelForm):
  class Meta:
      model = Tag
      fields = ['name']
      
  def __init__(self, *args, **kwargs):
    super(TagForm, self).__init__(*args, **kwargs)
    
    self.fields['name'].widget.attrs.update(
      { 'class': 'form-input'})
~~~
form.pyの実装Example
~~~html
<form action="" method="POST">
  {% csrf_token %}
{% for field in form %}
  </label>{{field.label}}</label>
  <div class='form-field'>{{field}}</div>
  {% endfor %}
  <a class="btn btn-secondary" href="{% url 'urls' %}">戻る</a>
  <input class="btn btn-primary" type="submit" value="送信">
  </div>
</form>
~~~

```python
# posts/forms.py
from django import forms
from .models import Post

class Postform(forms.ModelForm):
  class Meta:
    model = Post
    fields = ['title', 'content', 'image']
```

```python
# posts/views.py
from django.shortcuts import render, get_object_or_404
from .models import Post # from posts.models import Post
from .forms import PostForm  # added

def index(request):
  
  context = {
    'posts': Post.objects.all()
  }
  return render(request, 'posts/index.html', context)

def detail_view(request, id):
  # post = Post.objects.get(id=id)
  post = get_object_or_404(Post, id=id)
  context = {
    'post':post
  }
  return render(request, 'posts/detail.html', context)

def create_view(request):  # added
  form = PostForm(request.POST or None, request.FILES or None)
  context = {
    'form': form
  }
  return render (request, 'posts/create.html', context)
```

```python
# templates/posts/create.html
{% extends 'base.html' %}

{% block body %}
  <form method="post" enctype="multipart/form-data">
    {{ form.as_p }}
  </form>
{% endblock %}
```
templates/base.htmlの一部を追加修正(styleの追加)
```python
# templates/base.html
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" 
  style="margin-bottom: 30px">　# added
```
#### 新しいPostを作成する
フォームにボタンを追加する　csrf_tokenも追加
```python
templates/posts/create.html
{% extends 'base.html' %}
{% block body %}

<form method="post" enctype="multipart/form-data">
  {% csrf_token %}
  {{ form.as_p }}
   <input type="submit" value="送信" />
</form>

{% endblock %}
```

```python
# posts/views.pyのcreate_view
from django.shortcuts import render, get_object_or_404, HttpResponseRedirect

def create_view(request):
  form = PostForm(request.POST or None, request.FILES or None)
  
  if form.is_valid():
    post = form.save()
    return HttpResponseRedirect('/')
    
  context = {
    'form': form
  }
  return render (request, 'posts/create.html', context)
```
Postを作成後、Postの詳細ページに遷移するようにget_absolute_url()を使う  success_url=reverse_lazy()でもできる？  
参考：https://djangobrothers.com/blogs/get_absolute_url/  
get_absolute_urlはPostなどモデルに実装して各Postインスタンスに対応するURLを返す  
仮にURLパスや、パスにつけたnameが変更された時でもget_absolute_url内の処理だけを修正すればよくHTML側での修正は不要
```python
# posts/models.py
from django.db import models
from django.urls import reverse  # added

class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=50)
  content = models.TextField(verbose_name='内容')
  date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='images')
  
  def __str__(self):
    return self.title
  
  def get_absolute_url(self):  # added
      return reverse("detail", kwargs={"id": self.id})
```

```python
# posts/views.pyのcreate_view
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

```python

```

```python

```

```python

```

```python

```







