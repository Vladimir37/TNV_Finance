from django.conf.urls import url, include
from api.views import types, all_symbols, get_quotes, get_accounts, get_positions, get_current_many, get_account_data, statistic
from api.utils import registration, login, logout, pass_change, add_account, delete_account, create_position, manually_close_position

urlpatterns = [
    # auth
    url(r'^registration', registration, name='register'),
    url(r'^login', login, name='login'),
    url(r'^logout', logout, name='logout'),
    url(r'^pass_change', pass_change, name='pass_change'),
    # views for all
    url(r'^types', types, name='types'),
    url(r'^symbols', all_symbols, name='symbols'),
    url(r'^get_quotes', get_quotes, name='get_quotes'),
    url(r'^get_current_many', get_current_many, name='get_current_many'),
    # views for users
    url(r'^get_accounts', get_accounts, name='get_accounts'),
    url(r'^get_account_data', get_account_data, name='get_account_data'),
    url(r'^get_positions', get_positions, name='get_positions'),
    url(r'^statistic', statistic, name='statistic'),
    # actions for user
    url(r'^add_account', add_account, name='add_account'),
    url(r'^delete_account', delete_account, name='delete_account'),
    url(r'^create_position', create_position, name='create_position'),
    url(r'^close_position', manually_close_position, name='close_position')
]