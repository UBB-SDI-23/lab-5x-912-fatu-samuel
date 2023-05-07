import { User } from "./User";

export interface Student {
    id: number,
    name: string,
    cnp: number,
    date_of_birth: string,
    city: string,
    mail_address: string,
    phone_number: string,
    courses: number[],
    courses_count: number,
    added_by: User
}