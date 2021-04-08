from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from utils.tests import ValidationTestCase
from website.models.content_objects import ContentObjectBase
from website.models.news import News, NewsDraft


class NewsTest(ValidationTestCase):
    """Test the functionality of News model."""

    def setUp(self):
        """Creation of objects"""
        self.content_sv = ContentObjectBase()
        self.content_en = ContentObjectBase()

        self.content_sv.save()
        self.content_en.save()
        self.parent = News(name='Parent news', page_type='0', url="https://f.kth.se", slug='parent',
                           content_sv=self.content_sv, content_en=self.content_en, views=0)
        self.parent.save()

    def test_default_slug(self):
        """Test setting default slug if slug is not specified."""
        # Check normal behaviour
        self.news_with_slug = News(name='0', page_type='0', url="https://f.kth.se/0", slug='fkm',
                                   content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.news_with_slug.slug, 'fkm')

        # If slug is not specified -> slug = slugify('name')
        self.news_no_slug = News(name='1', page_type='0', url="https://f.kth.se/1",
                                 content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.news_no_slug.slug, '1')

        # If slug is None -> slug = ''
        self.news_none_slug = News(name='2', page_type='0', url="https://f.kth.se/2", slug=None,
                                   content_sv=self.content_sv, content_en=self.content_en)

        self.assertEqual(self.news_none_slug.slug, '')

        # Slug = '' should raise ValidationError
        # TODO: Make it so this test actually works
        self.news_empty_slug = News(name='3', page_type='0', url="https://f.kth.se/3", slug='',
                                              content_sv=self.content_sv, content_en=self.content_en)
        self.assertRaisesMessage(
            ValidationError(
                _("%(slug_field)s cannot be ''."),
                params={
                    'slug_field': News._meta.get_field('slug').verbose_name
                }
            ),
            self.news_empty_slug.full_clean
        )

    def test_get_content(self):
        """Test function get_content."""
        # Check normal behaviour
        self.assertEqual(News.get_content(self.parent, 'sv'), self.content_sv)
        self.assertEqual(News.get_content(self.parent, 'en'), self.content_en)

        # Request that is not string should raise TypeError
        self.assertRaisesMessage(TypeError, "Request must be string.", self.parent.get_content, 1)
        self.assertRaisesMessage(TypeError, "Request must be string.", self.parent.get_content, None)

        # Request that is string but not 'en' or 'sv' should raise ValueError
        self.assertRaisesMessage(
            ValueError, "Request is invalid, must be 'sv' or 'en'.", self.parent.get_content, '')
        self.assertRaisesMessage(
            ValueError, "Request is invalid, must be 'sv' or 'en'.", self.parent.get_content, 'de')