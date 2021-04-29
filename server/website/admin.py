"""Specifications for the django admin panel"""

from adminsortable.admin import SortableTabularInline, SortableAdmin, TabularInline
from django.contrib import admin
from django.utils.text import capfirst
from django.utils.translation import gettext_lazy as _
from website.models import Menu, MenuItemBase, Page, PageDraft, Redirect, SiteModel, News, NewsDraft

from utils.admin import GuardedModelAdmin


admin.site.index_title = _('Admin page')
admin.site.site_header = _('The Physics Chapter - Administration')
admin.site.site_title = _('Site Management')


class PageDraftInline(TabularInline):
    model = PageDraft
    extra = 1
    fields = ('page_type', 'content_sv', 'content_en')


class NewsDraftInline(TabularInline):
    model = NewsDraft
    extra = 1
    fields = ('page_type', 'content_sv', 'content_en')


@admin.register(Page)
class PageModelAdmin(GuardedModelAdmin):
    list_display = ('name', 'slug', 'published', 'first_published_at','publish_time', 'unpublish_time')
    search_fields = ('name', 'url',)
    prepopulated_fields = {'slug': ('name',), }

    fieldsets = (
        (None, {
            'fields': ('name', 'url', 'slug', 'page_type', 'parent')
        }),
        (capfirst(_('content')), {
            'fields': ('content_sv', 'content_en')
        }),
        (capfirst(_('publication info')), {
            'fields': ('first_published_at', 'publish_time', 'unpublish_time')
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


@admin.register(Redirect)
class RedirectModelAdmin(admin.ModelAdmin):
    list_display = ('from_path', 'link', 'is_internal_page_link', 'page_name')
    search_fields = ('from_path', 'link')
    #list_select_related = True

    fieldsets = (
        (capfirst(_('from')), {
            'fields': ('from_path',)
        }),
        (capfirst(_('to')), {
            'fields': ('url', 'page'),
        })
    )

    def is_internal_page_link(self, obj):
        return obj.page is not None
    is_internal_page_link.boolean = True
    is_internal_page_link.short_description = capfirst(_('internal link'))

    def page_name(self, obj):
        return obj.page.name if obj.page is not None else ""
    page_name.short_description = capfirst(_('page name'))


@admin.register(SiteModel)
class SiteModelAdmin(admin.ModelAdmin):
    fieldsets = (
        (capfirst(_('URLs')), {
            'fields': ('root_url', 'api_root_url')
        }),
        (capfirst(_('page tree')), {
            'fields': ('root_page',),
        }),
        (capfirst(_('content')), {
            'fields': ('banner_content', 'footer_content'),
        })
    )

    def has_add_permission(self, request):
        """No one can add object"""
        return False

    def has_delete_permission(self, request, obj=None):
        """No one can remove object"""
        return False

@admin.register(News)
class NewsModelAdmin(admin.ModelAdmin):
    list_display = ('slug', 'published', 'first_published_at', 'publish_time', 'unpublish_time','author')
    search_fields = ('slug', 'url', 'author')
    fieldsets = (
        (None, {
            'fields': ('name', 'url', 'slug', 'page_type')
        }),
        (capfirst(_('content')), {
            'fields': ('content_sv', 'content_en')
        }),
        (capfirst(_('publication info')), {
            'fields': ('first_published_at', 'publish_time', 'unpublish_time', 'author')
        })
    )
    inlines = [
        NewsDraftInline
    ]