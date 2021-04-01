from django.db import models
from django.utils.translation import gettext_lazy as _
from .base_page import BasePage


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
    class Meta:
        verbose_name = _('page')
        verbose_name_plural = _('pages')



    parent = models.ForeignKey(
        'website.Page', verbose_name=_('parent page'), blank=True, null=True, on_delete=models.SET_NULL,
        related_name='children'
    )