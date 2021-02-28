from rest_framework.routers import DefaultRouter
from website.views.menus import MenuViewSet
from website.views.pages import PageViewSet

app_name = 'website'

# Routs/urls for menus and menu-items
menu_router = DefaultRouter()
menu_router.register(r'menus', MenuViewSet, basename='menu')  # menu-list
# Routs/urls for pages
page_router = DefaultRouter()
page_router.register(r'pages', PageViewSet, basename='page')  # page-list

# Url-patterns for website app.
urlpatterns = [
    *menu_router.urls,
    *page_router.urls
]
