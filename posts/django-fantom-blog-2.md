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
    print('context',context['object'].publishing_date)
    pubdate = context['object'].publishing_date
    # context['Next'] = Post.objects.filter(id__gt=self.kwargs['pk']).order_by('ーpk').first()
    context['previous'] = Post.objects.filter(publishing_date__lt=pubdate).order_by('-publishing_date').first()
    print('previous',context['previous'])
    # context['next'] = Post.objects.filter(id__gt=self.kwargs['pk']).order_by('pk').first()
    context['next'] = Post.objects.filter(publishing_date__gt=pubdate).order_by('publishing_date').first()
    print('next',context['next'])
    return context
```
details.htmlのnavigation-areaを編集する
```html
# templates/tags/tag_detail.html
<div class="navigation-area">
  <div class="row">
      {% if previous %}
      <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
          <div class="thumb" >
              <a href="{% url 'detail' previous.pk %}"><img class="img-fluid" src="{{ previous.image.url }}" alt="" style="width:100px;hight:100px">></a>
          </div>
          <div class="arrow">
              <a href="{% url 'detail' previous.pk %}"><span class="lnr text-white lnr-arrow-left"></span></a>
          </div>
          <div class="detials">
              <p>前の記事</p>
              <a href="{% url 'detail' previous.pk %}"><h4>{{ previous.title }}</h4></a>
          </div>
      </div>
      {% else %}
      <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
          <div class="thumb">
              <a href="#"><img class="img-fluid" src="{% static "img/blog/prev.jpg" %}" alt="" style="width:100px;hight:100px"></a>
          </div>
          <div class="arrow">
              <a href="#"><span class="lnr text-white lnr-arrow-left"></span></a>
          </div>
          <div class="detials">
              <p>前の記事なし</p>
              <a href="#"><h4>前の記事なし</h4></a>
          </div>
      </div>
      {% endif %}

      {% if next %}
      <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
          <div class="detials">
              <p>次の記事</p>
              <a href="{% url 'detail' next.pk %}"><h4>{{ next.title }}</h4></a>
          </div>
          <div class="arrow">
              <a href="{% url 'detail' next.pk %}"><span class="lnr text-white lnr-arrow-right"></span></a>
          </div>
          <div class="thumb">
              <a href="{% url 'detail' next.pk %}"><img class="img-fluid" src="{{ next.image.url }}" alt="" style="width:60px;hight:60px"></a>
          </div>										
      </div>
      {% else %}
      <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
          <div class="detials">
              <p>次の記事無</p>
              <a href="#"><h4>No Next Post</h4></a>
          </div>
          <div class="arrow">
              <a href="#"><span class="lnr text-white lnr-arrow-right"></span></a>
          </div>
          <div class="thumb">
              <a href="#"><img class="img-fluid" src="{% static "img/blog/next.jpg" %}" alt="" style="width:60px;hight:60px"></a>
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
  ・・・
class CategoryDetail(ListView):
  model = Post
  template_name="categories/category_detail.html"
  context_object_name="posts"
  paginate_by = 3　# added
  ・・・
  class TagDetail(ListView):
  model = Post
  template_name="tags/tag_detail.html"
  context_object_name="posts"
  paginate_by = 3　# added
```
### パスワード変更Htmlを作成する
まずパスワード変更用のパスを登録する
```python
# users.urls.view
from django.urls import path
from .views import *
from django.contrib.auth import views as authViews # added

app_name="users"
urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name="logout"),
    path('password-change/', authViews.PasswordChangeView.as_view(success_url=reverse_lazy('users:password_change_done')), name="password_change"),
    path('password-change-done/', authViews.PasswordChangeDoneView.as_view(), name="password_change_done")
] 
```
### ユーザパスワードの変更
createPostViewの@method_decorator(login_required(login_url='users/login'), name='dispatch')を参照する   
users/urls.pyのPasswordChangeViewを右クリックして定義へ移動する  
```python
class PasswordChangeView(PasswordContextMixin, FormView):
    form_class = PasswordChangeForm
    success_url = reverse_lazy('users:password_change_done') # changed
    template_name = "registration/password_change_form.html"
    title = _("Password change")

    @method_decorator(sensitive_post_parameters())
    @method_decorator(csrf_protect)
    @method_decorator(login_required(login_url='users/login'))  # changed
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["user"] = self.request.user
        return kwargs

    def form_valid(self, form):
        form.save()
        # Updating the password logs out all other sessions for the user
        # except the current one.
        update_session_auth_hash(self.request, form.user)
        return super().form_valid(form)

