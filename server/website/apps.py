from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WebsiteAppConfig(AppConfig):
    name = _('website')
    verbose_name = _('website app')
