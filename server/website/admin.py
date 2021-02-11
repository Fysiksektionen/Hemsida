"""Specifications for the django admin panel"""

from adminsortable.admin import SortableTabularInline, SortableAdmin
from django.contrib import admin
from django.utils.text import capfirst
from django.utils.translation import gettext_lazy as _
from website.models.menus import Menu, MenuItemBase
from website.models.pages import Page

admin.site.index_title = _('Admin page')
admin.site.site_header = _('The Physics Chapter - Administration')
admin.site.site_title = _('Site Management')


@admin.register(Page)
class PageModelAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'url')
    search_fields = ('url',)

    fields = ('url',)


class MenuItemInline(SortableTabularInline):
    model = MenuItemBase
    extra = 0
    fields = ('name', 'url', 'page', 'is_menu')


@admin.register(Menu)
class MenuModelAdmin(SortableAdmin):
    list_display = ('name', 'link', 'is_sub_menu', 'num_of_items')
    search_fields = ('name', 'link')
    list_select_related = True

    fieldsets = (
        (capfirst(_('about')), {
            'fields': ('name',)
        }),
        (capfirst(_('link')), {
            'fields': ('url', 'page'),
        })
    )

    inlines = [
        MenuItemInline
    ]

    def get_queryset(self, request):
        return Menu.objects.all()

    def is_sub_menu(self, obj):
        return obj.menu is not None
    is_sub_menu.boolean = True
    is_sub_menu.short_description = capfirst(_('is sub menu'))

    def num_of_items(self, obj):
        return obj.items.count()
    num_of_items.short_description = capfirst(_('number of items'))
