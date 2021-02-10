from django.db import models
from django.utils.translation import gettext_lazy as _


class Page(models.Model):
    """
    Model for a Page.
    """

    class Meta:
        verbose_name = _("page")
        verbose_name_plural = _("pages")

    url = models.URLField(verbose_name=_('url'))
