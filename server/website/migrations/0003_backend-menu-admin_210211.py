# Generated by Django 3.1.6 on 2021-02-11 18:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [('website', '0003_backend-menu-admin_210210'), ('website', '0004_auto_20210211_1945')]

    dependencies = [
        ('website', '0002_backend-menu-model_210207'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='menu',
            options={'verbose_name': 'menu', 'verbose_name_plural': 'menus'},
        ),
        migrations.AlterModelOptions(
            name='menuitem',
            options={'verbose_name': 'menu item', 'verbose_name_plural': 'menu items'},
        ),
        migrations.AlterModelOptions(
            name='menuitembase',
            options={'ordering': ['order'], 'verbose_name': 'base menu item', 'verbose_name_plural': 'base menu items'},
        ),
        migrations.AlterField(
            model_name='menuitembase',
            name='menu',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='items', to='website.menu', verbose_name='menu'),
        ),
        migrations.AlterField(
            model_name='menuitembase',
            name='name',
            field=models.CharField(max_length=255, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='menuitembase',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, db_index=True, default=0, null=True, verbose_name='order'),
        ),
        migrations.AlterField(
            model_name='menuitembase',
            name='page',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='website.page', verbose_name='page'),
        ),
        migrations.AlterField(
            model_name='menuitembase',
            name='url',
            field=models.URLField(blank=True, default=None, null=True, verbose_name='url'),
        ),
        migrations.AlterUniqueTogether(
            name='menuitembase',
            unique_together={('menu', 'name')},
        ),
        migrations.RenameField(
            model_name='menuitembase',
            old_name='_is_menu',
            new_name='is_menu',
        ),
        migrations.AlterField(
            model_name='menuitembase',
            name='is_menu',
            field=models.BooleanField(verbose_name='is menu'),
        ),
        migrations.AlterModelOptions(
            name='page',
            options={'verbose_name': 'page', 'verbose_name_plural': 'pages'},
        ),
        migrations.AlterField(
            model_name='page',
            name='url',
            field=models.URLField(verbose_name='url'),
        ),
    ]
