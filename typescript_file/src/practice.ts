// Task 1: The "Optional" Shopping Cart

// type cartItem = {
//     name: string;
//     price: number;
//     quantity?: number
// }

// function totalAmount ({price,quantity} : cartItem){
//     return price * quantity;
// }

// const Mango = totalAmount({name:"Mango",price:50,quantity:4})

// console.log(Mango)




// Task 2: Merging User Profiles

// type Person = {
//     name:string;
//     age:number
// }

// type jobDetails = {
//     role:string;
//     salary:number
// }

// type Employee = Person & jobDetails;

// function getProfile ({name,role} : Employee){
//     return `Name : ${name} and role : ${role}`
// }

// const Fahad = getProfile({
//   name: "fahad",
//   age: 25,
//   role: "developer",
//   salary: 40000,
// });

// console.log(Fahad);



// Task 3: The "Safe" Data Fetcher

// type UserResponse = {
//     info?: {
//         address: {
//             zipCode?: string;
//         }
//     }
// }

// function getZipCode (response : UserResponse):string{
//     return response.info?.address.zipCode ?? "00000";
// }


//  Example 1: zip exists

// const user1: UserResponse = {
//   info: {
//     address: {
//       zipCode: "4000",
//     },
//   },
// };

// console.log(getZipCode(user1));


//  Example 2: zip missing

// const user2: UserResponse = {
//   info: {
//     address: {},
//   },
// };

// console.log(getZipCode(user2));


// Task 4: Type Assertion

// let secretValue : unknown = "typeScript is awesome";

// const value = secretValue.toUpperCase()
// console.log(value)



// Task 5: Generic Constraints

// function logLength <T extends {length : number}>(input : T){
//     return input.length;
// }

// const value = logLength("Sakib")
// console.log(value)


// Task 6: The Property Guard

// function getProductProp<T, K extends keyof T>(obj: T, key: K){
//     return obj[key];
// }

// const product = { id: 101, name: "Keyboard", price: 50 };

// console.log(product)


// Task 7: Constant Literal Types

// const Colors = {
//   Primary: "RED",  //here primary is key and red is value
//   Secondary: "BLUE"
// } as const;

// type ValidColor = typeof Colors[keyof typeof Colors];  
// // it has assigned like this
// // Colors → "Primary" | "Secondary" → "RED" | "BLUE"

// function setColor(c: ValidColor) {
//   console.log(c);
// }

// setColor("yellow")


// Task 8: The "Draft" Mode

// interface MyDocument {
//     title: string;
//     content:string;
//     author: string;
// }

// type Draft<T> = {
//     readonly [k in keyof T]?: T[k];
// }

// const myDraft: Draft<MyDocument> = {
//   title: "Draft Title"
// };

// console.log(myDraft);


// Task 9: The Wrapper

// type DataType<T> = T extends any[] ? "Large" : "small";

// type test1 = DataType<[1,2,3]>;
// type test2 = DataType<{}>;

// const result1: test1 = "Large";
// const result2: test2 = "small";

// console.log(result1);
// console.log(result2);


// Task 10: Utility Type (Omit)

interface UserAccount {
    id: number;
    username: string;
    password: string
}

type PublicUser = Omit<UserAccount,"password">

const User : PublicUser ={
    id: 1,
    username: "fahad"
}

console.log(User)