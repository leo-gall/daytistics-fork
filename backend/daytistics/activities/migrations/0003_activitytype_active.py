# Generated by Django 5.1.1 on 2024-09-23 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("activities", "0002_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="activitytype",
            name="active",
            field=models.BooleanField(default=False),
        ),
    ]
