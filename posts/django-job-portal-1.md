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
from ckeditor.fields import RichTextField
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
  description = RichTextField(blank=False, default=None, verbose_name='仕事内容')
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
### Category Modelを作成する
```python
# src/jobs/models.py
from django.db import models
from django.conf import settings
import uuid
# from django.template.defaultfilters import slugify

class Category(models.Model):
  title=models.CharField(max_length=100, verbose_name='タイトル')
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  # slug = models.SlugField(default=None, editable=False)
  
  def __str__(self):
    return self.title

  # def save(self, *args, **kwargs):
  #   self.slugify(self.title)
  #   super(Category, self).save(*args, **kwargs)
  
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
  category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="jobs", default=None, verbose_name='カテゴリー')
    
  def __str__(self):
    return self.title
  
  # def save(self, *args, **kwargs):
  #   self.slugify(self.title)
  #   super(Job, self).save(*args, **kwargs)
  
  class Meta:
    ordering = ('-publishing_date',)
```
makemigrations & migrate
[MySQL] 外部キー制約を一時的に無効にする  
https://blog.katsubemakito.net/mysql/mysql-foreignkey-disable
```python
DATABASES = {
 'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'my_job_portal',                     
    'USER': 'root',                     
    'PASSWORD': '',                 
    'HOST': 'localhost',                    
    'PORT': '3306',                      
    'OPTIONS': {
                "init_command": "SET foreign_key_checks = 0;",
           },
   }
}
```
### Category を画面に表示させる
HomeViewのcontext_object_nameとして'jobs'以外に'categories'を追加する
```python
# jobs/views.py
from django.shortcuts import render

from django.views.generic import TemplateView, ListView
from .models import Job, Category

class HomeView(ListView):
  template_name="jobs/index.html"
  context_object_name = 'jobs'
  model = Job
  paginate_by = 1
  
  def get_context_data(self, **kwargs):
    context = super(HomeView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context
```
Cayegoryモデルにdef job_count(self)を追加して１カテゴリーにつきいくつの仕事があるかカウントする
```python
class Category(models.Model):
  title=models.CharField(max_length=100, verbose_name='タイトル')
  id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
  created =models.DateTimeField(verbose_name='登録日', auto_now_add=True)
  # slug = models.SlugField(default=None, editable=False)
  
  def __str__(self):
    return self.title

  def job_count(self):
    return self.jobs.all().count()
```
```html
<!-- templates/jobs/index.html -->
  <div class="row">
    {% for category in categories %}
    <div class="col-md-3 ftco-animate">
      <ul class="category">
        <li><a href="#">{{category.title}}<span class="number" data-number="{{category.job_count}}">0</span></a></li>
      </ul>
    </div>
    {% endfor %}
  </div>
```
## Regiatraton Formを作成する
django-fantom-blog-1の「User Creation Formを作成する」参照
```python
# users/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Account

class AccountRegisterForm(UserCreationForm):
  CHOICES - [('is_employee', '従業員'), ('is_employer', '雇用者')]
  user_types = forms.CharField(label="ユーザタイプ", widget=forms.RadioSelect(choices=CHOICES))
  
  class Meta:
    model = Account
    fields = ('email', 'first_name', 'last_name')
```
```python
# users/views.py
from django.shortcuts import render
from django.views.generic import CreateView
from django.contrib.messages.views import SuccessMessageMixin
from .forms import AccountRegisterForm

class UserRegisterView(SuccessMessageMixin, CreateView):
  template_name = 'users/user-register.html'
  form_class = AccountRegisterForm
  success_url = '/'
  success_message = "ユーザアカウントが作成されました"
```
templates/users/user-register.htmlを作成する
```python
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>アカウント登録</title>
</head>
<body>
  
</body>
</html>
```

