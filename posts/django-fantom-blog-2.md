---
title: 'Django Fantom Blog-2'
date: 'December 26, 2022'
excerpt: 'PythonのフレームワークであるDjangoを使って本格的なブログサイトを作成します。2回目はPost Creation Formを作成するところからデプロイまでです'
cover_image: '/images/posts/img6.jpg'
category: 'Python'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/7.jpg'
---
<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### Post Creation Formを作成する
参考：Udemyの  [Django 3.0 MasterClass - Learn How To Create Django Apps](https://www.udemy.com/course/django-30-masterclass-learn-how-to-create-django-apps/)  
```python
user@mbp Django-fantom-blog % source venv/bin/activate
(venv) user@mbp Django-fantom-blog % python manage.py runserver
```
投稿用のフォーム（PostCreationForm）を作成する
```python
# posts/forms.py
from .models import *
from django import forms

class PostCreationForm(forms.ModelForm):
  
  class Meta:
    model = Post
    widgets = {
      'title':forms.TextInput(attrs={'class':'single-input', 'placeholder':'タイトル'}),
      'content':forms.Textarea(attrs={'class':'single-input', 'placeholder':'内容'})
    }
    fields = ['title', 'category', 'content', 'image']
```
### テンプレートファイルにPostCreationFormを表示する
CreatePostViewを作成する
```python
# posts.views.py
class CreatePostView(CreateView):
   template_name = 'posts/create-post.html'
   form = PostCreationForm
   models = Post
```
テンプレートファイルcreate-post.htmlを作成する  
login.htmlをコピーして編集する
```html
# templates/posts/create-post.html
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>投稿作成</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>
      </div>
    </div>
  </div>
      </div>
  </section>
  <!--================End Home Banner Area =================-->
  
  <!--================Blog Area =================-->
  <section class="blog_area p_120">
      <div class="container">
          <div class="row">
              <div class="col-lg-8">
                  <h2 style="text-align: center; color:blue">投稿作成</h2>
                  <div class="blog_left_sidebar">
                    <form method='post' enctype="multipart/form-data">
                      {% csrf_token %}
                      {% if form.errors %}
                        <div id="errors">
                          <div class="inners">
                            <p style="color:red">以下のエラーがあります</p>
                            <ul>
                              {% for field in form %}
                                {% if field.errors %}
                                <li>{{form.label }}: {{field.errors|striptags }}</li>
                                {% endif %}
                              {% endfor %}
                            </ul>
                          </div>
                        </div>
                      {% endif %}

                      {% for field in form %}
                      <div class="mt-10">
                        {{ field }}
                      </div>
                      {% endfor %}

                      <div class="mt-10">
                        <input type="text" name="tag" placeholder="タグ" onfocus="this.placeholder = ''" onblur="this.placeholder = 'タグ'" required class="single-input">
                      </div>

                      <input type="submit" class="genric-btn success circle" style="float:right;margin-top:30px;" value="投稿する" >
                    </form> 
                  </div>

              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
urls.pyにpost作成のパスを追加
```python
# posts/urls.py
from django.urls import path
# from posts.views import *
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<str:pk>', PostDetail.as_view(), name="detail"),
    path('category/<str:pk>', CategoryDetail.as_view(), name="category_detail"),
    path('tag/<slug:slug>', TagDetail.as_view(), name="tag_detail"),
    path('post-create', CreatePostView.as_view(), name="create_post"),　# added
] 
```
### 作成したPostを保存する
```python
# posts.views.py
from django.shortcuts import get_object_or_404
from .models import Post, Category, Tag
from django.views.generic import ListView, DetailView, CreateView
from .forms import PostCreationForm
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.template.defaultfilters import slugify
from django.urls import reverse

class IndexView(ListView):

class PostDetail(DetailView):

class CategoryDetail(ListView):

class TagDetail(ListView):

