from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from utils.tests import ValidationTestCase
from website.models.content_objects import ContentObjectBase
from website.models.news import News, NewsDraft
from website.models.pages import Page

class NewsTest(ValidationTestCase):
    """Test the functionality of News model."""

    def setUp(self):
        """Creation of objects"""
        news = News(name='Parent news', page_type='0', url="https://f.kth.se", slug='parent', views=0)
        news.save()
        self.content_sv = ContentObjectBase(containing_page=news)
        self.content_en = ContentObjectBase(containing_page=news)
        news.content_sv = self.content_sv
        news.content_en = self.content_en
        self.content_sv.save()
        self.content_en.save()
        self.parent = news
        self.parent.save()

    def test_default_slug(self):
        """Test setting default slug if slug is not specified."""
        # Create new content objects to avoid validation error
        p = Page(url="a")
        p.save()
        self.content_sv = ContentObjectBase(containing_page=p)
        self.content_en = ContentObjectBase(containing_page=p)


        # Check normal behaviour
        self.news_with_slug = News(name='0', page_type='0', url="https://f.kth.se/0", slug='fkm', views=0,
                                   content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.news_with_slug.slug, 'fkm')

        # Cleaning news with slug should not raise an error
        self.assertEqual(self.news_with_slug.full_clean(), None)

        # If slug is not specified -> slug = slugify('name')
        self.news_no_slug = News(name='1', page_type='0', url="https://f.kth.se/1", views=0,
                                 content_sv=self.content_sv, content_en=self.content_en)
        self.assertEqual(self.news_no_slug.slug, '1')

        # If slug is None -> slug = ''
        self.news_none_slug = News(name='2', page_type='0', url="https://f.kth.se/2", slug=None, views=0,
                                   content_sv=self.content_sv, content_en=self.content_en)

        self.assertEqual(self.news_none_slug.slug, '')

        # Slug = '' should raise ValidationError
        self.news_empty_slug = News(name='3', page_type='0', url="https://f.kth.se/3", slug='', views=0,
                                    content_sv=self.content_sv, content_en=self.content_en)
        self.assertRaisesValidationError(
            err=ValidationError(
                _("%(slug_field)s cannot be ''."),
                params={
                    'slug_field': self.news_empty_slug._meta.get_field('slug').verbose_name
                }
            ),
            field='__all__',
            exclusive=True,
            func=self.news_empty_slug.full_clean
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