```python
# users/urls.py
from django.urls import path
from .views import *

app_name = "users"
urlpatterns = [
    path('register', UserRegisterView.as_view(), name="register"),
]
```
```python
# jobs/urls.py
from django.urls import path
from .views import *

app_name = "jobs" # added
urlpatterns = [
    path('', HomeView.as_view(), name="home"),
]
```
### ユーザ登録Htmlを作成する
input type="{{ field.field.widget.input_type}}とするとパスワードの入力が隠される  
{% for field in form.visible_fields|slice:"5" %}とすると５番目のユーザタイプが表示されなくなる  
一度５番目のユーザタイプを非表示にしてから別途ユーザタイプのコードを追加する
```python
{% extends 'base.html' %}
{% load static %}
{% block content %}
    
<div class="hero-wrap js-fullheight" style="background-image: url('{% static 'images/bg_2.jpg' %}');" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start" data-scrollax-parent="true">
          <div class="col-md-8 ftco-animate text-center text-md-left mb-5" data-scrollax=" properties: { translateY: '70%' }">
          	<p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-3"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span>Post a Job</span></p>
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Post a Job</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="ftco-section bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8 mb-5">
			     <form action="#" class="p-5 bg-white" method="post">
              {% csrf_token %}
              {% for field in form.visible_fields|slice:"5" %}
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="fullname">{{field.label}}</label>
                  <input type="{{ field.field.widget.input_type}}" id="fullname" 
                      class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
                </div>
              </div>
              {% endfor %}
              <div class="row form-group">
                <div class="col-md-12"><h5>ユーザータイプ</h5></div>
                <div class="col-md-12 mb-3 mb-md-0">
                  <label for="option-job-type-1">
                    {{ form.user_types }}
                  </label>
                </div>
              </div>
            </form>
            <div class="row form-group">
              <div class="col-md-12">
                <input type="submit" value="登録" class="btn btn-primary  py-2 px-5">
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">Contact Info</h3>
              <p class="mb-0 font-weight-bold">Address</p>
              <p class="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

              <p class="mb-0 font-weight-bold">Phone</p>
              <p class="mb-4"><a href="#">+1 232 3235 324</a></p>

              <p class="mb-0 font-weight-bold">Email Address</p>
              <p class="mb-0"><a href="#"><span class="__cf_email__" data-cfemail="671e081215020a060e0b2703080a060e094904080a">[email&#160;protected]</span></a></p>

            </div>
            
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">More Info</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ad iure porro mollitia architecto hic consequuntur. Distinctio nisi perferendis dolore, ipsa consectetur</p>
              <p><a href="#" class="btn btn-primary  py-2 px-4">Learn More</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

	{% endblock %}
```
### ユーザを登録する How to Regiter Our Users
UserRegisterViewにform_valid関数を追加する
```python
# users/views.py
from django.shortcuts import render, redirect
from django.views.generic import CreateView
from django.contrib.messages.views import SuccessMessageMixin
from .forms import AccountRegisterForm

class UserRegisterView(SuccessMessageMixin, CreateView):
  template_name = 'users/user-register.html'
  form_class = AccountRegisterForm
  success_url = '/'
  success_message = "ユーザアカウントが作成されました"
  
  def form_valid(self, form):
    user = form.save(commit=False)
    user_type = form.cleaned_data['user_types']
    if user_type == 'is_employee':
      # print('user.is_employee', user.is_employee)
      user.is_employee = True
    elif user_type == 'is_employer':
      user.is_employer = True
    user.save()
    return redirect(self.success_url)
```
### Form Errorsを表示する
```html
<!-- user-register.html -->
<div class="ftco-section bg-light">
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-8 mb-5">
        <form action="#" class="p-5 bg-white" method="post">
          {% csrf_token %}

          {% if form.errors%}  // エラー表示の設定Added
            <div class="alert alert-danger alert-dismissible" role="alert">
              <div id="form_errors">
                {% for key, value in form.errors.items %}
                <span class="fieldwrapper">
                  {{ key }} : {{ value }}
                </span>
                {% endfor %}
              </div>
              <button type="button" class="close" data-dismiss="alert" aria-hidden="Close">
                <span area-hidden="true">&times</span>
              </button>
            </div>
          {% endif %}

          {% for field in form.visible_fields|slice:"5" %}
          <div class="row form-group">
            <div class="col-md-12 mb-3 mb-md-0">
              <label class="font-weight-bold" for="fullname">{{field.label}}</label>
              <input type="{{ field.field.widget.input_type}}" id="fullname" 
                  class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
            </div>
          </div>
          {% endfor %}
```
### Login and Logout Viewsを作成する
```python
from django.contrib.auth.views import LoginView, LogoutView

class UserLoginView(LoginView):
  template_name = 'user/login.html'

class UserLogoutView(LogoutView):
  template_name = 'users/logout.html'
```
user-register.htmlをコピーしてlogin.htmlを作成する
```html
<!-- templates/users/login.html -->
{% extends 'base.html' %}
{% load static %}
{% block content %}
    
<div class="hero-wrap js-fullheight" style="background-image: url('{% static 'images/bg_2.jpg' %}');" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start" data-scrollax-parent="true">
          <div class="col-md-8 ftco-animate text-center text-md-left mb-5" data-scrollax=" properties: { translateY: '70%' }">
          	<p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-3"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span>ログイン</span></p>
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">ログイン</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="ftco-section bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8 mb-5">
			     <form action="#" class="p-5 bg-white" method="post">
              {% csrf_token %}
              {% if form.errors%}
                <div class="alert alert-danger alert-dismissible" role="alert">
                  <div id="form_errors">
                    {% for key, value in form.errors.items %}
                    <span class="fieldwrapper">
                      {{ key }} : {{ value }}
                    </span>
                    {% endfor %}
                  </div>
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="Close">
                    <span area-hidden="true">&times</span>
                  </button>
                </div>
              {% endif %}
              {% for field in form.visible_fields %}
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="fullname">{{field.label}}</label>
                  <input type="{{ field.field.widget.input_type}}" id="fullname" 
                      class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
                </div>
              </div>
              {% endfor %}
              
              <div class="row form-group">
                <div class="col-md-12">
                  <input type="submit" value="ログイン" class="btn btn-primary  py-2 px-5">
                </div>
              </div>
            </form>
          </div>

          <div class="col-lg-4">
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">Contact Info</h3>
              <p class="mb-0 font-weight-bold">Address</p>
              <p class="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

              <p class="mb-0 font-weight-bold">Phone</p>
              <p class="mb-4"><a href="#">+1 232 3235 324</a></p>

              <p class="mb-0 font-weight-bold">Email Address</p>
              <p class="mb-0"><a href="#"><span class="__cf_email__" data-cfemail="671e081215020a060e0b2703080a060e094904080a">[email&#160;protected]</span></a></p>

            </div>
            
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">More Info</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ad iure porro mollitia architecto hic consequuntur. Distinctio nisi perferendis dolore, ipsa consectetur</p>
              <p><a href="#" class="btn btn-primary  py-2 px-4">Learn More</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
	{% endblock %}
```

