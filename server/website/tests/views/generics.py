from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class GenericModelGetTest(APITestCase):
    """Simple test class for get view
    To use inherit from this class that specifies model_class and url,
    create setUp method that sets up a few objects in the DB
    and create test method that calls _test_get_model
    """

    model_class = None
    url = ""

    def _test_get_model(self):
        """Tests simple behavior of a get view needs to be called expicitly as
         otherwise url and model_class and url wont initialize correctly"""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.model_class.objects.all().count(), len(response.json()))


class GenericModelPostTest(APITestCase):
    # TODO implment test for saving ok data
    # TODO implement test for saving wrong data
    model_class = None
    serializer_class = None
    url = ""
    json_data_url = ""

    def _test_post_model(self):
        response = self.client.post(self.url, data=None)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

