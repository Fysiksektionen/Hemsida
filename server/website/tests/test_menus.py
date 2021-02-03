from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils.translation import gettext as _

from website.models.menus import MenuItem, Menu, MenuRel
from website.models.pages import Page


class MenuItemModelTest(TestCase):
    """Test the functionality of MenuItem model."""

    def setUp(self):
        """Creation of objects"""
        self.page = Page(url="https://f.kth.se")
        self.menu_item_page = MenuItem(name="1", page=self.page)
        self.menu_item_url = MenuItem(name="2", url="https://ths.kth.se")
        self.menu_item_both = MenuItem(name="3", page=self.page, url="https://ths.kth.se")
        self.menu_item_none = MenuItem(name="4")

        self.menu_item_no_name = MenuItem(page=self.page)
        self.menu_item_bad_url = MenuItem(name="5", url="bad_url")

    def test_url_property(self):
        """Tests that the url property gives correct url."""
        self.assertEqual(self.menu_item_page.link, "https://f.kth.se")
        self.assertEqual(self.menu_item_url.link, "https://ths.kth.se")
        self.assertRaisesMessage(
            RuntimeError,
            _("Url is ambiguous, both Page and Url is set."),
            MenuItem.link.__get__,
            self.menu_item_both
        )
        self.assertEqual(self.menu_item_none.link, "")

    def test_field_validation(self):
        """Tests the validation and check that the correct error is thrown."""
        self.assertEqual(self.menu_item_none.full_clean(), None)
        self.assertRaisesMessage(
            ValidationError,
            _('Url is ambiguous. Set either Page or Url on the MenuItem, not both.'),
            self.menu_item_both.full_clean
        )


class MenuThroughRelModelTest(TestCase):
    """Test the functionality of Menu model."""

    def setUp(self):
        """Creation of objects"""
        self.menu_item_1 = MenuItem(name="item1", url="https://f.kth.se")
        self.menu_item_2 = MenuItem(name="item2", url="https://f.kth.se")
        self.menu_1 = Menu(name="menu_1")
        self.menu_2 = Menu(name="menu_2")

        # Named using menu_item_order
        self.menu_rel_1_1_0 = MenuRel(order_num=0, menu=self.menu_1, item=self.menu_item_1)

        self.menu_item_1.save()
        self.menu_item_2.save()
        self.menu_1.save()
        self.menu_2.save()
        self.menu_rel_1_1_0.save()

    def test_uniqueness_rules(self):
        """Test the two uniqueness criteria. Also test that they do not block wanted behaviour.

        Not accepted:
        - Menu as a child of itself.
        - MenuRel.menu is non-Menu item.
        - The same MenuItem multiple times as a child in the same Menu.
        - The same non-Menu item multiple times as a child (in any menu).
        - The same order_num multiple times in the same Menu.
        - The same MenuItem.name in the same Menu.
        """

        # Menu as a child of itself.
        menu_rel_2_m2_0 = MenuRel(order_num=0, menu=self.menu_2, item=self.menu_2)
        self.assertRaisesMessage(
            ValidationError,
            _("A menu can not be an item inside itself."),
            menu_rel_2_m2_0.full_clean
        )

        # MenuRel.menu is non-Menu item.
        self.assertRaises(ValueError, MenuRel, order_num=0, menu=self.menu_item_1, item=self.menu_item_2)

        # The same MenuItem multiple times as a child in the same Menu.
        menu_rel_1_1_1 = MenuRel(order_num=1, menu=self.menu_1, item=self.menu_item_1)
        self.assertRaises(ValidationError, menu_rel_1_1_1.full_clean)

        # The same non-Menu item multiple times as a child (in any menu).
        menu_rel_2_1_0 = MenuRel(order_num=1, menu=self.menu_2, item=self.menu_item_1)
        self.assertRaisesMessage(
            ValidationError,
            _("A non-menu MenuItem can not be a child of multiple different menus."),
            menu_rel_2_1_0.full_clean
        )

        # The same order_num multiple times in the same Menu.
        menu_rel_1_2_0 = MenuRel(order_num=0, menu=self.menu_1, item=self.menu_item_2)
        self.assertRaises(ValidationError, menu_rel_1_2_0.full_clean)

        # The same MenuItem.name in the same Menu.
        item3 = MenuItem(name="item1", url="https://f.kth.se")
        menu_rel_1_3_1 = MenuRel(order_num=1, menu=self.menu_1, item=item3)
        self.assertRaisesMessage(
            ValidationError,
            _("A menu can not have multiple items with the same name."),
            menu_rel_1_3_1.full_clean
        )

        # Check that validation does not block normal usage (other order_num and item, same menu)
        menu_rel_1_2_1 = MenuRel(order_num=1, menu=self.menu_1, item=self.menu_item_2)
        self.assertEqual(menu_rel_1_2_1.full_clean(), None)

        # Check that validation is menu-specific (same order_num and item, different menu)
        menu_rel_2_2_0 = MenuRel(order_num=0, menu=self.menu_2, item=self.menu_item_2)
        self.assertEqual(menu_rel_2_2_0.full_clean(), None)


