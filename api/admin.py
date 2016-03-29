from django.contrib import admin
from .models import User, Account, SymbolType, Symbol, Position

# Register your models here.
admin.site.register([User, Account, SymbolType, Symbol, Position])