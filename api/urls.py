from django.urls import path
from . import views
from .views import VenueRecommendationView



urlpatterns = [
    path('venue', views.api_venues, name="api"),
    path('category/<str:categoryName>/', views.api_category, name='api'),
   path('category/<str:categoryName>/address/<str:address>/', views.api_category_with_address, name='api'),   
    path('booking', views.api_booking_history, name="api"),
    path('history/<str:name>/', views.api_user_booking_history, name="api"),
    path('edit/<str:name>/<str:names>/<str:email>/<str:number>/', views.api_editing_profile, name="api"),
    path('recommendations/<int:user_id>/', VenueRecommendationView.as_view(), name='api'),
]









