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
user@mbp Django % mkdir Django-fantom-blog
user@mbp Django % cd Django-fantom-blog
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

### Static Files Folderを作成する
Static Files Directory の作成
https://docs.djangoproject.com/en/4.1/howto/static-files/
```python
# settings.py
STATIC_URL = 'static/'
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
        'DIRS': [os.path.join(BASE_DIR, 'templates')], // 追加
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
(venv) user@mbp Django-fantom-blog % python manage.py migrate 
```
db.qlite3を右クリック→Open Database→SQLITE EXPLORER  
次にDjango Appの作成
```python
(venv) user@mbp Django-fantom-blog % python manage.py startapp posts
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
    'posts.apps.PostsConfig'　// added
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
    path('', include('posts.urls')),  # added
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
### 最初のTemplate Fileを作成する
staticフォルダの配下にcss, fonts, img, js, scss, vendorsフォルダを作成する  
templateフォルダの配下にpostsフォルダを作成してindex.htmlファイルを作成する  
index.htmlファイルに下記のデザイン済みのhtmlファイルをコピーする  
```html
<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="icon" href="img/favicon.png" type="image/png">
        <title>Fantom Blog</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="vendors/linericon/style.css">
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" href="vendors/owl-carousel/owl.carousel.min.css">
        <link rel="stylesheet" href="vendors/lightbox/simpleLightbox.css">
        <link rel="stylesheet" href="vendors/nice-select/css/nice-select.css">
        <link rel="stylesheet" href="vendors/animate-css/animate.css">
        <link rel="stylesheet" href="vendors/jquery-ui/jquery-ui.css">
        <!-- main css -->
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/responsive.css">
    </head>
    <body>
        
        <!--================Header Menu Area =================-->
        <header class="header_area">
            <div class="logo_part">
            	<div class="container">
            		<a class="logo" href="#"><img src="img/logo.png" alt=""></a>
            	</div>
            </div>
			<div class="main_menu">
				<nav class="navbar navbar-expand-lg navbar-light">
					<div class="container">
						<!-- Brand and toggle get grouped for better mobile display -->
						<a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
							<ul class="nav navbar-nav menu_nav">
								<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li> 
								<li class="nav-item"><a class="nav-link" href="category.html">Category</a></li>
								<li class="nav-item"><a class="nav-link" href="archive.html">Archive</a></li>
								<li class="nav-item submenu dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
									<ul class="dropdown-menu">
										<li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
										<li class="nav-item"><a class="nav-link" href="elements.html">Elements</a></li>
									</ul>
								</li> 
								<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
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
        
        <!--================Post Slider Area =================-->
        <section class="post_slider_area">
			<div class="post_slider_inner owl-carousel">
				<div class="item">
					<div class="post_s_item">
						<div class="post_img">
							<img src="img/post-slider/post-s-1.jpg" alt="">
						</div>
						<div class="post_text">
							<a class="cat" href="#">Gadgets</a>
							<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke + CO Alarm</h4></a>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
							<div class="date">
								<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
								<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
							</div>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="post_s_item">
						<div class="post_img">
							<img src="img/post-slider/post-s-2.jpg" alt="">
						</div>
						<div class="post_text">
							<a class="cat" href="#">Gadgets</a>
							<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke + CO Alarm</h4></a>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
							<div class="date">
								<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
								<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
							</div>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="post_s_item">
						<div class="post_img">
							<img src="img/post-slider/post-s-3.jpg" alt="">
						</div>
						<div class="post_text">
							<a class="cat" href="#">Gadgets</a>
							<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke + CO Alarm</h4></a>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
							<div class="date">
								<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
								<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
							</div>
						</div>
					</div>
				</div>
				<div class="item">
					<div class="post_s_item">
						<div class="post_img">
							<img src="img/post-slider/post-s-4.jpg" alt="">
						</div>
						<div class="post_text">
							<a class="cat" href="#">Gadgets</a>
							<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke + CO Alarm</h4></a>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
							<div class="date">
								<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
								<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
							</div>
						</div>
					</div>
				</div>
			</div>
        </section>
        <!--================End Post Slider Area =================-->
        
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
										<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
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
										<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
										<div class="date">
											<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
											<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
										</div>	
									</div>
								</div>
                            </article>
                            <div class="row">
                            	<div class="col-md-6">
                            		<article class="blog_style1 small">
										<div class="blog_img">
											<img class="img-fluid" src="img/home-blog/blog-small-1.jpg" alt="">
										</div>
										<div class="blog_text">
											<div class="blog_text_inner">
												<a class="cat" href="#">Gadgets</a>
												<a href="single-blog.html"><h4>2nd Gen Smoke Co Bomb Alarm integration</h4></a>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
												<div class="date">
													<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
													<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
												</div>	
											</div>
										</div>
									</article>
                            	</div>
                            	<div class="col-md-6">
                            		<article class="blog_style1 small">
										<div class="blog_img">
											<img class="img-fluid" src="img/home-blog/blog-small-2.jpg" alt="">
										</div>
										<div class="blog_text">
											<div class="blog_text_inner">
												<a class="cat" href="#">Gadgets</a>
												<a href="single-blog.html"><h4>2nd Gen Smoke Co Bomb Alarm integration</h4></a>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
												<div class="date">
													<a href="#"><i class="fa fa-calendar" aria-hidden="true"></i> March 14, 2018</a>
													<a href="#"><i class="fa fa-comments-o" aria-hidden="true"></i> 05</a>
												</div>	
											</div>
										</div>
									</article>
                            	</div>
                            </div>
                            <article class="blog_style1">
                            	<div class="blog_img">
                            		<img class="img-fluid" src="img/home-blog/blog-3.jpg" alt="">
                            	</div>
                            	<div class="blog_text">
									<div class="blog_text_inner">
										<a class="cat" href="#">Gadgets</a>
										<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
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
										<a href="single-blog.html"><h4>Nest Protect: 2nd Gen Smoke CO Alarm</h4></a>
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
        
        <!--================ start footer Area  =================-->	
        <footer class="footer-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3  col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title">About Us</h6>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6 class="footer_title">Newsletter</h6>
                            <p>Stay updated with our latest trends</p>		
                            <div id="mc_embed_signup">
                                <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscribe_form relative">
                                    <div class="input-group d-flex flex-row">
                                        <input name="EMAIL" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address '" required="" type="email">
                                        <button class="btn sub-btn"><span class="lnr lnr-arrow-right"></span></button>		
                                    </div>									
                                    <div class="mt-10 info"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-footer-widget instafeed">
                            <h6 class="footer_title">Instagram Feed</h6>
                            <ul class="list instafeed d-flex flex-wrap">
                                <li><img src="img/instagram/Image-01.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-02.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-03.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-04.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-05.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-06.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-07.jpg" alt=""></li>
                                <li><img src="img/instagram/Image-08.jpg" alt=""></li>
                            </ul>
                        </div>
                    </div>	
                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <div class="single-footer-widget f_social_wd">
                            <h6 class="footer_title">Follow Us</h6>
                            <p>Let us be social</p>
                            <div class="f_social">
                            	<a href="#"><i class="fa fa-facebook"></i></a>
								<a href="#"><i class="fa fa-twitter"></i></a>
								<a href="#"><i class="fa fa-dribbble"></i></a>
								<a href="#"><i class="fa fa-behance"></i></a>
                            </div>
                        </div>
                    </div>						
                </div>
                <div class="row footer-bottom d-flex justify-content-between align-items-center">
                    <p class="col-lg-12 footer-text text-center"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                </div>
            </div>
        </footer>
		<!--================ End footer Area  =================-->
       
        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="js/jquery-3.2.1.min.js"></script>
        <script src="js/popper.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/stellar.js"></script>
        <script src="vendors/lightbox/simpleLightbox.min.js"></script>
        <script src="vendors/nice-select/js/jquery.nice-select.min.js"></script>
        <script src="vendors/isotope/imagesloaded.pkgd.min.js"></script>
        <script src="vendors/isotope/isotope-min.js"></script>
        <script src="vendors/owl-carousel/owl.carousel.min.js"></script>
        <script src="vendors/jquery-ui/jquery-ui.js"></script>
        <script src="js/jquery.ajaxchimp.min.js"></script>
        <script src="js/mail-script.js"></script>
        <script src="js/theme.js"></script>
    </body>
