from rest_framework import status
from rest_framework.test import APITestCase


class GenericModelGetTestCase(APITestCase):
    """Simple test class for get view.
    To use, inherit from this class and specify model_class and url,
    create setUp method that sets up objects in the DB
    and create test method that calls _test_get_model
    """

    model_class = None
    url = ""

    def _test_get_model(self):
        """Tests simple behavior of a get view."""
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.model_class.objects.all().count(), len(response.json()))


class GenericModelPostAndSerializerTestCase(APITestCase):
    """Test class for post view and serializer.
    To use, inherit from this class and specify model_class and url,
    then explicitly call the wanted tests in the child class's tests
    """
    model_class = None
    serializer_class = None
    url = ""

    def post_view_and_serializer_test(self, tests):
        """Tests simple behavior of a post view and tests serializer based on the tests received."""
        self.post_view_test()
        self.serializer_test(tests)

    def post_view_test(self):
        """Tests simple behavior of a post view."""
        response = self.client.post(self.url, data=None)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def serializer_test(self, tests):
        """Tests a serializer based on the tests received."""
        for test in tests["valid_tests"]:
            ser = self.serializer_class(data=test["data"])
            self.assertEqual(ser.is_valid(), True)
            ser.save()
            model_object = self.model_class.objects.get(pk=ser.instance.id)
            for attr in test["data"]:
                self.assertEqual(test["data"][attr], getattr(model_object, attr))
            model_object.delete()

        for test in tests["invalid_tests"]:
            self._test_invalid_fields(test, test["code"])

        for test in tests["unique_tests"]:
            for data in test["setup"]:
                ser = self.serializer_class(data=data)
                self.assertEqual(ser.is_valid(), True)
                ser.save()
            self._test_invalid_fields(test, "unique")

    def _test_invalid_fields(self, test, code):
        """Tests that the test produces the expected error codes"""
        ser = self.serializer_class(data=test["data"])
        self.assertEqual(ser.is_valid(), False)
        self.assertEqual(len(ser.errors), len(test["invalid_fields"]))
        for invalid_attr in ser.errors:
            self.assertEqual(invalid_attr in test["invalid_fields"], True)
            for error in ser.errors[invalid_attr]:
                self.assertEqual(error.code, code)