```python
# users/urls.py
from django.urls import path
from .views import *

app_name = "users"
urlpatterns = [
    path('register', UserRegisterView.as_view(), name="register"),
    path('login', UserLoginView.as_view(), name="login"), # added
    path('logout', UserLoginView.as_view(), name="logout"), # added
]
```
adminでログインしている時、ログインの入力をさせないように「既にログイン済みです」のエラー表示させる
```html
<!-- templates/users/login.html -->
{% if not user.is_authenticated %} # added
  <form action="#" class="p-5 bg-white" method="post">
    {% csrf_token %}
    {% if form.errors%}
      <div class="alert alert-danger alert-dismissible" role="alert">
        <div id="form_errors">
          {% for key, value in form.errors.items %}
          <span class="fieldwrapper">
            {{ key }} : {{ value }}
          </span>
          {% endfor %}
        </div>
        <button type="button" class="close" data-dismiss="alert" aria-hidden="Close">
          <span area-hidden="true">&times</span>
        </button>
      </div>
    {% endif %}
    {% for field in form.visible_fields|slice:"5" %}
    <div class="row form-group">
      <div class="col-md-12 mb-3 mb-md-0">
        <label class="font-weight-bold" for="fullname">{{field.label}}</label>
        <input type="{{ field.field.widget.input_type}}" id="fullname" 
            class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
      </div>
    </div>
    {% endfor %}
    <div class="row form-group">
      <div class="col-md-12">
        <input type="submit" value="ログイン" class="btn btn-primary  py-2 px-5">
      </div>
    </div>
  </form>
{% else %}
  <div class="col-md-12 mb-3 mb-md-0">
    <label class="font-weight-bold" style="color:red"  for="fullname">既にログイン済みです</label>
  </div>
{% endif %}
```
ログインすると以下のエラーが出る
```python
Page not found (404)
Request Method:	GET
Request URL:	http://localhost:8000/accounts/profile/
```
以下を追加する
```python
# job/settings.py
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/users/login/'
```
### Profile Modelを作成する
(venv) user@mbp Job-Portal % pip install pillow
```python
# users/models.py
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from PIL import Image　# added

class UserManager(BaseUserManager):
  ・・・
class Account(AbstractBaseUser, PermissionsMixin):
  ・・・
class Profile(models.Model): # added
  user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name="profile", verbose_name='ユーザ')
  image = models.ImageField(upload_to='media/users', verbose_name='画像')
  birth_day = models.DateField(default=None, blank=True, null=True, verbose_name='誕生日')
  location = models.CharField(max_length=100, blank=True, verbose_name='住所')
  resume = models.TextField(blank=True, verbose_name='レジュメ')
  company =models.CharField(max_length=250, blank=True, verbose_name='会社')
  
  def __str__(self):
    return self.user.last_name + " " + self.user.first_name + " " + self.user.email
  
  def save(self, *args, **kwargs):
    super(Profile, self).save(*args, **kwargs)
    img = Image.open(self.image)
    if img.height > 200 or img.width > 200:
      new_size = (200, 200)
      img.thumbnail(new_size)
      img.save(self.image.path)
```
```python
# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account, Profile

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
admin.site.register(Profile) # added
```
makemigrations & migrate
#### Ckeditorをインストールする
django ckeditorで検索  
https://django-ckeditor.readthedocs.io/en/latest/#installation
```python
pip install django-ckeditor
```
Add ckeditor to your INSTALLED_APPS setting.  
Usage:https://django-ckeditor.readthedocs.io/en/latest/#usage  
The quickest way to add rich text editing capabilities to your models is to use the included RichTextField model field type. A CKEditor widget is rendered as the form field but in all other regards the field behaves like the standard Django TextField. For example:
```python
from django.db import models
from ckeditor.fields import RichTextField

class Post(models.Model):
    content = RichTextField()
```
```python
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': 300,
    },
}
```
```python
# job/sttings.py
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/users/login/'

CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'Basic',
        'height': 300,
        'width': 400,
    },
}
```
### ユーザプロファイルを作成する
Signalsを使う
```python
・・・
from PIL import Image
from ckeditor.fields import RichTextField
from django.dispatch import receiver
from django.db.models.signals import post_save

class Profile(models.Model):
  user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name="profile", verbose_name='ユーザ')
  image = models.ImageField(upload_to='media/users', verbose_name='画像', default="media/users/person_1.jpg")
  birth_day = models.DateField(default=None, blank=True, null=True, verbose_name='誕生日')
  location = models.CharField(max_length=100, blank=True, verbose_name='住所')
  resume = RichTextField(blank=True, verbose_name='レジュメ')
  company =models.CharField(max_length=250, blank=True, verbose_name='会社')
  
  def __str__(self):
    return self.user.last_name + " " + self.user.first_name + " " + self.user.email
  
  def save(self, *args, **kwargs):
    super(Profile, self).save(*args, **kwargs)
    img = Image.open(self.image)
    if img.height > 200 or img.width > 200:
      new_size = (200, 200)
      img.thumbnail(new_size)
      img.save(self.image.path)

@receiver(models.signals.post_save, sender=Account)　# added
def post_save_user_signal(sender, instance, created, **kwargs):
  if created:
    instance.save()
  
def create_user_profile(sender, instance, created, **kwargs):
  if created:
    Profile.objects.create(user=instance)
    
post_save.connect(create_user_profile, sender=Account)
```
### NavbarのUrlsを設定する127
```python
# templates/base.html
<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
  <div class="container">
    <a class="navbar-brand" href="{% url 'jobs:home' %}">JobPortal</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="oi oi-menu"></span> Menu
    </button>

    <div class="collapse navbar-collapse" id="ftco-nav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
        <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
        <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
        <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
        {% if not user.is_authenticated %}
        <li class="nav-item cta mr-md-2"><a href="{% url 'users:register' %}" class="nav-link">登録</a></li>
        <li class="nav-item cta cta-colored"><a href="{% url 'users:login' %}" class="nav-link">ログイン</a></li>
        {% endif %}
      </ul>
    </div>
  </div>
</nav>
```
### User Profile Update Formを作成する
```python
# users/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Account, Profile

class AccountRegisterForm(UserCreationForm):
  CHOICES = [('is_employee', '従業員'), ('is_employer', '雇用者')]
  user_types = forms.CharField(label="ユーザタイプ", widget=forms.RadioSelect(choices=CHOICES))
  
  class Meta:
    model = Account
    fields = ('email', 'first_name', 'last_name')

class UserUpdateForm(forms.ModelForm):
  class Meta:
    model = Profile
    # fields = ('user', 'image', 'birthday', ...)
    exclude = ('user',) # こちらの方がfieldsより楽にかける
    # datepickerを設定する
    widgets = {
      'birth_day' : forms.DateInput(attrs={'type':'date'})
    }
```
UpdateViewについて  
UpdateViewは登録済みデータの更新機能に特化したクラスベースビュー  
修正したいデータに更新するフォームを表示させる  
```python
from django.views.generic.edit import UpdateView

class MemberUpdateView(UpdateView):
    model = Member
    fields = ('name', 'age')
    template_name_suffix = '_update_form'
    success_url = reverse_lazy('list')
```
UserUpdateViewを作成する
```python
# users/views.py
from django.shortcuts import render, redirect
from django.views.generic import CreateView, UpdateView
from django.contrib.messages.views import SuccessMessageMixin
from .forms import AccountRegisterForm, UserProfileForm
from django.contrib.auth.views import LoginView, LogoutView
from .models import Profile

class UserRegisterView(SuccessMessageMixin, CreateView):
  template_name = 'users/user-register.html'
  form_class = AccountRegisterForm
  success_url = '/'
  success_message = "ユーザアカウントが作成されました"
  
  def form_valid(self, form):
    user = form.save(commit=False)
    user_type = form.cleaned_data['user_types']
    if user_type == 'is_employee':
      # print('user.is_employee', user.is_employee)
      user.is_employee = True
    elif user_type == 'is_employer':
      user.is_employer = True
      
    user.save()
    
    return redirect(self.success_url)

class UserLoginView(LoginView):
  template_name = 'users/login.html'

class UserLogoutView(LogoutView):
  template_name = 'users/logout.html'
  
class UserUpdateView(SuccessMessageMixin, UpdateView): # added
  model = Profile
  success_message = "プロファイルを更新しました"
  template_name = 'users/update.html'
  form_class = UserUpdateForm
```
templates/usersの直下にupdate.htmlファイルを作成する  
login.htmlをコピーして使う
```html
<!-- templates/users/update.html -->
{% extends 'base.html' %}
{% load static %}
{% block content %}
    
<div class="hero-wrap js-fullheight" style="background-image: url('{% static 'images/bg_2.jpg' %}');" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start" data-scrollax-parent="true">
          <div class="col-md-8 ftco-animate text-center text-md-left mb-5" data-scrollax=" properties: { translateY: '70%' }">
          	<p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-3"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span>ログイン</span></p>
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">ログイン</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="ftco-section bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8 mb-5">
           {% if user.is_employee %}
			     <form action="#" class="p-5 bg-white" method="post">
              {% csrf_token %}
              {% if form.errors%}
                <div class="alert alert-danger alert-dismissible" role="alert">
                  <div id="form_errors">
                    {% for key, value in form.errors.items %}
                    <span class="fieldwrapper">
                      {{ key }} : {{ value }}
                    </span>
                    {% endfor %}
                  </div>
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="Close">
                    <span area-hidden="true">&times</span>
                  </button>
                </div>
              {% endif %}
              {% for field in form.visible_fields|slice:"3"  %}
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label class="font-weight-bold" for="fullname">{{field.label}}</label>
                  <input type="{{ field.field.widget.input_type}}" id="fullname" 
                      class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
                </div>
              </div>
              {% endfor %}

              <div class="row form-group">
                <h5>レジュメ</h5>
                <div class="col-md-12 mb-3 mb-md-0">
                  {{ form.media }}
                  {{ form.resume }}
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <input type="submit" value="ログイン" class="btn btn-primary  py-2 px-5">
                </div>
              </div>
            </form>
            {% endif %}
          </div>

          <div class="col-lg-4">
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">Contact Info</h3>
              <p class="mb-0 font-weight-bold">Address</p>
              <p class="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

              <p class="mb-0 font-weight-bold">Phone</p>
              <p class="mb-4"><a href="#">+1 232 3235 324</a></p>

              <p class="mb-0 font-weight-bold">Email Address</p>
              <p class="mb-0"><a href="#"><span class="__cf_email__" data-cfemail="671e081215020a060e0b2703080a060e094904080a">[email&#160;protected]</span></a></p>

            </div>
            
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">More Info</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ad iure porro mollitia architecto hic consequuntur. Distinctio nisi perferendis dolore, ipsa consectetur</p>
              <p><a href="#" class="btn btn-primary  py-2 px-4">Learn More</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

	{% endblock %}
```
```python
# users/urls.py
from django.urls import path
from .views import *

app_name = "users"
urlpatterns = [
    path('register', UserRegisterView.as_view(), name="register"),
    path('login', UserLoginView.as_view(), name="login"),
    path('logout', UserLoginView.as_view(), name="logout"),
    path('update-profile/<int:pk>/', UserUpdateView.as_view(), name="update_profile"), # added
]
```
### ユーザプロフィールを更新する
if user.is_employerの時の追加
```html
<!-- templates/users/update.html -->
{% if user.is_employer %}
<form action="#" class="p-5 bg-white" method="post">
  {% csrf_token %}
  {% if form.errors%}
    <div class="alert alert-danger alert-dismissible" role="alert">
      <div id="form_errors">
        {% for key, value in form.errors.items %}
        <span class="fieldwrapper">
          {{ key }} : {{ value }}
        </span>
        {% endfor %}
      </div>
      <button type="button" class="close" data-dismiss="alert" aria-hidden="Close">
        <span area-hidden="true">&times</span>
      </button>
    </div>
  {% endif %}
  {% for field in form.visible_fields|slice:"3"  %}
  <div class="row form-group">
    <div class="col-md-12 mb-3 mb-md-0">
      <label class="font-weight-bold" for="fullname">{{field.label}}</label>
      <input type="{{ field.field.widget.input_type}}" id="fullname" 
          class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
    </div>
  </div>
  {% endfor %}

  <div class="row form-group">
    <div class="col-md-12 mb-3 mb-md-0">
      <label class="font-weight-bold" for="fullname">{{form.campany.label}}</label>
      <input type="{{ form.campany.field.widget.input_type}}" id="fullname" 
          class="form-control" placeholder="{{field.label}}" name="{{ form.campany.html_name }}">
    </div>
  </div>

  <div class="row form-group">
    <div class="col-md-12">
      <input type="submit" value="更新" class="btn btn-primary  py-2 px-5">
    </div>
  </div>
</form>
{% endif %}

</div>
```
```python
from django.shortcuts import redirect
from django.views.generic import CreateView, UpdateView
from django.contrib.messages.views import SuccessMessageMixin
from .forms import AccountRegisterForm, UserUpdateForm
from django.contrib.auth.views import LoginView, LogoutView
from .models import Profile
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.urls import reverse

@method_decorator(login_required(login_url='/users/login'), name='dispatch')
class UserUpdateView(SuccessMessageMixin, UpdateView):
  model = Profile
  success_message = "プロファイルを更新しました"
  template_name = 'users/update.html'
  form_class = UserUpdateForm
  
  def form_valid(self, form):
    form.instance.user = self.request.user
    return super(UserUpdateView, self).form_valid(form)
  
  def get(self, request, *args, **kwargs):
    self.object = self.get_object()
    if self.object.user != request.user:
      return HttpResponseRedirect('/')
    return super(UserUpdateView,self).get(request, *args, **kwargs)
  
  def get_success_url(self):
    return reverse('users:update_profile', kwargs={'pk':self.object.pk})
```
### NavbarにAuthenticated Users用のドロップダウンのリンクUrlを作成する
Bootstrap components dropdown  
https://getbootstrap.com/docs/4.0/components/dropdowns/
```python
<!-- Example single danger button -->
<div class="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Action
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
```
```python
# users/models.py
class Account(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(_('メールアドレス'), unique=True)
  first_name = models.CharField(_('名'), max_length=50, blank=False)
  last_name = models.CharField(_('姓'), max_length=50, blank=False)
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
    
  def get_profile_id(self): # added 
    return self.profile.id  # related_name="profile"

class Profile(models.Model):
  user = models.OneToOneField(Account, on_delete=models.CASCADE, related_name="profile", verbose_name='ユーザ')
```
```html
templates/base.html
{% if user.is_authenticated and user.is_employee %}
<div class="btn-group">
  <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:50px">
    {{user.first_name }}
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">自分の仕事</a>
    {% if user.get_profile_id %}
      <a class="dropdown-item" href="{% url "users:update_profile" pk=user.get_profile_id %}">プロフィールの編集</a>
    {% endif %}
    <a class="dropdown-item" href="{% url "users:logout" %}">ログアウト</a>
  </div>
</div>
{% endif %}

{% if user.is_authenticated and user.is_employer %}
<div class="btn-group">
  <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:50px">
    {{user.first_name }}
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">仕事の追加</a>
    <a class="dropdown-item" href="#">自分の仕事</a>
    {% if user.get_profile_id %}
    <a class="dropdown-item" href="{% url "users:update_profile" pk=user.get_profile_id %}">プロフィールの編集</a>
    {% endif %}
    <a class="dropdown-item" href="{% url "users:logout" %}">ログアウト</a>
  </div>
</div>
{% endif %}
```
### How to Post a new job
仕事を登録するフォーム作成
```python
# jobs/forms.py
from django import forms
from .models import *

class CreateJobForm(forms.ModelForm):
  class Meta:
    model = Job
    fields = ['title', 'company', 'location', 'job_type', 'category', 'description' ]
    widgets = {'job_type': forms.RadioSelect}
```
```python
# jobs/views.py
from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Job, Category
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import CreateView
from .forms import *

class HomeView(ListView):
  template_name="jobs/index.html"
  context_object_name = 'jobs'
  model = Job
  paginate_by = 1
  
  def get_context_data(self, **kwargs):
    context = super(HomeView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context

class CreateJobView(SuccessMessageMixin, CreateView):
  model = Job
  template_name = "jobs/create-jobs.html"
  forms_class = CreateJobForm
  fields = ['title', 'company', 'location', 'job_type', 'category', 'description' ]
  success_url = '/'
  success_message = '仕事が投稿されました'
```
user-register.htmlをコピーしてcreate-jobs.htmlを作成する
```html
# jobs/create-job.html
{% extends 'base.html' %}
{% load static %}
{% block content %}
    
<div class="hero-wrap js-fullheight" style="background-image: url('{% static 'images/bg_2.jpg' %}');" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start" data-scrollax-parent="true">
          <div class="col-md-8 ftco-animate text-center text-md-left mb-5" data-scrollax=" properties: { translateY: '70%' }">
          	<p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-3"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span>Post a Job</span></p>
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Post a Job</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="ftco-section bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-8 mb-5">
            {% if user.is_employer %}
              <form action="#" class="p-5 bg-white" method="post">
                {% csrf_token %}
                {% if form.errors%}
                  <div class="alert alert-danger alert-dismissible" role="alert">
                    <div id="form_errors">
                      {% for key, value in form.errors.items %}
                      <span class="fieldwrapper">
                        {{ key }} : {{ value }}
                      </span>
                      {% endfor %}
                    </div>
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="Close">
                      <span area-hidden="true">&times</span>
                    </button>
                  </div>
                {% endif %}
                {% for field in form.visible_fields|slice:"3" %}
                <div class="row form-group">
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label class="font-weight-bold" for="fullname">{{field.label}}</label>
                    <input type="{{ field.field.widget.input_type}}" id="fullname" 
                        class="form-control" placeholder="{{field.label}}" name="{{ field.html_name }}">
                  </div>
                </div>
                {% endfor %}
                <div class="row form-group">
                  <div class="col-md-12"><h5>仕事タイプ</h5></div>
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label for="option-job-type-1">
                      {{ form.job_type }}
                    </label>
                  </div>
                </div>

                <div class="row form-group">
                  <div class="col-md-12"><h5>カテゴリー</h5></div>
                  <div class="col-md-12 mb-3 mb-md-0">
                    <label for="option-job-type-1">
                      {{ form.category }}
                    </label>
                  </div>
                </div>

                <div class="row form-group">
                  <div class="col-md-12"><h5>仕事内容</h5></div>
                  {{ form.media }}
                  {{ form.description }}
                </div>

                <div class="row form-group">
                  <div class="col-md-12">
                    <input type="submit" value="登録" class="btn btn-primary  py-2 px-5">
                  </div>
                </div>
              </form>
            {% else %}
              <div class="row form-group">
                <div class="col-md-12 mb-3 mb-md-0">
                  <label for="option-job-type-1">
                    あなたは雇用者でありません
                  </label>
                </div>
              </div>
            {% endif %}
          </div>

          <div class="col-lg-4">
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">Contact Info</h3>
              <p class="mb-0 font-weight-bold">Address</p>
              <p class="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

              <p class="mb-0 font-weight-bold">Phone</p>
              <p class="mb-4"><a href="#">+1 232 3235 324</a></p>

              <p class="mb-0 font-weight-bold">Email Address</p>
              <p class="mb-0"><a href="#"><span class="__cf_email__" data-cfemail="671e081215020a060e0b2703080a060e094904080a">[email&#160;protected]</span></a></p>

            </div>
            
            <div class="p-4 mb-3 bg-white">
              <h3 class="h5 text-black mb-3">More Info</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ad iure porro mollitia architecto hic consequuntur. Distinctio nisi perferendis dolore, ipsa consectetur</p>
              <p><a href="#" class="btn btn-primary  py-2 px-4">Learn More</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

	{% endblock %}
```

