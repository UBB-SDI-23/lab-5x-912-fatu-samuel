from rest_framework_simplejwt.views import TokenViewBase

from api.Serializers.Auth.login import MyTokenObtainPairSerializer

class LoginView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer