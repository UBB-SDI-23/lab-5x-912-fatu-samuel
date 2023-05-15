
from api.Views.Sql.GenericSql import GenericSqlView


class CoursesSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/courses.sql", "api/SqlScripts/courses_drop.sql", "api/SqlScripts/courses_add.sql")


class TruncateCoursesSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/truncate_courses.sql")