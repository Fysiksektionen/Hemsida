from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils.translation import gettext as _

from website.models.menus import MenuItem, Menu
from website.models.pages import Page


class MenuItemModelTest(TestCase):
    """Test the functionality of MenuItem model."""

    def setUp(self):
        """Creation of objects"""
        self.page = Page(url="https://f.kth.se")
        self.menu = Menu(name="Menu", page=self.page)

        self.page.save()
        self.menu.save()

        self.menu_item_page = MenuItem(name="1", page=self.page, menu=self.menu, order=0)
        self.menu_item_url = MenuItem(name="2", url="https://ths.kth.se", menu=self.menu, order=0)
        self.menu_item_both = MenuItem(name="3", page=self.page, url="https://ths.kth.se", menu=self.menu, order=0)
        self.menu_item_none = MenuItem(name="4", menu=self.menu, order=0)

        self.menu_item_no = MenuItem(page=self.page, menu=self.menu, order=0)
        self.menu_item_no_name = MenuItem(page=self.page, menu=self.menu, order=0)

    def test_link_property(self):
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
        try:
            self.menu_item_both.full_clean()
        except ValidationError as e:
            self.assertDictEqual(
                e.message_dict, {'__all__': [_('Url is ambiguous. Set either Page or Url on the MenuItem, not both.')]}
            )

        try:
            self.menu_item_no_order = MenuItem(name="No order", menu=self.menu)
            self.menu_item_no_order.full_clean()
        except ValidationError as e:
            self.assertDictEqual(
                e.message_dict, {'__all__': [_('Item can not have a parent menu but not have an order number.')]}
            )

        try:
            self.menu_item_no_menu = MenuItem(name="No menu", order=0)
            self.menu_item_no_menu.full_clean()
        except ValidationError as e:
            self.assertDictEqual(
                e.message_dict, {
                    '__all__': [_('Item can not have an order number but not have a parent menu.')],
                    'menu': [self.menu_item_no_menu._meta.get_field('menu').error_messages['blank']]
                }
            )
        try:
            self.menu_item_loose = MenuItem(name="Loose item")
            self.menu_item_loose.full_clean()
        except ValidationError as e:
            self.assertDictEqual(
                e.message_dict, {
                    'menu': [self.menu_item_loose._meta.get_field('menu').error_messages['blank']]
                }
            )

    def test_uniqueness_rules(self):
        """"""
        self.menu_item_saved = MenuItem(name="Saved", page=self.page, menu=self.menu, order=1)
        self.menu_item_saved.save()

        # Order <--> Menu
        try:
            self.menu_item_order_1 = MenuItem(name="Order 1", page=self.page, menu=self.menu, order=1)
            self.menu_item_order_1.full_clean()
        except ValidationError as e:
            print(e.message_dict)
            self.assertDictEqual(
                e.message_dict, {'__all__': ['Menu item base with this Meny och Ordning already exists.']}
            )

        # Name <--> Menu
        try:
            self.menu_item_saved_2 = MenuItem(name="Saved", page=self.page, menu=self.menu, order=0)
            self.menu_item_saved_2.full_clean()
        except ValidationError as e:
            print(e.message_dict)
            self.assertDictEqual(
                e.message_dict, {'__all__': ['Menu item base with this Meny och Namn already exists.']}
            )


class MenuModelTest(TestCase):
    """Test the functionality of Menu model."""

    def setUp(self):
        """Creation of objects"""
        pass

    def test_field_vailidation(self):
        """Tests Menu-specific field validation."""
        # Check that no parent menu is accepted
        self.menu_empty = Menu(name="Empty menu")
        self.assertEqual(self.menu_empty.full_clean(), None)
