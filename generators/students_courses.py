ROWS_TO_GENERATE = 100000
DATA_FOR_ROW_TO_GENERATE = 100
ROWS_PER_BATCH = 10
AMOUNT_OF_FILES = 1

from faker import Faker

class StudentCourse:
    def __init__(self, student, course, final_lab_score, final_exam_score):
        self.student = student
        self.course = course
        self.final_lab_score = final_lab_score
        self.final_exam_score = final_exam_score

    def __str__(self):
        return f'{self.student}, {self.course}, {self.final_lab_score}, {self.final_exam_score}'


def generate():

    faker: Faker = Faker()


    data = []
    for i in range(ROWS_TO_GENERATE):

        if i % ROWS_PER_BATCH == 0:
            print(f"Generated {i * DATA_FOR_ROW_TO_GENERATE} rows")

        courses = []
        for _ in range(DATA_FOR_ROW_TO_GENERATE):
            student = i + 1
            course = faker.random_int(1, 1000000)

            while course in courses:
                course = faker.random_int(1, 1000000)
                courses.append(course)

            final_lab_score = faker.random_int(100, 1000) / 100
            final_exam_score = faker.random_int(100, 1000) / 100

            data.append(StudentCourse(student, course, final_lab_score, final_exam_score))

    return data


def generate_sql(data):

    with open("students_courses_0.sql", "w") as file:
        file.write("TRUNCATE TABLE api_studentcourse RESTART IDENTITY CASCADE;")

    sql = "INSERT INTO api_studentcourse (student_id, course_id, final_lab_score, final_exam_score) VALUES "
    i = 0
    file_index = 0
    for entity in data:
        i += 1

        sql += f"({entity.student}, {entity.course}, '{entity.final_lab_score}', {entity.final_exam_score}), "
        if i % (ROWS_PER_BATCH * DATA_FOR_ROW_TO_GENERATE) == 0:
            with open(f"students_courses_{file_index}.sql", "a") as file:
                file.write(sql[:-2] + ";")

            print(f"Written {i} rows to file {file_index}")
            sql = "INSERT INTO api_studentcourse (student_id, course_id, final_lab_score, final_exam_score) VALUES "
        
        if i % (ROWS_TO_GENERATE * DATA_FOR_ROW_TO_GENERATE // AMOUNT_OF_FILES) == 0:
            file_index += 1


    if sql != "INSERT INTO api_studentcourse (student_id, course_id, final_lab_score, final_exam_score) VALUES ":
        with open(f"students_courses.sql", "a") as file:
            file.write(sql[:-2] + ";")
        print(f"Written {i} rows to file - last batch")

    print("Done! :")


if __name__ == '__main__':
    data = generate()
    generate_sql(data)