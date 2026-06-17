"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.School = void 0;
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
        this.courses = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    addCourse(course) {
        this.courses.push(course);
    }
    showAllStudent() {
        const allStudent = this.students;
        allStudent.forEach(PerStudent => {
            console.log(PerStudent.name);
        });
    }
}
exports.School = School;
//# sourceMappingURL=School.js.map