from django.urls import path
from . import views



urlpatterns = [
    path('venue', views.api_venues, name="api"),
    path('category/<str:categoryName>/', views.api_category, name='api'),
   path('category/<str:categoryName>/address/<str:address>/', views.api_category_with_address, name='api'),

]







