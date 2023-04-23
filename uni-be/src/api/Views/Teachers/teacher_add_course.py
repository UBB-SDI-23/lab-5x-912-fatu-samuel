import rest_framework.views as RestViews
from ...Models.teacher import Teacher
from django.db.models import Count
import rest_framework.response as RestReponses
from rest_framework import status
from ...Models.course import Course
from ...Serializers.teacher import TeacherSerializer
from ...Serializers.course import CourseSerializer


class TeacherCoursesAddView(RestViews.APIView):
    serializer_class = TeacherSerializer
    
    def post(self, request, id):
        try:
            teacher = Teacher.objects.get(id = id)
        except Teacher.DoesNotExist:
            message = {"msg": f"{Teacher.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        courses = request.data
        errors = ""
        for course_data in courses:
            course = None
            try:
                course = Course.objects.get(id = course_data['course_id'])
            except Course.DoesNotExist:
                errors += f"Course with ID = `{course_data['course_id']}` does not exist!"
                continue

            course.teacher = teacher
        
        teacher.save()
        
        if errors == "":
            errors = "Courses added"

        return RestReponses.Response({"message": errors}, status = status.HTTP_200_OK)
