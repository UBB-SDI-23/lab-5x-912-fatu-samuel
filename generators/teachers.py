ROWS_TO_GENERATE = 1000000
ROWS_PER_BATCH = 1000
AMOUNT_OF_FILES = 10

from faker import Faker


class Teacher:

    def __init__(self, name, cnp, date_of_birth, mail, phone_number, description):
        self.name = name # A random name
        self.cnp = cnp # A random number with 13 digits
        self.date_of_birth = date_of_birth # A random date
        self.mail = mail # A random email
        self.phone_number = phone_number # A random number with 10 digits
        self.description = description # A random text with 20 characters

    def __str__(self):
        return f'{self.name}, {self.cnp}, {self.date_of_birth}, {self.mail}, {self.phone_number}'


def generate_teachers(amount):

    faker: Faker = Faker()


    teachers = []
    for i in range(amount):

        if i % ROWS_PER_BATCH == 0:
            print(f"Generated {i} rows")

        name = faker.name()
        cnp = faker.random_int(1000000000000, 9999999999999)
        date_of_birth = faker.date_of_birth(minimum_age = 18, maximum_age = 25)
        country = faker.country().replace("'", "''").replace('\n', ' ')
        phone_number = faker.random_int(1000000000, 9999999999)
        description = ' '.join(faker.paragraphs(nb = 10)).replace("'", "''").replace('\n', ' ')
        teachers.append(Teacher(name, cnp, date_of_birth, country, phone_number, description))

    return teachers


def generate_sql(teachers):

    with open("teachers/0.sql", "w") as file:
        file.write("TRUNCATE TABLE api_teachers RESTART IDENTITY CASCADE;")

    sql = "INSERT INTO api_teachers (name, cnp, date_of_birth, mail_address, phone_number, description) VALUES "
    i = 0
    file_index = 0
    for teacher in teachers:
        sql += f"('{teacher.name}', '{teacher.cnp}', '{teacher.date_of_birth}', '{teacher.mail}', '{teacher.phone_number}', '{teacher.description}'),"
        
        if i % ROWS_PER_BATCH == 0:
            with open(f"teachers/{file_index}.sql", "a") as file:
                file.write(sql[:-2] + ";")

            print(f"Written {i} rows to file")
            sql = "INSERT INTO api_teachers (name, cnp, date_of_birth, mail_address, phone_number, description) VALUES "



        i += 1

    if sql != "INSERT INTO api_teachers (name, cnp, date_of_birth, mail_address, phone_number, description) VALUES ":
        with open("teachers.sql", "a") as file:
            file.write(sql[:-2] + ";")
        print(f"Written {i} rows to  - last batch")

    print("Done! :")


if __name__ == '__main__':
    students = generate_teachers(ROWS_TO_GENERATE)
    generate_sql(students)