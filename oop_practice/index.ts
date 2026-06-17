// index.ts

import { School } from "./services/School";
import { Student } from "./models/Student";
import { Teacher } from "./models/Teacher";
import { Course } from "./models/Course";

const school = new School();

// Teachers
const t1 = new Teacher("Mr. Hasan", "Math");

// Courses
const c1 = new Course("Algebra", t1);

// Students
const s1 = new Student("Abul", 1);
const s2 = new Student("Kuddus", 2);

// Operations
s1.enroll(c1);
t1.assignCourse(c1);

school.addStudent(s1);
school.addStudent(s2);
school.addTeacher(t1);
school.addCourse(c1);

// Output
school.showAllStudent();