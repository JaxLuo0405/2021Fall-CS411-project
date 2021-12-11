from django.urls import path
from .views import index

app_name = 'frontend' 

urlpatterns = [
    path('', index, name = ''),
    path('search', index), # like a homepage
    path('generate', index),
]
