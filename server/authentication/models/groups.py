import os

from django.contrib.auth.models import Group as django_Group
from django.db import models
from django.utils.translation import gettext_lazy as _


def _image_filename(instance, filename):
    filename = "%d_group_image.%s" % (instance.id, filename.split('.')[-1])  # Filename with correct extension
    return os.path.join('groups', filename)  # Return path groups/<id>_group_image.<ext>


class Group(django_Group):
    """Model for Group with fields specific to our needs."""

    class Meta:
        verbose_name = _("group")
        verbose_name_plural = _("groups")

    class ObjectMeta:
        detail_view_name = 'api:authentication:group-detail'

    class GroupType(models.IntegerChoices):
        """Enum type for choices of Group.group_type
        Note that numbers do not matter. They should never be exposed.
        """
        NONE = 0, ""
        NAMND = 1, _("Chapter group")
        EXTERNAL = 2, _("External")
        ADMIN = 3, _("Admin")

    # Fields we want for our groups
    group_type = models.PositiveSmallIntegerField(
        verbose_name=_("group type"),
        choices=GroupType.choices,
        default=GroupType.NONE
    )
    description = models.TextField(
        verbose_name=_("description"),
        null=True,
        blank=True
    )
    image = models.ImageField(
        verbose_name=_('group image'),
        null=True,
        blank=True,
        upload_to=_image_filename,
    )
