from django.apps import apps
from utils.tests import ValidationTestCase
from website.models.content_objects import *
from website.selectors.content_objects import get_collection_items, get_content_object_trees
from website.tests.utils import create_test_page


class ContentObjectSelectorTest(ValidationTestCase):
    """Test the functionality of selectors related to ContentObjectBase model and descendant models."""

    def setUp(self):
        """Creation of objects"""
        self.containing_page = create_test_page()

    def test_get_collection_items(self):
        """Tests the method get_collection_items.

        Checks correct classes and conservation of ordering.
        """
        # Create a collection
        self.collection = ContentCollection(containing_page=self.containing_page)
        self.collection.save()

        # Create items of all ContentObject types
        list_of_items = []
        for db_type, class_name in CONTENT_DB_TYPES.items():
            obj = apps.get_model(class_name)(containing_page=self.containing_page, collection=self.collection)
            obj.save()
            list_of_items.append(obj)

        # Check correct classes and that order stays the same
        self.assertNotEqual(list_of_items, list(self.collection.get_value()))  # Should not have correct types
        self.assertListEqual(list_of_items, list(get_collection_items(self.collection)))  # Should have correct types

    def test_get_content_object_trees_value(self):
        """Tests the method get_content_object_trees.

        Checks for expected return. Tries to test edge-cases, but not guaranteed to catch all.
        """
        # Create small tree and verify correctness
        root = ContentCollection(containing_page=self.containing_page)
        root.save()

        list_obj = ContentCollectionList(containing_page=self.containing_page)
        text = ContentText(containing_page=self.containing_page)
        image = ContentImage(containing_page=self.containing_page)
        menu = ContentMenu(containing_page=self.containing_page)
        page = ContentPage(containing_page=self.containing_page)
        dict_obj = ContentCollection(containing_page=self.containing_page)

        all_lvl1_objects = [list_obj, text, image]
        all_lvl2_objects = [menu, page, dict_obj]

        for obj in all_lvl1_objects:
            obj.collection = root
            obj.save()

        for i, obj in enumerate(all_lvl2_objects):
            obj.collection = list_obj
            obj.order = len(all_lvl2_objects) - i  # Reverse to not coincide with pk order.
            obj.save()

        # Manual tree
        manual = {
            'object': root,
            'db_type': 'dict',
            'items': sorted([
                {
                    'object': list_obj,
                    'db_type': 'list',
                    'items': sorted([
                        {
                            'object': dict_obj,
                            'db_type': 'dict',
                            'items': []
                        },
                        {
                            'object': page,
                            'db_type': 'page',
                        },
                        {
                            'object': menu,
                            'db_type': 'menu',
                        }
                    ], key=lambda val: val['object'].order)
                },
                {
                    'object': text,
                    'db_type': 'text',
                },
                {
                    'object': image,
                    'db_type': 'image',
                }
            ], key=lambda val: val['object'].id)
        }

        # Get generated tree (test also multiple extraction)
        trees = get_content_object_trees([root, root])

        for tree in trees:
            self.assertDictEqual(tree, manual)

    def test_get_content_object_trees_scalability(self):
        """Tests the method get_content_object_trees.

        Checks for query scaling. Never exceeding promise of 9 queries.
        """

        # ----------------------------------
        #              Setup
        # ----------------------------------
        # Create small tree and verify correctness
        root = ContentCollection(containing_page=self.containing_page)
        root.save()

        # Create alot of each type of object directly under
        for _ in range(100):
            ContentCollectionList(containing_page=self.containing_page, collection=root).save()
            ContentText(containing_page=self.containing_page, collection=root).save()
            ContentImage(containing_page=self.containing_page, collection=root).save()
            ContentMenu(containing_page=self.containing_page, collection=root).save()
            ContentPage(containing_page=self.containing_page, collection=root).save()
            ContentCollection(containing_page=self.containing_page, collection=root).save()

        # Do the same at lvl2
        list_obj = ContentCollectionList(containing_page=self.containing_page, collection=root)
        list_obj.save()
        for i in range(100):
            ContentCollectionList(containing_page=self.containing_page, collection=list_obj, order=6 * i).save()
            ContentText(containing_page=self.containing_page, collection=list_obj, order=6 * i + 1).save()
            ContentImage(containing_page=self.containing_page, collection=list_obj, order=6 * i + 2).save()
            ContentMenu(containing_page=self.containing_page, collection=list_obj, order=6 * i + 3).save()
            ContentPage(containing_page=self.containing_page, collection=list_obj, order=6 * i + 4).save()
            ContentCollection(containing_page=self.containing_page, collection=list_obj, order=6 * i + 5).save()

        # Go deep in tree
        parent_collection = root
        for _ in range(100):
            parent_collection = ContentCollection(containing_page=self.containing_page, collection=parent_collection)
            parent_collection.save()

        # Many objects outside page and tree. This is actually going to bee a lot more than 100,
        # but it is fine to check with this
        other_page = create_test_page()
        for _ in range(100):
            ContentText(containing_page=self.containing_page).save()
            ContentText(containing_page=other_page).save()

        # ----------------------------------
        #              Checks
        # ----------------------------------
        # With this setup maximum number of queries should be run.
        self.assertNumQueries(9, get_content_object_trees, [root] * 100)
