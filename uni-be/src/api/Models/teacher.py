from django.db import models
from django.contrib.auth.models import User


class Teacher(models.Model):
    name = models.CharField(max_length = 128)
    cnp = models.BigIntegerField()
    date_of_birth = models.DateField()
    mail_address = models.CharField(max_length = 128)
    phone_number = models.CharField(max_length = 10)
    description = models.CharField(max_length = 5012, default = '-')
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    

    class Meta:
        indexes = [
            models.Index(fields = ['id'], name = 'teacher_id_index'),
            models.Index(fields = ['name'], name = 'teacher_name_index'),
            models.Index(fields = ['added_by'], name = 'teacher_added_by_index')
        ]

    def __str__(self):
        return f"{self.cnp} - {self.name} - {self.date_of_birth} - {self.mail_address} - {self.phone_number}"
    
    