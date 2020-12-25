from django.test import TestCase


class SomeTestCase(TestCase):
    def setUp(self):
        """Creation of objects"""
        pass

    def test_something(self):
        """Test things"""
        self.assertEqual(0, 1 - 1)
