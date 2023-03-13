---
title: 'Django Job Portal-1'
date: 'February 15, 2023'
excerpt: 'PythonのフレームワークであるDjangoを使って求人サイトを作成しました。１回目は仮想環境の設定から新しいPostを作成までです'
cover_image: '/images/posts/img5.jpg'
category: 'Python'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/men/7.jpg'
---
<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
### プロジェクトの作成
参考：Udemyの  [Django 3.0 MasterClass - Learn How To Create Django Apps](https://www.udemy.com/course/django-30-masterclass-learn-how-to-create-django-apps/)
pythonのバージョン確認
```python
user@mbp Django % python -m django --version
4.0.4
```
**Django Girls のチュートリアル**を参考  
仮想環境:https://tutorial.djangogirls.org/ja/django_installation/

```python
user@mbp Django % mkdir Job-Portal
user@mbp Django % cd Job-Portal
user@mbp Job-Portal % python3 -m venv venv
user@mbp Job-Portal % source venv/bin/activate
(venv) user@mbp Job-Portal% pip install Django
(venv) user@mbp Job-Portal%code .
(venv) user@mbp Job-Portal % pip freeze
asgiref==3.6.0
Django==4.1.7
sqlparse==0.4.3
(venv) user@mbp Job-Portal  % django-admin startproject job .
# プロジェクト名にハイフンを使ってはいかない　アンダースコアならOK
(venv) user@mbp Job-Portal % python manage.py runserver
# 事前に.gitignoreを貼り付ける
user@mbp Job-Portal % git init
```
```python
(venv) user@mbp Django-tutorial-blog % python manage.py runserver 7000
```
Starting development server at http://127.0.0.1:7000/
### Xampp Serverをインストールする
https://www.apachefriends.org/jp/download.html  
MySQlを使う
### Mysqlclient Packageをインストールする
https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient

### Static Files Folderを作成する
Static Files Directory の作成
https://docs.djangoproject.com/en/4.1/howto/static-files/
```python
# settings.py
LANGUAGE_CODE = 'ja'
TIME_ZONE = 'Asia/Tokyo'

STATIC_URL = '/static/'
STATICFILES_DIRS = [  # add
    BASE_DIR / "static", # または　os.path.join(BASE_DIR, 'static')
]
```
アップロードした時に使うmediaディレクトリをsettings.pyに設定する
```python
import os
# settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```
ルートフォルダ(Django_fantom_blog)の直下にstatic, media, templates フォルダを作成する  
Templates Directoryの作成　settings.pyにtemplatesのルートを設定する
```python
// settings.py
import os
   . . .
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], # 追加
        'APP_DIRS': True,
    }
```
main(Django_fantom_blog)のurls.pyに以下を追加
```python
# Django_fantom_blog/urls.py
from django.contrib import admin
from django.urls import path
from django.conf import settings  # added
from django.conf.urls.static import static # added

urlpatterns = [
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # added
```
### 最初のAppを作成する

データベースのマイグレーションから
```python
(venv) user@mbp Job-Portal% python manage.py migrate 
```
db.qlite3を右クリック→Open Database→SQLITE EXPLORER  
次にDjango Appの作成
```python
(venv) user@mbp Job-Portal% python manage.py startapp jobs
```
__appをsetting.pyに登録する__
```python
# settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jobs.apps.JobsConfig', 　// added
]
```
作成したpostsにurls.pyファイルを作成する  
fantom-blogのurls.pyにpostsのurls.pyを下記のようにincludeする
```python
# Django-fantom-blog/urls.py
from django.contrib import admin
from django.urls import path, include # added
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('jobs.urls')),  # added
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
### 最初のTemplate Fileを作成する
staticフォルダの配下にcss, fonts, img, js, scss, vendorsフォルダを作成する  
templateフォルダの配下にjobsフォルダを作成してindex.htmlファイルを作成する  
index.htmlファイルに下記のデザイン済みのhtmlファイルをコピーする  
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JobPortal - Free Bootstrap 4 Template by Colorlib</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,600,700,800,900" rel="stylesheet">

    <link rel="stylesheet" href="css/open-iconic-bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">
    
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">

    <link rel="stylesheet" href="css/aos.css">

    <link rel="stylesheet" href="css/ionicons.min.css">

    <link rel="stylesheet" href="css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="css/jquery.timepicker.css">
    
    <link rel="stylesheet" href="css/flaticon.css">
    <link rel="stylesheet" href="css/icomoon.css">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    
	  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div class="container">
	      <a class="navbar-brand" href="index.html">JobPortal</a>
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="oi oi-menu"></span> Menu
	      </button>

	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav ml-auto">
	          <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
	          <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
	          <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
	          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
	          <li class="nav-item cta mr-md-2"><a href="new-post.html" class="nav-link">Post a Job</a></li>
	          <li class="nav-item cta cta-colored"><a href="job-post.html" class="nav-link">Want a Job</a></li>

	        </ul>
	      </div>
	    </div>
	  </nav>
    <!-- END nav -->
    <div class="hero-wrap js-fullheight" style="background-image: url('images/bg_2.jpg');" data-stellar-background-ratio="0.5">
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
			              	<form action="#" class="search-job">
			              		<div class="row">
			              			<div class="col-md">
			              				<div class="form-group">
				              				<div class="form-field">
				              					<div class="icon"><span class="icon-briefcase"></span></div>
								                <input type="text" class="form-control" placeholder="eg. Garphic. Web Developer">
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
				              					<div class="select-wrap">
						                      <div class="icon"><span class="ion-ios-arrow-down"></span></div>
						                      <select name="" id="" class="form-control">
						                      	<option value="">Category</option>
						                      	<option value="">Full Time</option>
						                        <option value="">Part Time</option>
						                        <option value="">Freelance</option>
						                        <option value="">Internship</option>
						                        <option value="">Temporary</option>
						                      </select>
						                    </div>
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
				              					<div class="icon"><span class="icon-map-marker"></span></div>
								                <input type="text" class="form-control" placeholder="Location">
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

			              <div class="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-performance-tab">
			              	<form action="#" class="search-job">
			              		<div class="row">
			              			<div class="col-md">
			              				<div class="form-group">
				              				<div class="form-field">
				              					<div class="icon"><span class="icon-user"></span></div>
								                <input type="text" class="form-control" placeholder="eg. Adam Scott">
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
				              					<div class="select-wrap">
						                      <div class="icon"><span class="ion-ios-arrow-down"></span></div>
						                      <select name="" id="" class="form-control">
						                      	<option value="">Category</option>
						                      	<option value="">Full Time</option>
						                        <option value="">Part Time</option>
						                        <option value="">Freelance</option>
						                        <option value="">Internship</option>
						                        <option value="">Temporary</option>
						                      </select>
						                    </div>
								              </div>
							              </div>
			              			</div>
			              			<div class="col-md">
			              				<div class="form-group">
			              					<div class="form-field">
				              					<div class="icon"><span class="icon-map-marker"></span></div>
								                <input type="text" class="form-control" placeholder="Location">
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
        	<div class="col-md-3 ftco-animate">
        		<ul class="category">
        			<li><a href="#">Web Development <span class="number" data-number="1000">0</span></a></li>
        			<li><a href="#">Graphic Designer <span class="number" data-number="1000">0</span></a></li>
        			<li><a href="#">Multimedia <span class="number" data-number="2000">0</span></a></li>
        			<li><a href="#">Advertising <span class="number" data-number="900">0</span></a></li>
        		</ul>
        	</div>
        	<div class="col-md-3 ftco-animate">
        		<ul class="category">
        			<li><a href="#">Education &amp; Training <span class="number" data-number="3500">0</span></a></li>
        			<li><a href="#">English <span class="number" data-number="1560">0</span></a></li>
        			<li><a href="#">Social Media <span class="number" data-number="1000">0</span></a></li>
        			<li><a href="#">Writing <span class="number" data-number="2500">0</span></a></li>
        		</ul>
        	</div>
        	<div class="col-md-3 ftco-animate">
        		<ul class="category">
        			<li><a href="#">PHP Programming <span class="number" data-number="5500">0</span></a></li>
        			<li><a href="#">Project Management <span class="number" data-number="2000">0</span></a></li>
        			<li><a href="#">Finance Management <span class="number" data-number="800">0</span></a></li>
        			<li><a href="#">Office &amp; Admin <span class="number" data-number="7000">0</span></a></li>
        		</ul>
        	</div>
        	<div class="col-md-3 ftco-animate">
        		<ul class="category">
        			<li><a href="#">Web Designer <span><span class="number" data-number="8000">0</span></span></a></li>
        			<li><a href="#">Customer Service <span class="number" data-number="4000">0</span></a></li>
        			<li><a href="#">Marketing &amp; Sales <span class="number" data-number="3300">0</span></a></li>
        			<li><a href="#">Software Development <span class="number" data-number="1356">0</span></a></li>
        		</ul>
        	</div>
        </div>
    	</div>
    </section>

		<section class="ftco-section bg-light">
			<div class="container">
				<div class="row justify-content-center mb-5 pb-3">
          <div class="col-md-7 heading-section text-center ftco-animate">
          	<span class="subheading">Recently Added Jobs</span>
            <h2 class="mb-4"><span>Recent</span> Jobs</h2>
          </div>
        </div>
				<div class="row">
					<div class="col-md-12 ftco-animate">

            <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
                <div class="job-post-item-header d-flex align-items-center">
                  <h2 class="mr-3 text-black h3">Frontend Development</h2>
                  <div class="badge-wrap">
                   <span class="bg-primary text-white badge py-2 px-3">Partime</span>
                  </div>
                </div>
                <div class="job-post-item-body d-block d-md-flex">
                  <div class="mr-3"><span class="icon-layers"></span> <a href="#">Facebook, Inc.</a></div>
                  <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
                </div>
              </div>

              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
            </div>
          </div><!-- end -->

          <div class="col-md-12 ftco-animate">
						<div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

						  <div class="mb-4 mb-md-0 mr-5">
						   <div class="job-post-item-header d-flex align-items-center">
						     <h2 class="mr-3 text-black h4">Full Stack Developer</h2>
						     <div class="badge-wrap">
						      <span class="bg-warning text-white badge py-2 px-3">Full Time</span>
						     </div>
						   </div>
						   <div class="job-post-item-body d-block d-md-flex">
						     <div class="mr-3"><span class="icon-layers"></span> <a href="#">Google, Inc.</a></div>
						     <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
						   </div>
						  </div>

						  <div class="ml-auto d-flex">
						  	<a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-danger rounded-circle btn-favorite d-flex align-items-center">
                	<span class="icon-heart"></span>
                </a>
              </div>

						</div>
          </div> <!-- end -->
          <div class="col-md-12 ftco-animate">
           <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
               <div class="job-post-item-header d-flex align-items-center">
                 <h2 class="mr-3 text-black h4">Open Source Interactive Developer</h2>
                 <div class="badge-wrap">
                  <span class="bg-info text-white badge py-2 px-3">Freelance</span>
                 </div>
               </div>
               <div class="job-post-item-body d-block d-md-flex">
                 <div class="mr-3"><span class="icon-layers"></span> <a href="#">New York Times</a></div>
                 <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
               </div>
              </div>
              
              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
           </div>
         </div> <!-- end -->
         <div class="col-md-12 ftco-animate">

           <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
               <div class="job-post-item-header d-flex align-items-center">
                 <h2 class="mr-3 text-black h4">Frontend Development</h2>
                 <div class="badge-wrap">
                  <span class="bg-secondary text-white badge py-2 px-3">Internship</span>
                 </div>
               </div>
               <div class="job-post-item-body d-block d-md-flex">
                 <div class="mr-3"><span class="icon-layers"></span> <a href="#">Facebook, Inc.</a></div>
                 <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
               </div>
              </div>

              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
           </div>
         </div> <!-- end -->
         <div class="col-md-12 ftco-animate">
           <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
               <div class="job-post-item-header d-flex align-items-center">
                 <h2 class="mr-3 text-black h4">Open Source Interactive Developer</h2>
                 <div class="badge-wrap">
                  <span class="bg-danger text-white badge py-2 px-3">Temporary</span>
                 </div>
               </div>
               <div class="job-post-item-body d-block d-md-flex">
                 <div class="mr-3"><span class="icon-layers"></span> <a href="#">New York Times</a></div>
                 <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
               </div>
              </div>
              
              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
           </div>
         </div> <!-- end -->
         <div class="col-md-12 ftco-animate">

            <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
                <div class="job-post-item-header d-flex align-items-center">
                  <h2 class="mr-3 text-black h3">Frontend Development</h2>
                  <div class="badge-wrap">
                   <span class="bg-primary text-white badge py-2 px-3">Partime</span>
                  </div>
                </div>
                <div class="job-post-item-body d-block d-md-flex">
                  <div class="mr-3"><span class="icon-layers"></span> <a href="#">Facebook, Inc.</a></div>
                  <div><span class="icon-map-marker"></span> <span>Western City, UK</span></div>
                </div>
              </div>

              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
            </div>
          </div><!-- end -->

          <div class="col-md-12 ftco-animate">
						<div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

						  <div class="mb-4 mb-md-0 mr-5">
						   <div class="job-post-item-header d-flex align-items-center">
						     <h2 class="mr-3 text-black h4">Full Stack Developer</h2>
						     <div class="badge-wrap">
						      <span class="bg-warning text-white badge py-2 px-3">Full Time</span>
						     </div>
						   </div>
						   <div class="job-post-item-body d-block d-md-flex">
						     <div class="mr-3"><span class="icon-layers"></span> <a href="#">Google, Inc.</a></div>
						     <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
						   </div>
						  </div>

						  <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>

						</div>
          </div> <!-- end -->
          <div class="col-md-12 ftco-animate">
           <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
               <div class="job-post-item-header d-flex align-items-center">
                 <h2 class="mr-3 text-black h4">Open Source Interactive Developer</h2>
                 <div class="badge-wrap">
                  <span class="bg-info text-white badge py-2 px-3">Freelance</span>
                 </div>
               </div>
               <div class="job-post-item-body d-block d-md-flex">
                 <div class="mr-3"><span class="icon-layers"></span> <a href="#">New York Times</a></div>
                 <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
               </div>
              </div>
              
              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
           </div>
         </div> <!-- end -->
         <div class="col-md-12 ftco-animate">

           <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
               <div class="job-post-item-header d-flex align-items-center">
                 <h2 class="mr-3 text-black h4">Frontend Development</h2>
                 <div class="badge-wrap">
                  <span class="bg-secondary text-white badge py-2 px-3">Internship</span>
                 </div>
               </div>
               <div class="job-post-item-body d-block d-md-flex">
                 <div class="mr-3"><span class="icon-layers"></span> <a href="#">Facebook, Inc.</a></div>
                 <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
               </div>
              </div>

              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
           </div>
         </div> <!-- end -->
         <div class="col-md-12 ftco-animate">
           <div class="job-post-item bg-white p-4 d-block d-md-flex align-items-center">

              <div class="mb-4 mb-md-0 mr-5">
               <div class="job-post-item-header d-flex align-items-center">
                 <h2 class="mr-3 text-black h4">Open Source Interactive Developer</h2>
                 <div class="badge-wrap">
                  <span class="bg-danger text-white badge py-2 px-3">Temporary</span>
                 </div>
               </div>
               <div class="job-post-item-body d-block d-md-flex">
                 <div class="mr-3"><span class="icon-layers"></span> <a href="#">New York Times</a></div>
                 <div><span class="icon-my_location"></span> <span>Western City, UK</span></div>
               </div>
              </div>
              
              <div class="ml-auto d-flex">
                <a href="job-single.html" class="btn btn-primary py-2 mr-1">Apply Job</a>
                <a href="#" class="btn btn-secondary rounded-circle btn-favorite d-flex align-items-center icon">
                	<span class="icon-heart"></span>
                </a>
              </div>
           </div>
         </div> <!-- end -->
				</div>
				<div class="row mt-5">
          <div class="col text-center">
            <div class="block-27">
              <ul>
                <li><a href="#">&lt;</a></li>
                <li class="active"><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&gt;</a></li>
              </ul>
            </div>
          </div>
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
              <a href="blog-single.html" class="block-20" style="background-image: url('images/image_1.jpg');">
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
              <a href="blog-single.html" class="block-20" style="background-image: url('images/image_2.jpg');">
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
              <a href="blog-single.html" class="block-20" style="background-image: url('images/image_3.jpg');">
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
              <a href="blog-single.html" class="block-20" style="background-image: url('images/image_4.jpg');">
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
		
		<section class="ftco-section-parallax">
      <div class="parallax-img d-flex align-items-center">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-7 text-center heading-section heading-section-white ftco-animate">
              <h2>Subcribe to our Newsletter</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
              <div class="row d-flex justify-content-center mt-4 mb-4">
                <div class="col-md-8">
                  <form action="#" class="subscribe-form">
                    <div class="form-group d-flex">
                      <input type="text" class="form-control" placeholder="Enter email address">
                      <input type="submit" value="Subscribe" class="submit px-3">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="ftco-footer ftco-bg-dark ftco-section">
      <div class="container">
        <div class="row mb-5">
        	<div class="col-md">
             <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">About</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Employers</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">How it works</a></li>
                <li><a href="#" class="py-2 d-block">Register</a></li>
                <li><a href="#" class="py-2 d-block">Post a Job</a></li>
                <li><a href="#" class="py-2 d-block">Advance Skill Search</a></li>
                <li><a href="#" class="py-2 d-block">Recruiting Service</a></li>
                <li><a href="#" class="py-2 d-block">Blog</a></li>
                <li><a href="#" class="py-2 d-block">Faq</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4 ml-md-4">
              <h2 class="ftco-heading-2">Workers</h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block">How it works</a></li>
                <li><a href="#" class="py-2 d-block">Register</a></li>
                <li><a href="#" class="py-2 d-block">Post Your Skills</a></li>
                <li><a href="#" class="py-2 d-block">Job Search</a></li>
                <li><a href="#" class="py-2 d-block">Emploer Search</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
            	<h2 class="ftco-heading-2">Have a Questions?</h2>
            	<div class="block-23 mb-3">
	              <ul>
	                <li><span class="icon icon-map-marker"></span><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
	                <li><a href="#"><span class="icon icon-phone"></span><span class="text">+2 392 3929 210</span></a></li>
	                <li><a href="#"><span class="icon icon-envelope"></span><span class="text">info@yourdomain.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">

            <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
  <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
          </div>
        </div>
      </div>
    </footer>
    <!-- loader -->
  <div id="ftco-loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00"/></svg></div>


  <script src="js/jquery.min.js"></script>
  <script src="js/jquery-migrate-3.0.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.easing.1.3.js"></script>
  <script src="js/jquery.waypoints.min.js"></script>
  <script src="js/jquery.stellar.min.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/jquery.magnific-popup.min.js"></script>
  <script src="js/aos.js"></script>
  <script src="js/jquery.animateNumber.min.js"></script>
  <script src="js/bootstrap-datepicker.js"></script>
  <script src="js/jquery.timepicker.min.js"></script>
  <script src="js/scrollax.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script>
  <script src="js/google-map.js"></script>
  <script src="js/main.js"></script>
    
  </body>
</html>
```
postsフォルダのurls.pyにindex.htmlのパスを追加する　P182
```python
# jobs/urls.py
from django.urls import path
# from jobs.views import *
from .views import *

urlpatterns = [
    path('', HomeView.as_view(), name="home"),
] 
```
postsフォルダのviews.pyにHomeViewというクラスビューを作成する 183
```python
# jobs/views.py
from django.shortcuts import render
from django.views.generic import TemplateView

class HomeView(TemplateView):
  template_name="jobs/index.html"
```
### Static Filesをtemplates/posts/index.htmlに取り込む
先頭に{% load static %}を追加する
```html
 <!-- templates/jobs/index.htm -->
{% load static %} # added
<!doctype html>
<html lang="en">
  ・・・
```
index.htmの中の全ての 「'img/」を「'{% static 'images/」に置換する  
index.htmの中の全ての 「.jpg'」を「.jpg' %}'」に置換する  
index.htmの中の全ての 「"css/」を「"{% static "css/」に置換する  
index.htmの中の全ての 「.css"」を「.css" %}"」に置換する  
index.htmの中の全ての 「"js/」を「"{% static "js/」に置換する  
index.htmの中の全ての 「.js"」を「.js" %}"」に置換する  
#### Base Htmlを作成する
index.htmlからヘッダーとフッターを切り抜いてbase.htmlを作る
```python
# templates/base.html
{% load static %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JobPortal - Free Bootstrap 4 Template by Colorlib</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,600,700,800,900" rel="stylesheet">

    <link rel="stylesheet" href="{% static "css/open-iconic-bootstrap.min.css" %}">
    <link rel="stylesheet" href="{% static "css/animate.css" %}">
    
    <link rel="stylesheet" href="{% static "css/owl.carousel.min.css" %}">
    <link rel="stylesheet" href="{% static "css/owl.theme.default.min.css" %}">
    <link rel="stylesheet" href="{% static "css/magnific-popup.css" %}">

    <link rel="stylesheet" href="{% static "css/aos.css" %}">

    <link rel="stylesheet" href="{% static "css/ionicons.min.css" %}">

    <link rel="stylesheet" href="{% static "css/bootstrap-datepicker.css" %}">
    <link rel="stylesheet" href="{% static "css/jquery.timepicker.css" %}">

    
    <link rel="stylesheet" href="{% static "css/flaticon.css" %}">
    <link rel="stylesheet" href="{% static "css/icomoon.css" %}">
    <link rel="stylesheet" href="{% static "css/style.css" %}">
  </head>
  <body>
    
	  <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div class="container">
	      <a class="navbar-brand" href="index.html">JobPortal</a>
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="oi oi-menu"></span> Menu
	      </button>

	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav ml-auto">
	          <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
	          <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
	          <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
	          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
	          <li class="nav-item cta mr-md-2"><a href="new-post.html" class="nav-link">Post a Job</a></li>
	          <li class="nav-item cta cta-colored"><a href="job-post.html" class="nav-link">Want a Job</a></li>

	        </ul>
	      </div>
	    </div>
	  </nav>
    <!-- END nav -->

{% block content %}
      {% comment %} ここにindex.htmlの内容を表示させる {% endcomment %}
{% endblock %}

<section class="ftco-section-parallax">
  <div class="parallax-img d-flex align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7 text-center heading-section heading-section-white ftco-animate">
          <h2>Subcribe to our Newsletter</h2>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
          <div class="row d-flex justify-content-center mt-4 mb-4">
            <div class="col-md-8">
              <form action="#" class="subscribe-form">
                <div class="form-group d-flex">
                  <input type="text" class="form-control" placeholder="Enter email address">
                  <input type="submit" value="Subscribe" class="submit px-3">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="ftco-footer ftco-bg-dark ftco-section">
  <div class="container">
    <div class="row mb-5">
      <div class="col-md">
         <div class="ftco-footer-widget mb-4">
          <h2 class="ftco-heading-2">About</h2>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
            <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
            <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
            <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
          </ul>
        </div>
      </div>
      <div class="col-md">
        <div class="ftco-footer-widget mb-4">
          <h2 class="ftco-heading-2">Employers</h2>
          <ul class="list-unstyled">
            <li><a href="#" class="py-2 d-block">How it works</a></li>
            <li><a href="#" class="py-2 d-block">Register</a></li>
            <li><a href="#" class="py-2 d-block">Post a Job</a></li>
            <li><a href="#" class="py-2 d-block">Advance Skill Search</a></li>
            <li><a href="#" class="py-2 d-block">Recruiting Service</a></li>
            <li><a href="#" class="py-2 d-block">Blog</a></li>
            <li><a href="#" class="py-2 d-block">Faq</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md">
        <div class="ftco-footer-widget mb-4 ml-md-4">
          <h2 class="ftco-heading-2">Workers</h2>
          <ul class="list-unstyled">
            <li><a href="#" class="py-2 d-block">How it works</a></li>
            <li><a href="#" class="py-2 d-block">Register</a></li>
            <li><a href="#" class="py-2 d-block">Post Your Skills</a></li>
            <li><a href="#" class="py-2 d-block">Job Search</a></li>
            <li><a href="#" class="py-2 d-block">Emploer Search</a></li>
          </ul>
        </div>
      </div>
      <div class="col-md">
        <div class="ftco-footer-widget mb-4">
          <h2 class="ftco-heading-2">Have a Questions?</h2>
          <div class="block-23 mb-3">
            <ul>
              <li><span class="icon icon-map-marker"></span><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
              <li><a href="#"><span class="icon icon-phone"></span><span class="text">+2 392 3929 210</span></a></li>
              <li><a href="#"><span class="icon icon-envelope"></span><span class="text">info@yourdomain.com</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">

        <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
      </div>
    </div>
  </div>
</footer>

<!-- loader -->
<div id="ftco-loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00"/></svg></div>

<script src="{% static "js/jquery.min.js" %}"></script>
<script src="{% static "js/jquery-migrate-3.0.1.min.js" %}"></script>
<script src="{% static "js/popper.min.js" %}"></script>
<script src="{% static "js/bootstrap.min.js" %}"></script>
<script src="{% static "js/jquery.easing.1.3.js" %}"></script>
<script src="{% static "js/jquery.waypoints.min.js" %}"></script>
<script src="{% static "js/jquery.stellar.min.js" %}"></script>
<script src="{% static "js/owl.carousel.min.js" %}"></script>
<script src="{% static "js/jquery.magnific-popup.min.js" %}"></script>
<script src="{% static "js/aos.js" %}"></script>
<script src="{% static "js/jquery.animateNumber.min.js" %}"></script>
<script src="{% static "js/bootstrap-datepicker.js" %}"></script>
<script src="{% static "js/jquery.timepicker.min.js" %}"></script>
<script src="{% static "js/scrollax.min.js" %}"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"></script>
<script src="{% static "js/google-map.js" %}"></script>
<script src="{% static "js/main.js" %}"></script>

</body>
</html>
```
切り抜いた後のindex.html
```python
# templates/jobs/index.html
{% extends 'base.html'%}
{% load static %}

{% block content %}
        <!--================Post Slider Area =================-->
              ・・・・・ここにコンテンツを記載する・・・・・
        <!--================Blog Area =================-->
{% endblock %}
```
### First Modelの作成 8
ユーザモデルを作成する　ログインはメールアドレスとパスワードを入力する  
まずusers appを作成する
```
(venv) user@mbp Job-Portal % python manage.py startapp users
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
    'jobs.apps.JobsConfig',
    'users.apps.UsersConfig', #added
]
```
```python
# job/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('jobs.urls')), 
    path('users/', include('users.urls')),  # added
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
カスタムユーザーを作成する【AbstractBaseUser編】  
https://daeudaeu.com/django-abstractbaseuser/  
```python
# users/models.py
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
  use_in_migrations = True
  
  def _create_user(self, email, password, **extra_fields):
    if not email:
      raise ValueError('Your email is not correct')
    
    email = self.normalize_email(email)
    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, email=None, password=None, **extra_fields):
      extra_fields.setdefault('is_superuser', False)
      return self._create_user(email, password, **extra_fields)
    
  def create_superuser(self, email, password, **extra_fields):
      extra_fields.setdefault('is_superuser', True)
      if extra_fields.get('is_superuser') is not True:
          raise ValueError('Superuser must have is_superuser=True.')

      return self._create_user(email, password, **extra_fields)


