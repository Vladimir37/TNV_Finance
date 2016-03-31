from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from django.shortcuts import render
from api.serializing import serialize

@require_http_methods(['POST'])
def registration(request):
    first_name = request.POST['first']
    last_name = request.POST['last']
    username = request.POST['username']
    mail = request.POST['mail']
    password = request.POST['pass']

    # try:
    #     User.objects.get(Q(username=username) | Q(email=mail))
    #     return render(request, 'api.html', {'data'})
    # except:
    #     return render(request, 'api.html')
    if User.objects.filter(username=username).exists():
        return render(request, 'api.html', {'data': 1})
    elif User.objects.filter(email=mail).exists():
        return render(request, 'api.html', {'data': 2})
    else:
        return render(request, 'api.html', {'data': 0})