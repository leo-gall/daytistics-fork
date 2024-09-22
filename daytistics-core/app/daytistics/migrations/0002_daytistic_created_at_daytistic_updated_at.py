# Generated by Django 5.1 on 2024-08-23 17:59

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("daytistics", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="daytistic",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="daytistic",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]