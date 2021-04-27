from django.apps import AppConfig, apps
from django.db.models.signals import post_migrate
from django.utils.translation import gettext_lazy as _


def create_site_and_root_page(sender, **kwargs):
    site_model = apps.get_model('website.SiteModel')
    if not site_model.objects.filter(pk=site_model._singleton_pk).exists():
        root_page = apps.get_model('website.Page')(name="Start", slug='')  # might not be needed in the future
        root_page.save()
        site = site_model(1, root_page=root_page)  # don't initialize the SiteModel, use instance()
        site.save()

class WebsiteAppConfig(AppConfig):
    name = 'website'
    verbose_name = _('website app')

    def ready(self):
        post_migrate.connect(create_site_and_root_page, sender=self)