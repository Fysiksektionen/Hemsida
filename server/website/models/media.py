from django.db import models
from django.utils.translation import gettext_lazy as _


class Image(models.Model):
    """Model for image."""

    class Meta:
        verbose_name = _("image")
        verbose_name_plural = _("image")

    image = models.ImageField(verbose_name=_('image'))
