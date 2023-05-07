import { StudentWithName } from "./StudentWithName";
import { TeacherWithName } from "./TeacherWithName";
import { User } from "./User";

export interface Course {
    id: number,
    name: string,
    description: string,
    fee: number,
    size: number,
    teacher: TeacherWithName,
    students: StudentWithName[],
    students_count: number,
    added_by: User
}