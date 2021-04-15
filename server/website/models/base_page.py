from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


class BasePage(models.Model):
    """
    Abstract Model for a Base Page.
    """
    class Meta:
        abstract = True

    class ObjectMeta:
        detail_view_name = 'api:website:page-detail'

    url = models.URLField(verbose_name=_('URL'), blank=False, null=False, unique=True)
    name = models.CharField(verbose_name=_('name'), max_length=255)
    page_type = models.CharField(verbose_name=_('page type'), max_length=255)

    slug = models.SlugField(verbose_name='Slug', null=True, blank=True)
    published = models.BooleanField(verbose_name=_('is published'), default=False)
    # TODO: fix publish method so timestamp is automatically updated
    first_published_at = models.DateField(verbose_name=_('first published at'), null=True, blank=True)
    publish_time = models.DateTimeField(verbose_name=_('publish time'), null=True, blank=True)
    unpublish_time = models.DateTimeField(verbose_name=_('unpublish time'), null=True, blank=True)
    last_edited_at = models.DateTimeField(verbose_name=_('last edited at'), null=False, blank=False, auto_now=True)
    content_sv = models.OneToOneField('website.ContentObjectBase', verbose_name=_('swedish content'), blank=True,
                                      null=True, on_delete=models.SET_NULL,
                                      related_name='%(app_label)s_%(class)s_page_sv')
    content_en = models.OneToOneField('website.ContentObjectBase', verbose_name=_('english content'), blank=True,
                                      null=True, on_delete=models.SET_NULL,
                                      related_name='%(app_label)s_%(class)s_page_en')

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
