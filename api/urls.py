from django.conf.urls import url, include
from api.views import types, all_symbols, get_today
from api.utils import registration, login, logout, pass_change, add_account, delete_account, create_position, manually_close_position

urlpatterns = [
    url(r'^registration', registration, name='register'),
    url(r'^login', login, name='login'),
    url(r'^logout', logout, name='logout'),
    url(r'^pass_change', pass_change, name='pass_change'),
    url(r'^types', types, name='types'),
    url(r'^symbols', all_symbols, name='symbols'),
    url(r'^get_today', get_today, name='get_today'),
    url(r'^add_account', add_account, name='add_account'),
    url(r'^delete_account', delete_account, name='delete_account'),
    url(r'^create_position', create_position, name='create_position'),
    url(r'^close_position', manually_close_position, name='close_position')
]