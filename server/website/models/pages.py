from django.db import models
from django.utils.text import slugify


class Page(models.Model):
    """
    Model for a Page.
    """
    class Meta:
        unique_together = [('name', 'parent_name'), ('slug', 'parent_slug')]

    name = models.CharField(verbose_name='Name', max_length=255)
    page_type = models.CharField(verbose_name='Page type')
    language = models.CharField(verbose_name='Language', choices=[('sv', 'Svenska'), ('eng', 'English')])

    slug = models.SlugField(default=slugify(name), null=False, blank=False)

    published = models.BooleanField(verbose_name='Is published', null=False, blank=False)
    published_at = models.DateField(verbose_name='Published at', null=True, blank=True, auto_now_add=published)

    url = models.URLField(verbose_name='Url')