class Account(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(_('メールアドレス'), unique=True)
  first_name = models.TextField(_('名'), max_length=50, blank=False)
  last_name = models.TextField(_('姓'), max_length=50, blank=False)
  date_joined = models.DateTimeField(_('登録日'), auto_now_add=True)
  is_active = models.BooleanField(_('アクティブ'), default=True)
  is_staff = models.BooleanField(_('スタッフ'), default=False)
  is_employee = models.BooleanField(default=False)
  is_employer = models.BooleanField(default=False)
  
  objects = UserManager()
  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []
  
  class Meta:
    verbose_name = _("user")
    verbose_name_plural = _("users")
```
jobs/settings.pyに以下を追加する
```
AUTH_USER_MODEL = 'users.Account'
```
作成したモデルでテーブルを作成してデータベースに登録する
```python
(venv) user@mbp Django-fantom-blog % python manage.py makemigrations
(venv) user@mbp Django-fantom-blog % python manage.py migrate 
```
#### SuperUserを作成する
```python
(venv) user@mbp Job-Portal % python manage.py createsuperuser   
メールアドレス: admin@gmail.com
Password: 123
Password (again): 
```
テーブルの値変更：is_staff= 1に更新する  
https://qiita.com/ysk91_engineer/items/46859bf3721d38334431
```sql
-- SQLite
UPDATE users_account
SET is_staff= 1
WHERE id = 1;
```
管理画面でユーザの属性を表示させる
```python
# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account

class MyAdminAccounts(UserAdmin):
  model = Account
  list_display = ('email', 'first_name', 'last_name', 'is_employee', 'is_employer')
  list_filter = ('email', 'first_name', 'last_name', 'is_employee', 'is_employer')
  search_fields = ('email', 'first_name', 'last_name')
  ordering = ('email', 'first_name')
  readonly_fields = ['date_joined']

admin.site.register(Account, MyAdminAccounts)
```
### user作成と更新機能
```python
# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account

class MyAdminAccounts(UserAdmin):
  model = Account
  list_display = ('email', 'first_name', 'last_name', 'is_employee', 'is_employer')
  list_filter = ('email', 'first_name', 'last_name', 'is_employee', 'is_employer')
  search_fields = ('email', 'first_name', 'last_name')
  ordering = ('email', 'first_name')
  readonly_fields = ['date_joined']
  
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields':('email', 'first_name', 'last_name', 'password1', 'password2', 'is_employee', 'is_employer','is_staff', 'is_active')
    }),
  )
  
  fieldsets = (
    (None, {'fields': ('email', 'first_name', 'last_name', 'password')}),
    ('Permissions', {'fields': ('is_staff', 'is_active', 'is_employee', 'is_employer')})
  )

