from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    first_name = models.CharField(max_length = 128)
    last_name = models.CharField(max_length = 128)
    date_of_birth = models.DateField()
    bio = models.CharField(max_length = 5012)
    location = models.CharField(max_length = 128)

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile", to_field="username"
    )

    activation_code = models.CharField(max_length=36)
    activation_expiry_date = models.DateTimeField()
    active = models.BooleanField()
    
    def __str__(self):
        return self.first_name + " " + self.last_name
    