</html>
```
postsフォルダのurls.pyにindex.htmlのパスを追加する　P182
```python
# posts/urls.py
from django.urls import path
# from posts.views import *
from .views import *

urlpatterns = [
    path('', IndexView.as_view(), name="index"),
] 
```
postsフォルダのviews.pyにIndexViewというクラスビューを作成する 183
```python
from django.shortcuts import render
from django.views.generic import TemplateView

class IndexView(TemplateView):
  template_name="posts/index.html"
```
### Static Filesをtemplates/posts/index.htmlに取り込む
先頭に{% load static %}を追加する
```html
// templates/posts/index.htm
{% load static %} // added
<!doctype html>
<html lang="en">
```
index.htmの中の全ての 「"img/」を「"{% static "img/」に置換する  
index.htmの中の全ての 「.png"」を「.png" %}"」に置換する  
index.htmの中の全ての 「.jpg"」を「.jpg" %}"」に置換する  
index.htmの中の全ての 「"css/」を「"{% static "css/」に置換する  
index.htmの中の全ての 「.css"」を「.css" %}"」に置換する  
index.htmの中の全ての 「"vendors/」を「"{% static "vendors/」に置換する  
index.htmの中の全ての 「"js/」を「"{% static "js/」に置換する  
index.htmの中の全ての 「.js"」を「.js" %}"」に置換する  
#### Base Htmlを作成する
index.htmlからヘッダーとフッターを切り抜いてbase.htmlを作る
```python
# templates/base.html
{% load static %}
<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="icon" href="{% static "img/favicon.png" %}" type="image/png">
        <title>Fantom Blog</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="{% static "css/bootstrap.css" %}">
        <link rel="stylesheet" href="{% static "vendors/linericon/style.css" %}">
        <link rel="stylesheet" href="{% static "css/font-awesome.min.css" %}">
        <link rel="stylesheet" href="{% static "vendors/owl-carousel/owl.carousel.min.css" %}">
        <link rel="stylesheet" href="{% static "vendors/lightbox/simpleLightbox.css" %}">
        <link rel="stylesheet" href="{% static "vendors/nice-select/css/nice-select.css" %}">
        <link rel="stylesheet" href="{% static "vendors/animate-css/animate.css" %}">
        <link rel="stylesheet" href="{% static "vendors/jquery-ui/jquery-ui.css" %}">
        <!-- main css -->
        <link rel="stylesheet" href="{% static "css/style.css" %}">
        <link rel="stylesheet" href="{% static "css/responsive.css" %}">
    </head>
    <body>
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
						<a class="navbar-brand logo_h" href="index.html"><img src="{% static "img/logo.png" %}" alt=""></a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
							<ul class="nav navbar-nav menu_nav">
								<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li> 
								<li class="nav-item"><a class="nav-link" href="category.html">Category</a></li>
								<li class="nav-item"><a class="nav-link" href="archive.html">Archive</a></li>
								<li class="nav-item submenu dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
									<ul class="dropdown-menu">
										<li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
										<li class="nav-item"><a class="nav-link" href="elements.html">Elements</a></li>
									</ul>
								</li> 
								<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
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
      #  ここにindex.htmlの内容を表示させる
{% endblock %}
        <!--================ start footer Area  =================-->	
        <footer class="footer-area">
          <div class="container">
              <div class="row">
                  <div class="col-lg-3  col-md-6 col-sm-6">
                      <div class="single-footer-widget">
                          <h6 class="footer_title">About Us</h6>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                      <div class="single-footer-widget">
                          <h6 class="footer_title">Newsletter</h6>
                          <p>Stay updated with our latest trends</p>		
                          <div id="mc_embed_signup">
                              <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get" class="subscribe_form relative">
                                  <div class="input-group d-flex flex-row">
                                      <input name="EMAIL" placeholder="Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Email Address '" required="" type="email">
                                      <button class="btn sub-btn"><span class="lnr lnr-arrow-right"></span></button>		
                                  </div>									
                                  <div class="mt-10 info"></div>
                              </form>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-6">
                      <div class="single-footer-widget instafeed">
                          <h6 class="footer_title">Instagram Feed</h6>
                          <ul class="list instafeed d-flex flex-wrap">
                              <li><img src="{% static "img/instagram/Image-01.jpg" %}" alt=""></li>
                               <li><img src="{% static "img/instagram/Image-08.jpg" %}" alt=""></li>
                          </ul>
                      </div>
                  </div>	
                  <div class="col-lg-2 col-md-6 col-sm-6">
                      <div class="single-footer-widget f_social_wd">
                          <h6 class="footer_title">Follow Us</h6>
                          <p>Let us be social</p>
                          <div class="f_social">
                            <a href="#"><i class="fa fa-facebook"></i></a>
              <a href="#"><i class="fa fa-twitter"></i></a>
              <a href="#"><i class="fa fa-dribbble"></i></a>
              <a href="#"><i class="fa fa-behance"></i></a>
                          </div>
                      </div>
                  </div>						
              </div>
              <div class="row footer-bottom d-flex justify-content-between align-items-center">
                  <p class="col-lg-12 footer-text text-center"><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
              </div>
          </div>
      </footer>
  <!--================ End footer Area  =================-->
      <!-- Optional JavaScript -->
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="{% static "js/jquery-3.2.1.min.js" %}"></script>
      <script src="{% static "js/popper.js" %}"></script>
      <script src="{% static "js/bootstrap.min.js" %}"></script>
      <script src="{% static "js/stellar.js" %}"></script>
      <script src="{% static "vendors/lightbox/simpleLightbox.min.js" %}"></script>
      <script src="{% static "vendors/nice-select/js/jquery.nice-select.min.js" %}"></script>
      <script src="{% static "vendors/isotope/imagesloaded.pkgd.min.js" %}"></script>
      <script src="{% static "vendors/isotope/isotope-min.js" %}"></script>
      <script src="{% static "vendors/owl-carousel/owl.carousel.min.js" %}"></script>
      <script src="{% static "vendors/jquery-ui/jquery-ui.js" %}"></script>
      <script src="{% static "js/jquery.ajaxchimp.min.js" %}"></script>
      <script src="{% static "js/mail-script.js" %}"></script>
      <script src="{% static "js/theme.js" %}"></script>
  </body>
