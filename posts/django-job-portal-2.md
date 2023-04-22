---
title: 'Django Job Portal-2'
date: 'February 16, 2023'
excerpt: 'PythonのフレームワークであるDjangoを使って求人サイトを作成しました。２回目は検索機能の設定からデプロイまでです'
cover_image: '/images/posts/img5.jpg'
category: 'Python'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/7.jpg'
---
<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### 検索機能の作成
参考：Udemyの  [Django 3.0 MasterClass - Learn How To Create Django Apps](https://www.udemy.com/course/django-30-masterclass-learn-how-to-create-django-apps/)  
SearchViewの作成  
django-fantom-blog-2の「**検索機能を作成する**」を参照
```html
<!-- templates/jobs/index.html -->
  <form action="{% url 'jobs:search' %}" class="search-job" method='get'>
      <div class="row">
        <div class="col-md">
          <div class="form-group">
            <div class="form-field">
              <div class="icon"><span class="icon-briefcase"></span></div>
              <input type="text" name='job_title' class="form-control" placeholder="eg. Garphic. Web Developer">
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="form-group">
            <div class="form-field">
              <div class="select-wrap">
                <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                <select name="job_type" id="" class="form-control">
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                  <option value="temporary">Temporary</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="form-group">
            <div class="form-field">
              <div class="icon"><span class="icon-map-marker"></span></div>
              <input type="text" name="job_location" class="form-control" placeholder="Location">
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="form-group">
            <div class="form-field">
              <input type="submit" value="Search" class="form-control btn btn-primary">
            </div>
          </div>
        </div>
      </div>
    </form>
```
検索ボックスにformタグを追加して、action="{% url 'search' %}" method="get"とする
inputタグにname="q"を追加する
```python
# jobs/views.py
class SearchJobView(ListView):  # 136
  model = Job
  template_name = 'jobs/search.html'
  paginate_by = 2
  context_object_name = 'jobs'

  def get_queryset(self):
    q1 = self.request.GET.get("job_title")
    q2 = self.request.GET.get("job_type")
    q3 = self.request.GET.get("job_location")
    
    if q1 or q2 or q3:
      return Job.objects.filter(title__icontains=q1,
                                  job_type=q2, 
                                  location__icontains=q3 
                                  ).order_by('-publishing_date')
    return Job.objects.all().order_by('-publishing_date')
  
  def get_context_data(self, **kwargs):
    context = super(SearchJobView, self).get_context_data(**kwargs)
    self.category = get_object_or_404(Category, pk=self.kwargs['pk'])
    context['categories'] = Category.objects.all()
    return context
```
### 検索結果のテンプレートファイル作成
Search Result Template File  
index.htmlをコピーしてsearch.htmlを作成する
```
<a href="?job_title={{ request.GET.job_title }}&job_type={{request.GET.job_type}}&job_location={{request.GET.job_location}}&page={{ page_obj.previous_page_number }}"><</a>
```
```html
<!-- templates/jobs/search.html -->
{% extends 'base.html'%}
{% load static %}
{% block content %}
    <div class="hero-wrap js-fullheight" style="background-image: url('{% static 'images/bg_2.jpg' %}');" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-center justify-content-start" data-scrollax-parent="true">
          <div class="col-xl-10 ftco-animate mb-5 pb-5" data-scrollax=" properties: { translateY: '70%' }">
          	<p class="mb-4 mt-5 pt-5" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">We have <span class="number" data-number="850000">0</span> great job offers you deserve!</p>
            <h1 class="mb-5" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Your Dream <br><span>Job is Waiting</span></h1>

						<div class="ftco-search">
							<div class="row">
		            <div class="col-md-12 nav-link-wrap">
			            <div class="nav nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
			              <a class="nav-link active mr-md-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Find a Job</a>

			              <a class="nav-link" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Find a Candidate</a>

			            </div>
			          </div>
			          <div class="col-md-12 tab-wrap">
			            
			            <div class="tab-content p-4" id="v-pills-tabContent">

			              <div class="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
			              	<form action="{% url 'jobs:search' %}" class="search-job" method='get'>
			              		<div class="row">
			              			<div class="col-md">
			              				<div class="form-group">
				              				<div class="form-field">
				              					<div class="icon"><span class="icon-briefcase"></span></div>
								                <input type="text" name='job_title' class="form-control" placeholder="eg. Garphic. Web Developer">
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
				              					<div class="select-wrap">
						                      <div class="icon"><span class="ion-ios-arrow-down"></span></div>
						                      <select name="job_type" id="" class="form-control">
						                      	<option value="full_time">フルタイム</option>
						                        <option value="part_time">パートタイム</option>
						                        <option value="freelance">フリーランス</option>
						                        <option value="internship">インターンシップ</option>
						                        <option value="temporary">アルバイト</option>
						                      </select>
						                    </div>
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
				              					<div class="icon"><span class="icon-map-marker"></span></div>
								                <input type="text" name="job_location" class="form-control" placeholder="Location">
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
								                <input type="submit" value="Search" class="form-control btn btn-primary">
								              </div>
							              </div>
			              			</div>
			              		</div>
			              	</form>
			              </div>
			            </div>
			          </div>
			        </div>
		        </div>
          </div>
        </div>
      </div>
    </div>

    <section class="ftco-section services-section bg-light">
      <div class="container">
        <div class="row d-flex">
          <div class="col-md-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-resume"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Search Millions of Jobs</h3>
                <p>A small river named Duden flows by their place and supplies.</p>
              </div>
            </div>      
          </div>
          <div class="col-md-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-collaboration"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Easy To Manage Jobs</h3>
                <p>A small river named Duden flows by their place and supplies.</p>
              </div>
            </div>    
          </div>
          <div class="col-md-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-promotions"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Top Careers</h3>
                <p>A small river named Duden flows by their place and supplies.</p>
              </div>
            </div>      
          </div>
          <div class="col-md-3 d-flex align-self-stretch ftco-animate">
            <div class="media block-6 services d-block">
              <div class="icon"><span class="flaticon-employee"></span></div>
              <div class="media-body">
                <h3 class="heading mb-3">Search Expert Candidates</h3>
                <p>A small river named Duden flows by their place and supplies.</p>
              </div>
            </div>      
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section ftco-counter">
    	<div class="container">
    		<div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section text-center ftco-animate">
          	<span class="subheading">Categories work wating for you</span>
            <h2 class="mb-4"><span>Current</span> Job Posts</h2>
          </div>
        </div>
        <div class="row">
          {% for category in categories %}
        	<div class="col-md-3 ftco-animate">
        		<ul class="category">
        			<li><a href="{% url 'jobs:category_detail' pk=category.id %}">{{category.title}}<span class="number" data-number="{{category.job_count}}">0</span></a></li>
        		</ul>
        	</div>
          {% endfor %}
        </div>
    	</div>
    </section>

		<section class="ftco-section bg-light">
			<div class="container">
				<div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section text-center ftco-animate">
          	<span class="subheading">Results for {{request.GET.job_title}}</span>
            <h2 class="mb-4"><span>{{request.GET.job_title}}の</span>検索結果</h2>
          </div>
        </div>
				<div class="row">

          {% for job in jobs %}
          <div class="col-md-12 ftco-animate">
						<div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

						  <div class="mb-4 mb-md-0 mr-5">
						   <div class="job-post-item-header d-flex align-items-center">
						     <h2 class="mr-3 text-black h4">{{ job.title }}</h2>
						     <div class="badge-wrap">
                  {% if job.job_type == 'full_time' %}
						      <span class="bg-warning text-white badge py-2 px-3">フルタイム</span>
                  {% elif job.job_type == 'part_time' %}
						      <span class="bg-info text-white badge py-2 px-3">パートタイム</span>
                  {% elif job.job_type == 'freelance' %}
						      <span class="bg-secondary text-white badge py-2 px-3">フリーランス</span>
                  {% elif job.job_type == 'internship' %}
						      <span class="bg-info text-white badge py-2 px-3">インターンシップ</span>
                  {% elif job.job_type == 'temporary' %}
						      <span class="bg-danger text-white badge py-2 px-3">アルバイト</span>
                  {% endif %}
						     </div>
						   </div>
						   <div class="job-post-item-body d-block d-md-flex">
						     <div class="mr-3"><span class="icon-layers"></span> <a href="#">{{ job.company }}</a></div>
						     <div><span class="icon-my_location"></span> <span>{{ job.location }}</span></div>
						   </div>
						  </div>

						  <div class="ml-auto d-flex">
						  	<a href="{% url 'jobs:single_job' job.pk %}" class="btn btn-primary py-2 mr-1">応募する</a>
                <a href="#" class="btn btn-danger rounded-circle btn-favorite d-flex align-items-center">
                	<span class="icon-heart"></span>
                </a>
              </div>

						</div>
          </div> <!-- end -->
          {% endfor %}

				</div>
				<div class="row mt-5">
          {% if is_paginated %}
          <div class="col text-center">
            <div class="block-27">
              <ul>
                {% if page_obj.has_previous %}
                <li><a href="?job_title={{ request.GET.job_title }}&job_type={{request.GET.job_type}}&job_location={{request.GET.job_location}}&page={{ page_obj.previous_page_number }}"><</a></li>
                {% else %}
                <li class="disabled"><span>&lt;</span></li>
                {% endif %}
                {% for i in paginator.page_range %}
                  {% if page_obj.number == i %}
                    <li class="active"><span>{{i}}</span></li>
                  {% else %}
                    <li><a href="?job_title={{ request.GET.job_title }}&job_type={{request.GET.job_type}}&job_location={{request.GET.job_location}}&page={{ i }}">{{i}}</a></li>
                  {% endif %}
                {% endfor %}
                {% if page_obj.has_next %}
                <li><a href="?job_title={{ request.GET.job_title }}&job_type={{request.GET.job_type}}&job_location={{request.GET.job_location}}&page={{ page_obj.next_page_number }}">></a></li>
                {% else %}
                <li class="disabled"><span>&gt;</span></li>
                {% endif %}
              </ul>
            </div>
          </div>
          {% endif %}
        </div>
			</div>
		</section>
   
    <section class="ftco-section ftco-counter img" id="section-counter" style="background-image: url(images/bg_1.jpg);" data-stellar-background-ratio="0.5">
    	<div class="container">
    		<div class="row justify-content-center">
    			<div class="col-md-10">
		    		<div class="row">
		          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div class="block-18 text-center">
		              <div class="text">
		                <strong class="number" data-number="1350000">0</strong>
		                <span>Jobs</span>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div class="block-18 text-center">
		              <div class="text">
		                <strong class="number" data-number="40000">0</strong>
		                <span>Members</span>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div class="block-18 text-center">
		              <div class="text">
		                <strong class="number" data-number="30000">0</strong>
		                <span>Resume</span>
		              </div>
		            </div>
		          </div>
		          <div class="col-md-3 d-flex justify-content-center counter-wrap ftco-animate">
		            <div class="block-18 text-center">
		              <div class="text">
		                <strong class="number" data-number="10500">0</strong>
		                <span>Company</span>
		              </div>
		            </div>
		          </div>
		        </div>
	        </div>
        </div>
    	</div>
    </section>

    <section class="ftco-section testimony-section">
      <div class="container">
        <div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 text-center heading-section ftco-animate">
          	<span class="subheading">Testimonial</span>
            <h2 class="mb-4"><span>Happy</span> Clients</h2>
          </div>
        </div>
        <div class="row ftco-animate">
          <div class="col-md-12">
            <div class="carousel-testimony owl-carousel ftco-owl">
              <div class="item">
                <div class="testimony-wrap py-4 pb-5">
                  <div class="user-img mb-4" style="background-image: url(images/person_1.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text">
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Roger Scott</p>
                    <span class="position">Marketing Manager</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4 pb-5">
                  <div class="user-img mb-4" style="background-image: url(images/person_2.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text">
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Roger Scott</p>
                    <span class="position">Interface Designer</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4 pb-5">
                  <div class="user-img mb-4" style="background-image: url(images/person_3.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text">
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Roger Scott</p>
                    <span class="position">UI Designer</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4 pb-5">
                  <div class="user-img mb-4" style="background-image: url(images/person_1.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text">
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Roger Scott</p>
                    <span class="position">Web Developer</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="testimony-wrap py-4 pb-5">
                  <div class="user-img mb-4" style="background-image: url(images/person_1.jpg)">
                    <span class="quote d-flex align-items-center justify-content-center">
                      <i class="icon-quote-left"></i>
                    </span>
                  </div>
                  <div class="text">
                    <p class="mb-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <p class="name">Roger Scott</p>
                    <span class="position">System Analyst</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="ftco-section bg-light">
      <div class="container">
        <div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section text-center ftco-animate">
          	<span class="subheading">Our Blog</span>
            <h2><span>Recent</span> Blog</h2>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-md-3 d-flex ftco-animate">
            <div class="blog-entry align-self-stretch">
              <a href="blog-single.html" class="block-20" style="background-image: url('{% static 'images/image_1.jpg' %}');">
              </a>
              <div class="text mt-3">
              	<div class="meta mb-2">
                  <div><a href="#">December 2, 2018</a></div>
                  <div><a href="#">Admin</a></div>
                  <div><a href="#" class="meta-chat"><span class="icon-chat"></span> 3</a></div>
                </div>
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto enim non iste maxime optio, ut com</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-flex ftco-animate">
            <div class="blog-entry align-self-stretch">
              <a href="blog-single.html" class="block-20" style="background-image: url('{% static 'images/image_2.jpg' %}');">
              </a>
              <div class="text mt-3">
              	<div class="meta mb-2">
                  <div><a href="#">December 2, 2018</a></div>
                  <div><a href="#">Admin</a></div>
                  <div><a href="#" class="meta-chat"><span class="icon-chat"></span> 3</a></div>
                </div>
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nobis natus incidunt officia assumenda.</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-flex ftco-animate">
            <div class="blog-entry align-self-stretch">
              <a href="blog-single.html" class="block-20" style="background-image: url('{% static 'images/image_3.jpg' %}');">
              </a>
              <div class="text mt-3">
              	<div class="meta mb-2">
                  <div><a href="#">December 2, 2018</a></div>
                  <div><a href="#">Admin</a></div>
                  <div><a href="#" class="meta-chat"><span class="icon-chat"></span> 3</a></div>
                </div>
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi obcaecati praesentium,</p>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-flex ftco-animate">
            <div class="blog-entry align-self-stretch">
              <a href="blog-single.html" class="block-20" style="background-image: url('{% static 'images/image_4.jpg' %}');">
              </a>
              <div class="text mt-3">
              	<div class="meta mb-2">
                  <div><a href="#">December 2, 2018</a></div>
                  <div><a href="#">Admin</a></div>
                  <div><a href="#" class="meta-chat"><span class="icon-chat"></span> 3</a></div>
                </div>
                <h3 class="heading"><a href="#">Even the all-powerful Pointing has no control about the blind texts</a></h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor minima, dolores quis, dolorum accusamu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

{% endblock %}
```
### 仕事を応募するボタンの作成
create Apply Job Button  
仕事応募用のフォームを作成する
```python
# jobs/form.py
from django import forms
from .models import *

class CreateJobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'company', 'location',
                  'job_type', 'category', 'description']
        widgets = {'job_type': forms.RadioSelect}

class ApplyJobForm(forms.ModelForm):　# added
    class Meta:
        model = Job
        fields = []
```
Jobモデルのプロパティーにemployeeを追加するManyToManyFieldで定義する
```python
class Job(models.Model):
    title = models.CharField(max_length=300, verbose_name='タイトル')
    company = models.CharField(max_length=300, verbose_name='会社')
    CHOICES = (
        ('full_time', 'フルタイム'),
        ('part_time', 'パートタイム'),
        ('freelance', 'フリーランス'),
        ('internship', 'インターンシップ'),
        ('temporary', 'アルバイト'),
    )

    job_type = models.CharField(
        max_length=20, blank=False, default=None, choices=CHOICES, verbose_name='勤務形態')
    location = models.CharField(
        max_length=200, blank=False, default=None, verbose_name='勤務地')
    description = RichTextField(blank=False, default=None, verbose_name='仕事内容')
    publishing_date = models.DateTimeField(
        auto_now_add=True, verbose_name='公開日')
    # slug = models.SlugField(default=None, editable=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True,
                          primary_key=True, editable=False)
    employer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, verbose_name='雇用主')
    employee = models.ManyToManyField(
        settings.AUTH_USER_MODEL, default=None, blank=True, related_name='job_employee', verbose_name='従業員') # added
    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 related_name="jobs", null=True, blank=True, verbose_name='カテゴリー', )

    def __str__(self):
        return self.title

    # def save(self, *args, **kwargs):
    #   self.slugify(self.title)
    #   super(Job, self).save(*args, **kwargs)

    class Meta:
        ordering = ('-publishing_date',)
```
仕事を応募するボタンを作成する
```html
<!-- templates/jobs/single.html -->
<section class="ftco-section ftco-degree-bg">
  <div class="container">
    <div class="row">
      <div class="col-md-8 ftco-animate">
        <h2 class="mb-3">{{ job.title }}</h2>
        <p>{{ job.description | safe }}</p>
        <hr />
        <form method="post">
          {% csrf_token %}
        {% if user.is_employee %}
        <input type="submit" value="応募する" class="btn-primary py-2 mr-1" />
        {% endif %}
        </form>
      </div>
```
```python
# jobs/views.py
# class SingleJobView(DetailView): # DetailViewはｆormを使うことができない
class SingleJobView(SuccessMessageMixin, UpdateView):
  template_name = 'jobs/single.html'
  model = Job
  context_object_name = 'job'
  form_class = ApplyJobForm
  success_message = "仕事の応募が完了しました"

  def get_context_data(self, **kwargs):
    context = super(SingleJobView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context
  
  def form_valid(self, form):
    employee = self.request.user
    form.instance.employee.add(employee)
    form.save()
    return super(SingleJobView, self).form_valid(form)
  
  def get_success_url(self):
    return reverse('jobs:single_job', kwargs={"pk":self.object.pk})
```
一度応募ボタンをクリックして応募済みの時は、ボタンを非活性にして応募できないようにする
```python
class SingleJobView(SuccessMessageMixin, UpdateView):
  template_name = 'jobs/single.html'
  model = Job
  context_object_name = 'job'
  form_class = ApplyJobForm
  success_message = "仕事の応募が完了しました"

  def get_context_data(self, **kwargs):
    print('self.request.user', self.request.user)
    context = super(SingleJobView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    context['employee_applied']=Job.objects.get(pk=self.kwargs['pk']).employee.all().filter(id=self.request.user.id) # added
    return context
  
  def form_valid(self, form):
    employee = self.request.user
    form.instance.employee.add(employee)
    form.save()
    return super(SingleJobView, self).form_valid(form)
  
  def get_success_url(self):
    return reverse('jobs:single_job', kwargs={"pk":self.object.pk})
```
```python
# templates/jobs/single.html
<form method="post">
  {% csrf_token %}
{% if user.is_employee %}
<div class="ml-auto d-flex">
  {% if employee_applied %}
  <input type="submit" value="応募する" class="btn btn-primary py-2 mr-1" disabled title="既に応募済みです">
  {% else %}
  <input type="submit" value="応募する" class="btn btn-primary py-2 mr-1" />
  <a href="#" class="btn btn-danger rounded-circle btn-favorite d-flex align-items-center">
    <span class="icon-heart"></span>
  </a>
  {% endif %}
</div>
{% endif %}
</form>
```
### How to List Applied Candidates
```python
# src/jobs/views.py
class SingleJobView(SuccessMessageMixin, UpdateView):
  template_name = 'jobs/single.html'
  model = Job
  context_object_name = 'job'
  form_class = ApplyJobForm
  success_message = "仕事の応募が完了しました"

  def get_context_data(self, **kwargs):
    print('self.request.user', self.request.user)
    print('self.request.user.id', self.request.user.id)
    context = super(SingleJobView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    # employeeが自分が応募した仕事かを確認する
    context['employee_applied']=Job.objects.get(pk=self.kwargs['pk']).employee.all().filter(id=self.request.user.id)
    # employerが自身が募集した仕事に応募者がいるか確認する
    context['applied_employees']=Job.objects.get(pk=self.kwargs['pk']).employee.all()
    
    return context
```
BootstrapのList groupを使う  
https://getbootstrap.jp/docs/5.0/components/list-group/
```html
<div class="list-group">
  <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
    The current button
  </button>
  <button type="button" class="list-group-item list-group-item-action">A second item</button>
  <button type="button" class="list-group-item list-group-item-action">A third button item</button>
  <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
</div>
```
```python
text-alignプロパティは文字以外に画像に対しても使うことができる
imgタグなどのインライン要素を中央揃えするには、外側をブロック要素で囲い、「text-align: center」と指定する
<div style=”text-align: center;”><img src=”画像パス” /></div>
実際に画像を表示するコードは下記のようになる
<div style=”text-align: center;”><img src=”img/sample1.jpg” /></div>
ブロック要素内のインライン要素」以外にはtext-align: center;は効かない
```
```html
{% if applied_employees %}
  <div class="list-group">
    <button type="button" class="list-group-item list-group-item-action active" style="text-align:center">
    応募者
    </button>
    {% for employee in applied_employees %}
    <button type="button" class="list-group-item list-group-item-action">{{employee.first_name}}</button>
    {% endfor %}
  </div>
{% else %}
<div class="list-group">
  <button type="button" class="list-group-item list-group-item-action active" style="text-align:center">
  応募者はいません
  </button>
</div>
{% endif %}
```
```js
import { Navigate } from 'react-router-dom';

function MyComponent() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return <div>Welcome to My App!</div>;
}
```
従業員には応募者リストを見せないようにする  
また雇用主は自分の募集する仕事の応募者しか見れないようにする  
jobテーブルにはemployer_idというプロパティがあるのでこれで雇用主を特定する
```html
 <!-- templates/jobs/single.html -->
{% if user.is_employer %}
  {% if applied_employees %}
    <div class="list-group">
      <button type="button" class="list-group-item list-group-item-action active" style="text-align:center">
      応募者
      </button>
      {% for employee in applied_employees %}
      <button type="button" class="list-group-item list-group-item-action">{{employee.first_name}}</button>
      {% endfor %}
    </div>
  {% else %}
  <div class="list-group">
    <button type="button" class="list-group-item list-group-item-action active" style="text-align:center">
    応募者はいません
    </button>
  </div>
  {% endif %}
{% endif %}
```

```python
# src/jobs/views.py
class SingleJobView(SuccessMessageMixin, UpdateView):
  template_name = 'jobs/single.html'
  model = Job
  context_object_name = 'job'
  form_class = ApplyJobForm
  success_message = "仕事の応募が完了しました"

  def get_context_data(self, **kwargs):
    print('self.request.user', self.request.user)
    print('self.request.user.id', self.request.user.id)
    context = super(SingleJobView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
     # employeeが自分が応募した仕事かを確認する
    context['employee_applied']=Job.objects.get(pk=self.kwargs['pk']).employee.all().filter(id=self.request.user.id)
     # employerが自身が募集した仕事に応募者がいるか確認する
    try:
      context['applied_employees']=Job.objects.get(pk=self.kwargs['pk'], employer_id=self.request.user.id).employee.all()
    except:
      pass   
    return context
  
  def form_valid(self, form):
    employee = self.request.user
    form.instance.employee.add(employee)
    form.save()
    return super(SingleJobView, self).form_valid(form)
  
  def get_success_url(self):
    return reverse('jobs:single_job', kwargs={"pk":self.object.pk})
```
### Employee　Profileを作成する
```python
from django.views.generic import CreateView, UpdateView, DetailView
・・・
from .models import Account

# users/views.py
class EmployeeProfileView(DetailView):
  template_name ='users/employee-profile.html'
  model = Account
  
  def get_context_data(self, **kwargs):
    context = super(EmployeeProfileView, self).get_context_data(**kwargs)
    context['account'] = Account.objects.get(pk=self.kwargs['pk'])
    context['profile'] = Profile.objects.get(user_id = self.kwargs['pk'])
    return context
```
```python
from django.urls import path
from .views import *

app_name = "users"
urlpatterns = [
    path('register', UserRegisterView.as_view(), name="register"),
    path('login', UserLoginView.as_view(), name="login"),
    path('logout', UserLogoutView.as_view(), name="logout"),
    path('update-profile/<int:pk>/', UserUpdateView.as_view(), name="update_profile"),
    path('employee-profile/<int:pk>/', EmployeeProfileView.as_view(), name="employee_profile"),
]
```
```html
<!-- templates/users/employee-profile.html -->
  {% if user.is_employer and user.id == employer_id %}
    {% if applied_employees %}
      <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action active" style="text-align:center">
        応募者
        </button>
        {% for employee in applied_employees %}
        <a href="{% url 'users:employee_profile' pk=employee.pk %}" class="list-group-item list-group-item-action">{{employee.first_name}}</a>
        {% endfor %}
      </div>
    {% else %}
    <div class="list-group">
      <button type="button" class="list-group-item list-group-item-action active" style="text-align:center">
      応募者はいません
      </button>
    </div>
    {% endif %}
  {% endif %}
```
### employee-profile.htmlを編集する
single.htmlをコピーして使う
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