---
title: 'Django: Real Estate Site -1-'
date: 'August 28, 2022'
excerpt: '不動産サイトを作成しました。画面はフリーの素材を借りていて、主にサーバーサイドをDjangoで作りました。'
cover_image: '/images/posts/img2.jpg'
category: 'Python'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/11.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
Code: https://github.com/toku31/btre_project
#### Pull Data From Listings Model #41
~~~
// btre_project/listings/views.py 
from django.shortcuts import get_object_or_404, render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from .choices import price_choices, bedroom_choices, state_choices
from .models import Listing

def index(request):
    listings = Listing.objects.order_by('-list_date').filter(is_publised=True)

    paginator = Paginator(listings, 6)
    page = request.GET.get('page')
    paged_listings = paginator.get_page(page)

    context = {
        'listings': paged_listings
    }

    return render(request, 'listings/listings.html', context)

def listing(request, listing_id):
    listing = get_object_or_404(Listing, pk=listing_id)

    context = {
        'listing': listing
    }
    return render(request, 'listings/listing.html', context)

def search(request):
    return render(request, 'listings/search.html', context)
~~~

変数の渡し方1
~~~
def index(request):
    return render(request, 'listings/listings.html', {'name': 'John'})
~~~
変数の渡し方2
~~~
def index(request):
    listings = Listing.objects.all()

    context = {
        'listings': listings
    }

    return render(request, 'listings/listings.html', context)
~~~
HTMLテンプレートに表示
~~~js
// btre_project/templates/listings/listings.html
<!-- Listings -->
<section id="listings" class="py-4">
  <div class="container">
    <div class="row">
      {% if listings %} 
        {% for listing in listings %}
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card listing-preview">
            <img class="card-img-top" src="{{ listing.photo_main.url }}" alt="" />
            <div class="card-img-overlay">
                <h2>
                <span class="badge badge-secondary text-white"
                    >${{ listing.price | intcomma }}</span>
                </h2>
            </div>
            <div class="card-body">
                <div class="listing-heading text-center">
                <h4 class="text-primary">{{ listing.title }}</h4>
                <p>
                    <i class="fas fa-map-marker text-secondary"></i> {{ listing.city }} {{ listing.state }}, {{ listing.zipcode }}
                </p>
                </div>
                <hr />
                <div class="row py-2 text-secondary">
                <div class="col-6"><i class="fas fa-th-large"></i> Sqft: {{ listing.sqrt }}</div>
                <div class="col-6"><i class="fas fa-car"></i> Garage: {{ listing.grarage }}</div>
                </div>
                <div class="row py-2 text-secondary">
                <div class="col-6"><i class="fas fa-bed"></i> Bedrooms: {{ listing.bedrooms }}</div>
                <div class="col-6"><i class="fas fa-bath"></i> Bathrooms: {{ listing.bathrooms }}</div>
                </div>
                <hr />
                <div class="row py-2 text-secondary">
                <div class="col-12"><i class="fas fa-user"></i> {{ listing.realtor }} </div>
                </div>
                <div class="row text-secondary pb-2">
                <div class="col-6"><i class="fas fa-clock"></i> {{ listing.list_date | timesince }}</div>
                </div>
                <hr />
                <a href="{% url 'listing' listing.id %}" class="btn btn-primary btn-block"
                >More Info</a
                >
            </div>
            </div>
        </div>
        {% endfor %} 
      {% else %}
        <div class="col-md-12">
            <p>No Listings Available</p>
        </div>
      {% endif %}
    </div>
~~~

金額の表示　humanize: intcomma  
https://docs.djangoproject.com/en/4.1/ref/contrib/humanize/
~~~
// btre_project/btre/settings.py 
INSTALLED_APPS = [
    'pages.apps.PagesConfig',
    'listings.apps.ListingsConfig',
      - - - - - - - - - - - - 
    'django.contrib.staticfiles',
    'django.contrib.humanize' // 追加
]

// btre_project/templates/listings/listings.html
{% extends 'base.html' %}
{% load humanize %} // 追加
{% block title %} | Browse Property Listings {% endblock %}
~~~

~~~
def listing(request, listing_id):
    listing = get_object_or_404(Listing, pk=listing_id)

    context = {
        'listing': listing
    }
    return render(request, 'listings/listing.html', context)
