from authentication.models import User, Group
from utils.tests import ValidationTestCase, create_test_user


class PermissionsTest(ValidationTestCase):
    """Test the functionality of permissions."""

    def setUp(self):
        """Creation of objects"""
        self.superuser: User = create_test_user(is_superuser=True)
        self.user: User = create_test_user()

        self.group: Group = Group(name="Grupp")
        self.group.save()

        self.user.groups.add(self.group)
        self.user.save()

    def test_standard_perms(self):
        """Tests that the standard permissions in Django work with our groups and users."""
        # Superusers always have permissions
        self.assertTrue(self.superuser.has_perm('authentication.add_user'))

        # Random user does not have permission
        self.assertFalse(self.user.has_perm('authentication.add_user'))

        # Adding permission
        self.user.add_model_perm('add_user', 'authentication', 'user', clear_cache=True)
        self.assertTrue(self.user.has_perm('authentication.add_user'))

        # Removing permission
        self.user.remove_model_perm('add_user', 'authentication', 'user', clear_cache=True)
        self.assertFalse(self.user.has_perm('authentication.add_user'))

        # Group permissions
        self.group.add_model_perm('change_user', 'authentication', 'user')
        self.user.evict_group_perms_cache()
        self.assertTrue(self.user.has_perm('authentication.change_user'))

    def test_object_perms(self):
        """Tests that the object specifik permissions work with our groups and users."""
        # Superusers always have permissions
        self.assertTrue(self.superuser.has_perm('authentication.change_user', self.user))

        # Random user does not have permission
        self.assertFalse(self.user.has_perm('authentication.change_user', self.user))

        # Adding permission
        self.user.add_obj_perm('change_user', self.user)
        self.assertTrue(self.user.has_perm('authentication.change_user', self.user))
        self.assertFalse(self.user.has_perm('authentication.change_user', self.superuser))

        # Removing permission
        self.user.del_obj_perm('change_user', self.user)
        self.assertFalse(self.user.has_perm('authentication.change_user', self.user))

        # Group permissions
        self.group.add_obj_perm('change_user', self.user)
        self.assertTrue(self.user.has_perm('authentication.change_user', self.user))

    def test_permission_edge_cases(self):
        """Tests removing non-existent and adding already added."""
        # Adding permission twice
        self.user.add_model_perm('add_user', 'authentication', 'user', clear_cache=True)
        self.user.add_model_perm('add_user', 'authentication', 'user', clear_cache=True)
        self.assertTrue(self.user.has_perm('authentication.add_user'))

        # Removing permission (also check that removing once is sufficient)
        self.user.remove_model_perm('add_user', 'authentication', 'user', clear_cache=True)
        self.assertFalse(self.user.has_perm('authentication.change_user', self.user))
        self.user.remove_model_perm('add_user', 'authentication', 'user', clear_cache=True)

        # Adding permission twice
        self.user.add_obj_perm('change_user', self.user)
        self.user.add_obj_perm('change_user', self.user)
        self.assertTrue(self.user.has_perm('authentication.change_user', self.user))

        # Removing permission (also check that removing once is sufficient)
        self.user.del_obj_perm('change_user', self.user)
        self.assertFalse(self.user.has_perm('authentication.change_user', self.user))
        self.user.del_obj_perm('change_user', self.user)