```python
# jobs/urls.py
from django.urls import path
from .views import *

app_name = "jobs"
urlpatterns = [
    path('', HomeView.as_view(), name="home"),
    path('create-job/', CreateJobView.as_view(), name="create_job"),
]
```
```python
# jobs/views.py
from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Job, Category
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import CreateView
from .forms import *

class HomeView(ListView):
  template_name="jobs/index.html"
  context_object_name = 'jobs'
  model = Job
  paginate_by = 1
  
  def get_context_data(self, **kwargs):
    context = super(HomeView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context

@method_decorator(login_required(login_url='/'), name='dispatch')
class CreateJobView(SuccessMessageMixin, CreateView):
  model = Job
  template_name = "jobs/create-jobs.html"
  forms_class = CreateJobForm
  fields = ['title', 'company', 'location', 'job_type', 'category', 'description' ]
  success_url = '/'
  success_message = '仕事が投稿されました'
  
  def form_valid(self, form):
    job = form.save(commit = False)
    job.employer = self.request.user
    job.save()
    return super(CreateJobView, self).form_valid(form)
```
### 仕事の詳細ページを作成する
SingleJobViewを作成する
```python
# jobs/views.py
from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Job, Category
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import CreateView, DetailView
from .forms import *
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

class HomeView(ListView):
  template_name="jobs/index.html"
  context_object_name = 'jobs'
  model = Job
  paginate_by = 1
  
  def get_context_data(self, **kwargs):
    context = super(HomeView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context


@method_decorator(login_required(login_url='/'), name='dispatch')
class CreateJobView(SuccessMessageMixin, CreateView):
  model = Job
  template_name = "jobs/create-jobs.html"
  forms_class = CreateJobForm
  fields = ['title', 'company', 'location', 'job_type', 'category', 'description' ]
  success_url = '/'
  success_message = '仕事が投稿されました'
  
  def form_valid(self, form):
    job = form.save(commit = False)
    job.employer = self.request.user
    job.save()
    return super(CreateJobView, self).form_valid(form)

class SingleJobView(DetailView): # added
  template_name = 'jobs/single.html'
  model = Job
  context_object_name = 'job'

  def get_context_data(self, **kwargs):
    context = super(SingleJobView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context
```
{{ job.description | safe }}とsafeを付けることで仕事内容欄の記入するとき、boldや改行のStyleが有効になる
```html
<!-- templates/jobs.single.html -->
{% extends 'base.html' %}
{% load static %}
{% block content %}
    
    <div class="hero-wrap js-fullheight" style="background-image: url('{% static 'images/bg_2.jpg' %}');" data-stellar-background-ratio="0.5">
      <div class="overlay"></div>
      <div class="container"> 
        <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start" data-scrollax-parent="true">
          <div class="col-md-8 ftco-animate text-center text-md-left mb-5" data-scrollax=" properties: { translateY: '70%' }">
          	<p class="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span class="mr-3"><a href="index.html">Home <i class="ion-ios-arrow-forward"></i></a></span> <span class="mr-3"><a href="blog.html">Blog <i class="ion-ios-arrow-forward"></i></a></span> <span>Single</span></p>
            <h1 class="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">仕事の詳細</h1>
          </div>
        </div>
      </div>
    </div>

    <section class="ftco-section ftco-degree-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ftco-animate">
            <h2 class="mb-3">{{ job.title }}</h2>
            <p>{{ job.description | safe }}</p>

          </div> <!-- .col-md-8 -->
          <div class="col-md-4 sidebar ftco-animate">
            <div class="sidebar-box">
              <form action="#" class="search-form">
                <div class="form-group">
                  <span class="icon icon-search"></span>
                  <input type="text" class="form-control" placeholder="Type a keyword and hit enter">
                </div>
              </form>
            </div>
            <div class="sidebar-box ftco-animate">
              <div class="categories">
                <h3>カテゴリー</h3>
                {% for category in categories %}
                <li><a href="#">{{ category.title }}<span>({{ category.job_count}})</span></a></li>
                {% endfor %}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section> <!-- .section -->

{% endblock %}
```

