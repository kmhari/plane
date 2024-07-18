from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    dependencies = [
        ('db', '0066_account_id_token_cycle_logo_props_module_logo_props'),
        ('f22', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='IssueTimeConsumed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('duration', models.SmallIntegerField(default=0)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issue_time_consumed', to='db.issue')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issue_time_consumed', to='db.project')),
            ],
        ),
    ]
