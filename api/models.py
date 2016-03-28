from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=150)
    mail = models.EmailField()
    password = models.CharField()

class Account(models.Model):
    user = models.ForeignKey(User)
    category = models.ForeignKey(SymbolType)
    value = models.IntegerField()
    leverage = models.IntegerField()

class SymbolType(models.Model):
    name = models.CharField()

class Symbol(models.Model):
    type = models.ForeignKey(SymbolType)
    name = models.CharField()
    code = models.CharField()

class Position(models.Model):
    symbol = models.ForeignKey(Symbol)
    start = models.FloatField()
    sl = models.FloatField()
    tp = models.FloatField()
    value = models.IntegerField()