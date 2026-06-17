"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
const School_1 = require("./services/School");
const Student_1 = require("./models/Student");
const Teacher_1 = require("./models/Teacher");
const Course_1 = require("./models/Course");
const school = new School_1.School();
// Teachers
const t1 = new Teacher_1.Teacher("Mr. Hasan", "Math");
// Courses
const c1 = new Course_1.Course("Algebra", t1);
// Students
const s1 = new Student_1.Student("Abul", 1);
const s2 = new Student_1.Student("Kuddus", 2);
// Operations
s1.enroll(c1);
t1.assignCourse(c1);
school.addStudent(s1);
school.addStudent(s2);
school.addTeacher(t1);
school.addCourse(c1);
// Output
school.showAllStudent();
//# sourceMappingURL=index.js.map