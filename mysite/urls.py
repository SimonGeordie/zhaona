"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from .singlepage import views as singlepage_views
from .scrollpage import views as scrollpage_views
from .infinitescroll import views as infinitescroll_views
from .cssanimation import views as cssanimation_views
from .additionapp import views as additionapp_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('student/', views.student_info, name='student_info'),
    path('student/text/', views.student_info_text, name='student_info_text'),
    path('singlepage/', singlepage_views.singlepage_view),
    path('scroll/', scrollpage_views.scroll_view, name='scroll_view'),
    path('infinitescroll/', infinitescroll_views.index, name='infinitescroll_index'),
    path('infinitescroll/posts', infinitescroll_views.posts, name='infinitescroll_posts'),
    path('cssanimation/', cssanimation_views.animate_view, name='cssanimation_animate'),
    path('cssanimation/slide/', cssanimation_views.slide_view, name='cssanimation_slide'),
    path('addition/', additionapp_views.addition_view, name='addition_calculator'),
    path('', views.home, name='home'),  # 设置首页为项目汇总页面
]