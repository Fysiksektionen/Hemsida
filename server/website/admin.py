"""Specifications for the django admin panel"""

from adminsortable.admin import SortableTabularInline, SortableAdmin, TabularInline
from django.contrib import admin
from django.utils.text import capfirst
from django.utils.translation import gettext_lazy as _

from website.models.menus import Menu, MenuItemBase
from website.models.pages import Page, PageDraft
from utils.admin import GuardedModelAdmin


admin.site.index_title = _('Admin page')
admin.site.site_header = _('The Physics Chapter - Administration')
admin.site.site_title = _('Site Management')


class PageDraftInline(TabularInline):
    model = PageDraft
    extra = 1
    fields = ('page_type', 'content_sv', 'content_en')


@admin.register(Page)
class PageModelAdmin(GuardedModelAdmin):
    list_display = ('name', 'slug', 'published', 'published_at', 'last_edited_at')
    search_fields = ('name', 'url',)
    prepopulated_fields = {'slug': ('name',), }

    fieldsets = (
        (None, {
            'fields': ('name', 'url', 'slug', 'page_type', 'parent')
        }),
        (capfirst(_('content')), {
            'fields': ('content_sv', 'content_en')
        }),
    )
    inlines = [
        PageDraftInline
    ]


class MenuItemInline(SortableTabularInline):
    model = MenuItemBase
    extra = 0
    fields = ('name', 'url', 'page', 'is_menu')


@admin.register(Menu)
class MenuModelAdmin(GuardedModelAdmin):
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
