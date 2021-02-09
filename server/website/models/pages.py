from django.db import models
from django.utils.text import slugify
from contentcollection import ContentCollection


class Page(models.Model):
    """
    Model for a Page.
    """
    class Meta:
        unique_together = [('name', parent.name), ('slug', parent.slug)]

    url = models.URLField(verbose_name='Url', blank=False, null=False)
    name = models.CharField(verbose_name='Name', max_length=255)
    page_type = models.CharField(verbose_name='Page type')
    language = models.CharField(verbose_name='Language', choices=[('sv', 'Svenska'), ('eng', 'English')])
    parent = models.ForeignKey('Page', verbose_name='Parent page', blank=True, null=True, on_delete=models.SET_NULL)

    slug = models.SlugField(verbose_name='Slug', null=False, blank=False)

    has_draft = models.BooleanField(verbose_name='Has draft', null=False, blank=False)
    published = models.BooleanField(verbose_name='Is published', null=False, blank=False)
    published_at = models.DateField(verbose_name='Published at', null=True, blank=True, auto_now_add=False)
    last_edited_at = models.DateField(verbose_name='Last edited at', null=False, blank=False, auto_now_add=False)

    content = models.ForeignKey('ContentCollection', verbose_name='Content', blank=True, null=True, on_delete=models.SET_NULL))

    def __init__(self, *args, **kwargs):
        # Set default slug if not specified
        if 'slug' not in kwargs:
            if 'name' in kwargs and kwargs['name'] is not None:
                kwargs['slug'] = slugify(kwargs['name'])
            else:
                kwargs['slug'] = ''
        super().__init__(*args, **kwargs)
