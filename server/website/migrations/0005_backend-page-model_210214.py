# Generated by Django 3.1.6 on 2021-02-14 15:56

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_backend-content-object-model_210214'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='page',
            options={},
        ),
        migrations.AddField(
            model_name='page',
            name='last_edited_at',
            field=models.DateTimeField(auto_now=True, verbose_name='last edited at'),
        ),
        migrations.AddField(
            model_name='page',
            name='name',
            field=models.CharField(blank=True, max_length=255, verbose_name='name'),
        ),
        migrations.AddField(
            model_name='page',
            name='page_type',
            field=models.CharField(default=django.utils.timezone.now, max_length=255, verbose_name='page type'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='page',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='website.page', verbose_name='parent page'),
        ),
        migrations.AddField(
            model_name='page',
            name='published',
            field=models.BooleanField(default=False, verbose_name='is published'),
        ),
        migrations.AddField(
            model_name='page',
            name='published_at',
            field=models.DateField(blank=True, null=True, verbose_name='published at'),
        ),
        migrations.AddField(
            model_name='page',
            name='slug',
            field=models.SlugField(default='', verbose_name='Slug'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='page',
            name='url',
            field=models.URLField(unique=True, verbose_name='URL'),
        ),
        migrations.AlterUniqueTogether(
            name='page',
            unique_together={('slug', 'parent'), ('name', 'parent')},
        ),
        migrations.CreateModel(
            name='PageDraft',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page_type', models.CharField(max_length=255, verbose_name='page type')),
                ('last_edited_at', models.DateField(auto_now=True, verbose_name='last edited at')),
                ('content_en', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='page_draft_en', to='website.contentobjectbase', verbose_name='english content')),
                ('content_sv', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='page_draft_sv', to='website.contentobjectbase', verbose_name='swedish content')),
            ],
        ),
        migrations.AddField(
            model_name='page',
            name='content_en',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='page_en', to='website.contentobjectbase', verbose_name='english content'),
        ),
        migrations.AddField(
            model_name='page',
            name='content_sv',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='page_sv', to='website.contentobjectbase', verbose_name='swedish content'),
        ),
        migrations.AddField(
            model_name='page',
            name='page_draft',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='page', to='website.pagedraft', verbose_name='page draft'),
        ),
    ]
