from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from .base_page import BasePage
from django.core.exceptions import ValidationError


class PageDraft(models.Model):
    """
    Model for a Page draft.
    """
    class Meta:
        verbose_name = _('page draft')
        verbose_name_plural = _('page drafts')

    page_type = models.CharField(verbose_name=_('page type'), max_length=255)
    """Note: should probably move relationship to page model when we have our own admin page, 
    because it will probably lead to a faster lookup. """
    page = models.OneToOneField(
        'website.Page', verbose_name=_('page'), null=True, blank=False, on_delete=models.CASCADE,
        related_name='page_draft'
    )
    content_sv = models.OneToOneField(
        'website.ContentObjectBase', verbose_name=_('swedish content'), blank=True, null=True,
        on_delete=models.SET_NULL, related_name='page_draft_sv'
    )
    content_en = models.OneToOneField(
        'website.ContentObjectBase', verbose_name=_('english content'), blank=True, null=True,
        on_delete=models.SET_NULL, related_name='page_draft_en'
    )
    last_edited_at = models.DateField(verbose_name=_('last edited at'), null=False, blank=False, auto_now=True)


class Page(BasePage):
    """
    Model for a Page.
    """
    class Meta:
        verbose_name = _('page')
        verbose_name_plural = _('pages')
        unique_together = [('name', 'parent'), ('slug', 'parent')]

    name = models.CharField(verbose_name=_('name'), max_length=255)
    slug = models.SlugField(verbose_name='Slug', null=True, blank=True)
    parent = models.ForeignKey(
        'website.Page', verbose_name=_('parent page'), blank=True, null=True, on_delete=models.SET_NULL,
        related_name='children'
    )
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
        if self.slug == '' and self.parent is not None:
            raise ValidationError(
                _("%(slug_field)s cannot be '' if %(parent_field)s is not None."),
                params={
                   'slug_field': self._meta.get_field('slug').verbose_name,
                   'parent_field': self._meta.get_field('parent').verbose_name
                }
            )

@receiver(post_save, sender=Page)
def invalidate_page_caches(sender, **kwargs):
    """Hook that invalidates caches on post_save of any page_object."""
    # List of caches to be invalidated on post_save. Add to list if new cache is introduced.
    caches = ['path_page_dict']

    cache.delete_many(caches)  # Invalidate caches
