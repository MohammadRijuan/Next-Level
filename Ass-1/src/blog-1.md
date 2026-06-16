1. Why is any labeled a "type safety hole," and why is unknown the safer choice for handling unpredictable data? Explain the concept of type narrowing.


Answer: There are two type for unpredictable variable
        
        1) any
        2) unknown


1) any lets everything go to run the file even the runtime error as well ... it will not help you to identify the type or error of a line as example:

        let value : any;

        value.toUpperCase() 
        value.Amikuddus() // it will not show runtime error for having this... it will pass the function for having (any) type 

2) unknown will not pass any random function without knowing the specific type or function what is type saftey and healthy for our project as example:

        let value : unknown;

        value.toUpperCase() 
        value.AmiAbul() //it will show runtime error for having this...it will not pass the function for having (any) type

*** Type Narrowing

- Type Narrowing is a method what helps us to identify the type of variable weather it is string,number,array or anthing else

Example:

    let value = "fahad"  
    console.log(typeof(value))  // it will show string type
     