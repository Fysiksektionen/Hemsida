from django.apps import apps
from utils.tests import ValidationTestCase
from website.models.content_objects import *
from website.selectors.content_objects import get_collection_items
from website.tests.utils import create_test_page


class ContentObjectSelectorTest(ValidationTestCase):
    """Test the functionality of selectors related to ContentObjectBase model and descendant models."""

    def setUp(self):
        """Creation of objects"""
        pass

    def test_get_collection_items(self):
        """Tests the method get_collection_items.
        Checks correct classes and conservation of ordering.
        """
        # Create a collection
        page = create_test_page()
        self.collection = ContentCollection(parent_page=page)
        self.collection.save()

        # Create items of all ContentObject types
        list_of_items = []
        for db_type, class_name in CONTENT_DB_TYPES.items():
            obj = apps.get_model(class_name)(parent_page=page, collection=self.collection)
            obj.save()
            list_of_items.append(obj)

        # Check correct classes and that order stays the same
        self.assertNotEqual(list_of_items, list(self.collection.get_value()))  # Should not have correct types
        self.assertListEqual(list_of_items, list(get_collection_items(self.collection)))  # Should have correct types

    def test_get_content_object_trees(self):
        """Tests the method get_content_object_trees."""








        pass



