from rest_framework_simplejwt.serializers import RefreshToken, TokenObtainPairSerializer

from api.Models.userprofile import UserProfile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        user = UserProfile.objects.get(user_id = self.user.username)

        refresh["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "bio": user.bio,
            "date_of_birth": f'{user.date_of_birth}',
            "location": user.location,
            "role": user.role,
            # changed
            "page_size": user.page_size
        } 

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data