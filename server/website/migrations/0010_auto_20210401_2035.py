# Generated by Django 3.1.7 on 2021-04-01 18:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0009_backend-redirects_20210228'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='sitemodel',
            options={'verbose_name': 'site manager', 'verbose_name_plural': 'site manager'},
        ),
        migrations.AddField(
            model_name='page',
            name='publish_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='publish time'),
        ),
        migrations.AddField(
            model_name='page',
            name='unpublish_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='unpublish time'),
        ),
        migrations.AlterField(
            model_name='page',
            name='content_en',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='website_page_page_en', to='website.contentobjectbase', verbose_name='english content'),
        ),
        migrations.AlterField(
            model_name='page',
            name='content_sv',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='website_page_page_sv', to='website.contentobjectbase', verbose_name='swedish content'),
        ),
        migrations.AlterUniqueTogether(
            name='page',
            unique_together=set(),
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(unique=True, verbose_name='URL')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('page_type', models.CharField(max_length=255, verbose_name='page type')),
                ('slug', models.SlugField(blank=True, null=True, verbose_name='Slug')),
                ('published', models.BooleanField(default=False, verbose_name='is published')),
                ('publish_time', models.DateTimeField(blank=True, null=True, verbose_name='publish time')),
                ('unpublish_time', models.DateTimeField(blank=True, null=True, verbose_name='unpublish time')),
                ('last_edited_at', models.DateTimeField(auto_now=True, verbose_name='last edited at')),
                ('author', models.CharField(blank=True, max_length=255, verbose_name='created by')),
                ('views', models.IntegerField()),
                ('title', models.CharField(max_length=50, verbose_name='title')),
                ('description', models.TextField(verbose_name='description')),
                ('image', models.ImageField(blank=True, upload_to='', verbose_name='image')),
                ('image_text', models.CharField(blank=True, max_length=255, verbose_name='image text')),
                ('content_en', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='website_news_page_en', to='website.contentobjectbase', verbose_name='english content')),
                ('content_sv', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='website_news_page_sv', to='website.contentobjectbase', verbose_name='swedish content')),
            ],
            options={
                'verbose_name': 'news',
                'verbose_name_plural': 'news',
            },
        ),
        migrations.RemoveField(
            model_name='page',
            name='published_at',
        ),
    ]
