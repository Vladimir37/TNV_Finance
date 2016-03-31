from django.shortcuts import render

from api.models import User, Account, SymbolType, Symbol, Position
from api.serializing import serialize

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
