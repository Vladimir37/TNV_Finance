from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class SymbolType(models.Model):
    name = models.CharField(max_length=150)
    def __str__(self):
        return self.name

class Account(models.Model):
    user = models.ForeignKey(User)
    category = models.ForeignKey(SymbolType)
    value = models.IntegerField()
    leverage = models.IntegerField()

class Symbol(models.Model):
    type = models.ForeignKey(SymbolType)
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=150)
    def __str__(self):
        return self.name

class Position(models.Model):
    owner = models.ForeignKey(Account, default=1)
    active = models.BooleanField(default=True)
    symbol = models.ForeignKey(Symbol)
    start_price = models.FloatField()
    start_date = models.DateTimeField()
    end_price = models.FloatField(null=True)
    end_date = models.DateTimeField(null=True)
    profit = models.IntegerField(null=True)
    sl = models.FloatField()
    tp = models.FloatField()
    value = models.IntegerField()
