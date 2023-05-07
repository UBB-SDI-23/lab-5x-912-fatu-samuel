import { User } from "./User";

export interface Teacher {
    id: number,
    name: string,
    cnp: number,
    date_of_birth: string,
    phone_number: string,
    mail_address: string,
    description: string,
    courses_count: number,
    added_by: User
}