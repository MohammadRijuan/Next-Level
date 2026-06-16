2. How do Pick and Omit utility types prevent code duplication while creating specialized "slices" of a master interface? Discuss how this keeps your code DRY (Don't Repeat Yourself).


Answer: Pick and Omit these two utility type help us to maintain DRY (Dont Repeat Yourself).... like Pick helps us      

to choose specific variable of an obj and omit helps us to remove any variable from object of my own... both are doing slices as like master of slicing

Example:
    
    interface User {
       id: string;
       name: string;
       email: string;
       role: string;
       salary:number
    }
    
    <!-- choosing  -->
    type UserContactInfo = Pick<User, 'name' | 'email' | 'salary'>;

    const contact: UserContactInfo = {
       name: "fahad",
       email: "fahad.ceo@gmail.com",
       salary: 75000
    };

    console.log(contact);


    <!-- removing -->

    type NewUserForm = Omit<User, 'id' | 'role'>;

    const registrationData: NewUserForm = {
       name: "fahad",
       email: "fahad.ceo@gmail.com"
    };

    console.log(registrationData)