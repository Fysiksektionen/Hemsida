from django.db import models


class Page(models.Model):
    """
    Model for a Page.
    """

    url = models.URLField(verbose_name='Url')
