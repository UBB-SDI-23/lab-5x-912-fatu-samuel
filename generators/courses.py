ROWS_TO_GENERATE = 1000000
ROWS_PER_BATCH = 1000

from faker import Faker


class Course:
    # name = models.CharField(max_length = 128)
    # description = models.CharField(max_length = 512)
    # teacher = models.ForeignKey('Teacher', on_delete = models.CASCADE, related_name = "courses")
    # students = models.ManyToManyField('Student', through = 'StudentCourse')
    # fee = models.IntegerField()
    # size = models.IntegerField()

    def __init__(self, name, description, teacher, fee, size):
        self.name = name
        self.description = description
        self.teacher = teacher
        self.fee = fee
        self.size = size

    def __str__(self):
        return f'{self.name}, {self.description}, {self.teacher}, {self.fee}, {self.size}'
    


def generate_courses(amount):

    faker: Faker = Faker()


    courses = []
    for i in range(amount):

        if i % ROWS_PER_BATCH == 0:
            print(f"Generated {i} rows")

        name = faker.name()
        description = faker.text()[:20]
        teacher = i + 1
        fee = faker.random_int(100, 1000)
        size = faker.random_int(200, 1000)


        courses.append(Course(name, description, teacher, fee, size))

    return courses


def generate_sql(courses):

    with open("courses.sql", "w") as file:
        file.write("TRUNCATE TABLE api_course RESTART IDENTITY CASCADE;")

    sql = "INSERT INTO api_course (name, description, teacher_id, fee, size) VALUES "
    i = 0
    for course in courses:
        sql += f"('{course.name}', '{course.description}', '{course.teacher}', '{course.fee}', '{course.size}'),"
        if i % ROWS_PER_BATCH == 0:
            # write the sql to a file

            with open("courses.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f"Written {i} rows to file")
            sql = "INSERT INTO api_course (name, description, teacher_id, fee, size) VALUES "

        i += 1

    if sql != "INSERT INTO api_course (name, description, teacher_id, fee, size) VALUES ":
        with open("courses.sql", "a") as file:
            file.write(sql[:-1] + ";")
        print(f"Written {i} rows to file - last batch")

    print("Done! :")


if __name__ == '__main__':
    courses = generate_courses(ROWS_TO_GENERATE)
    generate_sql(courses)