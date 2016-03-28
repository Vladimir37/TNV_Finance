from django.conf.urls import url, include

urlpatterns = [
    url(r'^symbols/', include('api.urls', namespace='api'))
]