from django.db import migrations


class Migration(migrations.Migration):
    """This migration has to be run after the singelton models have been created in the database."""

    dependencies = [
        ('website', '0005_backend-site-model_20210211'),
        ('website', '0005_backend-page-model_210214'),
    ]

    operations = [

    ]
