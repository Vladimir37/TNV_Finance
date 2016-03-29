from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=150)
    mail = models.EmailField()
    password = models.CharField(max_length=550)
    def __str__(self):
        return self.name

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
    symbol = models.ForeignKey(Symbol)
    start_price = models.FloatField()
    start_date = models.DateTimeField()
    sl = models.FloatField()
    tp = models.FloatField()
    value = models.IntegerField()
