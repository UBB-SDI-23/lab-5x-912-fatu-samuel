import { StudentWithName } from "./StudentWithName";
import { TeacherWithName } from "./TeacherWithName";

export interface Course {
    id: number,
    name: string,
    description: string,
    fee: number,
    size: number,
    teacher: TeacherWithName,
    students: StudentWithName[]
}