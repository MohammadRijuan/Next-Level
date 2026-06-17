"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const Person = require("./Person");
class Teacher extends Person.Person {
    constructor(name, subject) {
        super(name);
        this.subject = subject;
        this.courses = [];
    }
    getRole() {
        return "Teacher";
    }
    assignCourse(course) {
        this.courses.push(course);
    }
}
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map