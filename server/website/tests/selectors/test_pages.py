from utils.tests import ValidationTestCase, num_queries
from website.models import *
from website.selectors.pages import _get_path_page_dict, get_page_from_path
from website.tests.utils import create_test_page


class PagesSelectorTest(ValidationTestCase):
    """Test the functionality of selectors related to the Page model and descendant models."""

    def setUp(self):
        """Creation of objects"""
        # Create root page
        self.root = create_test_page(slug="")
        SiteModel.instance().root_page = self.root
        SiteModel.instance().save()

        # Create small tree
        self.child_1 = create_test_page(parent=self.root)
        self.child_2 = create_test_page(parent=self.root)
        self.grandchild_1_1 = create_test_page(parent=self.child_1)
        self.grandchild_1_2 = create_test_page(parent=self.child_1)

        # Add to check for buggs regarding loose pages
        self.loose_page = create_test_page()

    def test__get_path_page_dict(self):
        """Tests the `_get_path_page_dict` method."""
        actual_dict = {
            '/' + path: id
            for id, path in [
                (self.root.id, self.root.slug),
                (self.child_1.id, self.child_1.slug),
                (self.child_2.id, self.child_2.slug),
                (self.grandchild_1_1.id, '/'.join([self.child_1.slug, self.grandchild_1_1.slug])),
                (self.grandchild_1_2.id, '/'.join([self.child_1.slug, self.grandchild_1_2.slug])),
            ]
        }
        self.assertDictEqual(actual_dict, _get_path_page_dict())

    def get_page_from_path(self):
        """Tests the `get_page_from_path` method."""
        # Clearing cache
        get_page_from_path('/', clear_cache=True)

        # Check error handling
        self.assertRaisesMessage(
            TypeError,
            "Path must be string",
            get_page_from_path,
            ["/", "/hem"]
        )

        # Check root page lookups
        self.assertEqual(self.root, get_page_from_path('/'))
        self.assertEqual(self.root, get_page_from_path(''))

        # Check correct lookup for sub-page page
        self.assertEqual(self.child_1, get_page_from_path('/' + self.child_1.slug))

        # Check that cache works as intended (only one lookup when cached, multiple else).
        num_queries()  # Reset count
        self.assertNotEqual(get_page_from_path('', clear_cache=True), num_queries())
        self.assertEqual(get_page_from_path(''), num_queries())
