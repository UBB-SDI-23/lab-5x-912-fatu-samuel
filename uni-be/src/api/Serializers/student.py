from rest_framework import serializers
from ..Models.student import Student
from ..Serializers.course import CourseSerializer
from .dynamic import DynamicFieldsModelSerializer
from django.contrib.auth.models import User

class StudentSerializer(DynamicFieldsModelSerializer):

    name = serializers.CharField(max_length = 128)
    cnp = serializers.IntegerField()
    date_of_birth = serializers.DateField()
    country = serializers.CharField(max_length = 64)
    mail_address = serializers.CharField(max_length = 128)
    phone_number = serializers.CharField(max_length = 10)
    courses = CourseSerializer(many = True, read_only = True)
    avg_fee = serializers.DecimalField(max_digits = 6, decimal_places = 2, read_only = True)
    courses_count = serializers.IntegerField(read_only = True)
    added_by = User()

    def validate_mail_address(self, value):
        if "@" not in value:
            raise serializers.ValidationError("Mail address must contain @")
        return value

    def validate_cnp(self, value):
        if len(f'{value}') != 13:
            raise serializers.ValidationError("CNP must contain 13 digits")
        return value

    class Meta:
        model = Student
        fields = "__all__"#('id', 'name', 'cnp', 'date_of_birth', 'mail_address', 'phone_number', 'country', 'county', 'city')
        
