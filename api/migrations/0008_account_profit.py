# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-05-16 18:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_account_initial_value'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='profit',
            field=models.FloatField(default=0),
        ),
    ]
