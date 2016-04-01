from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from api.models import Account, SymbolType, Symbol, Position

# users

@require_http_methods(['POST'])
def registration(request):
    first_name = request.POST.get('first', 'user')
    last_name = request.POST.get('last', 'user')
    username = request.POST.get('username', 'user')
    mail = request.POST.get('mail', 'user')
    password = request.POST.get('password', 'user')

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
    username = request.POST.get('username', 'user')
    password = request.POST.get('password', 'pass')
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
    old_password = request.POST.get('old_password', 'old pass')
    new_password = request.POST.get('new_password', 'new pass')
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

@login_required()
def add_account(request):
    value = request.POST.get('value', 'Incorrect')
    category = request.POST.get('category', 'category')
    leverage = request.POST.get('leverage', 'leverage')
    available_leverages = [1, 5, 10, 20, 50, 100, 200]
    try:
        value = int(value)
        leverage = int(leverage)
        available_leverages.index(leverage)
        symbol_type = SymbolType.objects.get(pk=category)
    except:
        return render(request, 'api.html', {'data': 1})
    if value > 0:
        current_user = request.user
        Account.objects.create(user=current_user, category=symbol_type, value=value, leverage=leverage)
        return render(request, 'api.html', {'data': 0})
    else:
        return render(request, 'api.html', {'data': 1})

@login_required()
def delete_account(request):
    account = request.POST.get('account', 'Incorrect')
    current_user = request.user
    try:
        target_account = Account.objects.get(pk=account, user=current_user)
        target_account.delete()
        return render(request, 'api.html', {'data': 0})
    except:
        return render(request, 'api.html', {'data': 1})

