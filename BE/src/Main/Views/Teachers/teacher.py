from rest_framework import status
import rest_framework.response as RestReponses
import rest_framework.views as RestViews
from ...Models.teacher import Teacher
from ...Serializers.teacher import TeacherSerializer


class FullTeacherView(RestViews.APIView):
    serializer_class = TeacherSerializer

    def get(self, request, id):
        try:
            object = Teacher.objects.get(id = id)
        except Teacher.DoesNotExist:
            message = {"msg": f"Teacher with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = TeacherSerializer(object, depth = 1)
        for course in serializer.data['courses']:
            del course['students']
            del course['teacher']

        return RestReponses.Response(serializer.data, status = status.HTTP_200_OK)


    def update(self, request, id, partial = False):
        try:
            object = Teacher.objects.get(id = id)
        except Teacher.DoesNotExist:
            message = {"msg": f"{Teacher.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        serializer = TeacherSerializer(object, data = request.data, partial = partial)

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
            object = Teacher.objects.get(id = id)
        except Teacher.DoesNotExist:
            message = {"msg": f"{Teacher.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status = status.HTTP_404_NOT_FOUND)

        object.delete()
        return RestReponses.Response({"msg": f"{Teacher.__name__} with ID = `{id}` deleted"}, status = status.HTTP_200_OK)
          
    
        