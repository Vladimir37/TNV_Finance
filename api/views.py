from django.shortcuts import render

from .models import User, Account, SymbolType, Symbol, Position
from .serializing import serialize

# Create your views here.
def types(request):
    symbols = SymbolType.objects.all()
    return render(request, 'test.html', serialize(symbols))

def all_symbols(request):
    symbols = SymbolType.objects.all()
    return render(request, 'test.html', serialize(symbols))