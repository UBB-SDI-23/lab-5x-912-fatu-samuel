import { Course } from "./Course";
import { Student } from "./Student";

export interface Enrollment {
    id: number;
    student: Student;
    course: Course;
    final_lab_score: number;
    final_exam_score: number;
}