admin.site.register(Account, MyAdminAccounts)
```
### Job モデルを作成する
```python
# jobs/models.py
from django.db import models
from django.conf import settings
import uuid
# from django.template.defaultfilters import slugify

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
  
  job_type = models.CharField(max_length=20, blank=False, default=None, choices=CHOICES, verbose_name='勤務形態')
  location = models.CharField(max_length=200, blank=False, default=None, verbose_name='勤務地')
  description = models.TextField(blank=False, default=None, verbose_name='仕事内容')
  publishing_date = models.DateTimeField(auto_now_add=True, verbose_name='公開日')
  # slug = models.SlugField(default=None, editable=False)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  employer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None, verbose_name='雇用者')
  
  def __str__(self):
    return self.title
  
  # def save(self, *args, **kwargs):
  #   self.slugify(self.title)
  #   super(Job, self).save(*args, **kwargs)
  
  class Meta:
    ordering = ('-publishing_date',)
```
migrations & migrate
```python
# jobs/admin.py
from django.contrib import admin
from .models import Job
  
admin.site.register(Job)
```
```python
# jobs/views.py
from django.shortcuts import render

from django.views.generic import TemplateView, ListView
from .models import Job

class HomeView(ListView):
  template_name="jobs/index.html"
  context_object_name = 'jobs'
  model = Job
