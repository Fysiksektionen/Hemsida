from django.test import TestCase
from website.models.abstract_singleton import SingletonModel
from website.models.pages import Page
from website.models.site import SiteModel


class SiteModelTest(TestCase):

    def setUp(self):
        # create object
        page = Page(name="page", url='f.kth.se')
        page.save()
        self.page = page
        site = SiteModel((1), root_page=page) # Do not initialize this way!
            # ^^^^ if this doesn't work that means the coresponding migration will also not work!
        site.root_url = "http://svt.se"
        site.save()
        # reset to simulate restart
        SiteModel._cached_instance = None # Do not change _cached_instance
        #print("=Setup completed=")

    def test_singleton_database_initalization(self):
        # check that the database has 1 instance, and every instance returned is the same.
        self.assertTrue(SiteModel.objects.get(pk=SiteModel._singleton_pk) is SiteModel.objects.get(pk=SiteModel._singleton_pk))
        self.assertEqual(len(SiteModel.objects.all()), 1)
        self.assertNotEqual(SiteModel.objects.get(pk=SiteModel._singleton_pk), None)

    def test_singleton_behaviour(self):
        # Check that you cannot initalize it again
        with self.assertRaises(TypeError):
            site = SiteModel(root_page=self.page)
        with self.assertRaises(TypeError):
            SiteModel._cached_instance = None # do not do this
            site = SiteModel(root_page=self.page)

        # Check that the instance function works
        site = SiteModel.instance()
        self.assertTrue(isinstance(site, SiteModel))
        self.assertNotEqual(site, None)
        self.assertNotEqual(None, SiteModel.instance())
        self.assertEqual(site, SiteModel.instance())
        self.assertEqual(SiteModel.instance(), SiteModel.instance())
        self.assertNotEqual(SingletonModel._cached_instance, SiteModel.instance())

        # check string function works
        site.__str__()

        # check save
        site.save()
