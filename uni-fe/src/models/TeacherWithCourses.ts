import { BriefCourse } from "./BriefCourse";

export interface TeacherWithCourses {
    id: number,
    name: string,
    cnp: number,
    date_of_birth: string,
    phone_number: string,
    mail_address: string,
    description: string,
    courses: BriefCourse[]
}