from django import forms
from website import models


class ContentObjectsAdminForm(forms.ModelForm):
    class Meta:
        model = models.ContentObjectBase
        fields = ['name', 'component', 'db_type', 'order']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['image'] = forms.ImageField
        self.fields['text'] = forms.TextInput
        self.fields['page'] = forms.ModelChoiceField(queryset=models.ContentPage.objects.all())
        self.fields['menu'] = forms.ModelChoiceField(queryset=models.ContentMenu.objects.all())

    def get_fields(self):
        for db_type in models.content_objects.CONTENT_DB_TYPES.keys():
            if db_type == self.db_type:
                yield self[db_type]
