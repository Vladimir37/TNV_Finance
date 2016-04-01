from django.conf.urls import url
from front.views import registration, login, cabinet, pass_change, add_account

urlpatterns = [
    url(r'^registration/', registration, name='registration'),
    url(r'^login/', login, name='login'),
    url(r'^pass_change/', pass_change, name='pass_change'),
    url(r'^cabinet/', cabinet, name='cabinet'),
    url(r'^add_account/', add_account, name='add_account')
]