</html>
```
切り抜いた後のindex.html
```python
{% extends 'base.html'%}
{% load static %}

{% block content %}
        <!--================Post Slider Area =================-->
              ・・・・・ここにコンテンツを記載する・・・・・
        <!--================Blog Area =================-->
{% endblock %}
```
#### SuperUserを作成する
```python
(venv) user@mbp Django-fantom-blog % python manage.py createsuperuser 
Username (leave blank to use 'user'): user
Email address: 
Password: 123
```
### First Modelの作成
date=models.DateField(auto_now_add=True)にすると自動的に日付が適用される   
’uploads/'は画像を格納するフォルダ名で最後にスラッシュをつける  
```python
# posts/models.py
from django.db import models
from django.conf import settings

class Post(models.Model):
  title = models.CharField(verbose_name='タイトル',max_length=150)
  content = models.TextField(verbose_name='内容')
  publishing_date=models.DateField(verbose_name='投稿日', auto_now_add=True)
  image = models.ImageField(verbose_name='画像',null=True, blank=True, upload_to='uploads/')
  user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='ユーザ',on_delete=models.CASCADE)
  
  def __str__(self):
    return self.title
```
作成したモデルでテーブルを作成してデータベースに登録する
```python
(venv) user@mbp Django-fantom-blog % python manage.py makemigrations
(venv) user@mbp Django-fantom-blog % python manage.py migrate 
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
<img class="img-fluid" src="{% static "img/home-blog/blog-1.jpg" %}" alt="">  
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
      <img class="img-fluid" src="{{ post.image.url }}" alt="">
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
Category別リスト(Category Deteil View)を作成する  
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

