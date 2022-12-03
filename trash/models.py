import json

import uuid as uuid

from colorfield.fields import ColorField
from django.db import models
from django.utils import timezone

from trash.services.city import CityService


class TrashType(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=50)
    color = ColorField(default='#FF0000')


class TrashTag(models.Model):
    name = models.CharField(max_length=50)
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


class TrashUsed(models.Model):
    time = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trash = models.ForeignKey(Trash, on_delete=models.SET_NULL, null=True)

    @classmethod
    def create_from_qr(cls, qr_code, id_card):
        try:
            data = json.load(qr_code)
            trash_uuid = data['uuid']
            trash = Trash.objects.get(uuid=trash_uuid)
            user = User.objects.get(id_card=id_card)
        except:
            return False
        CityService().send_signal_to_trash(trash)
        cls(user=user, trash=trash).save()
        return True


class WrongAnswer(models.Model):
    image = models.TextField()
    tag = models.CharField(max_length=100)
