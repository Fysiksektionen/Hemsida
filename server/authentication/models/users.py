from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Model for User with fields specific to our profiles."""

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    # Override of inherited fields
    is_active = True

    class UserType(models.IntegerChoices):
        """Enum type for choices of User.user_type
        Note that numbers do not matter. They should never be exposed.
        """
        STUDERANDE = 1, _("Student")
        SENIOR = 2, _("Senior")
        EXTERNAL = 3, _("External")
        ADMIN = 4, _("Admin")

    # Fields we want for our users (null needs to be accepted for admin-users).
    user_type = models.PositiveSmallIntegerField(
        verbose_name=_("user type"),
        choices=UserType.choices,
        blank=False,
        null=False
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
        upload_to='users',
    )
    language = models.CharField(
        verbose_name=_('language'),
        choices=settings.LANGUAGES,
        max_length=2,
        null=False,
        blank=False
    )
