import { Course } from "./Course";
import Person = require("./Person");
export declare class Teacher extends Person.Person {
    subject: string;
    private courses;
    constructor(name: string, subject: string);
    getRole(): string;
    assignCourse(course: Course): void;
}
//# sourceMappingURL=Teacher.d.ts.map