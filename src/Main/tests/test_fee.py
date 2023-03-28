from rest_framework.test import APITestCase
from Main.Models.course import Course
from Main.Models.teacher import Teacher

class CourseFeeTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):

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

    def test_fee(self):
        response = self.client.get('/main/courses/fee/250/')
        courses = response.data

        self.assertEqual(len(courses), 3)

        self.assertEqual(courses[0]['fee'], 300)
        self.assertEqual(courses[1]['fee'], 400)
        self.assertEqual(courses[2]['fee'], 500)
        

        
        