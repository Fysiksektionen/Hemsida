from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from utils.tests import ValidationTestCase
from website.models.content_objects import ContentObjectBase
from website.models.pages import Page, PageDraft


class PageTest(ValidationTestCase):
    """Test the functionality of Page model."""

    def setUp(self):
        """Creation of objects"""
        self.content_sv = ContentObjectBase()
        self.content_en = ContentObjectBase()

        self.content_sv.save()
        self.content_en.save()

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
        self.assertEqual(self.page_with_slug.slug, 'fkm')

        # If slug is not specified -> slug = slugify('name')
        self.page_no_slug = Page(name='1', page_type='0', url="https://f.kth.se/1",
                                 content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.page_no_slug.slug, '1')

        # If slug is None -> slug = ''
        self.page_none_slug = Page(name='2', page_type='0', url="https://f.kth.se/2", slug=None,
                                   content_sv=self.content_sv, content_en=self.content_en)

        self.assertEqual(self.page_none_slug.slug, '')

        # If slug is '' then it should stay as ''
        self.page_empty_slug_no_parent = Page(name='3', page_type='0', url="https://f.kth.se/3", slug='',
                                              content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.page_empty_slug_no_parent.slug, '')

        # If the page has a parent then slug = '' should raise ValidationError
        self.page_empty_slug_with_parent = Page(name='4', page_type='0', url="https://f.kth.se/4", slug='',
                                                parent=self.parent, content_sv=self.content_sv,
                                                content_en=self.content_en)
        self.assertRaisesMessage(
            ValidationError(
                _("%(slug_field)s cannot be '' if %(parent_field)s is not None."),
                params={
                    'slug_field': Page._meta.get_field('slug').verbose_name,
                    'parent_field': Page._meta.get_field('parent').verbose_name
                }
            ),
            self.page_empty_slug_with_parent.full_clean
        )

    def test_get_content(self):
        """Test function get_content."""
        # Check normal behaviour
        self.assertEqual(Page.get_content(self.parent, 'sv'), self.content_sv)
        self.assertEqual(Page.get_content(self.parent, 'en'), self.content_en)

        # Request that is not string should raise TypeError
        self.assertRaisesMessage(TypeError, "Request must be string.", self.parent.get_content, 1)
        self.assertRaisesMessage(TypeError, "Request must be string.", self.parent.get_content, None)

        # Request that is string but not 'en' or 'sv' should raise ValueError
        self.assertRaisesMessage(
            ValueError, "Request is invalid, must be 'sv' or 'en'.", self.parent.get_content, '')
        self.assertRaisesMessage(
            ValueError, "Request is invalid, must be 'sv' or 'en'.", self.parent.get_content, 'de')

    def test_uniqueness_rules(self):
        """Tests uniqueness rules."""
        # name <--> parent
        self.page_same_name1 = Page(name='name', page_type='0', url="https://f.kth.se/4", slug='fdev',
                                    parent=self.parent)
        self.page_same_name1.save()
        self.page_same_name2 = Page(name='name', page_type='0', url="https://f.kth.se/5", slug='fdev1',
                                    parent=self.parent)
        self.assertRaisesValidationError(
            err=self.page_same_name2.unique_error_message(Page, ('name', 'parent')),
            field=None,
            exclusive=True,
            func=self.page_same_name2.full_clean
        )
        # slug <--> parent
        self.page_same_slug1 = Page(name='other name', page_type='0', url="https://f.kth.se/5", slug='fkm',
                                    parent=self.parent)
        self.page_same_slug1.save()
        self.page_same_slug2 = Page(name='another other name', page_type='0', url="https://f.kth.se/7", slug='fkm',
                                    parent=self.parent)
        self.assertRaisesValidationError(
            err=self.page_same_name2.unique_error_message(Page, ('slug', 'parent')),
            field=None,
            exclusive=True,
            func=self.page_same_slug2.full_clean
        )
