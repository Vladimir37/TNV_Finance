from api.models import Account, SymbolType, Symbol, Position
from api.utils import close_position, get_current, margin_call_check
from celery import Celery

app = Celery()

@app.task(name='stop_loss')
def stop_loss():
    all_positions = Position.objects.filter(active=True, sl__isnull=False)
    all_symbols_num = all_positions.values('symbol').distinct()
    all_symbols = {}
    for symbol_num in all_symbols_num:
        symbol_code = Symbol.objects.get(pk=symbol_num['symbol']).code
        all_symbols[symbol_code] = get_current(symbol_code)
    for position in all_positions:
        if position.buy == True and position.sl >= all_symbols[position.symbol.code]:
            close_position(position, 2)
            margin_call_check(position.owner)
        elif position.buy == False and position.sl <= all_symbols[position.symbol.code]:
            close_position(position, 2)
            margin_call_check(position.owner)

@app.task(name='take_profit')
def take_profit():
    all_positions = Position.objects.filter(active=True, tp__isnull=False)
    all_symbols_num = all_positions.values('symbol').distinct()
    all_symbols = {}
    for symbol_num in all_symbols_num:
        symbol_code = Symbol.objects.get(pk=symbol_num['symbol']).code
        all_symbols[symbol_code] = get_current(symbol_code)
    for position in all_positions:
        if position.buy == True and position.tp <= all_symbols[position.symbol.code]:
            close_position(position, 1)
        elif position.buy == False and position.tp >= all_symbols[position.symbol.code]:
            close_position(position, 1)