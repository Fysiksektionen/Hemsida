from django.utils.translation import gettext_lazy as _
from .pages import *

class AD(Page):
    banner = models.ImageField(verbose_name=_('image'))