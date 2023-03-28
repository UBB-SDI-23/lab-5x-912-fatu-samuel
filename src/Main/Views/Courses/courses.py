import rest_framework.views as RestViews
from ...Models.course import Course
from ...Serializers.course import CourseSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class CoursesView(RestViews.APIView):
    serializer_class = CourseSerializer

    def get(self, request):
        objects = Course.objects.all()
        serializer = CourseSerializer(objects, many = True, exclude_fields = ['students'])
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
    
    
    def post(self, request):
        serializer = CourseSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    