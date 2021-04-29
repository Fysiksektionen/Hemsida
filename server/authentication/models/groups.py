import os

from authentication.models.mixins import ModelPermissionCacheMixin
from django.contrib.auth.models import Group as DjangoGroup
from django.db import models
from django.utils.translation import gettext_lazy as _


def _image_filename(instance, filename):
    """Method to set image filename on upload of group image. (So that original filename is not saved)"""
    # TODO: Fix issue of id=None. Maybe just do some uuid-string.
    filename = "%d_group_image.%s" % (instance.id, filename.split('.')[-1])  # Filename with correct extension
    return os.path.join('groups', filename)  # Return path groups/<id>_group_image.<ext>


class Group(DjangoGroup, ModelPermissionCacheMixin):
    """Model for Group with fields specific to our needs."""

    permission_attr_name = 'permissions'

    class Meta:
        verbose_name = _("group")
        verbose_name_plural = _("groups")

    class ObjectMeta:
        detail_view_name = 'api:authentication:group'

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
