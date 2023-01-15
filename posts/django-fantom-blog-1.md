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

### SuperUserの作成
```python
(venv) user@mbp Django-fantom-blog % python manage.py createsuperuser 
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







