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
    context['category'] = self.category 
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
```python

```