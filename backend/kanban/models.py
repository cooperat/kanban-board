from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    STATUS = (
        ('t', 'todo'),
        ('p', 'in process'),
        ('b', 'blocked'),
        ('d', 'done'),
    )
    status = models.CharField(
        max_length=1,
        choices=STATUS,
        blank=True,
        default='t',
        help_text='Task status',
    )

    due_date = models.DateField(null=True, blank=True)

    def _str_(self):
        return self.title
