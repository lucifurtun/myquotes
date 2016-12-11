# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-11 13:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quotes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quote',
            name='reference',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='quote',
            name='source',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
