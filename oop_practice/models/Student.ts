import { Course } from "./Course";
import { Person } from "./Person";

export class Student extends Person{
    private courses : Course[] = [];

    constructor (name : string , public roll : number){
        super(name)
    }

    getRole(): string{
        return "Student";
    }

    enroll (course : Course){
        this.courses.push(course)
    }

    getCourses(){
        return this.courses;
    }
}
