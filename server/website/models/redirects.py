from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.db import models
from django.utils.translation import gettext_lazy as _


def from_path_validator(value):
    """Validates that string starts with '/'. Empty sting is not caught."""
    if value != "" and value[0] != '/':
        raise ValidationError(
            _('%(value)s is not full path.'),
            params={'value': value},
        )


class Redirect(models.Model):
    """Model for redirects.

    Redirect can be from any path to any url or internal page. Use link
    attribute to get the actual url of the redirect.
    """

    class Meta:
        verbose_name = _("redirect")
        verbose_name_plural = _("redirects")

    class ObjectMeta:
        detail_view_name = 'api:website:redirect-detail'

    from_path = models.CharField(
        max_length=255,  # Max on CharField
        verbose_name=_('from path'),
        blank=False, null=False,
        validators=[from_path_validator],
        unique=True
    )

    # Url and page are validated in clean method to ensure non-ambiguity.
    url = models.URLField(verbose_name=_('url'), blank=True, null=True, default=None)
    page = models.ForeignKey('Page', verbose_name=_('page'), blank=True, null=True, on_delete=models.CASCADE)

    @property
    def link(self):
        """Url value of redirect.
        :raises RuntimeError: if link is ambiguous.
        :raises RuntimeError: if link is missing.
        :return: Url of redirect based of url of page or url specified.
        """
        if self.page is not None and self.url is not None:
            raise RuntimeError("Link is ambiguous, both 'page' and 'url' is set.")
        if self.page is None and self.url is None:
            raise RuntimeError("Link is missing. Set either 'page' or 'url'.")
        return self.page.url if self.page is not None else self.url

    def clean(self):
        """Validation of state of values in item.

        :raises ValidationError: If link-value is ambiguous (i.e. when both 'self.page' and 'self.url' is not None)
        """
        errors = {}

        # Link ambiguity
        if self.page is not None and self.url is not None:
            errors.update({
                NON_FIELD_ERRORS: ValidationError(
                    _("Link is ambiguous. Set either %(page_field_name)s "
                      "or %(url_field_name)s, not both."),
                    params={
                        'page_field_name': _('page'),
                        'url_field_name': _('url')
                    }
                )
            })

        # Link empty
        if self.page is None and self.url is None:
            errors.update({
                NON_FIELD_ERRORS: ValidationError(
                    _("Link is empty. Set either %(page_field_name)s "
                      "or %(url_field_name)s."),
                    params={
                        'page_field_name': _('page'),
                        'url_field_name': _('url')
                    }
                )
            })

        if errors:
            raise ValidationError(errors)

    @property
    def is_internal(self):
        return self.page is not None

    def __str__(self):
        return "%s (%s)" % (self.from_path, "Internal" if self.is_internal else "External")
