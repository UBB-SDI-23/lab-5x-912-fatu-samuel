from django.db import models



class Student(models.Model):
    name = models.CharField(max_length = 128)
    cnp = models.BigIntegerField()
    date_of_birth = models.DateField()
    country = models.CharField(max_length = 64)
    mail_address = models.CharField(max_length = 128)
    phone_number = models.CharField(max_length = 10)
    courses = models.ManyToManyField("Course", through = "StudentCourse")
    # added_by = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    class Meta:
        indexes = [
            models.Index(fields = ['id'], name = 'student_id_index'),
            models.Index(fields = ['name'], name = 'student_name_index'),
        ]

    def __str__(self):
        return f"{self.cnp} - {self.name} - {self.date_of_birth} - {self.country} - {self.mail_address} - {self.phone_number}"