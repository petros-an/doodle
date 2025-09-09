import json
import uuid
from json import JSONDecodeError

from django import views
from django.conf import settings
from django.core.serializers.base import DeserializationError
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render
from django.core import serializers
from doodle.models import Doodle


# Create your views here.

class DoodleView(views.View):
    def post(self, request, doodle_id, *args, **kwargs) -> JsonResponse:

        doodle, created = Doodle.objects.get_or_create(
            id=doodle_id,
            defaults={
                'text': settings.DEFAULT_DOODLE_TEXT
            }
        )
        return JsonResponse(
            status=(201 if created else 200),
            data={
                'id': doodle_id,
                'text': doodle.text,
            }
        )

    def patch(self, request, doodle_id, *args, **kwargs) -> JsonResponse:
        body = request.body.decode("utf-8")

        try:
            data = json.loads(body)
        except JSONDecodeError:
            return JsonResponse(status=400, data={"error": "Invalid data format"})


        if not isinstance(data, dict):
            return JsonResponse(status=400, data={"error": "Invalid data format"})

        try:
            text = data["text"]
        except KeyError:
            return JsonResponse(status=400, data={"error": "Missing text field"})
        if not isinstance(text, str):
            return JsonResponse(status=400, data={"error": "Text must be a string"})

        doodle = Doodle.objects.get(id=doodle_id)
        if not doodle:
            return JsonResponse(status=404, data={"error": "Doodle not found"})

        doodle.text = text
        doodle.save()


        return JsonResponse(
            status=200,
            data={
                'id': doodle_id,
                'text': text,
            }
        )