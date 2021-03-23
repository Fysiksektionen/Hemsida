"""Specifications for the django admin panel"""

from adminsortable.admin import SortableTabularInline, SortableAdmin, TabularInline
from django.contrib import admin
from django.contrib.admin.utils import flatten_fieldsets
from django.utils.text import capfirst
from django.utils.translation import gettext_lazy as _
from website.models import *

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


class ContentImageInline(SortableTabularInline):
    model = ContentImage
    fields = ('name', 'component', 'db_type', 'image', 'attributes')


class ContentTextInline(SortableTabularInline):
    model = ContentText
    fields = ('name', 'component', 'db_type', 'text', 'attributes')


class ContentPageInline(SortableTabularInline):
    model = ContentPage
    fields = ('name', 'component', 'db_type', 'page', 'attributes')


class ContentMenuInline(SortableTabularInline):
    model = ContentMenu
    fields = ('name', 'component', 'db_type', 'menu', 'attributes')


@admin.register(ContentObjectBase)
class ContentObjectsAdmin(admin.ModelAdmin):
    model = ContentObjectBase
    fieldsets = (
        (None, {
            'fields': ('name', 'component', 'db_type', 'order')
        })
    )

    inlines = [ContentImageInline, ContentTextInline, ContentPageInline, ContentMenuInline]

    def get_form(self, request, obj=None, **kwargs):
        kwargs['fields'] = flatten_fieldsets(self.fieldsets)
        return super().get_form(request, obj, **kwargs)

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)
        new_fieldsets = list(fieldsets)
        for db_type in content_objects.CONTENT_DB_TYPES.keys():
            if db_type == obj.db_type:
                new_fieldsets.append((capfirst(_('content')), {'fields': (db_type,)}))
        return new_fieldsets

    def get_inline_instances(self, request, obj=None):
        """Add inlines if object is a ContentCollection"""
        if obj.db_type == 'dict' or 'list':
            inline_instances = self.inlines
        else:
            inline_instances = None
        return inline_instances
