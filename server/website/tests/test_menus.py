from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

from website.models.menus import MenuItem, Menu, MenuItemBase
from website.models.pages import Page
from .utils import ValidationTestCase


class MenuItemModelTest(ValidationTestCase):
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
            "Link is ambiguous, both 'page' and 'url' is set.",
            MenuItem.link.__get__,
            self.menu_item_both
        )
        self.assertEqual(self.menu_item_none.link, "")

    def test_field_validation(self):
        """Tests the validation and check that the correct error is thrown."""

        # Check normal behaviour
        self.assertEqual(self.menu_item_none.full_clean(), None)

        # Ambiguous url
        self.assertRaisesValidationError(
            err=ValidationError(
                _("Link is ambiguous. Set either %(page_field_name)s or %(url_field_name)s, not both."),
                params={'page_field_name': _('page'), 'url_field_name': _('url')}
            ),
            field=None,
            exclusive=True,
            func=self.menu_item_both.full_clean
        )

        # MenuItem with no order
        self.menu_item_no_order = MenuItem(name="No order", menu=self.menu)
        self.assertRaisesValidationError(
            err=self.menu_item_no_order._meta.get_field('order').error_messages['blank'],
            field='order',
            exclusive=True,
            func=self.menu_item_no_order.full_clean
        )

        # MenuItem with no menu
        self.menu_item_no_menu = MenuItem(name="No menu", order=0)
        self.assertRaisesValidationError(
            err=self.menu_item_no_menu._meta.get_field('menu').error_messages['blank'],
            field='menu',
            exclusive=True,
            func=self.menu_item_no_menu.full_clean
        )

        # Adding non-menu as menu
        self.menu_item_non_menu_menu = MenuItem(name="Non menu as menu", order=0, menu=self.menu_item_page)
        self.assertRaisesValidationError(
            err=ValidationError(
                _('%(menu_field_name)s field must relate to a %(menu_model_name)s object.'),
                params={'menu_field_name': _('menu'), 'menu_model_name': _('menu')}
            ),
            field='menu',
            exclusive=True,
            func=self.menu_item_non_menu_menu.full_clean
        )


def test_uniqueness_rules(self):
    """Tests uniqueness rules."""
    self.menu_item_saved = MenuItem(name="Saved", page=self.page, menu=self.menu, order=1)
    self.menu_item_saved.save()

    # Order <--> Menu
    self.menu_item_order_1 = MenuItem(name="Order 1", page=self.page, menu=self.menu, order=1)
    self.assertRaisesValidationError(
        err=self.menu_item_order_1.unique_error_message(MenuItemBase, ('menu', 'order')),
        field=None,
        exclusive=True,
        func=self.menu_item_order_1.full_clean
    )

    # Name <--> Menu
    self.menu_item_saved_2 = MenuItem(name="Saved", page=self.page, menu=self.menu, order=0)
    self.assertRaisesValidationError(
        err=self.menu_item_saved_2.unique_error_message(MenuItemBase, ('menu', 'name')),
        field=None,
        exclusive=True,
        func=self.menu_item_saved_2.full_clean
    )


class MenuModelTest(ValidationTestCase):
    """Test the functionality of Menu model."""

    def setUp(self):
        """Creation of objects"""
        self.page = Page(url="https://f.kth.se")
        self.menu = Menu(name="Menu", page=self.page)

        self.page.save()
        self.menu.save()

    def test_field_vailidation(self):
        """Tests Menu-specific field validation."""
        # Check that no parent menu is accepted
        self.assertEqual(self.menu.full_clean(), None)

        self.menu_child_no_order = Menu(name="No order child menu", menu=self.menu)
        self.assertRaisesValidationError(
            err=self.menu_child_no_order._meta.get_field('order').error_messages['blank'],
            field='order',
            exclusive=True,
            func=self.menu_child_no_order.full_clean
        )

        # Linking to itself (python objects)
        self.menu_link_to_itself = Menu(name="Menu linking to itself", order=0)
        self.menu_link_to_itself.menu = self.menu_link_to_itself
        self.assertRaisesValidationError(
            err=ValidationError(
                _('%(menu_model_name)s relates to itself.'),
                params={'menu_model_name': _('menu')}
            ),
            field='menu',
            exclusive=True,
            func=self.menu_link_to_itself.full_clean
        )

        # Linking to itself (same db-object)
        self.menu_link_to_itself.menu = None
        self.menu_link_to_itself.save()

        same_item = MenuItemBase.objects.get(pk=self.menu_link_to_itself.pk)  # Same in db, not same in python
        self.menu_link_to_itself.menu = same_item

        self.assertRaisesValidationError(
            err=ValidationError(
                _('%(menu_model_name)s relates to itself.'),
                params={'menu_model_name': _('menu')}
            ),
            field='menu',
            exclusive=True,
            func=self.menu_link_to_itself.full_clean
        )

    def test_uniqueness_rules(self):
        self.menu_item_saved = MenuItem(name="Saved", page=self.page, menu=self.menu, order=1)
        self.menu_item_saved.save()

        # Order <--> Menu
        self.menu_order_1 = MenuItem(name="Order 1", page=self.page, menu=self.menu, order=1)
        self.assertRaisesValidationError(
            err=self.menu_order_1.unique_error_message(MenuItemBase, ('menu', 'order')),
            field=None,
            exclusive=True,
            func=self.menu_order_1.full_clean
        )

        # Name <--> Menu
        self.menu_saved_2 = Menu(name="Saved", page=self.page, menu=self.menu, order=0)
        self.assertRaisesValidationError(
            err=self.menu_saved_2.unique_error_message(MenuItemBase, ('menu', 'name')),
            field=None,
            exclusive=True,
            func=self.menu_saved_2.full_clean
        )