class PasswordChangeDoneView(PasswordContextMixin, TemplateView):
    template_name = "registration/password_change_done.html"
    title = _("Password change successful")

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
```
パスワード変更フォーム用とパスワード変更完了通知用のhtmlを作成する  
templatesフォルダの直下にregistrationフォルダを作りその直下に２ファイル作成する
```html
<!-- templates/registration/password_change_form.html -->
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>登録</h2>
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
                  <h2 style="text-align: center; color:blue">パスワード変更</h2>
                  <div class="blog_left_sidebar">
                    <form method='post'>
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
                      {# {{ form.as_p }} #}
                      <div class="mt-10">
                        <input type="password" name="old_password" placeholder="古いパスワード" onfocus="this.placeholder = ''" onblur="this.placeholder = '古いパスワード'" required class="single-input">
                      </div>
                      <div class="mt-10">
                        <input type="password" name="new_password1" placeholder="新しいパスワード" onfocus="this.placeholder = ''" onblur="this.placeholder = '新しいパスワード'" required class="single-input">
                      </div>
                      <div class="mt-10">
                        <input type="password" name="new_password2" placeholder="新しいパスワード(確認)" onfocus="this.placeholder = ''" onblur="this.placeholder = '新しいパスワード(確認)'" required class="single-input">
                      </div>
                      <input type="submit" class="genric-btn success circle" style="float:right;margin-top:30px;" value="変更" >
                    </form> 
                  </div>
              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
```html
<!-- templates/registration/password_change_done.html -->
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>登録</h2>
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
                  <h2 style="text-align: center; color:blue">パスワードが変更されました</h2>
                  <div class="blog_left_sidebar">
                  </div>
              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
### 検索機能を作成する
検索ボックスにformタグを追加して、action="{% url 'search' %}" method="get"とする  
inputタグにname="q"を追加する
```html
<!-- templates/right_side.html -->
 {% load static %}
 {% load custom_tags %}

<div class="col-lg-4">
  <div class="blog_right_sidebar">
      <aside class="single_sidebar_widget search_widget">
        <form action="{% url 'search' %}" method="get" >
          <div class="input-group">
              <input type="text" class="form-control" placeholder="Search Posts" name="q">
              <span class="input-group-btn">
                  <button class="btn btn-default" type="button"><i class="lnr lnr-magnifier"></i></button>
              </span>
          </div><!-- /input-group -->
        </form>
          <div class="br"></div>
      </aside>
```
SearchView(ListView)を作成する  
self.request.GET.get("q")のGETはmethod="get"から来て、get("q")のgetは関数でname="q"を参照している  
重複しないように.distinct()をつける
```python
from django.db.models import Q

class SearchView(ListView):  # 78
  model = Post
  template_name = 'posts/search.html'
  paginate_by = 5
  context_object_name = 'posts'
  
  def get_queryset(self):
    query = self.request.GET.get("q")
    
    if query:
      return Post.objects.filter(Q(title__icontains=query) |
                                 Q(content__icontains=query) | 
                                 Q(tag__title__icontains=query)  
                                 ).order_by('publishing_date').distinct()
    return Post.objects.all().order_by('publishing_date')
```
category_detail.htmlを使ってsearch.htmlを作成する
```html
# posts/search.html
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>検索結果</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>
        <a href="#"></a>
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
                  <div class="blog_left_sidebar">
                      {% for post in posts %}
                        <article class="blog_style1">
                          <div class="blog_img">
                            <img class="img-fluid" src={{ post.image.url }} alt="">
                          </div>
                          <div class="blog_text">
                          <div class="blog_text_inner">
                          {% for tag in post.tag.all %}
                            <a class="cat" href="#">{{ tag.title }}</a>
                          {% endfor %}
                            <a href="{% url 'detail' pk=post.id %}"><h4>{{ post.title | truncatechars:150}}</h4></a>
                            <p>{{ post.content }}</p>
                            <div class="date">
                              <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i>{{post.publishing_date}}</a>
                              <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
                            </div>	
                          </div>
                          </div>
                        </article>
                      {% endfor %}
                      <!--==パジネーションエリア　↓==-->
                      {% if is_paginated %}
                      <nav class="blog-pagination justify-content-center d-flex">
                        <ul class="pagination">
                          {% if page_obj.has_previous %}
                            <li class="page-item">
                                <a href="?q={{request.GET.get.q}}&page={{ page_obj.has_previous_page_number }}" class="page-link" aria-label="Previous">
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
                            <li class="page-item"><a href="?q={{request.GET.get.q}}&page={{ i }}" class="page-link">{{ i }}</a></li>
                            {% endif %}
                           {% endfor %}
    
                           {% if page_obj.has_next %}
                            <li class="page-item">
                                <a href="?q={{request.GET.get.q}}&page={{ page_obj.has_next_page_number }}" class="page-link" aria-label="Next">
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
                </div>
            </div>
      {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
posts/urls.pyのpathにsearchを追加する
```python
# posts/urls.py
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<str:pk>', PostDetail.as_view(), name="detail"),
    path('post-update/<str:pk>', UpdatePostView.as_view(), name="post_update"),
    path('post-delete/<str:pk>', DeletePostView.as_view(), name="post_delete"),
    path('category/<str:pk>', CategoryDetail.as_view(), name="category_detail"),
    path('tag/<slug:slug>', TagDetail.as_view(), name="tag_detail"),
    path('post-create', CreatePostView.as_view(), name="create_post"),
    path('search', SearchView.as_view(), name="search"), # added
]  
```
検索ボタンをクリックすると以下のURLが表示される  
http://127.0.0.1:8000/search?q=lorem  
またペジネーションボタンを押すとhttp://127.0.0.1:8000/search?page=2 になり、q=loremが消えているのでhtmlを以下のように修正する(全部で３ヶ所)  
href="?q={{request.GET.get.q}}&page={{ page_obj.has_previous_page_number }}"  
これによりURLがhttp://127.0.0.1:8000/search?q=&page=2のように表示される
```html
  {% if is_paginated %}
  <nav class="blog-pagination justify-content-center d-flex">
    <ul class="pagination">
      {% if page_obj.has_previous %}
        <li class="page-item">
            <a href="?q={{request.GET.get.q}}&page={{ page_obj.has_previous_page_number }}" ＃class="page-link" aria-label="Previous">　// changed
                <span aria-hidden="true">
                    <span class="lnr lnr-chevron-left"></span>
                </span>
            </a>
        </li>
      {% else %}
```
#### コメント機能を作成する
コメントのモデルを作成する  
def __str__(self)で、self.post.titleを返した方がコメントの管理がやりやすい
```python
# posts/models.py
class Comment(models.Model):
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments", null=True, blank=True, verbose_name='Post')
  name = models.CharField(max_length=100,verbose_name='名前')
  email = models.EmailField(max_length=100, verbose_name='メールアドレス')
  content = models.TextField(verbose_name='内容')
  publishing_date = models.DateTimeField(auto_now=True, verbose_name='投稿日時')
  
  def __str__(self):
    return self.post.title
```
makemigrations & migrate  
管理画面に登録するため、admin.pyでAdminCommentを作成する
```python
# posts/admin.py
from django.contrib import admin
from .models import Post, Category, Tag, Comment

class AdminPost(admin.ModelAdmin):
  list_filter = ['publishing_date']
  list_display = ['title', 'publishing_date']
  search_fields = ['title', 'content']

  class Meta:
    model = Post
    
class AdminComment(admin.ModelAdmin):  # added
  list_filter = ('publishing_date', )   # タプルを使ってもOK
  search_fields = ('name', 'email', 'content', 'post__title')　 # タプルを使ってもOK
  
  class Meta:
    model = Comment
    
admin.site.register(Post, AdminPost)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Comment, AdminComment) # added
```
コメントのフォームを作成する
```python
# posts/forms.py
class CreateCommentForm(forms.ModelForm):
  def __init__(self, *args, **kwargs):
    super(CreateCommentForm, self).__init__(*args, **kwargs)
    self.helper = FormHelper()
    self.helper.form_method="post"
    self.helper.layout = Layout (
      Field("name", css_class="form-control", placeholder="名前"),
      Field("email", css_class="form-control", placeholder="メールアドレス"),
      Field("content", css_class="form-control mb-10", placeholder="内容"),
    )
    self.helper.add_input(Submit('submit', 'コメントする', css_class="primary-btn submit_btn"))
    
  class Meta:
    model = Comment
    fields = ['name', 'email', 'content']
```
views.pyのクラスDetailViewやListViewではFormを使うことができない  
CreateViewではFormを使うことができる  
PostDetail(DetailView)でFormを使うためにFormMixinを追加する  
FormMixin: https://en-junior.com/formview/#form-mixin
```python
# posts/views.py
from django.views.generic.edit import FormMixin # added
from .forms import PostCreationForm, PostUpdateForm, CreateCommentForm # added

class PostDetail(DetailView, FormMixin): # added
  template_name="posts/detail.html"
  model = Post
  context_object_name = 'single'
  form_class = CreateCommentForm  # added
  
  def get(self, request, *args, **kwargs):
    self.hit = Post.objects.filter(id=self.kwargs['pk']).update(hit=F('hit')+1)
    return super(PostDetail,self).get(request, *args, **kwargs)
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    print('context',context['object'].publishing_date)
    pubdate = context['object'].publishing_date
    context['previous'] = Post.objects.filter(publishing_date__lt=pubdate).order_by('-publishing_date').first()
    print('previous',context['previous'])
    context['next'] = Post.objects.filter(publishing_date__gt=pubdate).order_by('publishing_date').first()
    print('next',context['next'])
    context['form'] = self.get_form　# added
    return context

  def form_valid(self, form):
    form.instance.post = self.object
    form.save()
    return super().form_valid(form)
    # return super(PostDetail, self).form_valid(form)
  
  def post(self, *args, **kwargs):
    self.object = self.get_object()
    form = self.get_form()
    if form.is_valid():
      return self.form_valid(form)
    else:
      return self.form_valid(form)
    
  def get_success_url(self):
    return reverse('detail', kwargs={"pk":self.object.id})
```
form_valid()は、postされた際、validationがOKだった場合にシステムからコールされる関数
```html
# templates/posts/detail.html
{% extends 'base.html'%}
{% load static %}
{% load crispy_forms_tags %} # added
{% block content %}
・・・
    <div class="comments-area">
        <h4>{{ single.comment_count}} コメント</h4>
        {% for comment in single.comments.all %}
        <div class="comment-list">
            <div class="single-comment justify-content-between d-flex">
                <div class="user justify-content-between d-flex">
                    <div class="thumb">
                        <img src="{% static "img/blog/c1.jpg" %}" alt="">
                    </div>
                    <div class="desc">
                        <h5><a href="#">{{ comment.name }}</a></h5>
                        <p class="date">{{ comment.publishing_date }}<</p>
                        <p class="comment">
                            {{ comment.content }}
                        </p>
                    </div>
                </div>
                <div class="reply-btn">
                        <a href="" class="btn-reply text-uppercase">reply</a> 
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
    <div class="comment-form">
        <h4>Leave a Reply</h4>
        {% crispy form %}
    </div>
</div>
     {% include 'right_side.html' %}
    </div>
</div>
</section>
```
コメントの回数を取得する  
Postモデルにコメントカウント用の関数def comment_countを作成する
```python
# posts/model.py
class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateTimeField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='カテゴリー', related_name='posts')
  tag = models.ManyToManyField(Tag, related_name="posts" , blank=True, verbose_name='タグ')
  slider_post = models.BooleanField(default=False, verbose_name='スライダー')
  hit = models.PositiveIntegerField(default=0, verbose_name='閲覧回数')
  
  def comment_count(self): # added
    return self.comments.all().count()

  def __str__(self):
    return self.title
  
  def post_tag(self):
    return ','.join(str(tag) for tag in self.tag.all())
```
### Recaptcha Packageのインストール
https://pypi.org/project/django-recaptcha/#installation
```python
(venv) user@mbp Django-fantom-blog % pip install django-recaptcha  
```
```python
# Django_fantom_blog/settings.py
INSTALLED_APPS = [
    ...,
    'captcha',
    ...
]
    ...
RECAPTCHA_PUBLIC_KEY = 'MyRecaptchaKey123'
RECAPTCHA_PRIVATE_KEY = 'MyRecaptchaPrivateKey456'
```
公開キーとプライベートキーは以下から取得する  
https://www.google.com/recaptcha/admin/create

```python
# posts/form.py
from .models import *
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field, Submit
from captcha.fields import ReCaptchaField
...
class CreateCommentForm(forms.ModelForm):
  captcha = ReCaptchaField() # added
  def __init__(self, *args, **kwargs):
    super(CreateCommentForm, self).__init__(*args, **kwargs)
    self.helper = FormHelper()
    self.helper.form_method="post"
    self.helper.layout = Layout (
      Field("name", css_class="form-control", placeholder="名前"),
      Field("email", css_class="form-control", placeholder="メールアドレス"),
      Field("content", css_class="form-control mb-10", placeholder="内容"),
      Field("captcha"), # added
    )
    self.helper.add_input(Submit('submit', 'コメントする', css_class="primary-btn submit_btn"))
    
  class Meta:
    model = Comment
    fields = ['name', 'email', 'content']
```
### フォームのエラー処理
views.pyのPostDetailクラスのdef form_valid(self, form)にif form.is_valid()条件を追加する
```python
# posts/views.py
class PostDetail(DetailView, FormMixin):
  template_name="posts/detail.html"
  model = Post
  context_object_name = 'single'
  form_class = CreateCommentForm
  
  def get(self, request, *args, **kwargs):
    self.hit = Post.objects.filter(id=self.kwargs['pk']).update(hit=F('hit')+1)
    return super(PostDetail,self).get(request, *args, **kwargs)
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    print('context',context['object'].publishing_date)
    pubDate = context['object'].publishing_date
     context['previous'] = Post.objects.filter(publishing_date__lt=pubDate).order_by('-publishing_date').first()
    print('previous',context['previous'])
    context['next'] = Post.objects.filter(publishing_date__gt=pubDate).order_by('publishing_date').first()
    print('next',context['next'])
    context['form'] = self.get_form
    return context
  
  def form_valid(self, form):
    if form.is_valid():　# added
      form.instance.post = self.object
      form.save()
      return super().form_valid(form)
    else:  # added
      return super(PostDetail, self).form_invalid(form)
  
  def post(self, *args, **kwargs):
    self.object = self.get_object()
    form = self.get_form()
    if form.is_valid():
      return self.form_valid(form)
    else:
      return self.form_invalid(form)
    
  def get_success_url(self):
    return reverse('detail', kwargs={"pk":self.object.id})
```
エラーメッセージを表示するためにBootsrapを使う
https://getbootstrap.jp/docs/5.0/components/alerts/  
components=>Alerts=>Dismissing
```html
<!-- posts/detail.html -->
  <div class="comment-form">
      <h4>返信する</h4>
      {% if form.errors %}
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <div id="form_errors">
          {% for key, value in form.errors.items %}
          <span class="fieldWrapper">
            {{ key }} : {{ value }}
          </span>
          {% endfor %}
        </div>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {% endif %}
      {% crispy form %}
  </div>
```
### ユーザープロファイルを作成する
ユーザモデルの作成
```python
# users/models.py
from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
import uuid
from PIL import Image

class UserProfile(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='ユーザー')
  birth_day = models.DateField(null=True, blank=True, verbose_name='誕生日')
  bio = models.TextField(max_length=1000, blank=True, verbose_name='自己紹介')
  image = models.ImageField(blank=True,null=True, default='users/author.png', upload_to='users', verbose_name='画像')
  id = models.UUIDField(verbose_name='ID', default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created_at =models.DateTimeField(verbose_name='登録日時', auto_now_add=True)
  # slug = models.SlugField(editable=False)
  
  def save(self, *args, **kwargs):
    # self.slug = slugify(self.user.username)
    super(UserProfile, self).save(*args, **kwargs)
    
    img = Image.open(self.image.path)
    if img.height > 200 or img.width > 200:
      new_size = (200, 200)
      img.thumbnail(new_size)
      img.save(self.image.path)
    
  def __str__(self):
    return str(self.user.username)
```
makemigrations & migrate
画像処理を行う（PIL 利用）  
https://daeudaeu.com/django-image-processing/  
```python
pip install Pillow
```
admin.pyにモデルを登録する
```python
# users/admin.py
from django.contrib import admin
from .models import UserProfile

admin.site.register(UserProfile)
```
### プロファイルを作成する
UserProfileにSignalを追加する
```python
# users/models.py
from django.db import models
from django.conf import settings
from django.template.defaultfilters import slugify
import uuid
from PIL import Image
from django.db.models.signals import post_save

class UserProfile(models.Model):
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='ユーザー')
  birth_day = models.DateField(null=True, blank=True, verbose_name='誕生日')
  bio = models.TextField(max_length=1000, blank=True, verbose_name='自己紹介')
  image = models.ImageField(blank=True,null=True, default='users/author.png', upload_to='users', verbose_name='画像')
  id = models.UUIDField(verbose_name='ID', default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created_at =models.DateTimeField(verbose_name='登録日時', auto_now_add=True)
  # slug = models.SlugField(editable=False)
  
  def save(self, *args, **kwargs):
    # self.slug = slugify(self.user.username)
    super(UserProfile, self).save(*args, **kwargs)
    
    img = Image.open(self.image.path)
    if img.height > 200 or img.width > 200:
      new_size = (200, 200)
      img.thumbnail(new_size)
      img.save(self.image.path)
      
  def __str__(self):
    return str(self.user.username)
    # return str(self.id)

  def create_user_profile(sender, instance, created, **kwargs):   # added
    if created: 
      UserProfile.objects.create(user=instance)
      
  post_save.connect(create_user_profile, sender=settings.AUTH_USER_MODEL) # added
```
```python
# users/forms.py
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field, Submit
from .models import UserProfile

class RegisterForm(UserCreationForm):
  username = forms.CharField(max_length=50)
  email = forms.EmailField(max_length=50)
  password1 = forms.CharField()
  password2 = forms.CharField()
  
  class Meta(UserCreationForm):
    model = User
    fields = ('username', 'email', 'password1', 'password2' )
    
    labels = {
      'username': '名前',
      'email': 'メールアドレス',
      'password1': 'パスワード',
      'password2': 'パスワード(確認)',
    }

class UsersProfileForm(forms.ModelForm):
  def __init__ (self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.helper = FormHelper()
    self.helper.form_method = 'post'
    self.helper.field_class='mt-10'
    self.helper.layout = Layout (
      Field("birth_day", css_class="single-input", placeholder="誕生日"),
      Field("bio", css_class="single-input", placeholder="自己紹介"),
      Field("image", css_class="single-input", placeholder="画像"),
    )
    self.helper.add_input(Submit('submit', '更新', css_class="genric-btn success-border medium"))

  class Meta:
    model = UserProfile
    fields = ('birth_day', 'bio', 'image')
    widgets = {
      'birth_day': forms.DateInput(attrs={'type':'date'})
    }
```
widgetsを'birth_day': forms.DateInput(attrs={'type':'date'})と設定すると更新画面で日付が入力できる
### ユーザプロファイルを更新する
UserProfileUpdateViewを作成する
```python
# users.views.py
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import CreateView, UpdateView
from .forms import RegisterForm, UsersProfileForm
from .models import UserProfile
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.urls import reverse

class RegisterView(CreateView):
  template_name = 'users/register.html'
  form_class = RegisterForm
  success_url = '/'
  
class UserLoginView(LoginView):
  template_name = 'users/login.html'

class UserLogoutView(LogoutView):
  template_name = 'users/login.html'
  
@method_decorator(login_required(login_url='/users/login'), name='dispatch')
class UserProfileUpdateView(UpdateView):
  model = UserProfile
  template_name = 'users/profile-update.html'
  form_class = UsersProfileForm
  
  def form_valid(self, form):
    form.instance.user = self.request.user
    form.save()
    return super().form_valid(form)
    
  def get_success_url(self):
    return reverse('users:update_profile', kwargs={'pk':self.object.id})

  # 別ユーザのIDがlocalhost:8000/users/update-profile/idのidに入力されたらホームにリダイレクトする
  def get(self, request, *args, **kwargs):
    self.object = self.get_object()
    if self.object.user != request.user:
      return HttpResponseRedirect('/')
    return super(UserProfileUpdateView,self).get(request, *args, **kwargs)
```
post-update.htmlを使ってuser-update.htmlを作成する
```html
<!-- templates/users/user-update.html -->
{% extends 'base.html'%}
{% load static %}
{% load crispy_forms_tags %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>プロファイル編集</h2>
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
                  <h2 style="text-align: center; color:blue">プロファイル編集</h2>
                  <div class="blog_left_sidebar">
                    {% crispy form %}
                  </div>

              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
### ユーザプロファイルを表示する
```python
# users.views.py
from django.views.generic import CreateView, UpdateView, ListView
from posts.models import Post

@method_decorator(login_required(login_url='/users/login'), name='dispatch')
class UserProfileView(ListView):
  template_name = 'users/my-profile.html'
  model = Post
  context_object_name = 'userposts'
  paginate_by = 5
  
  def get_context_data(self, **kwargs):
    context = super(UsersProfileView,self).get_context_data(**kwargs)
    context['userprofile'] = UserProfile.objects.get(user=self.request.user)
    return context
  
  def get_queryset(self):
    return Post.objects.filter(user=self.request.user).order_by('-publishing_date')
```
プロファイルのページmy-profile.htmlをcategory_detail.htmlをコピーして作成する  
名前：{{ userprofile.user.username|title}}で先頭の名前が大文字になる  
自己紹介：{{ userprofile.bio|linebreaks }}で改行が有効になる
```html
<!-- templates/users/my-profile.html -->
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>プロファイル</h2>
      <div class="page_link">
        <img src="{{ userprofile.image.url }}" alt="">
        <h4 style="color:white">名前：{{ userprofile.user.username|title}}</h4>
        <h4 style="color:white">誕生日：{{ userprofile.birth_day }}</h4>
        <h4 style="color:white">自己紹介：{{ userprofile.bio|linebreaks }}</h4>
        <a href="{% url 'users:update_profile' pk=userprofile.id %}" class="genric-btn info circle" style="margin-bottom:30px">変更</a>
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
                  <div class="blog_left_sidebar">
                      {% for post in userposts %}
                        <article class="blog_style1">
                          <div class="blog_img">
                            <img class="img-fluid" src={{ post.image.url }} alt="">
                          </div>
                          <div class="blog_text">
                          <div class="blog_text_inner">
                          {% for tag in post.tag.all %}
                            <a class="cat" href="#">{{ tag.title }}</a>
                          {% endfor %}
                            <a href="{% url 'detail' pk=post.id %}"><h4>{{ post.title | truncatechars:150}}</h4></a>
                            <p>{{ post.content }}</p>
                            <div class="date">
                              <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i>{{post.publishing_date}}</a>
                              <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
                            </div>	
                          </div>
                          </div>
                        </article>
                      {% endfor %}
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
                </div>
            </div>
      {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
### ユーザ別投稿(User Posts)を表示する
```python
# users/views.py
class UserPostView(ListView):
  template_name='users/user-post.html'
  model = Post
  context_object_name='posts'
  paginate_by = 5
  
  def get_queryset(self):
    return Post.objects.filter(user=self.kwargs['pk'])
```
pathをurls.pyに追加する
```python
# urls.py
from django.urls import path
from .views import *
from django.contrib.auth import views as authViews
from django.urls import reverse_lazy

app_name="users"
urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name="logout"),
    path('myprofile/', UserProfileView.as_view(), name="myprofile"),
    path('<str:pk>/', UserPostView.as_view(), name="user_posts"), # added
    path('update-profile/<str:pk>/', UserProfileUpdateView.as_view(), name="update_profile"), 
    path('password-change/', authViews.PasswordChangeView.as_view(success_url=reverse_lazy('users:password_change_done')), name="password_change"),
    path('password-change-done/', authViews.PasswordChangeDoneView.as_view(), name="password_change_done")
] 
```
投稿の詳細ページでクリックするとユーザ別投稿のページに遷移するように設定
```html
<!-- posts/detail.html -->
  <div class="float-right">
    <div class="media">
      <div class="media-body">
        <h5><a href="{% url 'users:user_posts' single.user.pk %}"> {{ single.user.username }}</a></h5>
        <p>{{ single.publishing_date }}</p>
      </div>
      <div class="d-flex">
        <img src="{% static "img/blog/user-img.jpg" %}" alt="">
      </div>
    </div>
  </div>
```
ユーザ別投稿のページのhmlを作成する(category_detail.htmlからコピー)
```html
<!-- users/user-post.html -->
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>ユーザ別投稿</h2>
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
                  <div class="blog_left_sidebar">
                      {% for post in posts %}
                        <article class="blog_style1">
                          <div class="blog_img">
                            <img class="img-fluid" src={{ post.image.url }} alt="">
                          </div>
                          <div class="blog_text">
                          <div class="blog_text_inner">
                          {% for tag in post.tag.all %}
                            <a class="cat" href="#">{{ tag.title }}</a>
                          {% endfor %}
                            <a href="{% url 'detail' pk=post.id %}"><h4>{{ post.title | truncatechars:150}}</h4></a>
                            <p>{{ post.content }}</p>
                            <div class="date">
                              <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i>{{post.publishing_date}}</a>
                              <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
                            </div>	
                          </div>
                          </div>
                        </article>
                      {% endfor %}
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
                </div>
            </div>
      {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
### ユーザリストを作成する
```html
<!-- templates/base.html -->
  <ul class="nav navbar-nav menu_nav">
    <li class="nav-item active"><a class="nav-link" href="{% url 'index' %}">ホーム</a></li> 
    <li class="nav-item"><a class="nav-link" href="category.html">カテゴリー</a></li>
    <li class="nav-item"><a class="nav-link" href="{% url 'users:user_list' %}">ユーザーリスト</a></li> # Changed
    {% if user.is_authenticated %}
    <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user.username}}</a>
      <ul class="dropdown-menu">
        <li class="nav-item"><a class="nav-link" href="{% url 'create_post' %}">投稿の追加</a></li>
        <li class="nav-item"><a class="nav-link" href="{% url 'users:password_change' %}">パスワードの変更</a></li>
        <li class="nav-item"><a class="nav-link" href="{% url 'users:myprofile' %}">プロフィール</a></li>
        <li class="nav-item"><a class="nav-link" href="{% url 'users:logout' %}">ログアウト</a></li>
      </ul>
    </li> 
```
```python
# users/views.py
class UserListView(ListView):
  template_name ='users/user-list.html'
  model = UserProfile
  context_object_name='profiles'
  paginate_by = 5
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context
```
ユーザーリストのhtmlを作成する
```html
<!-- templates/users/user-list.html -->
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>ユーザーリスト</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>
        <a href="#">{{ category.title }}</a>
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
                  <div class="blog_left_sidebar" style="text-align:center">
                      {% for profile in profiles %}
                      <div class="container" style="border-style:solid; border-width; 2px; border-color:green; margin-bottom:5px;">
                        <img src="{{ profile.image.url }}" alt="">
                        <h4>{{ profile.user.username }}</h4>
                        <p>{{ profile.bio }}</P>
                        <p>{{ profile.birth_day }}</P>
                      </div>
                      {% endfor %}
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
                </div>
            </div>
      {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
```python
# users/urls.py
from django.urls import path
from .views import *
from django.contrib.auth import views as authViews
from django.urls import reverse_lazy

app_name="users"
urlpatterns = [
    path('', UserListView.as_view(), name="user_list"),  #added
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name="logout"),
    path('myprofile/', UserProfileView.as_view(), name="myprofile"),
    path('<int:pk>/', UserPostView.as_view(), name="user_posts"),
    path('update-profile/<str:pk>/', UserProfileUpdateView.as_view(), name="update_profile"),
    path('password-change/', authViews.PasswordChangeView.as_view(success_url=reverse_lazy('users:password_change_done')), name="password_change"),
    path('password-change-done/', authViews.PasswordChangeDoneView.as_view(), name="password_change_done")
] 
```
### メニューバーにカテゴリーリストを表示する
```html
<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
  <ul class="nav navbar-nav menu_nav">
    <li class="nav-item active"><a class="nav-link" href="{% url 'index' %}">ホーム</a></li>
    <li class="nav-item submenu dropdown">
      <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">カテゴリー</a>
      <ul class="dropdown-menu">
          {% post_categories as categories %}
          {% for category in categories %}
          <li class="nav-item"><a class="nav-link" href="{% url 'category_detail' category.id %}">{{ category.title }}</a></li>
          {% endfor %}
      </ul>
    </li> 
    <li class="nav-item"><a class="nav-link" href="{% url 'users:user_list' %}">ユーザーリスト</a></li>
```
img class="img-fluid" src={{ post.image.url }} alt="" style="width:100%"  
style="width:100%" で画像の幅を広げる
### メッセージを表示する
UserProfileUpdateViewでSuccessMessageMixinを追加する
```python
# users/views.py
@method_decorator(login_required(login_url='/users/login'), name='dispatch')
class UserProfileUpdateView(SuccessMessageMixin, UpdateView):
  model = UserProfile
  template_name = 'users/profile-update.html'
  form_class = UsersProfileForm
  success_message ="プロフィールが更新されました"
  
  def form_valid(self, form):
    form.instance.user = self.request.user
    form.save()
    return super(UserProfileUpdateView,self).form_valid(form)
    
  def get_success_url(self):
    return reverse('users:update_profile', kwargs={'pk':self.object.id})
  
  # 別ユーザのIDがlocalhost:8000/users/update-profile/idのidに入力されたらホームにリダイレクトする
  def get(self, request, *args, **kwargs):
    self.object = self.get_object()
    if self.object.user != request.user:
      return HttpResponseRedirect('/')
    return super(UserProfileUpdateView,self).get(request, *args, **kwargs)
```
Django messagesで検索
```html
Sample: https://docs.djangoproject.com/en/4.1/ref/contrib/messages/
{% if messages %}
<ul class="messages">
    {% for message in messages %}
    <li{% if message.tags %} class="{{ message.tags }}"{% endif %}>{{ message }}</li>
    {% endfor %}
</ul>
{% endif %}
```
```html
<!-- templates/messages.html -->
{% if messages %}
    {% for message in messages %}
    <div class="alert alert-success alert-dismissible">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    {{ message }}
    </div>
    {% endfor %}
{% endif %}
```
```html
<!-- templates/base.html -->
<body>
    <!--================Header Menu Area =================-->
    <header class="header_area">
        {% include 'messages.html' %} # added
        <div class="logo_part">
          <div class="container">
            <a class="logo" href="#"><img src="{% static "img/logo.png" %}" alt=""></a>
          </div>
        </div>
```

```python


```
```python

```
```python

```


