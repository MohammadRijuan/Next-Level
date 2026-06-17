import { Teacher } from "./Teacher";

export class Course{
    constructor(
        public title : string,
        public teacher : Teacher
    ){}
}