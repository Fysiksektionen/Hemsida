from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class AuthAppConfig(AppConfig):
    name = 'authentication'
    verbose_name = _('authentication app')
