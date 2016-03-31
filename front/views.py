from django.contrib.auth.decorators import login_required
from django.shortcuts import render

def registration(request):
    return render(request, 'register.html')

def login(request):
    return render(request, 'login.html')

@login_required()
def cabinet(request):
    return render(request, 'cabinet.html')