import os

from authentication.models.groups import Group, _image_filename
from utils.tests import ValidationTestCase


class GroupModelTest(ValidationTestCase):
    """Test the functionality of the Group model."""

    def setUp(self):
        """Creation of objects"""
        self.group = Group(
            name="test",
        )
        self.group.save()

    def test_image_filename(self):
        """Tests the automatic filename method used in the image field of the User model."""
        for ext in ['jpg', 'png']:  # Check different extensions
            self.assertEqual(
                _image_filename(self.group, 'a_file_name.%s' % ext),
                os.path.join('groups', '%d_group_image.%s' % (self.group.id, ext))
            )

