from django.urls import path
from rest_framework.routers import DefaultRouter

from website.views.content_objects import ContentObjectsViewSet
from website.views.general import PathResolveView
from website.views.menus import MenuViewSet
from website.views.pages import PageViewSet
from website.views.redirects import RedirectViewSet
from website.views.site import SiteView

app_name = 'website'

# Routs/urls for menus and menu-items
router = DefaultRouter()
router.register(r'menus', MenuViewSet, basename='menu')
router.register(r'redirects', RedirectViewSet, basename='redirect')
router.register(r'pages', PageViewSet, basename='page')
router.register(r'content-objects', ContentObjectsViewSet, basename='content-object')

# Url-patterns for website app.
urlpatterns = [
    *router.urls,
    path('site/', SiteView.as_view(), name="site"),
    path('resolve-url/', PathResolveView.as_view(), name="resolve_url")
]