import { Course } from "./Course";
import { Student } from "./Student";

export interface Enrollment {
    id: number;
    student: number;
    course: number;
    studentName: string;
    courseName: string;
    final_lab_score: number;
    final_exam_score: number;
    full_student: Student;
    full_course: Course;
}