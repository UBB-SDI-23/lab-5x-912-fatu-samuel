
from api.Views.Sql.GenericSql import GenericSqlView


class StudentsSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/students.sql", "api/SqlScripts/students_drop.sql", "api/SqlScripts/students_add.sql")


class TruncateStudentsSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/truncate_students.sql")