from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

import json
from api.models import Account, SymbolType, Symbol, Position
from api.serializing import serialize
import urllib.request
from api.utils import get_current, get_symbol_state

# for all
def types(request):
    types = SymbolType.objects.all()
    return HttpResponse(serialize(types), content_type='application/json')

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
    period_types = ['min', 'min5', 'min15', 'min30', 'hour', 'day']
    try:
        period_types.index(period)
    except:
        return HttpResponse(1, content_type='application/json')
    if not symbol_check:
        return HttpResponse(2, content_type='application/json')
    today_data = urllib.request.urlopen("http://146.185.185.48:49005?symbol=%s&period=%s" % (symbol, period)).read()
    return HttpResponse(today_data, content_type='application/json')

def get_current_many(request):
    try:
        symbols_str = request.GET.get('symbols', 0)
        symbols = json.loads(symbols_str)
        prices = {}
        for symbol in symbols:
            price = get_current(symbol)
            prices[symbol] = {
                'price': price,
                'state': get_symbol_state(symbol)
            }
        return HttpResponse(json.dumps(prices), content_type='application/json')
    except:
        return HttpResponse(json.dumps(1), content_type='application/json')

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