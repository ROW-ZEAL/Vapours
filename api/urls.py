from django.urls import path
from . import views
from .views import VenueRecommendationView



urlpatterns = [
    path('venue', views.api_venues, name="api"),
    path('category/<str:categoryName>/', views.api_category, name='api'),
    # path('categor/<str:venue_name>/', views.api_slots, name='api'),
    path('slots/<str:venue_name>/<str:date>', views.api_venue_slots_select,name='api'),
    path('reserved/<str:futsal_name>/<str:booking_date>/<str:formattedSlot>/', views.api_venue_slots_select_reserved,name='api'),
   path('category/<str:categoryName>/address/<str:address>/', views.api_category_with_address, name='api'),   
    path('booking', views.api_booking_history, name="api"),
    path('history/<str:name>/', views.api_user_booking_history, name="api"),
    path('edit/<str:name>/<str:names>/<str:email>/<str:number>/', views.api_editing_profile, name="api"),
    # path('recommendations/<int:user_id>/', VenueRecommendationView.as_view(), name='api'),
    path('recommendations/<str:location>/<str:category>', VenueRecommendationView.as_view(), name='api'),
]









