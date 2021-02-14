from django.db import models


class ContentObjectBase(models.Model):
    content = models.TextField()
