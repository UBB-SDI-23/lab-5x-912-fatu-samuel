import rest_framework.views as RestViews
from api.Models.teacher import Teacher
from api.Serializers.teacher import TeacherSerializer

from django.db.models import Count

from api.helpers.consants import PAGE_SIZE
from ...Models.course import Course
from ...Serializers.course import CourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class CoursesView(RestViews.APIView):
    serializer_class = CourseSerializer

    def get(self, request):
        page = int(request.GET.get('page', 1))

        objects = Course.objects.filter(
            id__gte = page * PAGE_SIZE - 9,
            id__lte = page * PAGE_SIZE
        ).annotate(
            students_count = Count('students')
        )

        serializer = CourseSerializer(objects, many = True, exclude_fields = ['students'], depth = 1)

        # check if the serializer contains the actual teacher or only the id
        # if the teacher is not in the serializer, then add it
        for course in serializer.data:
            if type(course['teacher']) == int:
                course['teacher'] = TeacherSerializer(Teacher.objects.get(id = course['teacher'])).data

        data = {
            'count': Course.objects.count(),
            'next': True if (page * PAGE_SIZE < Course.objects.count()) else None,
            'previous': True if (page > 1) else None,
            'results': serializer.data
        }

        return RestReponses.Response(data, status = status.HTTP_200_OK)  
    
    
    def post(self, request):
        serializer = CourseSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    