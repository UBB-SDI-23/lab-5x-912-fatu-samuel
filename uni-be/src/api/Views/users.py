from django.db.models import Count
from rest_framework import generics
import rest_framework.views as RestViews

from api.Models.userprofile import UserProfile
from api.Serializers.userprofile import UserProfileSerializer
from api.Serializers.users import UserDetailSerializer, UsernameAndRoleSerializer
from rest_framework import status
import rest_framework.response as RestReponses

from api.pagination.DefaultPagination import DefaultPagination
from api.permissions import IsAdminOrReadOnly

class UserList(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UsernameAndRoleSerializer
    pagination_class = DefaultPagination


class UserDetailsView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all().annotate(
        student_count=Count("user__student", distinct=True),
        course_count=Count("user__course", distinct=True),
        teacher_count=Count("user__teacher", distinct=True),
    )
    serializer_class = UserDetailSerializer
    lookup_field = "id"
    

class UpdateUserRoleView(RestViews.APIView):
    permission_classes = [IsAdminOrReadOnly]

    def put(self, request, id):
        self.check_permissions(request)

        try:
            user = UserProfile.objects.get(id=id)
        except UserProfile.DoesNotExist:
            message = {"msg": f"{UserProfile.__name__} with ID = `{id}` does not exist!"}
            return RestReponses.Response(message, status=status.HTTP_404_NOT_FOUND)

        user.role = request.data['role']
        user.save()
        return RestReponses.Response({"message": "User role updated"}, status=status.HTTP_200_OK)
    