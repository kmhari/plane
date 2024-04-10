from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0058_alter_moduleissue_issue_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='time_consumed',
            field=models.SmallIntegerField(default=0),
        ),
    ]
