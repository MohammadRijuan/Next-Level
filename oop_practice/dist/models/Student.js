"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const Person_1 = require("./Person");
class Student extends Person_1.Person {
    constructor(name, roll) {
        super(name);
        this.roll = roll;
        this.courses = [];
    }
    getRole() {
        return "Student";
    }
    enroll(course) {
        this.courses.push(course);
    }
    getCourses() {
        return this.courses;
    }
}
exports.Student = Student;
//# sourceMappingURL=Student.js.map