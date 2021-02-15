from utils.tests import ValidationTestCase
from website.models.content_objects import *
from website.models.media import Image
from website.models.menus import Menu
from website.models.pages import Page
from website.selectors.content_obejcts import get_collection_items


class ContentObjectModelTest(ValidationTestCase):
    """Test the functionality of ContentObjectBase model and descendant models."""

    def setUp(self):
        """Creation of objects"""
        # Crete relation objects
        self.image = Image()
        self.image.save()
        self.page = Page(url="https://f.kth.se")
        self.page.save()
        self.menu = Menu(name="Menu")
        self.menu.save()

        self.content_collection = ContentCollection()
        self.content_collection.save()

        self.content_list = ContentCollectionList()
        self.content_list.save()

    def test_get_value_property(self):
        """Tests that the url property gives correct url."""
        # Text
        self.content_text = ContentText(text="Some text")
        self.assertEqual(self.content_text.get_value(), "Some text")

        # Image
        self.content_image = ContentImage(image=self.image)
        self.assertIs(self.content_image.get_value(), self.image)
        self.content_image = ContentImage()
        self.assertIs(self.content_image.get_value(), None)

        # Page
        self.content_page = ContentPage(page=self.page)
        self.assertIs(self.content_page.get_value(), self.page)
        self.content_page = ContentPage()
        self.assertIs(self.content_page.get_value(), None)

        # Menu
        self.content_menu = ContentMenu(menu=self.menu)
        self.assertIs(self.content_menu.get_value(), self.menu)
        self.content_menu = ContentMenu()
        self.assertIs(self.content_menu.get_value(), None)

        # Collection
        self.assertEqual(self.content_collection.get_value().count(), self.content_collection.items.count())
        self.assertEqual(self.content_collection.get_value().model, self.content_collection.items.model)
        self.assertListEqual(list(self.content_collection.get_value()), list(self.content_collection.items.all()))

        self.content_text.collection = self.content_collection
        self.content_text.save()
        self.assertListEqual(get_collection_items(self.content_collection), [self.content_text])

    def test_uniqueness(self):
        self.text1 = ContentText(name="text", collection=self.content_collection)
        self.text1.save()

        # collection <-> name if type(collection) == ContentCollection
        self.text2 = ContentText(name="text", collection=self.content_collection, order=self.text1.order)
        self.assertRaisesValidationError(
            err=self.text2.unique_error_message(ContentObjectBase, ('collection', 'name')),
            field=None,
            exclusive=True,
            func=self.text2.full_clean
        )

        # collection <-> order if type(collection) == ContentCollectionList
        self.text1.collection = self.content_list
        self.text1.save()
        self.text2 = ContentText(name="text", collection=self.content_list, order=self.text1.order)
        self.assertRaisesValidationError(
            err=self.text2.unique_error_message(ContentObjectBase, ('collection', 'order')),
            field=None,
            exclusive=True,
            func=self.text2.full_clean
        )