```
### 仕事(Jobs)のリストを表示する
```html
<!-- templates/jobs/index.html -->
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
        <a href="job-single.html" class="btn btn-primary py-2 mr-1">応募する</a>
        <a href="#" class="btn btn-danger rounded-circle btn-favorite d-flex align-items-center">
          <span class="icon-heart"></span>
        </a>
      </div>

    </div>
  </div> <!-- end -->
  {% endfor %}
```
### Pagination
```python
# jobs/views.py
from django.shortcuts import render

from django.views.generic import TemplateView, ListView
from .models import Job

class HomeView(ListView):
  template_name="jobs/index.html"
  context_object_name = 'jobs'
  model = Job
  paginate_by = 1 # added
```
```html
<!-- templates/jobs/index.html -->
<div class="row mt-5">
  {% if is_paginated %}
  <div class="col text-center">
    <div class="block-27">
      <ul>
        {% if page_obj.has_previous %}
        <li><a href="?page={{ page_obj.previous_page_number }}"><</a></li>
        {% else %}
        <li class="disabled"><span>&lt;</span></li>
        {% endif %}
        {% for i in paginator.page_range %}
          {% if page_obj.number == i %}
            <li class="active"><span>{{i}}</span></li>
          {% else %}
            <li><a href="?page={{ i }}">{{i}}</a></li>
          {% endif %}
        {% endfor %}
        {% if page_obj.has_next %}
        <li><a href="?page={{ page_obj.next_page_number }}">></a></li>
        {% else %}
        <li class="disabled"><span>&gt;</span></li>
        {% endif %}
      </ul>
    </div>
  </div>
  {% endif %}
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
```python

```
```python

```
```python

```





さらにpostsのadmin.pyを編集してDjango administrationにサーチフィールドやフィルターを追加する
```python
# posts/admin.py 
from django.contrib import admin
from .models import Post

class AdminPost(admin.ModelAdmin):
  list_filter = ['publishing_date']
  list_display = ['title', 'publishing_date']
  search_fields = ['title', 'content']

  class Meta:
    model = Post
    
admin.site.register(Post, AdminPost)
```
#### Posts(投稿)を作成する
http://127.0.0.1:8000/admin/を開いてpostsを作成すると、画像がルート配下のmedia/uploadsフォルダに保存される
### Generic Class Based ViewのListViewを使う
ListView公式ドキュメント：https://docs.djangoproject.com/en/4.1/ref/class-based-views/generic-display/  

