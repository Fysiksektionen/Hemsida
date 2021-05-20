from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from .base_page import *


class NewsDraft(models.Model):
    """
    Model for a News draft.
    """
    class Meta:
        verbose_name = _('news draft')
        verbose_name_plural = _('news drafts')

    page_type = models.CharField(verbose_name=_('page type'), max_length=255)
    """Note: should probably move relationship to news model when we have our own admin page, 
    because it will probably lead to a faster lookup. """
    new = models.OneToOneField(
        'website.News', verbose_name=_('news'), null=True, blank=False, on_delete=models.CASCADE,
        related_name='news_draft'
    )
    content_sv = models.OneToOneField(
        'website.ContentObjectBase', verbose_name=_('swedish content'), blank=True, null=True,
        on_delete=models.SET_NULL, related_name='news_draft_sv'
    )
    content_en = models.OneToOneField(
        'website.ContentObjectBase', verbose_name=_('english content'), blank=True, null=True,
        on_delete=models.SET_NULL, related_name='news_draft_en'
    )
    last_edited_at = models.DateField(verbose_name=_('last edited at'), null=False, blank=False, auto_now=True)


class News(BasePage):
    """
    Model for a news.
    """
    class Meta:
        verbose_name = "news"
        verbose_name_plural = "news"

    name = models.CharField(verbose_name=_('name'), max_length=255)
    slug = models.SlugField(verbose_name='Slug', null=True, blank=True, unique=True)
    author = models.CharField(verbose_name=_('created by'), max_length=255, blank=True)
    views = models.IntegerField(verbose_name=_('views'), default=0, null=False, blank=False)

    def __init__(self, *args, **kwargs):
        # Set default slug if not specified
        if 'slug' not in kwargs:
            if 'name' in kwargs and kwargs['name'] is not None:
                kwargs['slug'] = slugify(kwargs['name'])
            else:
                kwargs['slug'] = ''
        elif kwargs['slug'] is None:
            kwargs['slug'] = ''
        super().__init__(*args, **kwargs)

    def get_content(self, language):
        if not isinstance(language, str):
            raise TypeError("Request must be string.")
        elif language == 'sv':
            return self.content_sv
        elif language == 'en':
            return self.content_en
        else:
            raise ValueError("Request is invalid, must be 'sv' or 'en'.")


    def clean(self):
        if self.slug == '':
            raise ValidationError(
                _("%(slug_field)s cannot be ''."),
                params={
                   'slug_field': self._meta.get_field('slug').verbose_name
                }
            )
