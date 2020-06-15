from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

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

    def _str_(self):
        return self.title