~~~
上の引数のlisting_idは以下のurls.pyと一致させる
~~~
// btre_project/listings/urls.py 
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='listings'),
    path('<int:listing_id>', views.listing, name='listing'),
    path('search', views.search, name='search'),
]
~~~

#### Pagination, Order, Filter #42
Pagination
~~~python
// btre_project/listings/views.py
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator

def index(request):
    // 日付順で公開可のもだけ表示する
    listings = Listing.objects.order_by('-list_date').filter(is_publised=True)
    // パジネーション用
    paginator = Paginator(listings, 6)
    page = request.GET.get('page')
    paged_listings = paginator.get_page(page)

    context = {
        'listings': paged_listings
    }

    return render(request, 'listings/listings.html', context)
~~~
Dnago公式サイト：https://docs.djangoproject.com/en/4.1/topics/pagination/
~~~python
{% for contact in page_obj %}
    {# Each "contact" is a Contact model object. #}
    {{ contact.full_name|upper }}<br>
    ...
{% endfor %}

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
~~~
bootstrapのpagenation：https://getbootstrap.jp/docs/4.2/components/pagination/
~~~html
<nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active">
      <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
~~~
上の２つを合わせる（pagination & bootstrap)
~~~html
<div class="row">
    <div class="col-md-12">
    {% if listings.has_other_pages %}
        <ul class="pagination">
        {% if listings.has_previous %}
            <li class="page-item">
                <a href="?page={{listings.previous_page_number}}" class="page-link">&laquo;</a>
            </li>
        {% else %}
            <li class="page-item disabled">
                <a class="page-link">&laquo;</a>
            </li>
        {% endif %}
        {% for i in listings.paginator.page_range %}
            {% if listings.number == i %}
                <li class="page-item active">
                    <a class="page-link">{{i}}</a>
                </li>
            {% else %}
                <li class="page-item">
                    <a href="?page={{i}}" class="page-link">{{i}}</a>
                </li>
            {% endif %}
        {% endfor %}
        {% if listings.has_next %}
        <li class="page-item">
            <a href="?page={{listings.next_page_number}}" class="page-link">&raquo;</a>
        </li>
        {% else %}
            <li class="page-item disabled">
                <a class="page-link">&raquo;</a>
            </li>
        {% endif %}
        </ul>
        {% endif %}
    </div>
~~~

#### Home & About Page Dynamic content #43
~~~python
// btre_project/pages/views.py 
from django.http import HttpResponse
from listings.models import Listing
from realtors.models import Realtor

def index(request):
    # return HttpResponse('<h1>Hello World</h1>')
    listings = Listing.objects.order_by('-list_date').filter(is_publised=True)[:3]

    context = {
        'listings': listings,
    }

    return render(request, 'pages/index.html', context)

def about(request):
    # Get all realtors
    realtors = Realtor.objects.order_by('-hire_date')
    #Get MVP
    mvp_realtors = Realtor.objects.all().filter(is_mvp=True)

    context = {
        'realtors': realtors,
        'mvp_realtors': mvp_realtors
    }

    return render(request, 'pages/about.html', context)
~~~

~~~html
// btre_project/templates/pages/index.html
<!-- Listings -->
<section id="listings" class="py-5">
  <div class="container">
    <h3 class="text-center mb-3">Latest Listings</h3>
    <div class="row">
      {% if listings %} {% for listing in listings %}
      <!-- Listing 1 -->
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card listing-preview">
          <img class="card-img-top" src="{{ listing.photo_main.url }}" alt="" />
          <div class="card-img-overlay">
            <h2>
              <span class="badge badge-secondary text-white"
                >${{ listing.price | intcomma }}</span
              >
            </h2>
          </div>
          <div class="card-body">
            <div class="listing-heading text-center">
              <h4 class="text-primary">{{ listing.title }}</h4>
              <p>
                <i class="fas fa-map-marker text-secondary"></i>
                {{listing.city}} {{ listing.state }} {{ listing.zipcode }}
              </p>
            </div>
            <hr />
            <div class="row py-2 text-secondary">
              <div class="col-6">
                <i class="fas fa-th-large"></i> Sqft: {{ listing.sqrt }}
              </div>
              <div class="col-6">
                <i class="fas fa-car"></i> Garage: {{ listing.grarage }}
              </div>
            </div>
            <div class="row py-2 text-secondary">
              <div class="col-6">
                <i class="fas fa-bed"></i> Bedrooms: {{ listing.bedrooms }}
              </div>
              <div class="col-6">
                <i class="fas fa-bath"></i> Bathrooms: {{ listing.bathrooms }}
              </div>
            </div>
            <hr />
            <div class="row py-2 text-secondary">
              <div class="col-6">
                <i class="fas fa-user"></i> {{ listing.realtor }}
              </div>
            </div>
            <div class="row text-secondary pb-2">
              <div class="col-6">
                <i class="fas fa-clock"></i> {{ listing.list_date | timesince }}
              </div>
            </div>
            <hr />
            <a href="{% url 'listing' listing.id %}"
              class="btn btn-primary btn-block">More Info</a>
          </div>
        </div>
      </div>
      {% endfor %} {% else %}
      <div class="col-md-12">
        <p>No Listings Available</p>
      </div>
      {% endif %}
    </div>
  </div>
