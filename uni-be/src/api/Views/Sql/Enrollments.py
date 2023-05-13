
from api.Views.Sql.GenericSql import GenericSqlView


class EnrollmentsSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/enrolls.sql", "api/SqlScripts/enrolls_drop.sql", "api/SqlScripts/enrolls_add.sql")


class TruncateEnrollmentsSqlView(GenericSqlView):
    def __init__(self):
        super().__init__("api/SqlScripts/truncate_enrolls.sql")