from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import auth
from api.models import Account, SymbolType, Symbol, Position
from googlefinance import getQuotes
from datetime import datetime

# users

@require_http_methods(['POST'])
def registration(request):
    first_name = request.POST.get('first', 'first')
    last_name = request.POST.get('last', 'last')
    username = request.POST.get('username', 'username')
    mail = request.POST.get('mail', 'mail')
    password = request.POST.get('password', 'password')

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

@require_http_methods(['POST'])
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

@require_http_methods(['POST'])
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
        return HttpResponse(1, content_type='application/json')
    if value > 0:
        current_user = request.user
        Account.objects.create(user=current_user, category=symbol_type, value=value, leverage=leverage)
        return HttpResponse(0, content_type='application/json')
    else:
        return HttpResponse(1, content_type='application/json')

@require_http_methods(['POST'])
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

@require_http_methods(['POST'])
@login_required()
def create_position(request):
    current_user = request.user
    account_num = request.POST.get('account', 0)
    symbol_code = request.POST.get('symbol', 'Incorrect')
    value = request.POST.get('value', 1)
    start_date = datetime.now()
    take_profit = request.POST.get('take_profit', None)
    stop_loss = request.POST.get('stop_loss', None)
    type_is_buy = False
    if request.POST.get('type', 'Incorrect') == 'buy':
        type_is_buy = True
    try:
        target_symbol = Symbol.objects.get(code=symbol_code)
        start_price = get_current(symbol_code)
        account = Account.objects.get(pk=account_num, user=current_user, active=True)
        value = int(value)
        if value < 0 or value > account.leverage * account.value:
            raise AttributeError
        if take_profit:
            take_profit = float(take_profit)
            if type_is_buy and (take_profit < start_price):
                raise AttributeError
            elif not type_is_buy and (take_profit > start_price):
                raise AttributeError
        else:
            take_profit = None
        if stop_loss:
            stop_loss = float(stop_loss)
            if type_is_buy and (stop_loss > start_price):
                raise AttributeError
            elif not type_is_buy and (stop_loss < start_price):
                raise AttributeError
        else:
            stop_loss = None
    except:
        return render(request, 'api.html', {'data': 1})
    Position.objects.create(owner=account, symbol=target_symbol, buy=type_is_buy,
                                start_price=start_price, start_date=start_date, tp=take_profit,
                                sl=stop_loss, value=value)
    return render(request, 'api.html', {'data': 0})

@require_http_methods(['POST'])
@login_required()
def manually_close_position(request):
    current_user = request.user
    account_num = request.POST.get('account', 0)
    position_num = request.POST.get('position', 0)
    try:
        account = Account.objects.get(pk=account_num, user=current_user)
        position = Position.objects.get(pk=position_num, owner=account, active=True)
        close_result = close_position(position, 0)
        if close_result:
            return render(request, 'api.html', {'data': 0})
        else:
            return render(request, 'api.html', {'data': 1})
    except:
        return render(request, 'api.html', {'data': 1})

# helper function

def get_current(symbol_name):
    try:
        symbol = Symbol.objects.get(code=symbol_name)
        symbol_type = SymbolType.objects.get(pk=symbol.type_id)
        if symbol_type.currency:
            symbol_name = 'CURRENCY:' + symbol_name
        return float(getQuotes(symbol_name)[0]['LastTradePrice'])
    except:
        return False

def margin_call_check(account):
    if account.value < 0:
        account.active = False
        account.save()
        all_positions = Position.objects.filter(active=True, owner=account)
        for position in all_positions:
            close_position(position, 3)

def close_position(position, type):
    symbol_code = position.symbol.code
    account = position.owner
    end_date = datetime.now()
    end_price = get_current(symbol_code)
    if position.buy:
        raw_profit = (end_price * position.value) - (position.start_price * position.value)
    else:
        raw_profit = (position.start_price * position.value) - (end_price * position.value)
    profit = float('%.2f' % raw_profit)
    position.active = False
    position.end_price = end_price
    position.end_date = end_date
    position.profit = profit
    position.closing_way = type
    account.value += profit
    try:
        position.save()
        account.save()
        margin_call_check(account)
        return True
    except:
        return False

def get_symbol_state(code):
    current_date = datetime.now()
    code_hash = hash(code + str(current_date.year) + str(current_date.day) + str(current_date.hour))
    return code_hash % 2 == 0