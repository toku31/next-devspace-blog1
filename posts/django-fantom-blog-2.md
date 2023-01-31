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

```
```python

```
```python

```
```python

```

