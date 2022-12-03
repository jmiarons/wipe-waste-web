import json

import uuid as uuid
from django.db import models
from django.utils import timezone


class TrashType(models.Model):
    color = models.CharField(max_length=10)
    tags_data = models.TextField()

    @property
    def tags(self) -> list:
        return json.load(self.tags_data)

    @tags.setter
    def tags_setter(self, value: list):
        self.tags_data = json.dumps(value)


class Trash(models.Model):
    coordinates = models.CharField(max_length=100)
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
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    ongoing = models.BooleanField()


class WrongAnswers(models.Model):
    image = models.TextField()
    tag = models.CharField(max_length=100)
