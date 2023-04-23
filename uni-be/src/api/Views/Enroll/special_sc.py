import rest_framework.views as RestViews
from api.Models.course import Course
from api.Serializers.student import StudentSerializer
from api.Serializers.course import CourseSerializer

from api.pagination.DefaultPagination import DefaultPagination
from api.Models.student_course import StudentCourse
from api.Models.student import Student
from api.Serializers.student_course import StudentCourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class SpecificStudentCourseView(RestViews.APIView):
    serializer_class = StudentCourseSerializer
    pagination_class = DefaultPagination

    def get(self, request, id):

        try:
            object = StudentCourse.objects.get(id = id)
        except StudentCourse.DoesNotExist:
            message = {"msg": f"{StudentCourse.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = StudentCourseSerializer(object)
        data = serializer.data

        student = StudentSerializer(Student.objects.get(id = int(data["student"])), exclude_fields = ['courses']).data
        data["student"] = student

        course = CourseSerializer(Course.objects.get(id = int(data["course"])), exclude_fields = ['students']).data
        data["course"] = course  

        return RestReponses.Response(data, status = status.HTTP_200_OK)


    def update(self, request, id, partial = False):
        try:
            object = StudentCourse.objects.get(id = id)
        except StudentCourse.DoesNotExist:
            message = {"msg": f"{StudentCourse.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = StudentCourseSerializer(object, data = request.data, partial = partial)

        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)


    def put(self, request, id):
        return self.update(request, id)
    

    def patch(self, request, id):
        return self.update(request, id, partial = True)

    def delete(self, request, id):
        try:
            object = StudentCourse.objects.get(id = id)
        except StudentCourse.DoesNotExist:
            message = {"msg": f"{StudentCourse.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        object.delete()
        return RestReponses.Response({"msg": f"{StudentCourse.__name__} with ID = `{id}` deleted"}, status = status.HTTP_200_OK)
    