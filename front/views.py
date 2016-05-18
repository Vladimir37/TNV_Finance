from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required()
def cabinet(request):
    return render(request, 'cabinet.html')

@login_required()
def accounts(request):
    return render(request, 'accounts.html')

@login_required()
def positions(request):
    return render(request, 'positions.html')

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