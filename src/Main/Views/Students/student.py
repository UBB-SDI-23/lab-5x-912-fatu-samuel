import rest_framework.views as RestViews
from ...Models.student import Student
from ...Models.student_course import StudentCourse
from ...Serializers.student import StudentSerializer
from ...Serializers.student_course import StudentCourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class StudentView(RestViews.APIView):
    serializer_class = StudentSerializer
    
    def get(self, request, id):
        try:
            object = Student.objects.get(id = id)
        except Student.DoesNotExist:
            message = {"msg": f"{Student.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = StudentSerializer(object, depth = 1)
        data = serializer.data

        student_course_data = StudentCourseSerializer(StudentCourse.objects.all(), many = True).data
        print(data)
        new_courses = []

        for course in data['courses']:
            print(course['id'])
            print(student_course_data[course['id']])
            new_courses.append({
                'id': course['id'],
                'enrollment_date': student_course_data[course['id']]['enrollment_date'],
                'final_exam_score': student_course_data[course['id']]['final_exam_score']
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
        return self.update(request, id)
    

    def patch(self, request, id):
        return self.update(request, id, partial = True)
    

    def delete(self, request, id):
        try:
            object = Student.objects.get(id = id)
        except Student.DoesNotExist:
            message = {"msg": f"{Student.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        object.delete()
        return RestReponses.Response({"msg": f"{Student.__name__} with ID = `{id}` deleted"}, status = status.HTTP_200_OK)
    
    
        