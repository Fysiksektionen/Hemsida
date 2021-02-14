# Generated by Django 3.1.4 on 2021-02-11 16:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('website', '0003_contentcollection_sitemodel')]

    dependencies = [
        ('website', '0002_backend-menu-model_210207'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContentCollection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temp_booblean', models.BooleanField(verbose_name='hej')),
            ],
        ),
        migrations.CreateModel(
            name='SiteModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('root_url', models.URLField(verbose_name='root URL')),
                ('api_root_url', models.URLField(verbose_name='API root URL')),
                ('banner_content', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, related_name='banner_content', to='website.contentcollection', verbose_name='banner content')),
                ('footer_content', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, related_name='footer_content', to='website.contentcollection', verbose_name='footer content')),
                ('root_page', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='website.page', verbose_name='root page')),
            ],
            options={
                'verbose_name': 'Site Manager',
            },
        ),
    ]
