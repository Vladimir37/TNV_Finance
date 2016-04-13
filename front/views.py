from django.contrib.auth.decorators import login_required
from django.shortcuts import render

def index(request):
    return render(request, '_layout_.html')

def registration(request):
    return render(request, '_layout_.html')

def login(request):
    return render(request, 'login.html')

@login_required()
def cabinet(request):
    return render(request, 'cabinet.html')

@login_required()
def pass_change(request):
    return render(request, 'pass_change.html')

@login_required()
def add_account(request):
    return render(request, 'add_account.html')

@login_required()
def delete_account(request):
    return render(request, 'delete_account.html')

@login_required()
def create_position(request):
    return render(request, 'create_position.html')

@login_required()
def close_position(request):
    return render(request, 'close_position.html')