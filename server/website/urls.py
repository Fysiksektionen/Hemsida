from django.urls import path, include
from website.views.menus import menus_list, menu_object, menu_items_list, menu_items_object

app_name = 'website'

urlpatterns_menu_items =([
    path('', menu_items_list, name='list'),
    path('<int:pk>/', menu_items_object, name='object')
], 'items')

urlpatterns_menus = ([
    path('', menus_list, name='list'),
    path('<int:pk>/', menu_object, name='object'),
    path('items/', include(urlpatterns_menu_items, namespace=urlpatterns_menu_items[1]))
], 'menus')

urlpatterns = [
    path('menus/', include(urlpatterns_menus, namespace=urlpatterns_menus[1]))
]
