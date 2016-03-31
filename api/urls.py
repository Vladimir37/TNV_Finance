from django.conf.urls import url, include
from api.views import types, all_symbols
from api.utils import registration

urlpatterns = [
    url(r'^registration', registration, name='symbols'),
    url(r'^types', types, name='symbols'),
    url(r'^symbols', all_symbols, name='symbols')
]