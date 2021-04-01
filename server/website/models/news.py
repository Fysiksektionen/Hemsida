from django.utils.translation import gettext_lazy as _
from .pages import *

class News(Page):
    """Model for news."""

    class Meta:
        verbose_name = "news"
        verbose_name_plural = "news"

    author = models.CharField(verbose_name=_('created by'), max_length=255, blank=True)
    views = models.IntegerField()
    publish_date = models.DateTimeField(verbose_name=_('publish date'), blank=True, null=True)
    unpublish_date = models.DateTimeField(verbose_name=_('unpublish date'), blank=True, null=True)

    """Models for the article"""
    title = models.CharField(verbose_name=_('title'), max_length=50)
    description = models.TextField(verbose_name=_('description'))
    image = models.ImageField(verbose_name=_('image'), blank=True)
    image_text = models.CharField(verbose_name=_('image text'), max_length=255, blank=True)




