"""Specifications for the django admin panel"""

from authentication.models.users import User
from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm
from django.templatetags.static import static
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _


@admin.register(User)
class UserModelAdmin(admin.ModelAdmin):
    """Admin interface for the User model.

    Notable implementations:
        - Removes editing user permissions since other implementation of permission will be implemented later.
        - Removes seeing the password (even in hashed form), since it is unnecessary.
        - Displays the image in the list view.
        - Not all field in list is searchable and not all is filterable.
    """

    # Change view
    form = UserChangeForm  # Same behaviour as default form, better implementation => reduce approx 80 queries.
    fieldsets = (
        (_('profile'), {
            'fields': (
                'username',
                'email',
                ('first_name', 'last_name'),
                'kth_id',
                'user_type',
                'year',
                'image',
            )
        }),
        (_('advanced options'), {
            'classes': ('collapse',),
            'fields': (
                'language',
                'is_staff',
                'is_superuser',
                'groups',
            ),
        }),
    )

    # List view
    list_display = ('display_image', 'get_full_name', 'user_type', 'kth_id', 'year')
    list_display_links = ('display_image', 'get_full_name')

    list_filter = ('user_type', 'year')  # Not field without predefined choices
    search_fields = ('get_full_name', 'kth_id')  # Not field filtered on
    sortable_by = ('get_full_name', 'user_type', 'kth_id', 'year')  # Not image

    @staticmethod
    def display_image(obj):
        """Displays profile image in list view"""

        # Hard code 30x30 due to Django admin template list size.
        return format_html(
            '<img src=%s alt="Profile picture" width="30" height="30" />' %
            (obj.image.url if obj.image else static("images/users/default-profile.jpg"))
        )

