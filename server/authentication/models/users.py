import os

from authentication.models.mixins import ModelPermissionCacheMixin
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


def _image_filename(instance, filename):
    """Method to set image filename on upload of user image. (So that original filename is not saved)"""
    # TODO: Fix issue of id=None. Maybe just do some uuid-string.
    filename = "%d_profile.%s" % (instance.id, filename.split('.')[-1])  # Filename with correct extension
    return os.path.join('users', filename)  # Return path users/<id>_profile.<ext>


class User(AbstractUser, ModelPermissionCacheMixin):
    """Model for User with fields specific to our profiles."""

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    class ObjectMeta:
        detail_view_name = 'api:authentication:user'

    # Override of inherited fields
    is_active = models.BooleanField(verbose_name=_('active'), default=True, editable=False)

    # Fields we want for our users (null needs to be accepted for admin-users).
    class UserType(models.IntegerChoices):
        """Enum type for choices of User.user_type
        Note that numbers do not matter. They should never be exposed.
        """

        NONE = 0, ""
        STUDERANDE = 1, _("Student")
        SENIOR = 2, _("Senior")
        EXTERNAL = 3, _("External")
        ADMIN = 4, _("Admin")

    user_type = models.PositiveSmallIntegerField(
        verbose_name=_("user type"),
        choices=UserType.choices,
        default=UserType.NONE
    )
    kth_id = models.CharField(
        verbose_name=_('KTH-id'),
        max_length=15,
        null=True,
        blank=True
    )
    year = models.CharField(
        verbose_name=_('chapter year'),
        choices=settings.CHAPTER_YEARS,
        max_length=4,  # F-XX
        null=True,
        blank=True
    )
    image = models.ImageField(
        verbose_name=_('profile image'),
        null=True,
        blank=True,
        upload_to=_image_filename,
    )
    language = models.CharField(
        verbose_name=_('language'),
        choices=settings.LANGUAGES,
        max_length=2,
        null=False,
        blank=False,
        default=settings.LANGUAGE_CODE
    )

    def __setattr__(self, key, value):
        """Overrides setting value of 'is_active' on the user.
        This value defaults to True and should never be set to anything else."""

        if key == 'is_active' and value is not True:
            raise ValueError("Can't set attribute 'is_active' to anything else than True. "
                             "Generally this attribute should never be set.")
        super().__setattr__(key, value)