</section>
~~~

~~~html
btre_project/templates/pages/about.html
             - - - 
<!-- Team -->
<section id="team" class="py-5">
  <div class="container">
    <h2 class="text-center">Our Team</h2>
    <div class="row text-center">
      {% if realtors %} 
        {% for realtor in realtors %}
            <div class="col-md-4">
                <img src="{{ realtor.photo.url }}" alt="" class="rounded-circle mb-3" />
                <h4>Kyle Brown</h4>
                <p class="text-success">
                <i class="fas fa-award text-success mb-3"></i> Realtor
                </p>
                <hr />
                <p><i class="fas fa-phone"></i>{{ realtor.phone }}</p>
                <p><i class="fas fa-envelope-open"></i>{{ realtor.email }}</p>
            </div>
        {% endfor %} 
      {% else %}
        <div class="col-md-12">
            <p>No Realtors Available</p>
        </div>
      {% endif %}
    </div>
  </div>
</section>
~~~

#### Single Listing Page 1物件の詳細ページ  #44
~~~html
// btre_project/templates/listings/listing.html
{% extends 'base.html' %}
{% load humanize %}
{% block title %} | {{ listing.title }} {% endblock %}
{% block content %}
<section id="showcase-inner" class="py-5 text-white">
    <div class="container">
        <div class="row text-center">
            <div class="col-md-12">
                <h1 class="display-4">{{ listing.title }}</h1>
                <p class="lead">
                    <i class="fas fa-map-marker"></i> {{ listing.city }} {{ listing.state }}, {{ listing.zipcode }}</p>
            </div>
        </div>
    </div>
</section>
<!-- Breadcrumb -->
<section id="bc" class="mt-3">
    <div class="container">
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="{% url 'index' %}">Home</a>
                </li>
                <li class="breadcrumb-item">
                    <a href="{% url 'listings' %}">Listings</a>
                </li>
                <li class="breadcrumb-item active">{{ listing.title }}</li>
            </ol>
        </nav>
    </div>
</section>
 <!-- Alerts -->
 {% include 'partials/_alerts.html' %}
