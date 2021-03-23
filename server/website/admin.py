"""Specifications for the django admin panel"""

from adminsortable.admin import SortableTabularInline, SortableAdmin, TabularInline
from django.apps import apps
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
    fk_name = 'collection'
    extra = 0
    fields = ('name', 'component', 'db_type', 'image', 'attributes')


class ContentTextInline(SortableTabularInline):
    model = ContentText
    fk_name = 'collection'
    extra = 0
    fields = ('name', 'component', 'db_type', 'text', 'attributes')


class ContentPageInline(SortableTabularInline):
    model = ContentPage
    fk_name = 'collection'
    extra = 0
    fields = ('name', 'component', 'db_type', 'page', 'attributes')


class ContentMenuInline(SortableTabularInline):
    model = ContentMenu
    fk_name = 'collection'
    extra = 0
    fields = ('name', 'component', 'db_type', 'menu', 'attributes')


@admin.register(ContentObjectBase)
class ContentObjectsAdmin(admin.ModelAdmin):
    model = ContentObjectBase
    list_display = ('id',)
    fields = ('name', 'component', 'db_type', 'order', 'attributes')



    def get_object(self, request, object_id, from_field=None):
        obj = super(ContentObjectsAdmin, self).get_object(request, object_id, from_field)
        model = apps.get_model(CONTENT_DB_TYPES[obj.db_type])
        return model.objects.get(id=object_id)

    def get_form(self, request, obj=None, **kwargs):
        print(kwargs['fields'])
        if obj is not None:
            self.model = type(obj)
        form = super().get_form(request, obj, **kwargs)
        if obj is not None:
            self.model = ContentObjectBase
        return form
    
    def save_form(self, request, form, change):
        return super(ContentObjectsAdmin, self).save_form(request, form, change)
    
    def save_model(self, request, obj, form, change):
        super(ContentObjectsAdmin, self).save_model(request, obj, form, change)
        if not change:
            model = apps.get_model(CONTENT_DB_TYPES[obj.db_type])
            sub_obj = model(contentobjectbase_ptr=obj)
            sub_obj.__dict__.update(obj.__dict__)
            sub_obj.save()

    def get_fields(self, request, obj=None):
        fields = list(super().get_fields(request, obj))
        if obj is not None and obj.db_type not in ['dict', 'list']:
            fields.append(obj.db_type)
        return fields

    def get_inlines(self, request, obj):
        """Add inlines if object is a ContentCollection"""
        if obj is not None and obj.db_type in ['dict', 'list']:
            inline_instances = [ContentImageInline, ContentTextInline, ContentPageInline, ContentMenuInline]
        else:
            inline_instances = []
        return inline_instances
