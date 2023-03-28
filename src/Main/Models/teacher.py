from django.db import models

class Teacher(models.Model):
    name = models.CharField(max_length = 128)
    cnp = models.IntegerField()
    date_of_birth = models.DateField()
    mail_address = models.CharField(max_length = 128)
    phone_number = models.CharField(max_length = 10)

    def __str__(self):
        return f"{self.cnp} - {self.name} - {self.date_of_birth} - {self.mail_address} - {self.phone_number}"