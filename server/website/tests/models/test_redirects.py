from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from utils.tests import ValidationTestCase
from website.models import Redirect, Page


class RedirectModelTest(ValidationTestCase):
    """Test the functionality of Redirect model."""

    def setUp(self):
        """Creation of objects"""
        self.page = Page(url="https://f.kth.se/coronaviruset")
        self.page.save()

        self.internal_redirect = Redirect(from_path="/corona", page=self.page)
        self.external_redirect = Redirect(
            from_path="/personuppgifter",
            url="https://drive.google.com/file/d/1QmSgQAUfbS3sNTTLKmy2FBEiG3nloCSl/view"
        )
        self.ambigous_redirect = Redirect(
            from_path="/link",
            page=self.page,
            url="https://f.kth.se"
        )
        self.empty_redirect = Redirect(from_path="/link")

        self.bad_from_path_redirect = Redirect(from_path="no-leading-slash", page=self.page)

    def test_link_property(self):
        """Tests that the url property gives correct url."""
        self.assertEqual(self.internal_redirect.link, "https://f.kth.se/coronaviruset")
        self.assertEqual(self.external_redirect.link, "https://drive.google.com/file/d/1QmSgQAUfbS3sNTTLKmy2FBEiG3nloCSl/view")
        self.assertRaisesMessage(
            RuntimeError,
            "Link is ambiguous, both 'page' and 'url' is set.",
            Redirect.link.__get__,
            self.ambigous_redirect
        )
        self.assertRaisesMessage(
            RuntimeError,
            "Link is missing. Set either 'page' or 'url'.",
            Redirect.link.__get__,
            self.empty_redirect
        )

    def test_field_validation(self):
        """Tests the validation and check that the correct error is thrown."""

        # Check normal behaviour
        self.assertEqual(self.internal_redirect.full_clean(), None)
        self.assertEqual(self.external_redirect.full_clean(), None)

        # Ambiguous url
        self.assertRaisesValidationError(
            err=ValidationError(
                _("Link is ambiguous. Set either %(page_field_name)s or %(url_field_name)s, not both."),
                params={'page_field_name': _('page'), 'url_field_name': _('url')}
            ),
            field=None,
            exclusive=True,
            func=self.ambigous_redirect.full_clean
        )

        # Ambiguous url
        self.assertRaisesValidationError(
            err=ValidationError(
                _("Link is empty. Set either %(page_field_name)s or %(url_field_name)s."),
                params={'page_field_name': _('page'), 'url_field_name': _('url')}
            ),
            field=None,
            exclusive=True,
            func=self.empty_redirect.full_clean
        )

        # from_path validation
        self.assertRaisesValidationError(
            err=ValidationError(
                _('%(value)s is not full path.'),
                params={'value': self.bad_from_path_redirect.from_path}
            ),
            field='from_path',
            exclusive=True,
            func=self.bad_from_path_redirect.full_clean
        )
