from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth

@require_http_methods(['POST'])
def registration(request):
    first_name = request.POST['first']
    last_name = request.POST['last']
    username = request.POST['username']
    mail = request.POST['mail']
    password = request.POST['password']

    if User.objects.filter(username=username).exists():
        return render(request, 'api.html', {'data': 1})
    elif User.objects.filter(email=mail).exists():
        return render(request, 'api.html', {'data': 2})

    try:
        new_user = User.objects.create_user(username, mail, password)
        new_user.first_name = first_name
        new_user.last_name = last_name
        new_user.save()
        return render(request, 'api.html', {'data': 0})
    except:
        return render(request, 'api.html', {'data': 3})

@require_http_methods(['POST'])
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        auth.login(request, user)
        return render(request, 'api.html', {'data': 0})
    else:
        return render(request, 'api.html', {'data': 1})

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/login')

@login_required()
def pass_change(request):
    old_password = request.POST['old_password']
    new_password = request.POST['new_password']
    username = request.user
    user = auth.authenticate(username=username, password=old_password)
    if user is not None and user.is_active:
        try:
            user.set_password(new_password)
            user.save()
            return render(request, 'api.html', {'data': 0})
        except:
            return render(request, 'api.html', {'data': 1})
    else:
        return render(request, 'api.html', {'data': 1})