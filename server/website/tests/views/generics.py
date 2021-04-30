from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class GenericModelGetTest(APITestCase):


   def _test_get_model(self, url, model_class):
       response = self.client.get(url)

       self.assertEqual(response.status_code, status.HTTP_200_OK)
       self.assertEqual(model_class.objects.all().count(), len(response.json()))