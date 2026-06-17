export abstract class Person{
    constructor(
        public name:string,
    ){}

    abstract getRole():string;

    introduce(){
        console.log(`this is ${this.name}`)
    }
}