@method_decorator(login_required(login_url='users/login'), name='dispatch')
class CreatePostView(CreateView):
    template_name = 'posts/create-post.html'
    form_class = PostCreationForm
    models = Post
    
    def get_success_url(self):
      return reverse('detail', kwargs={"pk":self.object.id})
    
    def form_valid(self, form):
      form.instance.user = self.request.user
      form.save()
      
      tags = self.request.POST.get('tag').split(',')
      # for tag in tags:
      #   tag, created = Tag.objects.get_or_create(title=tag)
      #   form.instance.tags.add(tag)
      #   return super(CreatePostView, self).form_valid(form)
      
      for tag in tags:
        current_tag = Tag.objects.filter(slug=slugify(tag))
        if current_tag.count() < 1:
          create_tag = Tag.objects.create(title=tag)
          create_tag.slug = slugify(create_tag.title)
          create_tag.save()
          form.instance.tag.add(create_tag)
          print('create')
        else:
          existed_tag = Tag.objects.get(slug=slugify(tag))
          form.instance.tag.add(existed_tag)
          print('exist')
      return super(CreatePostView, self).form_valid(form)
```
tags = self.request.POST.get('tag').split(',') のところのget('tag')のtagは、 create-post.htmlのinput type="text" name="tag" のnameから持ってきている。またsplit関数はリストを返のでtagsはリストになる  
Tagモデルの def save(self, *args, **kwargs): は「Cannot force both insert and updating in model saving」のエラーが出たのでコメントアウトした  
uccess_urlとget_success_urlおよびreverseとreverse_lazyの使い分け
https://btj0.com/blog/django/success_url-get_success_url-reverse-reverse_lazy/  
### Crispy formsをインストールする
https://django-crispy-forms.readthedocs.io/en/latest/  

```python
(venv) user@mbp Django-fantom-blog % pip install django-crispy-forms 
```
```python
# Django_fantom_blog/settings.py
INSTALLED_APPS = (
    ...
    'crispy_forms',
)

CRISPY_TEMPLATE_PACK = 'bootstrap4'
```
https://django-crispy-forms.readthedocs.io/en/latest/filters.html  
以下のように使う
```python
{% load crispy_forms_tags %}

<form method="post" class="my-class">
    {{ my_formset|crispy }}
</form>
```
### Post Update Formを作成する
FormHelperを使う  
https://django-crispy-forms.readthedocs.io/en/latest/form_helper.html
```python
from crispy_forms.helper import FormHelper

class ExampleForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper(self)
```
```python
# post/forms.py
from .models import *
from django import forms
from crispy_forms.helper import FormHelper, Field, Submit
from crispy_forms.layout import Layout,

class PostCreationForm(forms.ModelForm):
  ・・・
class PostUpdateForm(forms.ModelForm):
  def __init__(self, *args, **kwargs):
    super(PostUpdateForm, self).__init__(*args, **kwargs)
    self.helper = FormHelper()
    self.helper.form_method='post'
    self.helper.field_class='mt-10'
    self.helper.layout = Layout(
      Field("title", css_class="single-input", placeholder="Title"),
      Field("category", css_class="single-input"),
      Field("content", css_class="single-input", placeholder="Content"),
      Field("image", css_class="single-input"),
      Field("tag", css_class="single-input", placeholder="Your Tags", value=self.instance.post_tag())
    )
    self.helper.add_input(Submit('submit', '更新', css_class="generic-btn success circle"))
  
  tag = forms.CharField()  # あとで追加
  class Meta:
    model=Post
    fields = ['title', 'category', 'content', 'image']
```
### Post Update Template Fileを作成する
最初にUpdatePostViewを作成
```python
# posts/views.py
from .models import Post, Category, Tag
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from .forms import PostCreationForm, PostUpdateForm

class UpdatePostView(UpdateView):
  model = Post
  template_name="posts/post-update.html"
  form_class=PostUpdateForm
  from django.urls import reverse

  def get_success_url(self):
    return reverse('detail', kwargs={"pk":self.object.id})
