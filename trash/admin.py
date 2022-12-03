from django.contrib import admin

from trash import models


class TrashTagAdmin(admin.TabularInline):
    model = models.TrashTag


class TrashTypeAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid', )
    inlines = [
        TrashTagAdmin,
    ]


admin.site.register(models.TrashType, TrashTypeAdmin)
admin.site.register(models.Trash)
admin.site.register(models.User)
admin.site.register(models.WrongAnswer)
