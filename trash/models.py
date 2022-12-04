import json

import uuid as uuid

from colorfield.fields import ColorField
from django.db import models
from django.utils import timezone

from trash.services.city import CityService
from trash.services.disco import DiscoService


class TrashType(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=50)
    color = ColorField(default='#FF0000')

    def __str__(self):
        return self.name

    def get_uuid(self):
        return str(self.uuid)


def get_tags_choices():
    return [(item, item) for item in DiscoService().get_all_tags()]


class TrashTag(models.Model):
    name = models.CharField(max_length=50, unique=True, choices=get_tags_choices())
    trash_type = models.ForeignKey(TrashType, on_delete=models.CASCADE)


class Trash(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    uuid = models.UUIDField(default=uuid.uuid4)
    type = models.ForeignKey(TrashType, on_delete=models.CASCADE)

    def get_uuid(self):
        return str(self.uuid)


class User(models.Model):
    id_card = models.CharField(max_length=20, unique=True)
    serial_number = models.CharField(max_length=50, unique=True)


class TrashUsed(models.Model):
    time = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trash = models.ForeignKey(Trash, on_delete=models.SET_NULL, null=True)

    @classmethod
    def create_from_qr(cls, qr_code, user):
        try:
            data = json.loads(qr_code)
            trash_uuid = data['uuid']
            trash = Trash.objects.get(uuid=trash_uuid)
            if trash.type.get_uuid() != data['type']:
                return 'Incorrect type'
        except (json.JSONDecodeError, KeyError, Trash.DoesNotExist):
            return 'QR not valid'
        CityService().send_signal_to_trash(trash)
        cls(user=user, trash=trash).save()
        return False


class WrongAnswer(models.Model):
    image = models.TextField()
    tag = models.CharField(max_length=100)
