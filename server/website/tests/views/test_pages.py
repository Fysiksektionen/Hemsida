from django.urls import reverse
from rest_framework import status
from website.tests.views.generics import GenericModelGetTest
from website.models.pages import Page
from website.views.pages import PageSerializer

class PageTest(GenericModelGetTest):

    def test_get_page(self):
        a = Page(url="2")
        a.save()
        b = Page( url="3")
        b.save()
        url = "http://127.0.0.1:8000/api/pages/" #TODO Try to get todo to work
        self._test_get_model(url, Page)
