import os

from authentication.models.users import User, _image_filename
from utils.tests import ValidationTestCase


class UserModelTest(ValidationTestCase):
    """Test the functionality of the User model."""

    def setUp(self):
        """Creation of objects"""
        self.user = User.objects.create_user(
            username="test",
            email="test@f.kth.se",
            user_type=User.UserType.ADMIN
        )
        self.user.set_unusable_password()
        self.user.save()

    def test_image_filename(self):
        """Tests the automatic filename method used in the image field of the User model."""
        for ext in ['jpg', 'png']:  # Check different extensions
            self.assertEqual(
                _image_filename(self.user, 'a_file_name.%s' % ext),
                os.path.join('users', '%d_profile.%s' % (self.user.id, ext))
            )
