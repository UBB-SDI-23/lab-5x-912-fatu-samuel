from django.db import models

class StudentCourse(models.Model):

    student = models.ForeignKey('Student', on_delete = models.CASCADE)
    course = models.ForeignKey('Course', on_delete = models.CASCADE)
    final_lab_score = models.DecimalField(max_digits = 4, decimal_places = 2, default = 0)
    final_exam_score = models.DecimalField(max_digits = 4, decimal_places = 2, default = 0)

    def __str__(self):
        return f"{self.student} - {self.course} - {self.final_lab_score} - {self.final_exam_score}" 