```python
# posts/views.py
from django.shortcuts import render
from django.views.generic import TemplateView

class IndexView(TemplateView):
  template_name="posts/index.html"
```
上記を以下のように書き換える
```python
# posts/views.py
from django.shortcuts import render
from .models import Post
from django.views.generic import TemplateView, ListView

class IndexView(ListView):
  template_name="posts/index.html"
  model = Post
  context_object_name = 'posts'
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context
```
index.htmlのarticleタグは１つだけ残してそれをfor文で囲む  
{{}}を使ってurl, title, content, publishing_dateを以下のように動的に変える
```html
// templates/posts/index.html
<img class="img-fluid" src="{% static "img/home-blog/blog-1.jpg" %}" alt="" style="width:100%">  
↓
<img class="img-fluid" src="{{ post.image.url }}" alt="">
```
for文で囲んだarticleタグは以下のようにする  
{{ post.content|truncatechars:175  }}でコンテントの長さを短くしている
```html
// templates/posts/index.html
{% for post in posts %}
  <article class="blog_style1">
    <div class="blog_img">
      <img class="img-fluid" src="{{ post.image.url }}" alt="" style="width:100%">
    </div>
    <div class="blog_text">
      <div class="blog_text_inner">
        <a class="cat" href="#">Gadgets</a>
        <a href="single-blog.html"><h4>{{ post.title }}</h4></a>
        <p>{{ post.content|truncatechars:175  }}</p>
        <div class="date">
          <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i>{{ post.publishing_date }}</a>
          <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
        </div>	
      </div>
    </div>
  </article>
{% endfor %}
```
### Generic Class Based ViewのDetailViewを使って詳細ページの編集
```python
# posts/views.py
class PostDetail(DetailView):
  template_name="posts/detail.html"
  model = Post
  context_object_name = 'single'
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context
```
templates/posts/detail.htmlを作成する
```html
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
      <div class="container">
        <div class="banner_content text-center">
          <h2>Blog Post Details</h2>
          <div class="page_link">
            <a href="index.html">Home</a>
            <a href="single-blog.html">Post Details</a>
          </div>
        </div>
      </div>
      </div>
  </section>
  <!--================End Home Banner Area =================-->
  
  <!--================Blog Area =================-->
  <section class="blog_area p_120 single-post-area">
      <div class="container">
          <div class="row">
              <div class="col-lg-8">
          <div class="main_blog_details">
            <img class="img-fluid" src="img/blog/news-blog.jpg" alt="">
            <a href="#"><h4>Cartridge Is Better Than Ever <br /> A Discount Toner</h4></a>
            <div class="user_details">
              <div class="float-left">
                <a href="#">Lifestyle</a>
                <a href="#">Gadget</a>
              </div>
              <div class="float-right">
                <div class="media">
                  <div class="media-body">
                    <h5>Mark wiens</h5>
                    <p>12 Dec, 2017 11:21 am</p>
                  </div>
                  <div class="d-flex">
                    <img src="img/blog/user-img.jpg" alt="">
                  </div>
                </div>
              </div>
            </div>
            <p>MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower</p>
            <p>MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training. who has the willpower to actually sit through a self-imposed MCSE training.</p>
        <blockquote class="blockquote">
          <p class="mb-0">MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower to actually sit through a self-imposed MCSE training.</p>
        </blockquote>
        <p>MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower</p>
        <p>MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money on boot camp when you can get the MCSE study materials yourself at a fraction of the camp price. However, who has the willpower</p>
            <div class="news_d_footer">
              <a href="#"><i class="lnr lnr lnr-heart"></i>Lily and 4 people like this</a>
              <a class="justify-content-center ml-auto" href="#"><i class="lnr lnr lnr-bubble"></i>06 Comments</a>
              <div class="news_socail ml-auto">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-youtube-play"></i></a>
            <a href="#"><i class="fa fa-pinterest"></i></a>
            <a href="#"><i class="fa fa-rss"></i></a>
          </div>
            </div>
          </div>
          <div class="navigation-area">
                      <div class="row">
                          <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                              <div class="thumb">
                                  <a href="#"><img class="img-fluid" src="img/blog/prev.jpg" alt=""></a>
                              </div>
                              <div class="arrow">
                                  <a href="#"><span class="lnr text-white lnr-arrow-left"></span></a>
                              </div>
                              <div class="detials">
                                  <p>Prev Post</p>
                                  <a href="#"><h4>Space The Final Frontier</h4></a>
                              </div>
                          </div>
                          <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                              <div class="detials">
                                  <p>Next Post</p>
                                  <a href="#"><h4>Telescopes 101</h4></a>
                              </div>
                              <div class="arrow">
                                  <a href="#"><span class="lnr text-white lnr-arrow-right"></span></a>
                              </div>
                              <div class="thumb">
                                  <a href="#"><img class="img-fluid" src="img/blog/next.jpg" alt=""></a>
                              </div>										
                          </div>									
                      </div>
                  </div>
                  <div class="comments-area">
                      <h4>05 Comments</h4>
                      <div class="comment-list">
                          <div class="single-comment justify-content-between d-flex">
                              <div class="user justify-content-between d-flex">
                                  <div class="thumb">
                                      <img src="img/blog/c1.jpg" alt="">
                                  </div>
                                  <div class="desc">
                                      <h5><a href="#">Emilly Blunt</a></h5>
                                      <p class="date">December 4, 2017 at 3:12 pm </p>
                                      <p class="comment">
                                          Never say goodbye till the end comes!
                                      </p>
                                  </div>
                              </div>
                              <div class="reply-btn">
                                      <a href="" class="btn-reply text-uppercase">reply</a> 
                              </div>
                          </div>
                      </div>	
                      <div class="comment-list left-padding">
                          <div class="single-comment justify-content-between d-flex">
                              <div class="user justify-content-between d-flex">
                                  <div class="thumb">
                                      <img src="img/blog/c2.jpg" alt="">
                                  </div>
                                  <div class="desc">
                                      <h5><a href="#">Elsie Cunningham</a></h5>
                                      <p class="date">December 4, 2017 at 3:12 pm </p>
                                      <p class="comment">
                                          Never say goodbye till the end comes!
                                      </p>
                                  </div>
                              </div>
                              <div class="reply-btn">
                                      <a href="" class="btn-reply text-uppercase">reply</a> 
                              </div>
                          </div>
                      </div>	
                      <div class="comment-list left-padding">
                          <div class="single-comment justify-content-between d-flex">
                              <div class="user justify-content-between d-flex">
                                  <div class="thumb">
                                      <img src="img/blog/c3.jpg" alt="">
                                  </div>
                                  <div class="desc">
                                      <h5><a href="#">Annie Stephens</a></h5>
                                      <p class="date">December 4, 2017 at 3:12 pm </p>
                                      <p class="comment">
                                          Never say goodbye till the end comes!
                                      </p>
                                  </div>
                              </div>
                              <div class="reply-btn">
                                      <a href="" class="btn-reply text-uppercase">reply</a> 
                              </div>
                          </div>
                      </div>	
                      <div class="comment-list">
                          <div class="single-comment justify-content-between d-flex">
                              <div class="user justify-content-between d-flex">
                                  <div class="thumb">
                                      <img src="img/blog/c4.jpg" alt="">
                                  </div>
                                  <div class="desc">
                                      <h5><a href="#">Maria Luna</a></h5>
                                      <p class="date">December 4, 2017 at 3:12 pm </p>
                                      <p class="comment">
                                          Never say goodbye till the end comes!
                                      </p>
                                  </div>
                              </div>
                              <div class="reply-btn">
                                      <a href="" class="btn-reply text-uppercase">reply</a> 
                              </div>
                          </div>
                      </div>	
                      <div class="comment-list">
                          <div class="single-comment justify-content-between d-flex">
                              <div class="user justify-content-between d-flex">
                                  <div class="thumb">
                                      <img src="img/blog/c5.jpg" alt="">
                                  </div>
                                  <div class="desc">
                                      <h5><a href="#">Ina Hayes</a></h5>
                                      <p class="date">December 4, 2017 at 3:12 pm </p>
                                      <p class="comment">
                                          Never say goodbye till the end comes!
                                      </p>
                                  </div>
                              </div>
                              <div class="reply-btn">
                                      <a href="" class="btn-reply text-uppercase">reply</a> 
                              </div>
                          </div>
                      </div>	                                             				
                  </div>
                  <div class="comment-form">
                      <h4>Leave a Reply</h4>
                      <form>
                          <div class="form-group form-inline">
                            <div class="form-group col-lg-6 col-md-6 name">
                              <input type="text" class="form-control" id="name" placeholder="Enter Name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Name'">
                            </div>
                            <div class="form-group col-lg-6 col-md-6 email">
                              <input type="email" class="form-control" id="email" placeholder="Enter email address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'">
                            </div>										
                          </div>
                          <div class="form-group">
                              <input type="text" class="form-control" id="subject" placeholder="Subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Subject'">
                          </div>
                          <div class="form-group">
                              <textarea class="form-control mb-10" rows="5" name="message" placeholder="Messege" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Messege'" required=""></textarea>
                          </div>
                          <a href="#" class="primary-btn submit_btn">Post Comment</a>	
                      </form>
                  </div>
        </div>
              <div class="col-lg-4">
                  <div class="blog_right_sidebar">
                      <aside class="single_sidebar_widget search_widget">
                          <div class="input-group">
                              <input type="text" class="form-control" placeholder="Search Posts">
                              <span class="input-group-btn">
                                  <button class="btn btn-default" type="button"><i class="lnr lnr-magnifier"></i></button>
                              </span>
                          </div><!-- /input-group -->
                          <div class="br"></div>
                      </aside>
                      <aside class="single_sidebar_widget author_widget">
                          <img class="author_img rounded-circle" src="img/blog/author.png" alt="">
                          <h4>Charlie Barber</h4>
                          <p>Senior blog writer</p>
                          <div class="social_icon">
                              <a href="#"><i class="fa fa-facebook"></i></a>
                              <a href="#"><i class="fa fa-twitter"></i></a>
                              <a href="#"><i class="fa fa-github"></i></a>
                              <a href="#"><i class="fa fa-behance"></i></a>
                          </div>
                          <p>Boot camps have its supporters andit sdetractors. Some people do not understand why you should have to spend money on boot camp when you can get. Boot camps have itssuppor ters andits detractors.</p>
                          <div class="br"></div>
                      </aside>
                      <aside class="single_sidebar_widget popular_post_widget">
                          <h3 class="widget_title">Popular Posts</h3>
                          <div class="media post_item">
                              <img src="img/blog/popular-post/post1.jpg" alt="post">
                              <div class="media-body">
                                  <a href="blog-details.html"><h3>Space The Final Frontier</h3></a>
                                  <p>02 Hours ago</p>
                              </div>
                          </div>
                          <div class="media post_item">
                              <img src="img/blog/popular-post/post2.jpg" alt="post">
                              <div class="media-body">
                                  <a href="blog-details.html"><h3>The Amazing Hubble</h3></a>
                                  <p>02 Hours ago</p>
                              </div>
                          </div>
                          <div class="media post_item">
                              <img src="img/blog/popular-post/post3.jpg" alt="post">
                              <div class="media-body">
                                  <a href="blog-details.html"><h3>Astronomy Or Astrology</h3></a>
                                  <p>03 Hours ago</p>
                              </div>
                          </div>
                          <div class="media post_item">
                              <img src="img/blog/popular-post/post4.jpg" alt="post">
                              <div class="media-body">
                                  <a href="blog-details.html"><h3>Asteroids telescope</h3></a>
                                  <p>01 Hours ago</p>
                              </div>
                          </div>
                          <div class="br"></div>
                      </aside>
                      <aside class="single_sidebar_widget"> 
                          <a href="#"><img class="img-fluid" src="img/blog/add.jpg" alt=""></a>
                          <div class="br"></div>
                      </aside>
                      <aside class="single_sidebar_widget post_category_widget">
                          <h4 class="widget_title">Post Catgories</h4>
                          <ul class="list cat-list">
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Technology</p>
                                      <p>37</p>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Lifestyle</p>
                                      <p>24</p>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Fashion</p>
                                      <p>59</p>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Art</p>
                                      <p>29</p>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Food</p>
                                      <p>15</p>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Architecture</p>
                                      <p>09</p>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" class="d-flex justify-content-between">
                                      <p>Adventure</p>
                                      <p>44</p>
                                  </a>
                              </li>															
                          </ul>
                          <div class="br"></div>
                      </aside>
                      <aside class="single-sidebar-widget tag_cloud_widget">
                          <h4 class="widget_title">Tag Clouds</h4>
                          <ul class="list">
                              <li><a href="#">Technology</a></li>
                              <li><a href="#">Fashion</a></li>
                              <li><a href="#">Architecture</a></li>
                              <li><a href="#">Fashion</a></li>
                              <li><a href="#">Food</a></li>
                              <li><a href="#">Technology</a></li>
                              <li><a href="#">Lifestyle</a></li>
                              <li><a href="#">Art</a></li>
                              <li><a href="#">Adventure</a></li>
                              <li><a href="#">Food</a></li>
                              <li><a href="#">Lifestyle</a></li>
                              <li><a href="#">Adventure</a></li>
                          </ul>
                      </aside>
                  </div>
              </div>
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
posts/urls.pyにPostDetailを追加する
```python
# posts/urls.py
from django.urls import path
# from posts.views import *
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<int:pk>', PostDetail.as_view(), name="detail"),　# added
] 
```
index.htmlに詳細ページリンク先を追記する  
下のpk=post.id の左辺のidは上の<int:pk>のpkと対応している
```python
  <a href="{% url 'detail' pk=post.id %}"><h4>{{ post.title }}</h4></a>　# added
  <p>{{ post.content|truncatechars:175  }}</p>
  <div class="date">
