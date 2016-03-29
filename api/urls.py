from django.conf.urls import url, include
from .views import types, all_symbols

urlpatterns = [
    url(r'^types', types, name='symbols'),
    url(r'^symbols', all_symbols, name='symbols')
]