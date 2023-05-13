
from api.Views.Sql.GenericSql import GenericSqlView


class TeachersSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/teachers.sql", "api/SqlScripts/teachers_drop.sql", "api/SqlScripts/teachers_add.sql")


class TruncateTeachersSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/truncate_teachers.sql")