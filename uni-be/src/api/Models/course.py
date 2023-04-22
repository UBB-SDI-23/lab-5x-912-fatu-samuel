from django.db import models


class Course(models.Model):
    name = models.CharField(max_length = 128)
    description = models.CharField(max_length = 512)
    teacher = models.ForeignKey('Teacher', on_delete = models.CASCADE, related_name = "courses")
    students = models.ManyToManyField('Student', through = 'StudentCourse')
    fee = models.IntegerField()
    size = models.IntegerField()


    class Meta:
        indexes = [
            models.Index(fields = ['teacher'], name = 'course_teacher_index'),
            models.Index(fields = ['id'], name = 'course_id_index')
        ]

    def __str__(self):
        return f"{self.name} - {self.description} - {self.teacher} - {self.fee} - {self.size}"