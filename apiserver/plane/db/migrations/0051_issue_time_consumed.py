# Generated by Django 4.2.7 on 2023-12-27 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0046_alter_analyticview_created_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='time_consumed',
            field=models.SmallIntegerField(default=0),
        ),
    ]
