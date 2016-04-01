from django.conf.urls import url, include
from api.views import types, all_symbols, get_today
from api.utils import registration, login, logout, pass_change, add_account

urlpatterns = [
    url(r'^registration', registration, name='register'),
    url(r'^login', login, name='login'),
    url(r'^logout', logout, name='logout'),
    url(r'^pass_change', pass_change, name='pass_change'),
    url(r'^types', types, name='types'),
    url(r'^symbols', all_symbols, name='symbols'),
    url(r'^get_today', get_today, name='get_today'),
    url(r'^add_account', add_account, name='add_account')
]