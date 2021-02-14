from django.utils.translation import gettext as _
from website.models.pages import Page, PageDraft
from django.core.exceptions import ValidationError
from website.models.content_objects import ContentObjectBase

from .utils import ValidationTestCase


class PageTest(ValidationTestCase):
    """Test the functionality of Page model."""

    def setUp(self):
        """Creation of objects"""
        self.content_sv = ContentObjectBase(content="swedish content")
        self.content_en = ContentObjectBase(content="english content")

        self.parent = Page(name='Parent page', page_type='0', url="https://f.kth.se", slug='parent',
                           content_sv=self.content_sv, content_en=self.content_en)
        self.page_draft = PageDraft(page_type='1', content_en=self.content_en, content_sv=self.content_sv)

        self.parent.save()
        self.page_draft.save()

    def test_default_slug(self):
        """Test setting default slug if slug is not specified."""
        # Check normal behaviour
        self.page_with_slug = Page(name='0', page_type='0', url="https://f.kth.se/0", slug='fkm',
                                   content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.page_with_slug, 'fkm')

        # If slug is not specified -> slug = slugify('name')
        self.page_no_slug = Page(name='1', page_type='0', url="https://f.kth.se/1",
                                 content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.page_no_slug.slug, '1')

        # If slug is None -> slug = ''
        self.page_none_slug = Page(name='2', page_type='0', url="https://f.kth.se/2",
                                   content_sv=self.content_sv, content_en=self.content_en)

        self.assertEqual(self.page_none_slug, '')

        # If slug is '' then it should stay as ''
        self.page_empty_slug_no_parent = Page(name='3', page_type='0', url="https://f.kth.se/3", slug='',
                                              content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.page_empty_slug_no_parent, '')

        # If the page has a parent then slug = '' should raise ValidationError
        self.page_empty_slug_with_parent = Page(name='3', page_type='0', url="https://f.kth.se/3", slug='',
                                                parent_page=self.parent, content_sv=self.content_sv,
                                                content_en=self.content_en)
        self.assertRaisesMessage(
            ValidationError, _("Slug cannot be '' if parent page is not None."),
            self.page_empty_slug_with_parent.full_clean()
        )

    def test_get_content(self):
        """Test function get_content."""
        # Check normal behaviour
        self.assertEqual(Page.get_content(self.parent, 'sv'), self.content_sv)
        self.assertEqual(Page.get_content(self.parent, 'en'), self.content_en)

        # Request that is not string should raise TypeError
        self.assertRaisesMessage(TypeError, _("Request must be string."), Page.get_content(self.parent, 1))
        self.assertRaisesMessage(TypeError, _("Request must be string."), Page.get_content(self.parent, None))

        # Request that is string but not 'en' or 'sv' should raise ValueError
        self.assertRaisesMessage(
            ValueError, _("Request is invalid, must be 'sv' or 'en'."), Page.get_content(self.parent, '')
        )
        self.assertRaisesMessage(
            ValueError, _("Request is invalid, must be 'sv' or 'en'."), Page.get_content(self.parent, 'de')
        )

    def test_uniqueness_rules(self):
        """Tests uniqueness rules."""
        # name <--> parent
        self.page_same_name = Page(name='Parent page', page_type='0', url="https://f.kth.se/4", slug='fdev',
                                   content_sv=self.content_sv, content_en=self.content_en, parent=self.parent)
        self.assertRaisesValidationError(
            err=self.page_same_name.unique_error_message(Page, ('name', 'parent')),
            field=None,
            exclusive=True,
            func=self.page_same_name.full_clean
        )
        # slug <--> parent
        self.page_same_slug = Page(name='Not parent page', page_type='0', url="https://f.kth.se/5", slug='parent',
                                   content_sv=self.content_sv, content_en=self.content_en, parent=self.parent)
        self.assertRaisesValidationError(
            err=self.page_same_name.unique_error_message(Page, ('name', 'parent')),
            field=None,
            exclusive=True,
            func=self.page_same_slug.full_clean
        )
