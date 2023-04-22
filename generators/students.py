ROWS_TO_GENERATE = 1000000
ROWS_PER_BATCH = 1000

from faker import Faker


class Student:

    def __init__(self, name, cnp, date_of_birth, country, mail, phone_number):
        self.name = name # A random name
        self.cnp = cnp # A random number with 13 digits
        self.date_of_birth = date_of_birth # A random date
        self.country = country # A random country
        self.mail = mail # A random email
        self.phone_number = phone_number # A random number with 10 digits

    def __str__(self):
        return f'{self.name}, {self.cnp}, {self.date_of_birth}, {self.country}, {self.mail}, {self.phone_number}'


def generate_students(amount):

    faker: Faker = Faker()


    students = []
    for i in range(amount):

        if i % ROWS_PER_BATCH == 0:
            print(f"Generated {i} rows")

        name = faker.name()
        cnp = faker.random_int(1000000000000, 9999999999999)
        date_of_birth = faker.date_of_birth(minimum_age = 18, maximum_age = 25)
        country = faker.country().replace("'", "''").replace('\n', ' ')
        mail = faker.email()
        phone_number = faker.random_int(1000000000, 9999999999)

        students.append(Student(name, cnp, date_of_birth, country, mail, phone_number))

    return students


def generate_sql(students):

    with open("students.sql", "w") as file:
        file.write("TRUNCATE TABLE api_student RESTART IDENTITY CASCADE;")

    sql = "INSERT INTO api_student (name, cnp, date_of_birth, country, mail_address, phone_number) VALUES "
    i = 0
    for student in students:
        sql += f"('{student.name}', '{student.cnp}', '{student.date_of_birth}', '{student.country}', '{student.mail}', '{student.phone_number}'),"

        if i % ROWS_PER_BATCH == 0:
            # write the sql to a file

            with open("students.sql", "a") as file:
                file.write(sql[:-1] + ";")

            print(f"Written {i} rows to file")
            sql = "INSERT INTO api_student (name, cnp, date_of_birth, country, mail_address, phone_number) VALUES "

        i += 1

    if sql != "INSERT INTO api_student (name, cnp, date_of_birth, country, mail_address, phone_number) VALUES ":
        with open("students.sql", "a") as file:
            file.write(sql[:-1] + ";")
        print(f"Written {i} rows to file - last batch")

    print("Done! :")


if __name__ == '__main__':
    students = generate_students(ROWS_TO_GENERATE)
    generate_sql(students)