```
次にurls.pyにパスを追加
```python
# posts/urls.py
from django.urls import path
# from posts.views import *
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<str:pk>', PostDetail.as_view(), name="detail"),
    path('post-update/<str:pk>', UpdatePostView.as_view(), name="post_update"), # added
    path('category/<str:pk>', CategoryDetail.as_view(), name="category_detail"),
    path('tag/<slug:slug>', TagDetail.as_view(), name="tag_detail"),
    path('post-create', CreatePostView.as_view(), name="create_post"),
] 
```
テンプレートファイルを作成する  
{% load crispy_forms_tags %}や {% crispy form %}を以下のように挿入する
```html
# templates/posts/post-update.html
{% extends 'base.html'%}
{% load static %}
{% load crispy_forms_tags %} # added

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>投稿作成</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>
      </div>
    </div>
  </div>
      </div>
  </section>
  <!--================End Home Banner Area =================-->
  
  <!--================Blog Area =================-->
  <section class="blog_area p_120">
      <div class="container">
          <div class="row">
              <div class="col-lg-8">
                  <h2 style="text-align: center; color:blue">投稿作成</h2>
                  <div class="blog_left_sidebar">
                    {% crispy form %}  # added
                  </div>
              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
http://localhost:8000/post-update/1eaf4204-3c91-4a65-b988-a7712dba91b8 を入力すると編集画面が表示される  
タグを編集画面に表示させるため,forms.pyのPostUpdateFormにtag = forms.CharField()を追加し、また以下のようにPostモデルにpost_tagを追加する  
またforms.pyのPostUpdateFormクラスあるtagのFieldにvalue=self.instance.post_tag()を追加する  
Field("tag", css_class="single-input", placeholder="Your Tags",value=self.instance.post_tag())
```python
# posts/models.py
class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='カテゴリー', related_name='posts')
  tag = models.ManyToManyField(Tag, related_name="posts" , blank=True, verbose_name='タグ')
  slider_post = models.BooleanField(default=False, verbose_name='スライダー')
    
  def __str__(self):
    return self.title
  
  def post_tag(self):　# added
    return ','.join(str(tag) for tag in self.tag.all())
```
### Postを更新する
他のログインした人がpost-updateのURLを叩いても編集できないように以下のdef get(self, request, *args, **kwargs)のようなチェック機能を追加する
```python
# post/views.py
from django.http import HttpResponseRedirect
 ・・・
@method_decorator(login_required(login_url='users/login'), name='dispatch')
class UpdatePostView(UpdateView):
  model = Post
  template_name="posts/post-update.html"
  form_class=PostUpdateForm

  def get_success_url(self):
    return reverse('detail', kwargs={"pk":self.object.id})
  
  def form_valid(self, form):
    form.instance.user = self.request.user
    form.instance.tag.clear()
    tags = self.request.POST.get('tag').split(',')
    for tag in tags:
      current_tag = Tag.objects.filter(slug=slugify(tag))
      if current_tag.count() < 1:
        newTag = Tag.objects.create(title=tag)
        newTag.slug = slugify(newTag.title)
        newTag.save()
        form.instance.tag.add(newTag)
        print('create')
      else:
        existed_tag = Tag.objects.get(slug=slugify(tag))
        form.instance.tag.add(existed_tag)
        print('exist')
    return super(UpdatePostView, self).form_valid(form)
    
  def get(self, request, *args, **kwargs):
    self.object = self.get_object()
    
    if self.object.user != request.user:
      return HttpResponseRedirect('/')
    return super(UpdatePostView, self).get(request, *args, **kwargs)
```
### 削除とアップデートボタンを作成する
投稿の詳細画面に更新と削除ボタンを作成する  
class PostDetail(DetailView):   
  context_object_name = 'single'
```python
`# templates/posts/detail.html
  <p>{{single.content}}</p>
  {% if single.user == request.user %}　# ログインした人が作成したPostのみ表示できるようする
  <a href="{% url 'post_update' single.pk %}" class="genric-btn info circle">更新</a>
  <a href="{% url 'post_update' single.pk %}" class="genric-btn danger circle">削除</a>
  {% endif %}
```
### Postを削除する
```python
# posts/views.py
class DeletePostView(DeleteView):
  model = Post
  success_url = '/'
  template_name = 'posts/delete.html'
  
  def delete(self, request, *args, **kwargs):
    self.object = self.get_object()
    if self.object.user == request.user:
      self.object.delete()
      return HttpResponseRedirect(self.success_url) # homeに戻る
    else:
      return HttpResponseRedirect(self.success_url)
      # return HttpResponseRedirect()

  # 投稿してない人が削除画面を見れないようにする
  def get(self, request, *args, **kwargs):
    self.object = self.get_object()
    if self.object.user != request.user:
      return HttpResponseRedirect('/')
    return super(DeletePostView, self).get(request, *args, **kwargs)
