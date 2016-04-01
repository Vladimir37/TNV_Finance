import time
from django.shortcuts import render
from api.models import User, Account, SymbolType, Symbol, Position
from api.serializing import serialize
from finam_stock_data import get_data as stock_data

# Create your views here.
def types(request):
    types = SymbolType.objects.all()
    return render(request, 'api.html', serialize(types))

def all_symbols(request):
    types = SymbolType.objects.all()
    symbols = {}
    for type in types:
        symbols[type.name] = Symbol.objects.filter(type_id=type)
    return render(request, 'api.html', serialize(symbols))

def get_today(request):
    symbol = request.GET.get('symbol', 'EURUSD')
    period = request.GET.get('period', 'hour')
    symbol_check = Symbol.objects.filter(code=symbol).exists()
    period_types = ['tick', 'min', '5min', '10min', '15min', '30min', 'hour', 'daily', 'week', 'month']
    try:
        period_types.index(period)
    except:
        return render(request, 'api.html', {'data': 1})
    if not symbol_check:
        return render(request, 'api.html', {'data': 2})
    time_now = int(time.time())
    time_yesterday = time_now - 86400
    today_data = stock_data(time_yesterday, time_now, period, symbol)
    return render(request, 'api.html', {'data': today_data})