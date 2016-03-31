from django.conf.urls import url, include
from api.views import types, all_symbols
from api.utils import registration, login, logout

urlpatterns = [
    url(r'^registration', registration, name='register'),
    url(r'^login', login, name='login'),
    url(r'^logout', logout, name='logout'),
    url(r'^types', types, name='types'),
    url(r'^symbols', all_symbols, name='symbols')
]