import { Course } from "../models/Course";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";
export declare class School {
    private students;
    private teachers;
    private courses;
    addStudent(student: Student): void;
    addTeacher(teacher: Teacher): void;
    addCourse(course: Course): void;
    showAllStudent(): void;
}
//# sourceMappingURL=School.d.ts.map .