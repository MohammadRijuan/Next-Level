// problem 1 

// Create a TypeScript function filterEvenNumbers that accepts an array of numbers and returns a new array containing only the even numbers.

function filterEvenNumbers (arr : number[]){
    const evenNumber : number[] = [];

    for(let i=0; i< arr.length ; i++){
    // for(let i in range arr.length){
        if(arr[i] % 2 === 0){
            evenNumber.push(arr[i]);
        }
    }

    return evenNumber;

}


const Filter = filterEvenNumbers([1, 2, 3, 4, 5, 6]);

console.log(Filter)


// problem - 2

// Write a function reverseString that takes a string as input and returns the reversed version of that string.

function reverseString (sentence : string){
    let reverseSentence : string= " ";

    for(let i = sentence.length - 1; i>=0; i-- ){
        reverseSentence = reverseSentence+sentence[i]
    }
    return reverseSentence
}

console.log(reverseString("typescript"))


// problem- 3

// Define a union type StringOrNumber and create a function checkType that uses type guards to return "String" if the input is a string or "Number" if the input is a number.

function checkType(variable : string | number | number[] | undefined) {

    if(variable === typeof(variable))
        return typeof(variable)
    else
        return typeof(variable)

}

console.log(checkType("a"))
console.log(checkType(5))




// problem - 4

// Write a generic function getProperty that takes an object and a key, then returns the value of that key. Use constraints to ensure the key exists on the object.

function getProperty<T>(obj:T,key: keyof T){
    return obj[key];
}

const user = {
  id: 1,
  name: "John Doe",
  age: 21
};

console.log(getProperty(user, "name"));


// problem - 5

// Define an interface Book with properties title, author, and publishedYear. Create a function toggleReadStatus that accepts a Book object and returns a new object with an added isRead property (boolean), defaulting to true.

interface Book {
    title: string,
    author: string,
    publishedYear : number
}


function toggleReadStatus (book: Book) {
    console.log({
        ...book,
        isRead:true
    })

}

const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };
toggleReadStatus(myBook);



// problem - 6 

// Create a class Person with a name and age. Then, create a subclass Student that adds a grade property. Include a method getDetails in the Student class that returns a string with the student's name, age, and grade.


class Person {
    name : string;
    age : number
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }
}

class Student extends Person{
    grade : string;

    constructor(name:string,age:number,grade:string){
        super(name,age)
        this.grade = grade;
    }

    getDetails(){
        console.log(`Name : ${this.name}, Age : ${this.age}, Grade : ${this.grade}`)
    }
}

const student = new Student("Alice", 20, "A");
student.getDetails();


// problem - 7

// Create a function getIntersection that takes two arrays of numbers and returns a new array containing only the elements that are present in both arrays.


function getIntersection (arr1 : number[], arr2 : number[]){

    let sameNumber : number[] = []

    for(let i=0; i< arr1.length ; i++){
        for(let j =0; j< arr2.length; j++){
            if(arr1[i] === arr2[j]){
                sameNumber.push(arr2[j])
            }

        }
    }

    return sameNumber;
}

const result = getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])

console.log(result)