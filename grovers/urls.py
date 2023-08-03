from django.urls import path
from grovers import views

urlpatterns = [
    path('', views.index, name='index'),
    path('grovers/', views.grovers),
    path('algorithm/', views.algorithm, name='algorithm'),
    path('applications/', views.applications, name='applications'),
    path('test/', views.test, name='test'),
    path('intro/', views.intro, name='intro'),
]
