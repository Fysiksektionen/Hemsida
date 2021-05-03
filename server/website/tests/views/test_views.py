from django.urls import reverse
from rest_framework import status
from website.tests.views.generics import GenericModelGetTest, GenericModelPostTest
from website.models.pages import Page
from website.views.pages import PageSerializer
from website.models.content_objects import ContentText
from authentication.models.users import User

class PageTest(GenericModelGetTest):

    model_class = Page
    url = "http://127.0.0.1:8000/api/pages/"

    #TODO add setup method
    def setUp(self):

        a = Page(url="http://127.0.0.1:8000/a/", name="a", page_type="a", slug="a", content_sv=None)
        a.save()

        c = ContentText(containing_page_id=1)
        c.save()

        b = Page(url="http://127.0.0.1:8000/b/", name="b", page_type="b", slug="b", content_sv=c)
        b.save()

    def test_get_model(self):
        self._test_get_model()

class UserTest(GenericModelPostTest):
    model_class = User
    url="http://127.0.0.1:8000/api/users/"

    def test_post(self):
        self._test_post_model()