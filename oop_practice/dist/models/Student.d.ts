import { Course } from "./Course";
import { Person } from "./Person";
export declare class Student extends Person {
    roll: number;
    private courses;
    constructor(name: string, roll: number);
    getRole(): string;
    enroll(course: Course): void;
    getCourses(): Course[];
}
//# sourceMappingURL=Student.d.ts.map