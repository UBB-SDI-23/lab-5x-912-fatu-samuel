from django.db import models


class Student(models.Model):
    name = models.CharField(max_length = 128)
    cnp = models.BigIntegerField()
    date_of_birth = models.DateField()
    country = models.CharField(max_length = 64)
    mail_address = models.CharField(max_length = 128)
    phone_number = models.CharField(max_length = 10)
    courses = models.ManyToManyField("Course", through = "StudentCourse")
        
    def __str__(self):
        return f"{self.cnp} - {self.name} - {self.date_of_birth} - {self.country} - {self.mail_address} - {self.phone_number}"