<!-- Listing -->
<section id="listing" class="py-4">
    <div class="container">
        <a href="{% url 'listings' %}" class="btn btn-light mb-4">Back To Listings</a>
        <div class="row">
            <div class="col-md-9">
                <!-- Home Main Image -->
                <img src="{{ listing.photo_main.url }}" alt="" class="img-main img-fluid mb-3">
                <!-- Thumbnails -->
                <div class="row mb-5 thumbs">
                    {% if listing.photo_1 %}
                    <div class="col-md-2">
                        <a href="{{ listing.photo_1.url }}" data-lightbox="home-images">
                            <img src="{{ listing.photo_1.url }}" alt="" class="img-fluid">
                        </a>
                    </div>
                    {% endif %}
                    {% if listing.photo_2 %}
                    <div class="col-md-2">
                        <a href="{{ listing.photo_2.url }}" data-lightbox="home-images">
                            <img src="{{ listing.photo_2.url }}" alt="" class="img-fluid">
                        </a>
                    </div>
                    {% endif %}
                    {% if listing.photo_3 %}
                    <div class="col-md-2">
                        <a href="{{ listing.photo_3.url }}" data-lightbox="home-images">
                            <img src="{{ listing.photo_3.url }}" alt="" class="img-fluid">
                        </a>
                    </div>
                    {% endif %}
                    {% if listing.photo_4 %}
                    <div class="col-md-2">
                        <a href="{{ listing.photo_4.url }}" data-lightbox="home-images">
                            <img src="{{ listing.photo_4.url }}" alt="" class="img-fluid">
                        </a>
                    </div>
                    {% endif %}
                    {% if listing.photo_5 %}
                    <div class="col-md-2">
                        <a href="{{ listing.photo_5.url }}" data-lightbox="home-images">
                            <img src="{{ listing.photo_5.url }}" alt="" class="img-fluid">
                        </a>
                    </div>
                    {% endif %}
                    {% if listing.photo_6 %}
                    <div class="col-md-2">
                        <a href="{{ listing.photo_6.url }}" data-lightbox="home-images">
                            <img src="{{ listing.photo_6.url }}" alt="" class="img-fluid">
                        </a>
                    </div>
                    {% endif %}
                </div>
                <!-- Fields -->
                <div class="row mb-5 fields">
                    <div class="col-md-6">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-money-bill-alt"></i> Asking Price:
                                <span class="float-right">${{ listing.price | intcomma }}</span>
                            </li>
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-bed"></i> Bedrooms:
                                <span class="float-right">{{ listing.bedrooms }}</span>
                            </li>
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-bath"></i> Bathrooms:
                                <span class="float-right">{{ listing.bathrooms }}</span>
                            </li>
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-car"></i> Garage:
                                <span class="float-right">{{ listing.grarage }}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-th-large"></i> Square Feet:
                                <span class="float-right">{{ listing.sqrt }}</span>
                            </li>
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-square"></i> Lot Size:
                                <span class="float-right">{{ listing.lot_size }} Acres
                                </span>
                            </li>
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-calendar"></i> Listing Date:
                                <span class="float-right">{{ listing.list_date }}</span>
                            </li>
                            <li class="list-group-item text-secondary">
                                <i class="fas fa-bed"></i> Realtor:
                                <span class="float-right">{{ listing.realtor }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Description -->
                <div class="row mb-5">
                    <div class="col-md-12">
                        {{ listing.description }}
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card mb-3">
                    <img class="card-img-top" src="{{ listing.realtor.photo.url }}" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Property Realtor</h5>
                        <h6 class="text-secondary">{{ listing.realtor }}</h6>
                    </div>
                </div>
                <button class="btn-primary btn-block btn-lg" data-toggle="modal" data-target="#inquiryModal">Make An
                    Inquiry</button>
            </div>
        </div>
    </div>
</section>
<!-- Inquiry Modal -->
<div class="modal fade" id="inquiryModal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="inquiryModalLabel">Make An Inquiry</h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="{% url 'contact' %}" method="POST">
                    {% csrf_token %}
                    {% if user.is_authenticated %}
                        <input type="hidden" name="user_id" value="{{ user.id }}">
                    {% else %}
                        <input type="hidden" name="user_id" value="0">
                    {% endif %}
                    <input type="hidden" name="realtor_email" value="{{ listing.realtor.email }}">
                    <input type="hidden" name="listing_id" value="{{ listing.id }}">
                    <div class="form-group">
                        <label for="property_name" class="col-form-label">Property:</label>
                        <input type="text" name="listing" class="form-control" value="{{ listing.title }}">
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-form-label">Name:</label>
                        <input type="text" name="name" class="form-control" {% if user.is_authenticated %} value="{{ user.first_name}} {{user.last_name}}" {% endif %} required>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-form-label">Email:</label>
                        <input type="email" name="email" class="form-control" {% if user.is_authenticated %} value="{{ user.email }}" {% endif %} required>
                    </div>
                    <div class="form-group">
                        <label for="phone" class="col-form-label">Phone:</label>
                        <input type="text" name="phone" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="message" class="col-form-label">Message:</label>
                        <textarea name="message" class="form-control"></textarea>
                    </div>
                    <hr>
                    <input type="submit" value="Send" class="btn btn-block btn-secondary">
                </form>
            </div>
        </div>
    </div>
</div>
{% endblock %}
~~~

~~~python
// btre_project/listings/views.py
from django.shortcuts import get_object_or_404, render
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from .models import Listing

def index(request):
    listings = Listing.objects.order_by('-list_date').filter(is_publised=True)

    paginator = Paginator(listings, 6)
    page = request.GET.get('page')
    paged_listings = paginator.get_page(page)

    context = {
        'listings': paged_listings
    }
    return render(request, 'listings/listings.html', context)

def listing(request, listing_id):
    listing = get_object_or_404(Listing, pk=listing_id)
    context = {
        'listing': listing
    }
    return render(request, 'listings/listing.html', context)

def search(request):
    return render(request, 'listings/search.html', context)
~~~

#### Search Form Choices  #45
3つのディクショナリーを作成
~~~python
// btre_project/listings/choices.py
bedroom_choices = {
  '1':1,
  '2':2,
  '3':3,
  '4':4,
  '5':5,
  '6':6,
  '7':7,
  '8':8,
  '9':9,
  '10':10
  }

price_choices = {
  '100000':'$100,000',
  '200000':'$200,000',
  '300000':'$300,000',
  '400000':'$400,000',
  '500000':'$500,000',
  '600000':'$600,000',
  '700000':'$700,000',
  '800000':'$800,000',
  '900000':'$900,000',
  '1000000':'$1M+',
}

state_choices = {
        'AK': 'Alaska',
        'AL': 'Alabama',
        'AR': 'Arkansas',
        'AS': 'American Samoa',
        'AZ': 'Arizona',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DC': 'District of Columbia',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'GU': 'Guam',
        'HI': 'Hawaii',
        'IA': 'Iowa',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'MA': 'Massachusetts',
        'MD': 'Maryland',
        'ME': 'Maine',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MO': 'Missouri',
        'MP': 'Northern Mariana Islands',
        'MS': 'Mississippi',
        'MT': 'Montana',
        'NA': 'National',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'NE': 'Nebraska',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NV': 'Nevada',
        'NY': 'New York',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'PR': 'Puerto Rico',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VA': 'Virginia',
        'VI': 'Virgin Islands',
        'VT': 'Vermont',
        'WA': 'Washington',
        'WI': 'Wisconsin',
        'WV': 'West Virginia',
        'WY': 'Wyoming'
}
~~~

~~~
// btre_project/pages/views.py 
from django.http import HttpResponse
from listings.choices import price_choices, bedroom_choices, state_choices
from listings.models import Listing
from realtors.models import Realtor

def index(request):
    # return HttpResponse('<h1>Hello World</h1>')
    listings = Listing.objects.order_by('-list_date').filter(is_publised=True)[:3]

    context = {　　// 追加
        'listings': listings,
        'state_choices': state_choices,
        'bedroom_choices': bedroom_choices,
        'price_choices': price_choices,
    }
    return render(request, 'pages/index.html', context)

def about(request):
   　　　- - -
~~~

Stateのオプションを設定
~~~html
// btre_project/templates/pages/index.html
<div class="col-md-4 mb-3">
<label class="sr-only">State</label>
<select name="state" class="form-control">
    <option selected="true" disabled="disabled">
    State (All)
    </option>
    {% for key,value in state_choices.items %}
    <option value="{{ key }}">{{ value }}</option>
    {% endfor %}
</select>
</div>
~~~
 Bedroom, Priceのオプションを設定
~~~html
<div class="form-row">
    <div class="col-md-6 mb-3">
    <label class="sr-only">Bedrooms</label>
    <select name="bedrooms" class="form-control">
        <option selected="true" disabled="disabled">
        Bedrooms (All)
        </option>
        {% for key,value in bedroom_choices.items %}
        <option value="{{ key }}">{{ value }}</option>
        {% endfor %}
    </select>
    </div>
    <div class="col-md-6 mb-3">
    <select name="price" class="form-control" id="type">
        <option selected="true" disabled="disabled">
        Max Price (Any)
        </option>
        {% for key,value in price_choices.items %}
        <option value="{{ key }}">{{ value }}</option>
        {% endfor %}
    </select>
    </div>
</div>
~~~

~~~
btre_project/templates/pages/index.html
<div class="search">
    <form action="{% url 'search' %}">  //追加
~~~

btre_project/templates/listings/search.htmlを作成する  
中身はbtre_project/templates/pages/index.htmlとほぼ同じ
~~~

~~~

~~~

~~~

~~~

~~~

~~~

~~~
