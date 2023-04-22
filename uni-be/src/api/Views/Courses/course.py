import rest_framework.views as RestViews

from ...Models.course import Course
from ...Models.student_course import StudentCourse
from ...Serializers.course import CourseSerializer
from ...Serializers.student_course import StudentCourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses


class FullCourseView(RestViews.APIView):
    serializer_class = CourseSerializer    

    def get(self, request, id):
        try:
            objects = Course.objects.get(id = id)
        except Course.DoesNotExist:
            message = {"msg": f"{Course.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(objects, depth = 1)

        data = serializer.data
        data['teacher'] = data['teacher']['id']

        new_students = []

        for student in data['students']:
            extra_data = StudentCourse.objects.get(student = student['id'], course = id)
            student_course_serializer = StudentCourseSerializer(extra_data)
            new_students.append({
                'id': student['id'],
                'final_lab_score': student_course_serializer.data['final_lab_score'],
                'final_exam_score': student_course_serializer.data['final_exam_score']
            })
            
        data['students'] = new_students
        return RestReponses.Response(data, status = status.HTTP_200_OK)
    

    def update(self, request, id, partial = False):
        try:
            object = Course.objects.get(id = id)
        except Course.DoesNotExist:
            message = {"msg": f"{Course.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(object, data = request.data, partial = partial)

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
            object = Course.objects.get(id = id)
        except Course.DoesNotExist:
            message = {"msg": f"{Course.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        object.delete()
        return RestReponses.Response({"msg": f"{Course.__name__} with ID = `{id}` deleted"}, status = status.HTTP_200_OK)
    
    
        