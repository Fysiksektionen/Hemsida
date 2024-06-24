from website.tests.views.generics import GenericModelGetTestCase, GenericModelPostAndSerializerTestCase
from website.models.pages import Page
from website.models.content_objects import ContentText
from website.views.pages import PageSerializer
from website.tests.views.test_data.example_tests_page import tests


class PageGetTest(GenericModelGetTestCase):
    """Tests functionality of the Page Get View"""
    model_class = Page
    url = "http://127.0.0.1:8000/api/pages/"

    def setUp(self):
        """Creates items in the DB to get"""
        a = Page(url="http://127.0.0.1:8000/a/", name="a", page_type="a", slug="a", content_sv=None)
        a.save()

        c = ContentText(containing_page_id=1)
        c.save()

        b = Page(url="http://127.0.0.1:8000/b/", name="b", page_type="b", slug="b", content_sv=c)
        b.save()

    def test_get_model(self):
        """Tests if the get view behaves correctly"""
        self._test_get_model()


class PagePostTest(GenericModelPostAndSerializerTestCase):
    """Tests functionality of the Page Post View and PageSerializer"""
    model_class = Page
    url = "http://127.0.0.1:8000/api/users/"  #Använder user viewen då page inte har nån post view
    serializer_class = PageSerializer

    def test_post(self):
        """Tests if the post view behaves correctly"""
        self.post_view_and_serializer_test(tests)
