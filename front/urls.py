from django.conf.urls import url
from front.views import registration, login, cabinet

urlpatterns = [
    url(r'^registration/', registration, name='registration'),
    url(r'^login/', login, name='login'),
    url(r'^cabinet/', cabinet, name='cabinet')
]