```python
# jobs/urls.py
from django.urls import path
# from jobs.views import *
from .views import *

app_name = "jobs"
urlpatterns = [
    path('', HomeView.as_view(), name="home"),
    path('create-job/', CreateJobView.as_view(), name="create_job"),
    path('detail/<str:pk>/', SingleJobView.as_view(), name="single_job"), # added
]
```
### カテゴリー別リストを作成する
Category Detail Viewの作成
```python
from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView, ListView
from .models import Job, Category

class CategoryDetailView(ListView):
  model = Job
  template_name = 'jobs/category-detail.html'
  context_object_name = 'jobs'
  paginate_by = 2
  
  def get_queryset(self):
    self.category = get_object_or_404(Category, pk=self.kwargs['pk'])
    return Job.objects.filter(Category=self.category)
  
  def get_context_data(self, **kwargs):
    context = super(CategoryDetailView, self).get_context_data(**kwargs)
    context['categories'] = Category.objects.all()
    return context
```
Category Detail Template Fileの作成
```html
<!-- templates/jobs/category-detail.html -->
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
          	<span class="subheading">{{ category }}の仕事一覧</span>
            <h2 class="mb-4"><span>Current</span> Job for {{ category }}</h2>
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
          	<span class="subheading">Recently Added Jobs</span>
            <h2 class="mb-4"><span>最近追加した</span>仕事</h2>
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

```python
# jobs/urls.py
from django.urls import path
# from jobs.views import *
from .views import *

app_name = "jobs"
urlpatterns = [
    path('', HomeView.as_view(), name="home"),
    path('create-job/', CreateJobView.as_view(), name="create_job"),
    path('detail/<str:pk>/', SingleJobView.as_view(), name="single_job"),
    path('category-detail/<str:pk>/', CategoryDetailView.as_view(), name="category_detail"),
]
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

