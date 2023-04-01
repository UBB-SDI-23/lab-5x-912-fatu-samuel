import { MinimalCourse } from "./minimal-course";

export interface FullStudent {
    id: number,
    name: string,
    cnp: number,
    date_of_birth: string,
    country: string,
    county: string,
    city: string,
    mail_address: string,
    phone_number: string,
    courses: MinimalCourse[],
}