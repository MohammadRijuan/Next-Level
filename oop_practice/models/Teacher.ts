import { Course } from "./Course"
import Person = require("./Person");


export class Teacher extends Person.Person{
    private courses : Course[] = [];
    
    constructor(name: string, public subject : string){
        super(name);
    }

    getRole(){
        return "Teacher";
    }

    assignCourse(course : Course){
        this.courses.push(course);
    }
}