from django import forms
from django.contrib import admin
from django.forms import ModelForm
from django.template.loader import render_to_string

from trash import models
from trash.services.disco import DiscoService


def get_choices():
    all_tags = DiscoService().get_all_tags()
    created_tags = list(models.TrashTag.objects.all().values_list('name', flat=True))
    return [(item, item + (' (Already used)' if item in created_tags else '')) for item in all_tags]


class TrashTAgAdminForm(ModelForm):
    name = forms.ChoiceField(choices=get_choices)


class TrashTagAdmin(admin.TabularInline):
    model = models.TrashTag
    extra = 1
    form = TrashTAgAdminForm


class TrashTypeAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid', )
    inlines = [
        TrashTagAdmin,
    ]


class TrashAdmin(admin.ModelAdmin):
    def generate_qr(self, obj):
        return render_to_string(template_name='admin_qr_button.html', context={'obj': obj})

    list_display = ('__str__', 'generate_qr')


admin.site.register(models.TrashType, TrashTypeAdmin)
admin.site.register(models.Trash, TrashAdmin)
admin.site.register(models.User)
admin.site.register(models.WrongAnswer)
