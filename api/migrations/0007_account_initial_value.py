# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-05-16 18:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_account_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='initial_value',
            field=models.FloatField(default=300),
            preserve_default=False,
        ),
    ]
