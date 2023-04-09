from rest_framework.test import APITestCase
from Main.Models.student import Student
from Main.Models.course import Course
from Main.Models.teacher import Teacher
from django.db.models import Avg

class StudentAvgFeeTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        for i in range(1, 11):
            Student.objects.create(
                name = f"student-{i}",
                mail_address = f"student.{i}@gmail.com",
                cnp = f"123456789012{i}",
                date_of_birth = "2000-01-01",
                country = "Romania",
                phone_number = "1234567890"
            )

        for i in range(1, 6):
            Teacher.objects.create(
                name = f"teacher-{i}",
                mail_address = f"teacher.{i}@gmail.com",
                cnp = f"123456789012{i}",
                date_of_birth = "2000-01-01",
                phone_number = "1234567890"
            )


        for i in range(1, 6):
            Course.objects.create(
                name = f"Course-{i}",
                description = f"Description-{i}",
                fee = 100 * i,
                size = 200,
                teacher = Teacher.objects.get(id = f'{i}')
            )

        for i in range(1, 11):
            Student.objects.get(id = f'{i}').courses.add(Course.objects.get(id = f'{(i % 5) + 1}'))
            Student.objects.get(id = f'{i}').courses.add(Course.objects.get(id = f'{(i % 4) + 1}'))

    
    def test_avg_fee(self):
        
        response = self.client.get('/main/students/avg-fee/')
        students = response.data
        
        self.assertEqual(len(students), 10)

        self.assertEqual(float(students[0]['avg_fee']), 400)
        self.assertEqual(float(students[1]['avg_fee']), 350)
        self.assertEqual(float(students[2]['avg_fee']), 350)
        self.assertEqual(float(students[9]['avg_fee']), 150)

        
        