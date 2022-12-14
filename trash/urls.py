"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path

from trash import views

urlpatterns = [
    path('', views.ScanTrash.as_view(), name='home'),
    path('wrong_tag/', views.AddRetrainQueue.as_view(), name='wrong_path'),
    path('scan_qr/', views.ScanTrashContainer.as_view(), name='scan_qr'),
    path('qr_generator/', views.QRGeneratorView.as_view(), name='qr_generator'),
]
