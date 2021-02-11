from django.db import models
from django.utils.translation import gettext_lazy as _

from website.models.abstract_singleton import SingletonModel
from website.models.content_collection import ContentCollection
from website.models.pages import Page


class SiteModel(SingletonModel):

    class Meta:
        verbose_name = _("Site Manager")

    root_url = models.URLField(verbose_name=_('root URL'), blank=False, null=False)
    api_root_url = models.URLField(verbose_name=_('API root URL'), blank=False, null=False)

    root_page = models.ForeignKey(Page, verbose_name=_('root page'), blank=False, null=False, on_delete=models.RESTRICT)

    # Didn't find a nice way to do this but what ever...
    banner_content = models.ForeignKey(ContentCollection, verbose_name=_('banner content'), related_name='banner_content', blank=True, null=True, on_delete=models.RESTRICT)
    footer_content = models.ForeignKey(ContentCollection, verbose_name=_('footer content'), related_name='footer_content', blank=True, null=True, on_delete=models.RESTRICT)


    # Override
    def clean(self):
        """Validation of state of values in this model.
        :raises ValidationError with all errors.
        """
        super().clean()

        # Nulls are checked by Django
        # URLs are checked by Django

