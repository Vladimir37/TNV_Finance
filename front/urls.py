from django.conf.urls import url
from front.views import registration, login

urlpatterns = [
    url(r'^auth/', registration),
    url(r'^login/', login),
]