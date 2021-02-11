from django.db import migrations

from website.apps import WebsiteAppConfig
from website.models.site import SiteModel
from website.models.pages import Page

singelton_pk = 1  # this value should be the same as in SiteModel._singelton_pk

def create_singleton_site(apps, schema_editor):
    """
    This function will be run when the migration happens.
    Initialize the singleton (single instance) of the SiteModel. There can only be one, this one.
    The default SiteModel object will contain empty URL fields and an empty Page object.
    The SiteModel object can then be edited in the django admin view.
    """
    the_model = apps.get_model(WebsiteAppConfig.name, SiteModel.__name__)
    if not the_model.objects.filter(pk=singelton_pk).exists():
        root_page = Page(url='') # might not be needed in the future
        root_page.save()
        site = SiteModel(1, root_page=root_page) # don't initialize the SiteModel, use instance()
        site.save()

def delete_create_singleton_site(apps, schema_editor):
    """
    This function will be run when the migration is reversed.
    Deletes the SiteModel singelton.
    """
    the_model = apps.get_model(WebsiteAppConfig.name, SiteModel.__name__)
    site = the_model.objects.get(pk=singelton_pk)
    site.delete() # don't worry it doesn't run my code, but works anyway.


class Migration(migrations.Migration):
    """This migration has to be run after the singelton models have been created in the database."""

    dependencies = [
        ('website', '0003_backend-site-model_20210211'),
    ]

    operations = [
        migrations.RunPython(create_singleton_site, delete_create_singleton_site)
    ]
