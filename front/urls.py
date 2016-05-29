from django.conf.urls import url
from django.views.generic import TemplateView
from front.views import cabinet, positions, create_position, close_position, accounts

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='_layout_.html')),
    url(r'^registration/$', TemplateView.as_view(template_name='register.html'), name='register'),
    url(r'^login/$', TemplateView.as_view(template_name='login.html'), name='login'),
    url(r'^tables/$', TemplateView.as_view(template_name='tables.html'), name='tables'),
    url(r'^charts/$', TemplateView.as_view(template_name='charts.html'), name='charts'),
    url(r'^positions/$', positions, name='positions'),
    url(r'^accounts/$', accounts, name='accounts'),
    url(r'^personal/$', TemplateView.as_view(template_name='personal.html'), name='personal')
]