```
### 各詳細ページの項目を動的に出力する
detail.htmの中の全ての 「"img/」を「"{% static "img/」に置換する  
detail.htmの中の全ての 「.jpg"」を「.jpg" %}"」に置換する  
detail.htmの中の全ての 「.png"」を「.png" %}"」に置換する  
 detail.htmlを以下のように{{ single.image.url }},{{single.title}}など編集する
```html
 <!-- templates/posts/detail.html -->
 <!--================Blog Area =================-->
  <section class="blog_area p_120 single-post-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
      <div class="main_blog_details">
        <img class="img-fluid" src="{{ single.image.url }}" alt="">
        <a href="#"><h4>{{single.title}}<br /> A Discount Toner</h4></a>
        <div class="user_details">
          <div class="float-left">
            <a href="#">Lifestyle</a>
            <a href="#">Gadget</a>
          </div>
          <div class="float-right">
            <div class="media">
              <div class="media-body">
                <h5>Mark wiens</h5>
                <p>{{ single.publishing_date }}</p>
              </div>
              <div class="d-flex">
                <img src="{% static "img/blog/user-img.jpg" %}" alt="">
              </div>
            </div>
          </div>
        </div>
        <p>{{single.content}}</p>
```
### Slug Fieldを使う
詳細ページのURLにslugを使ってhttp://127.0.0.1:8000/detail/1/titlenameのように指定する　但し日本語のサイトではslugを日本語変換するのが難しいのでuuidを使う  
idをuuidとした時urls.pyの"path('detail/<<int:pk>>', PostDetail.as_view(), name="detail")"の<<int:pk>> => <<string:pk>> と変更する
```python
# posts.models.py
from django.db import models
from django.conf import settings
import uuid
# from django.template.defaultfilters import slugify

class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
    
  def __str__(self):
    return self.title
  
  # def save(self):
  #   self.slugify(self.title)
  #   super(self).save()
```
```python
(venv) user@mbp Django-fantom-blog % python manage.py makemigrations
(venv) user@mbp Django-fantom-blog % python manage.py migrate      
```
### カテゴリーモデルを作成する
```python
# posts/models.py
from django.db import models
from django.conf import settings
import uuid
# from django.template.defaultfilters import slugify

class Category(models.Model):
  title= models.CharField(verbose_name='タイトル', max_length=200)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  
  def __str__(self):
    return self.title
```
```python
(venv) user@mbp Django-fantom-blog % python manage.py makemigrations
(venv) user@mbp Django-fantom-blog % python manage.py migrate      
```
adminパネルにCategoryを表示させるためにadmin.pyを作成する
```python
# posts/admin.py
from django.contrib import admin
from .models import Post, Category

class AdminPost(admin.ModelAdmin):
  list_filter = ['publishing_date']
  list_display = ['title', 'publishing_date']
  search_fields = ['title', 'content']

  class Meta:
    model = Post
    
admin.site.register(Post, AdminPost)
admin.site.register(Category)
```

PostモデルとCategoryモデルを関係づける(ForeignKey)
```python
class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='カテゴリー') # added
  
  def __str__(self):
    return self.title
```
再度　makemigrations & migrate の実行
## 右側のサイドメニューを作成する
templates/posts/index.htmlとtemplates/posts/detail.htmlの中にあるサイドメニューを切り取りとる  
切り取った後は　{% include 'right_side.html' %}　を追加する  
right_side.htmlの先頭に {% load static %}をつける
```html
# templates/right_side.html
{% load static %} # added
{% custom_tags %} # 後で追加する(カスタムタグ)

<div class="col-lg-4">
  <div class="blog_right_sidebar">
      <aside class="single_sidebar_widget search_widget">
          <div class="input-group">
              <input type="text" class="form-control" placeholder="Search Posts">
              <span class="input-group-btn">
                  <button class="btn btn-default" type="button"><i class="lnr lnr-magnifier"></i></button>
              </span>
          </div><!-- /input-group -->
          <div class="br"></div>
      </aside>
      <aside class="single_sidebar_widget author_widget">
          <img class="author_img rounded-circle" src="{% static "img/blog/author.png" %}" alt="">
          <h4>Charlie Barber</h4>
          <p>Senior blog writer</p>
          <div class="social_icon">
              <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-github"></i></a>
              <a href="#"><i class="fa fa-behance"></i></a>
          </div>
          <p>Boot camps have its supporters andit sdetractors. Some people do not understand why you should have to spend money on boot camp when you can get. Boot camps have itssuppor ters andits detractors.</p>
          <div class="br"></div>
      </aside>
      <aside class="single_sidebar_widget popular_post_widget">
          <h3 class="widget_title">Popular Posts</h3>
          <div class="media post_item">
              <img src="{% static "img/blog/popular-post/post1.jpg" %}" alt="post">
              <div class="media-body">
                  <a href="blog-details.html"><h3>Space The Final Frontier</h3></a>
                  <p>02 Hours ago</p>
              </div>
          </div>
          <div class="media post_item">
              <img src="{% static "img/blog/popular-post/post2.jpg" %}" alt="post">
              <div class="media-body">
                  <a href="blog-details.html"><h3>The Amazing Hubble</h3></a>
                  <p>02 Hours ago</p>
              </div>
          </div>
          <div class="media post_item">
              <img src="{% static "img/blog/popular-post/post3.jpg" %}" alt="post">
              <div class="media-body">
                  <a href="blog-details.html"><h3>Astronomy Or Astrology</h3></a>
                  <p>03 Hours ago</p>
              </div>
          </div>
          <div class="media post_item">
              <img src="{% static "img/blog/popular-post/post4.jpg" %}" alt="post">
              <div class="media-body">
                  <a href="blog-details.html"><h3>Asteroids telescope</h3></a>
                  <p>01 Hours ago</p>
              </div>
          </div>
          <div class="br"></div>
      </aside>
      <aside class="single_sidebar_widget"> 
          <a href="#"><img class="img-fluid" src="{% static "img/blog/add.jpg" %}" alt=""></a>
          <div class="br"></div>
      </aside>
      <aside class="single_sidebar_widget post_category_widget">
          <h4 class="widget_title">Post Catgories</h4>
          <ul class="list cat-list">
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Technology</p>
                      <p>37</p>
                  </a>
              </li>
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Lifestyle</p>
                      <p>24</p>
                  </a>
              </li>
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Fashion</p>
                      <p>59</p>
                  </a>
              </li>
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Art</p>
                      <p>29</p>
                  </a>
              </li>
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Food</p>
                      <p>15</p>
                  </a>
              </li>
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Architecture</p>
                      <p>09</p>
                  </a>
              </li>
              <li>
                  <a href="#" class="d-flex justify-content-between">
                      <p>Adventure</p>
                      <p>44</p>
                  </a>
              </li>															
          </ul>
          <div class="br"></div>
      </aside>
      <aside class="single-sidebar-widget tag_cloud_widget">
          <h4 class="widget_title">Tag Clouds</h4>
          <ul class="list">
              <li><a href="#">Technology</a></li>
              <li><a href="#">Fashion</a></li>
              <li><a href="#">Architecture</a></li>
              <li><a href="#">Fashion</a></li>
              <li><a href="#">Food</a></li>
              <li><a href="#">Technology</a></li>
              <li><a href="#">Lifestyle</a></li>
              <li><a href="#">Art</a></li>
              <li><a href="#">Adventure</a></li>
              <li><a href="#">Food</a></li>
              <li><a href="#">Lifestyle</a></li>
              <li><a href="#">Adventure</a></li>
          </ul>
      </aside>
  </div>
</div>
```
### カスタム タグを作成する
参考：https://djangobrothers.com/blogs/custom_template_tags_filters/
postsフォルダの直下にtemplatetagsフォルダを作成する  
その中に空の__init__.pyファイルを作成する(pythonモジュールには必要)
```python
# posts/templatetags/custom_tags.py
from django import template
from posts.models import Category

register = template.Library()

@register.simple_tag(name="post_categories")
def all_categories():
  return Category.objects.all()
```
templates/right_side.htmlに {% custom_tags %}を追加する  
```python
# templates/right_side.html
 {% load static %}  
 {% custom_tags %} # added
   .....
  <aside class="single_sidebar_widget post_category_widget">
      <h4 class="widget_title">カテゴリー</h4>
      <ul class="list cat-list">
          {% post_categories as categories %}
          {% for category in categories %}
          <li>
              <a href="#" class="d-flex justify-content-between">
                  <p>{{ category.title }}</p>
                  <p>37</p>
              </a>
          </li>
          {% endfor %}
      </ul>
      <div class="br"></div>
  </aside>
```
__カテゴリーの件数を表示する__
```python
Categoryモデルにpost_count関数を追加する  
self.posts.all().count()のpostsは逆参照の意味
# posts/models
class Category(models.Model):
  title= models.CharField(verbose_name='タイトル', max_length=200)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  
  def __str__(self):
    return self.title
  
  def post_count(self):  # added
    return self.posts.all().count()
```
Postモデルのcategoryにrelated_name='posts'を追加する
```python
class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='カテゴリー', related_name='posts')
```
right_side.htmlに件数を表示する
```html
# templates/right_side.html
  <aside class="single_sidebar_widget post_category_widget">
      <h4 class="widget_title">カテゴリー</h4>
      <ul class="list cat-list">
          {% post_categories as categories %}
          {% for category in categories %}
          <li>
              <a href="#" class="d-flex justify-content-between">
                  <p>{{ category.title }}</p>
                  <p>{{ category.post_count }}</p>  // added
              </a>
          </li>
          {% endfor %}
      </ul>
      <div class="br"></div>
  </aside>
