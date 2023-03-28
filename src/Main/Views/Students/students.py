import rest_framework.views as RestViews
from ...Models.student import Student
from ...Serializers.student import StudentSerializer
from rest_framework import status
import rest_framework.response as RestReponses

class StudentsView(RestViews.APIView):
    serializer_class = StudentSerializer

    def get(self, request):
        objects = Student.objects.all()
        serializer = StudentSerializer(objects, many = True, exclude_fields = ['courses'])
        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)
    

    def post(self, request):
        serializer = StudentSerializer(data = request.data)
        
        if not serializer.is_valid():
            error_message = {}
            for error in serializer.errors:
                error_message[error] = f"{serializer.errors[error][0]}"

            return RestReponses.Response({"message": error_message}, status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return RestReponses.Response(serializer.data, status = status.HTTP_201_CREATED)
    