from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class PageDraft(models.Model):
    """
    Model for a Page draft.
    """
    page_type = models.CharField(verbose_name=_('page type'), max_length=255)
    content_sv = models.ForeignKey(
        'ContentObjectBase', verbose_name=_('swedish content'), blank=True, null=True, on_delete=models.SET_NULL
    )
    content_en = models.ForeignKey(
        'ContentObjectBase', verbose_name=_('english content'), blank=True, null=True, on_delete=models.SET_NULL
    )
    last_edited_at = models.DateField(verbose_name=_('last edited at'), null=False, blank=False, auto_now_add=True)


class Page(models.Model):
    """
    Model for a Page.
    """
    class Meta:
        unique_together = [('name', 'parent'), ('slug', 'parent')]

    url = models.URLField(verbose_name=_('URL'), blank=False, null=False, unique=True)
    name = models.CharField(verbose_name=_('name'), null=False, blank=True, max_length=255)
    page_type = models.CharField(verbose_name=_('page type'), max_length=255)
    parent = models.ForeignKey(
        'Page', verbose_name=_('parent page'), blank=True, null=True, on_delete=models.SET_NULL
    )
    slug = models.SlugField(verbose_name='Slug', null=False, blank=False)

    page_draft = models.OneToOneField(
        'PageDraft', verbose_name=_('page draft'), null=True, blank=True, on_delete=models.SET_NULL
    )
    has_draft = models.BooleanField(verbose_name=_('has draft'), default=False)
    published = models.BooleanField(verbose_name=_('is published'), default=False)
    published_at = models.DateField(verbose_name=_('published at'), null=True, blank=True, auto_now_add=False)
    last_edited_at = models.DateField(verbose_name=_('last edited at'), null=False, blank=False, auto_now_add=True)
    content_sv = models.ForeignKey('ContentObjectBase', verbose_name=_('swedish content'), blank=True, null=True,
                                   on_delete=models.SET_NULL)
    content_en = models.ForeignKey('ContentObjectBase', verbose_name=_('english content'), blank=True, null=True,
                                   on_delete=models.SET_NULL)

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

    def clean(self):
        if self.slug == '' and self.parent is not None:
            raise ValidationError(_("Slug cannot be '' if parent page is not None."))

    def get_content(self, language):
        if not isinstance(language, str):
            raise TypeError(_("Request must be string."))
        elif language == 'sv':
            return self.content_sv
        elif language == 'en':
            return self.content_en
        else:
            raise ValueError(_("Request is invalid, must be 'sv' or 'en'."))