```
### Category別リスト(Category Deteil View)を作成する  
templateファイル, vieｗs.py、urls.pyの３セットを編集  
templatesフォルダにcategoriesフォルダを作成し、その中にcategory_detail.htmlを作成する
```python
# templates/categpries/category_detail.html
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>Category</h2>
      <div class="page_link">
        <a href="index.html">Home</a>
        <a href="category.html">Category</a>
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
                      <article class="blog_style1">
                        <div class="blog_img">
                          <img class="img-fluid" src="img/home-blog/blog-1.jpg" alt="">
                        </div>
                        <div class="blog_text">
            <div class="blog_text_inner">
              <a class="cat" href="#">Gadgets</a>
              <a href="#"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <div class="date">
                <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
                <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
              </div>	
            </div>
                        </div>
                      </article>
                      <article class="blog_style1">
                        <div class="blog_img">
                          <img class="img-fluid" src="img/home-blog/blog-2.jpg" alt="">
                        </div>
                        <div class="blog_text">
            <div class="blog_text_inner">
              <a class="cat" href="#">Gadgets</a>
              <a href="#"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <div class="date">
                <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
                <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
              </div>	
            </div>
          </div>
                      </article>
                      <div class="row m0 post_cat_item">
                        <div class="col-md-6 p0">
                          <div class="post_s_item">
              <div class="post_img">
                <img class="img-fluid" src="img/post-slider/post-cat-1.jpg" alt="">
              </div>
              <div class="post_text">
                <a class="cat" href="#">Gadgets</a>
                <a href="#"><h4>Nest Protect: 2nd Gen Smoke + CO Alarm</h4></a>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <div class="date">
                  <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
                  <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
                </div>
              </div>
            </div>
                        </div>
                        <div class="col-md-6 p0">
                          <div class="post_s_item">
              <div class="post_img">
                <img class="img-fluid" src="img/post-slider/post-cat-2.jpg" alt="">
              </div>
              <div class="post_text">
                <a class="cat" href="#">Gadgets</a>
                <a href="#"><h4>Nest Protect: 2nd Gen Smoke + CO Alarm</h4></a>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                <div class="date">
                  <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
                  <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
                </div>
              </div>
            </div>
                        </div>
                      </div>
                      <article class="blog_style1">
                        <div class="blog_img">
                          <img class="img-fluid" src="img/home-blog/blog-3.jpg" alt="">
                        </div>
                        <div class="blog_text">
            <div class="blog_text_inner">
              <a class="cat" href="#">Gadgets</a>
              <a href="#"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <div class="date">
                <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
                <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
              </div>	
            </div>
                        </div>
                      </article>
                      <article class="blog_style1">
                        <div class="blog_img">
                          <img class="img-fluid" src="img/home-blog/blog-4.jpg" alt="">
                        </div>
                        <div class="blog_text">
            <div class="blog_text_inner">
              <a class="cat" href="#">Gadgets</a>
              <a href="#"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <div class="date">
                <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
                <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
              </div>	
            </div>
          </div>
                      </article>
                      <nav class="blog-pagination justify-content-center d-flex">
                      <ul class="pagination">
                          <li class="page-item">
                              <a href="#" class="page-link" aria-label="Previous">
                                  <span aria-hidden="true">
                                      <span class="lnr lnr-chevron-left"></span>
                                  </span>
                              </a>
                          </li>
                          <li class="page-item"><a href="#" class="page-link">01</a></li>
                          <li class="page-item active"><a href="#" class="page-link">02</a></li>
                          <li class="page-item"><a href="#" class="page-link">03</a></li>
                          <li class="page-item"><a href="#" class="page-link">04</a></li>
                          <li class="page-item"><a href="#" class="page-link">09</a></li>
                          <li class="page-item">
                              <a href="#" class="page-link" aria-label="Next">
                                  <span aria-hidden="true">
                                      <span class="lnr lnr-chevron-right"></span>
                                  </span>
                              </a>
                          </li>
                      </ul>
                  </nav>
                  </div>
              </div>
              {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
views.pyにCategoryDetail(ListView)を追加する
```python
# posts/views.py
from django.shortcuts import render, get_object_or_404
from .models import Post, Category
from django.views.generic import TemplateView, ListView, DetailView

class IndexView(ListView):
  template_name="posts/index.html"
  model = Post
  context_object_name = 'posts'
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context
  
class PostDetail(DetailView):
  template_name="posts/detail.html"
  model = Post
  context_object_name = 'single'
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    return context

class CategoryDetail(ListView):
  model = Post
  template_name="categories/category_detail.html"
  context_object_name="posts"
  # pk means id
  def get_queryset(self):
    self.category = get_object_or_404(Category, pk=self.kwargs['pk'])
    return Post.objects.filter(category=self.category).order_by('-publishing_date')
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    self.category = get_object_or_404(Category, pk=self.kwargs['pk'])　# あとで追加
    context['category'] = self.category　# あとで追加
    print('CategoryDetail:', context)
    return context
```
上の def get_queryset(self)はpk(id)で抽出したデータを返してくれる  
get_context_data(self, **kwargs)も抽出したデータを返してくれる  
CategoryDetail: {'paginator': None, 'page_obj': None, 'is_paginated': False, 'object_list': <QuerySet [<Post: test Sed ut perspiciatis unde omnis>, <Post: Lorem ipsum dolor sit amet>]>, 'posts': <QuerySet [<Post: test Sed ut perspiciatis unde omnis>, <Post: Lorem ipsum dolor sit amet>]>, 'view': <posts.views.CategoryDetail object at 0x10f507670>, 'category': <Category: Technology>}  
get_object_or_404とget_list_or_404は、アクセスしたレコードが存在しなかった場合に404エラーを返す
#### Category別リストの表示
urls.pyにCategory別リストのパスを追記する
```python
# posts/urls.py
from django.urls import path
# from posts.views import *
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<str:pk>', PostDetail.as_view(), name="detail"),
    path('category/<str:pk>', CategoryDetail.as_view(), name="category_detail") # added
] 
```
サイドバーのカテゴリーの一つをクリックするとカテゴリー別リストが表示されるようにする
```html
# templates/right_side.html
<aside class="single_sidebar_widget post_category_widget">
    <h4 class="widget_title">カテゴリー</h4>
    <ul class="list cat-list">
        {% post_categories as categories %}  # added
        {% for category in categories %}   # added
        <li>
            <a href="{% url 'category_detail' pk=category.id %}" class="d-flex justify-content-between">
                <p>{{ category.title }}</p>
                <p>{{ category.post_count }}</p>  # added
            </a>
        </li>
        {% endfor %}   # added
    </ul>
    <div class="br"></div>
</aside>
```
カテゴリー別リストの先端にカテゴリー名を表示する
```python
# posts/views.py
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    self.category = get_object_or_404(Category, pk=self.kwargs['pk'])　# 追加
    context['category'] = self.category　# 追加
    print('CategoryDetail:', context)
    return context
```

```html
# templates/categories/category_detail.html
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>Category</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>  // Changed
        <a href="category.html">{{ category.title }}</a> // Changed
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
                            <a class="cat" href="#">Gadgets</a>
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
                      <nav class="blog-pagination justify-content-center d-flex">
                      <ul class="pagination">
                        ・・・・・・・
                      </ul>
                  </nav>
          </div>
      </div>
      {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
### Tag モデルを作成する
Many-to-Many relationships:https://docs.djangoproject.com/en/4.1/topics/db/examples/many_to_many/  
```python
# posts/models.py
from django.db import models
from django.conf import settings
import uuid
from django.template.defaultfilters import slugify

class Category(models.Model):
  title= models.CharField(verbose_name='タイトル', max_length=200)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  
  def __str__(self):
    return self.title
  
  def post_count(self):
    return self.posts.all().count()
  
class Tag(models.Model):  # added
  title= models.CharField(verbose_name='タイトル', max_length=150)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  slug = models.SlugField(editable=False, null=True, blank=True, verbose_name='Slug')

  def __str__(self):
    return self.title
  
  def save(self, *args, **kwargs):
    self.slug = slugify(self.title)
    super().save(*kwargs)

class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  # slug = models.SlugField(default="slug")
  category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True,verbose_name='カテゴリー', related_name='posts')
  tag = models.ManyToManyField(Tag, related_name="posts" , blank=True, verbose_name='タグ')  # added
  
  def __str__(self):
    return self.title
```
makemigrations & migrate
```python
# posts/admin.py
from django.contrib import admin
from .models import Post, Category, Tag # added

class AdminPost(admin.ModelAdmin):
  list_filter = ['publishing_date']
  list_display = ['title', 'publishing_date']
  search_fields = ['title', 'content']

  class Meta:
    model = Post
    
admin.site.register(Post, AdminPost)
admin.site.register(Category)
admin.site.register(Tag) # added
```
### サイドバーにTagリストを表示する
custom_tags.pyを編集する
```python
# posts/templatetags/custome_tags.py
from django import template
from posts.models import Category, Tag  # Changed

register = template.Library()

@register.simple_tag(name="post_categories")
def all_categories():
  return Category.objects.all()

@register.simple_tag(name="tags") # added
def all_tags():
  return Tag.objects.all()
```
サイドバーのテンプレートを編集してTagリストを表示する  
{{label.title}}は{{label}}でもOK
```html
<!-- templates/right_side.html -->
    <aside class="single_sidebar_widget post_category_widget">
        <h4 class="widget_title">カテゴリー</h4>
        <ul class="list cat-list">
            {% post_categories as categories %}
            {% for category in categories %}
            <li>
                <a href="{% url 'category_detail' pk=category.id %}" class="d-flex justify-content-between">
                    <p>{{ category.title }}</p>
                    <p>{{ category.post_count }}</p>
                </a>
            </li>
            {% endfor %}
        </ul>
        <div class="br"></div>
    </aside>
    <aside class="single-sidebar-widget tag_cloud_widget">
        <h4 class="widget_title">タグ</h4>
        <ul class="list">
        {% tags as labels %}
        {% for label in labels %}
        <li><a href="#">{{label.title}}</a></li>
        {% endfor %}
        </ul>
    </aside>
