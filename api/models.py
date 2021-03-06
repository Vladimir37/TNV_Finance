from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class SymbolType(models.Model):
    name = models.CharField(max_length=150)
    currency = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Account(models.Model):
    user = models.ForeignKey(User)
    category = models.ForeignKey(SymbolType)
    initial_value = models.FloatField()
    value = models.FloatField()
    leverage = models.IntegerField()
    profit = models.FloatField(default=0)
    active = models.BooleanField(default=True)

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
    buy = models.BooleanField(default=True)
    start_price = models.FloatField()
    start_date = models.DateTimeField()
    end_price = models.FloatField(null=True)
    end_date = models.DateTimeField(null=True)
    profit = models.FloatField(null=True)
    sl = models.FloatField(null=True)
    tp = models.FloatField(null=True)
    value = models.FloatField()
    closing_way = models.IntegerField(null=True)