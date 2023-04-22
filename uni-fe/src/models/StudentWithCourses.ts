import { ExtraDetailsCourse } from "./ExtraDetailsCourse";

export interface StudentWithCourses {
    id: number,
    name: string,
    cnp: number,
    date_of_birth: string,
    country: string,
    mail_address: string,
    phone_number: string,
    courses: ExtraDetailsCourse[],
}