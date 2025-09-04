from django.db import models

# Create your models here.

class Doodle(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)