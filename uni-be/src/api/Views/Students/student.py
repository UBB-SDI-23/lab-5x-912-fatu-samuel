import rest_framework.views as RestViews

from api.Models.course import Course
from api.Serializers.course import CourseSerializer
from api.permissions import HasEditPermissionOrReadOnly
from ...Models.student import Student
from ...Models.student_course import StudentCourse
from ...Serializers.student import StudentSerializer
from ...Serializers.student_course import StudentCourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class StudentView(RestViews.APIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, HasEditPermissionOrReadOnly]
    
    def get(self, request, id):
        try:
            object = Student.objects.get(id = id)
        except Student.DoesNotExist:
            message = {"msg": f"{Student.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = StudentSerializer(object, depth = 1)
        data = serializer.data

        new_courses = []

        for course in data['courses'][:10]:
            extra_data = Course.objects.get(id = course['id'])
            course_data = CourseSerializer(extra_data).data

            new_courses.append({
                'id': course['id'],
                'name': course_data['name']
            })

        data['courses'] = new_courses
        return RestReponses.Response(data, status = status.HTTP_200_OK)
    

    def update(self, request, id, partial = False):
        try:
            object = Student.objects.get(id = id)
        except Student.DoesNotExist:
            message = {"msg": f"{Student.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = StudentSerializer(object, data = request.data, partial = partial, exclude_fields = ['courses'])

        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)


    def put(self, request, id):
        self.check_permissions(request)
        return self.update(request, id)
    

    def patch(self, request, id):
        self.check_permissions(request)
        return self.update(request, id, partial = True)
    

    def delete(self, request, id):
        self.check_permissions(request)
        try:
            object = Student.objects.get(id = id)
        except Student.DoesNotExist:
            message = {"msg": f"{Student.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        object.delete()
        return RestReponses.Response({"msg": f"{Student.__name__} with ID = `{id}` deleted"}, status = status.HTTP_200_OK)
    
    
        