```
### タグ別リストを表示する
views.pyにCategoryDetail同様にTagDetailクラスを作成する
```python
# posts/views.py
class TagDetail(ListView):
  model = Post
  template_name="tags/tag_detail.html"
  context_object_name="posts"
  
  # pk means id
  def get_queryset(self):
    self.tag = get_object_or_404(Tag, slug=self.kwargs['slug'])
    return Post.objects.filter(tag=self.tag).order_by('-publishing_date')
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    self.tag = get_object_or_404(Tag, slug=self.kwargs['slug'])
    context['tag'] = self.tag
    print('TagDetail:', context)
    return context
```
urls.pyにタグ別リストページのパスを追加する
```python
# post.urls.py
from django.urls import path
# from posts.views import *
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
    path('detail/<str:pk>', PostDetail.as_view(), name="detail"),
    path('category/<str:pk>', CategoryDetail.as_view(), name="category_detail"),
    path('tag/<slug:slug>', TagDetail.as_view(), name="tag_detail"),　# added
] 
```
category_detail.htmlをコピーしてtemplates/tagsフォルダーにtag_detail.htmlを作成する
```html
# templates/tags/tag_detail.html
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>タグ</h2>
      <div class="page_link">
        <a href="{% url 'index' %}">Home</a>
        <a href="#">{{ tag.title }}</a>
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
                <h4>{{ tag.title }}タグに{{tag.post_count}}件の投稿があります</h4> # added
                  <div class="blog_left_sidebar">
                      {% for post in posts %}
                        <article class="blog_style1">
                          <div class="blog_img">
                            <img class="img-fluid" src={{ post.image.url }} alt="">
                          </div>
                          <div class="blog_text">
                          <div class="blog_text_inner">
                            <a class="cat" href="#">Gadgets</a>
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
                      <nav class="blog-pagination justify-content-center d-flex">
                      <ul class="pagination">
                          <li class="page-item">
                            <a href="#" class="page-link" aria-label="Previous">
                              <span aria-hidden="true">
                                <span class="lnr lnr-chevron-left"></span>
                              </span>
                            </a>
                          </li>
                          <li class="page-item"><a href="#" class="page-link">01</a></li>
                          <li class="page-item active"><a href="#" class="page-link">02</a></li>
                          <li class="page-item"><a href="#" class="page-link">03</a></li>
                          <li class="page-item"><a href="#" class="page-link">04</a></li>
                          <li class="page-item"><a href="#" class="page-link">09</a></li>
                          <li class="page-item">
                              <a href="#" class="page-link" aria-label="Next">
                                  <span aria-hidden="true">
                                      <span class="lnr lnr-chevron-right"></span>
                                  </span>
                              </a>
                          </li>
                      </ul>
                  </nav>
          </div>
      </div>
      {% include 'right_side.html' %}
          </div>
      </div>
  </section>
  <!--================Blog Area =================-->
{% endblock %}
```
タグ別リストページに投稿件数を表示する  
Tagモデルにpost_count関数を追加する
```python
class Tag(models.Model):
  title= models.CharField(verbose_name='タイトル', max_length=150)
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  slug = models.SlugField(editable=False, null=True, blank=True, verbose_name='Slug')

  def __str__(self):
    return self.title
  
  def save(self, *args, **kwargs):
    self.slug = slugify(self.title)
    super().save(*kwargs)
    
  def post_count(self):  # added
    return self.posts.all().count()
```
```html
# templates/tags/tag_detail.html
<div class="container">
    <div class="row">
        <div class="col-lg-8">
        <h4>{{ tag.title }}タグに{{tag.post_count}}件の投稿があります</h4> # added
            <div class="blog_left_sidebar">
                {% for post in posts %}
                <article class="blog_style1">
```
####  Slider Postsを作成する
Postモデルにslider_post を追加する
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
  slider_post = models.BooleanField(default=False, verbose_name='スライダー')  # added
  
  
  def __str__(self):
    return self.title
```
makemigrations & migrate  
views.pyのIndexViewのcontextにslider_postsを追加する
```python
# posts/views.py
class IndexView(ListView):
  template_name="posts/index.html"
  model = Post
  context_object_name = 'posts'
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    # context['categories'] = Category.object.all()
    context['slider_posts'] = Post.objects.all().filter(slider_post=True)
    return context
```
templates/posts/index.htmlのスライダー部分を編集する
```python
<img src="{% static "img/post-slider/post-s-1.jpg" %}" alt="">は以下のように編集
<img src="{{ post.image.url}}" alt="">
タグを全て表示するときは、{% for tag in post.tag.all %}　を使う
```
テンプレートのスライダー部分
```html
# templates/posts/index.html
<section class="post_slider_area">
    <div class="post_slider_inner owl-carousel">
        {% for post in slider_posts %}
        <div class="item">
            <div class="post_s_item">
                <div class="post_img">
                    <img src="{{ post.image.url}}" alt="">
                </div>
                <div class="post_text">
                    {% for tag in post.tag.all %}　# added ★★★★★
                    <a class="cat" href="{% url 'tag_detail' slug=tag.slug %}">{{ tag.title }}</a>
                    {% endfor %}
                    <a href="{% url 'detail' pk=post.id %}"><h4>{{ post.title }}</h4></a>
                    <p>{{ post.content | truncatechars:150 }}<</p>
                    <div class="date">
                        <a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> {{post.publishing_date}}</a>
                        <a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
                    </div>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</section>
```
### Users Appを作成する
```python
(venv) user@mbp Django-fantom-blog % python manage.py startapp users
```
usersフォルダの直下にurls.pyを作成する  
このときapp_name="users"を追加する
```python
# users/urls.py
from django.urls import path

app_name="users"  # added
urlpatterns = [
    path('', ),   ## www.website.com/users/detail, www.website.com/detail
] 
```
Django_fantom_blogのurls.pyに'users.urls'を追加する
```python
# Django_fantom_blog/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('posts.urls')),
    path('users/', include('users.urls')),  # www.website.com/users/register added
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```
### User Creation Formを作成する
登録用のフォームを作成する
```python
# users/forms.py
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms

class RegisterForm(UserCreationForm):
  username = forms.CharField(max_length=50)
  email = forms.EmailField(max_length=50)
  password1 = forms.CharField()
  password2 = forms.CharField()
  
  class Meta(UserCreationForm):
    model = User
    fields = ('username', 'email', 'password1', 'password2' )
```
views.pyにRegisterViewを作成する
```python
# users/RegisterView.py
from django.shortcuts import render
from django.views.generic import CreateView
from .forms import RegisterForm

class RegisterView(CreateView):
  template_name = 'users/register.html'
  form_class = RegisterForm
  success_url = '/'
```
templates/users/Register.htmlを作成する
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register</title>
</head>
<body>
  
</body>
</html>
```
urls.pyにパスを登録する
```python
from django.urls import path
from .views import *

app_name="users"
urlpatterns = [
    path('register/', RegisterView.as_view(), name="register")
] 
```
users Appを登録
```python
Django_fantom_blog/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'posts.apps.PostsConfig',
    'users.apps.UsersConfig', // added
]
```
#### Register Html Fileを作成する
elements.htmlを参照する
```html
<!-- templates/users/register.html -->
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
                  <h2 style="text-align: center; color:blue">登録</h2>
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
                        <input type="text" name="username" placeholder="名前" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required class="single-input">
                      </div>
                      <div class="mt-10">
                        <input type="text" name="email" placeholder="メールアドレス" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required class="single-input">
                      </div>
                      <div class="mt-10">
                        <input type="password" name="password1" placeholder="パスワード" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required class="single-input">
                      </div>
                      <div class="mt-10">
                        <input type="password" name="password2" placeholder="パスワード(確認)" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required class="single-input">
                      </div>
                      <input type="submit" class="genric-btn success circle" style="float:right;margin-top:30px;" value="登録" >
                    </form> 
                  </div>
              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
### LoginViewとLogoutViewを作成する
```python
# users/views.py
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import CreateView
from .forms import RegisterForm

class RegisterView(CreateView):
  template_name = 'users/register.html'
  form_class = RegisterForm
  success_url = '/'
  
class UserLoginView(LoginView):
  template_name = 'users/login.html'

class UserLogoutView(LogoutView):
  template_name = 'users/login.html'
```
ログインのテンプレート
```html
<!-- templates/users/login.html -->
{% extends 'base.html'%}
{% load static %}

{% block content %}
  <!--================Home Banner Area =================-->
  <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="overlay bg-parallax" data-stellar-ratio="0.9" data-stellar-vertical-offset="0" data-background=""></div>
  <div class="container">
    <div class="banner_content text-center">
      <h2>ログイン</h2>
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
                {% if not user.is_authenticated %}
                  <h2 style="text-align: center; color:blue">ログイン</h2>
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
                        <input type="text" name="username" placeholder="名前" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required class="single-input">
                      </div>
                      <div class="mt-10">
                        <input type="password" name="password" placeholder="パスワード" onfocus="this.placeholder = ''" onblur="this.placeholder = 'First Name'" required class="single-input">
                      </div>
                      <input type="submit" class="genric-btn success circle" style="float:right;margin-top:30px;" value="ログイン" >
                    </form> 
                  </div>
                {% else %}
                  <h2 style="color:red;">既にログイン済みです</h2>
                {% endif %}
              </div>
             {% include 'right_side.html' %}
          </div>
      </div>
  </section>
{% endblock %}
```
```python
# users/urls.py
from django.urls import path
from .views import *

app_name="users"
urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name="logout")
] 
```
Django_fantom_blog/setting.pyの最後にLOGOUT_REDIRECT_URLとLOGIN_REDIRECT_URLを追加するだけでリダイレクトしてくれる
```python
# Django_fantom_blog/setting.py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGOUT_REDIRECT_URL = '/' # added
LOGIN_REDIRECT_URL = '/'  # added
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

