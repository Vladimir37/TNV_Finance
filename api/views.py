from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import time
import json
from api.models import Account, SymbolType, Symbol, Position
from api.serializing import serialize
from finam_stock_data import get_data as stock_data
from api.utils import get_current, get_symbol_state

from django.http import HttpResponse

# for all
def types(request):
    types = SymbolType.objects.all()
    return render(request, 'api.html', serialize(types))

def all_symbols(request):
    types = SymbolType.objects.all()
    symbols = {}
    for type in types:
        symbols[type.name] = list(Symbol.objects.filter(type_id=type).values())
    return HttpResponse(json.dumps(symbols), content_type='application/json')

def get_quotes(request):
    symbol = request.GET.get('symbol', 'EURUSD')
    period = request.GET.get('period', 'hour')
    symbol_check = Symbol.objects.filter(code=symbol).exists()
    period_types = ['min', '5min', '15min', '30min', 'hour', 'daily']
    try:
        period_types.index(period)
    except:
        return render(request, 'api.html', {'data': 1})
    if not symbol_check:
        return render(request, 'api.html', {'data': 2})
    time_now = int(time.time())
    if period == 'min' or period == '5min' or period == '15min':
        interval = 21600
    elif period == '30min' or period == 'hour':
        interval = 43200
    elif period == 'hour':
        interval = 86400
    else:
        interval = 1296000
    time_yesterday = time_now - interval
    today_data = stock_data(time_yesterday, time_now, period, symbol)
    return render(request, 'api.html', {'data': today_data})

def get_current_many(request):
    # try:
        symbols_str = request.GET.get('symbols', 0)
        print(request.GET)
        symbols = json.loads(symbols_str)
        prices = {}
        for symbol in symbols:
            price = get_current(symbol)
            prices[symbol] = {
                'price': price,
                'state': get_symbol_state(symbol)
            }
        return HttpResponse(json.dumps(prices), content_type='application/json')
    # except:
    #     return HttpResponse(json.dumps(1), content_type='application/json')

# for users
@login_required()
def get_accounts(request):
    username = request.user
    active = bool(request.GET.get('active', 0))
    accounts = Account.objects.filter(user=username, active=active)
    return render(request, 'api.html', serialize(accounts))

@login_required()
def get_positions(request):
    username = request.user
    active = bool(request.GET.get('active', 0))
    try:
        account_num = int(request.GET.get('account', 0))
        target_account = Account.objects.get(pk=account_num, user=username)
        positions = Position.objects.filter(owner=target_account, active=active)
        return render(request, 'api.html', serialize(positions))
    except:
        return HttpResponse(json.dumps(1), content_type='application/json')