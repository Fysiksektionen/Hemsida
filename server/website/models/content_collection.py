from django.db import models
from django.utils.translation import gettext_lazy as _


class ContentCollection(models.Model):

    temp_booblean = models.BooleanField(verbose_name=_('hej'), null=False, blank=False)

