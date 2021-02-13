from website.views.menus import menu_router

app_name = 'website'

urlpatterns = [
    *menu_router.urls,
]
