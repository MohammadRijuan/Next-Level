import { Course } from "../models/Course";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";

export class School {
    private students : Student[] = [];
    private teachers : Teacher[] = [];
    private courses : Course[] = [];

    addStudent(student : Student){
        this.students.push(student);
    }

    addTeacher(teacher : Teacher){
        this.teachers.push(teacher)
    }

    addCourse(course : Course){
        this.courses.push(course)
    }

    showAllStudent(){
        const allStudent = this.students;

        allStudent.forEach(PerStudent=>{
            console.log(PerStudent.name)
        })
    }
}