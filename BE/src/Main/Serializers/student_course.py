from ..Models.student_course import StudentCourse
from .dynamic import DynamicFieldsModelSerializer

class StudentCourseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = StudentCourse
        fields = "__all__"
        