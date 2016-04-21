from django.conf.urls import url
from django.views.generic import TemplateView
from front.views import cabinet, pass_change, add_account, delete_account, create_position, close_position

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='_layout_.html')),
    url(r'^registration/$', TemplateView.as_view(template_name='register.html'), name='register'),
    url(r'^login/$', TemplateView.as_view(template_name='login.html'), name='login'),
    url(r'^tables/$', TemplateView.as_view(template_name='tables.html'), name='login'),
    url(r'^pass_change/$', pass_change, name='pass_change'),
    url(r'^cabinet/$', cabinet, name='cabinet'),
    url(r'^add_account/$', add_account, name='add_account'),
    url(r'^delete_account/$', delete_account, name='delete_account'),
    url(r'^create_position/$', create_position, name='create_position'),
    url(r'^close_position/$', close_position, name='close_position')
]