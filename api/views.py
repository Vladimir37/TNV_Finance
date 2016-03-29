from django.shortcuts import render

from .models import User, Account, SymbolType, Symbol, Position
from .serializing import serialize

# Create your views here.
def types(request):
    types = SymbolType.objects.all()
    return render(request, 'test.html', serialize(types))

def all_symbols(request):
    types = SymbolType.objects.all()
    symbols = {}
    for type in types:
        symbols[type.name] = Symbol.objects.filter(type_id=type)
    print(symbols)
    return render(request, 'test.html', serialize(symbols))
    # return render(request, 'test.html', {"data": 'test'})