```
```python
# posts/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<str:pk>', PostDetail.as_view(), name="detail"),
    path('post-update/<str:pk>', UpdatePostView.as_view(), name="post_update"),
    path('post-delete/<str:pk>', DeletePostView.as_view(), name="post_delete"),  # added
    path('category/<str:pk>', CategoryDetail.as_view(), name="category_detail"),
    path('tag/<slug:slug>', TagDetail.as_view(), name="tag_detail"),
    path('post-create', CreatePostView.as_view(), name="create_post"),
] 
```
```python
`# templates/posts/detail.html
    <p>{{single.content}}</p>
    {% if single.user == request.user %}
    <a href="{% url 'post_update' single.pk %}" class="genric-btn info circle">更新</a>
    <a href="{% url 'post_delete' single.pk %}" class="genric-btn danger circle">削除</a> # changed
    {% endif %}
```
削除用テンプレートhtmlを作成する(post-update.htmlをコピー)  
下の a href="{% url 'detail' object.pk %}" はDeletePostViewでpost.pkを使えないからobject.pkを使う  

```html
`# templates/posts/delete.html
{% extends 'base.html'%}
{% load static %}
{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>投稿削除</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>
      </div>
    </div>
  </div>
      </div>
  </section>
  <!--================End Home Banner Area =================-->
  
  <!--================Blog Area =================-->
  <section class="blog_area p_120">
      <div class="container">
          <div class="row">
              <div class="col-lg-8">
                  <h2 style="text-align: center; color:blue">投稿削除</h2>
                  <div class="blog_left_sidebar">
                    <form method="post">
                      {% csrf_token %}
                      <a href="{% url 'detail' object.pk %}" class="genric-btn info circle">No</a>
                      <button type="submit" class="genric-btn danger circle">Yes</button>
                    </form>
                  </div>

              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
### Navbarを編集する
```html
  <!--================Header Menu Area =================-->
  <header class="header_area">
      <div class="logo_part">
        <div class="container">
          <a class="logo" href="#"><img src="{% static "img/logo.png" %}" alt=""></a>
        </div>
      </div>
<div class="main_menu">
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <a class="navbar-brand logo_h" href="{% url 'index' %}"><img src="{% static "img/logo.png" %}" alt=""></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
        <ul class="nav navbar-nav menu_nav">
          <li class="nav-item active"><a class="nav-link" href="{% url 'index' %}">ホーム</a></li> 
          <li class="nav-item"><a class="nav-link" href="category.html">カテゴリー</a></li>
          <li class="nav-item"><a class="nav-link" href="archive.html">Archive</a></li>
                          {% if user.is_authenticated %}
          <li class="nav-item submenu dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.username}}</a>
            <ul class="dropdown-menu">
              <li class="nav-item"><a class="nav-link" href="{% url 'create_post' %}">投稿の追加</a></li>
              <li class="nav-item"><a class="nav-link" href="elements.html">パスワードの変更</a></li>
              <li class="nav-item"><a class="nav-link" href="elements.html">プロフィール</a></li>
              <li class="nav-item"><a class="nav-link" href="{% url 'users:logout' %}">ログアウト</a></li>
            </ul>
          </li> 
                          {% else %}
                          <li class="nav-item"><a class="nav-link" href="{% url 'users:register' %}">登録</a></li>
                          <li class="nav-item"><a class="nav-link" href="{% url 'users:login' %}">ログイン</a></li>
                          {% endif %}
          <li class="nav-item"><a class="nav-link" href="contact.html">お問合せ</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right ml-auto">
          <li class="nav-item"><a href="#" class="search"><i class="lnr lnr-magnifier"></i></a></li>
        </ul>
      </div> 
    </div>
  </nav>
</div>
  </header>
  <!--================Header Menu Area =================-->
{% block content %}
```
### 人気順投稿リストを作成する
```python
# Posts/models.py
class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='カテゴリー', related_name='posts')
  tag = models.ManyToManyField(Tag, related_name="posts" , blank=True, verbose_name='タグ')
  slider_post = models.BooleanField(default=False, verbose_name='スライダー')
  hit = models.PositiveIntegerField(default=0) # added

  def __str__(self):
    return self.title
  
  def post_tag(self):
    return ','.join(str(tag) for tag in self.tag.all())
```
makemirations & migrateを実行  
F関数を使ってDjangoで効率よくquerysetのカウントアップを行う  
https://tksmml.hatenablog.com/entry/2019/08/05/170000
```python
# posts/views.py
from django.db.models import F # added F関数

class PostDetail(DetailView):
  template_name="posts/detail.html"
  model = Post
  context_object_name = 'single'
  
  def get(self, request, *args, **kwargs):  # added
    self.hit = Post.objects.filter(id=self.kwargs['pk'].update(hit=F('hit')+1))
    return super(PostDetail,self).get(request, *args, **kwargs)
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context
```
```python
# posts/templatetags/custom_tags.py
from django import template
from posts.models import Category, Tag, Post

register = template.Library()

@register.simple_tag(name="post_categories")
def all_categories():
  return Category.objects.all()

@register.simple_tag(name="tags")
def all_tags():
  return Tag.objects.all()

@register.simple_tag(name="hit_posts")  # added
def hit_posts():
  return Post.objects.order_by('-hit')[:5]
```
右サイドのhtmlを編集する
```html
 <!-- right_side.html -->
  <aside class="single_sidebar_widget popular_post_widget">
      <h3 class="widget_title">人気 投稿</h3>
      {% hit_posts as posts %}
      {% for post in posts %}
      <div class="media post_item">
          <img src="{{ post.image.url }}" alt="post" style="width: 100px; height:60px">
          <div class="media-body">
              <a href="{% url 'detail' post.id %}"><h3>{{ post.title }}</h3></a>
              <p>閲覧回数: {{ post.hit }}</p>
          </div>
      </div>
      {% endfor %}
      <div class="br"></div>
  </aside>
```
### テンプレートのタグを表示する
詳細画面のタグを表示する  
singleはviews.pyのPostDetail(DetailView)で定義しているcontext_object_name 
```html
<!-- templates/posts/detail.html -->
  <a href="#"><h4>{{single.title}}</h4></a>
  <div class="user_details">
    <div class="float-left">
      {% for tag in single.tag.all %}
      <a href="{% url 'tag_detail' tag.slug %}">{{ tag.title }}</a>
      {% endfor %}
    </div>
```
homeページのタグを表示する  
下記のpostは {% for post in posts %} のpost 
```python
<!-- templates/posts/index.html -->
  <div class="blog_text_inner">
    {% for tag in post.tag.all %}　// added
      <a class="cat" href="#">{{ tag.title }}</a>  // changed
    {% endfor %}  // added
      <a href="{% url 'detail' pk=post.id %}"><h4>{{ post.title }}</h4></a>
      <p>{{ post.content|truncatechars:175  }}</p>
      <div class="date">
          <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i>{{ post.publishing_date }}</a>
          <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
      </div>
  </div>
```
カテゴリー別ページとタグ別ページのタグを表示する  
```python
# templates/categories/category_detail.html
# <a class="cat" href="#">Gadgets</a> # 削除
{% for tag in post.tag.all %}　# added
  <a class="cat" href="#">{{ tag.title }}</a>
{% endfor %}
```
```python
# templates/tags/tag_detail.html
# <a class="cat" href="#">Gadgets</a>　　 # 削除
{% for tag in post.tag.all %}　# added
  <a class="cat" href="#">{{ tag.title }}</a>
{% endfor %}
```
### 前の投稿と次の投稿を表示する
詳細ページから前の投稿と次の投稿に遷移できるようにする  
現在表示されているPostのidはself.kwargs['pk']で表すことができる  
ltはless thanを意味する
```python
# post/views.py
class PostDetail(DetailView):
  template_name="posts/detail.html"
  model = Post
  context_object_name = 'single'
  
  def get(self, request, *args, **kwargs):
    self.hit = Post.objects.filter(id=self.kwargs['pk']).update(hit=F('hit')+1)
    return super(PostDetail,self).get(request, *args, **kwargs)
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['Previous'] = Post.objects.filer(id__lt=self.kwargs['pk']).order_by('-pk').first() # added
    context['Next'] = Post.objects.filer(id__gt=self.kwargs['pk']).order_by('pk').first()  # added
    return context
```
details.htmlのnavigation-areaを編集する
```html
# templates/tags/tag_detail.html
<div class="navigation-area">
  <div class="row">
      {% if previous %}
      <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
          <div class="thumb">
              <a href="{% url 'detail' previous.pk %}"><img class="img-fluid" src="{{ previous.image.url }}" style={width:60px; hight:60px} alt=""></a>
          </div>
          <div class="arrow">
              <a href="{% url 'detail' previous.pk %}"><span class="lnr text-white lnr-arrow-left"></span></a>
          </div>
          <div class="detials">
              <p>Prev Post</p>
              <a href="{% url 'detail' previous.pk %}"><h4>{{ previous.title }}</h4></a>
          </div>
      </div>
      {% else %}
      <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
          <div class="thumb">
              <a href="#"><img class="img-fluid" src="{% static "img/blog/prev.jpg" %}" alt=""></a>
          </div>
          <div class="arrow">
              <a href="#"><span class="lnr text-white lnr-arrow-left"></span></a>
          </div>
          <div class="detials">
              <p>No Prev Post</p>
              <a href="#"><h4>No Prev Post</h4></a>
          </div>
      </div>
      {% endif %}

      {% if next %}
      <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
          <div class="detials">
              <p>Next Post</p>
              <a href="{% url 'detail' next.pk %}"><h4>{{ next.title }}</h4></a>
          </div>
          <div class="arrow">
              <a href="{% url 'detail' next.pk %}"><span class="lnr text-white lnr-arrow-right"></span></a>
          </div>
          <div class="thumb">
              <a href="{% url 'detail' next.pk %}"><img class="img-fluid" src="{{ next.image.url }}" alt="" style={width:60px; hight:60px}></a>
          </div>										
      </div>
      {% else %}
      <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
          <div class="detials">
              <p>No Next Post</p>
              <a href="#"><h4>No Next Post</h4></a>
          </div>
          <div class="arrow">
              <a href="#"><span class="lnr text-white lnr-arrow-right"></span></a>
          </div>
          <div class="thumb">
              <a href="#"><img class="img-fluid" src="{% static "img/blog/next.jpg" %}" alt=""></a>
          </div>										
      </div>	
      {% endif %}
  </div>
</div>
```
### ページネーションを作成する
index.htmlを編集する
```html
<!-- templates/posts/index.html -->
{% if is_paginated %}
<nav class="blog-pagination justify-content-center d-flex">
  <ul class="pagination">
    {% if page_obj.has_previous %}
      <li class="page-item">
          <a href="?page={{ page_obj.has_previous_page_number }}" class="page-link" aria-label="Previous">
              <span aria-hidden="true">
                  <span class="lnr lnr-chevron-left"></span>
              </span>
          </a>
      </li>
    {% else %}
      <li class="page-item disabled">
        <a href="#" class="page-link" aria-label="Previous">
            <span aria-hidden="true">
                <span class="lnr lnr-chevron-left"></span>
            </span>
        </a>
      </li>
      {% endif %}

      {% for i in paginator.page_range %}
      {% if page_obj.number == i %}
      <li class="page-item active"><a href="#" class="page-link">{{ i }}</a></li>
      {% else %}
      <li class="page-item"><a href="?page={{ i }}" class="page-link">{{ i }}</a></li>
      {% endif %}
      {% endfor %}

      {% if page_obj.has_next %}
      <li class="page-item">
          <a href="?page={{ page_obj.has_next_page_number }}" class="page-link" aria-label="Next">
              <span aria-hidden="true">
                  <span class="lnr lnr-chevron-right"></span>
              </span>
          </a>
      </li>
      {% else %}
      <li class="page-item disabled">
        <a href="#" class="page-link" aria-label="Next">
            <span aria-hidden="true">
                <span class="lnr lnr-chevron-right"></span>
            </span>
        </a>
    </li>
      {% endif %}
  </ul>
</nav>
{% endif %}
```
post/views.pyにpaginate_by = 3 を追加する
```python
class IndexView(ListView):
  template_name="posts/index.html"
  model = Post
  context_object_name = 'posts'
  paginate_by = 3 # added
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    # context['categories'] = Category.object.all()
    context['slider_posts'] = Post.objects.all().filter(slider_post=True)
    return context
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



