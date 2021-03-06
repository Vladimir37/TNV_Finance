# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-03-28 19:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField()),
                ('leverage', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_price', models.FloatField()),
                ('start_date', models.DateTimeField()),
                ('sl', models.FloatField()),
                ('tp', models.FloatField()),
                ('value', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Symbol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('code', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='SymbolType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('mail', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=550)),
            ],
        ),
        migrations.AddField(
            model_name='symbol',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.SymbolType'),
        ),
        migrations.AddField(
            model_name='position',
            name='symbol',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Symbol'),
        ),
        migrations.AddField(
            model_name='account',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.SymbolType'),
        ),
        migrations.AddField(
            model_name='account',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.User'),
        ),
    ]
