from rest_framework import serializers
from ..Models.teacher import Teacher
from ..Serializers.course import CourseSerializer  
from .dynamic import DynamicFieldsModelSerializer

class TeacherSerializer(DynamicFieldsModelSerializer):
    name = serializers.CharField(max_length = 128)
    cnp = serializers.IntegerField()
    date_of_birth = serializers.DateField()
    mail_address = serializers.CharField(max_length = 128)
    phone_number = serializers.CharField(max_length = 10)
    courses = CourseSerializer(many = True, read_only = True)
    count_courses = serializers.IntegerField(read_only = True)

    def validate_mail_address(self, value):
        if "@" not in value:
            raise serializers.ValidationError("Mail address must contain @")
        return value

    class Meta:
        model = Teacher
        fields = "__all__"#('id', 'name', 'cnp', 'date_of_birth', 'mail_address', 'phone_number')
        