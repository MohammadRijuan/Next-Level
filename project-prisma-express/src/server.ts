import app from "./app"
import { prisma } from "./lib/prisma";

// we will put here to run the port ...otherwise port will not run smoothly
import "dotenv/config";

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT;

async function main(){
    try {
        // await prisma.$connect();
        console.log("connected to the database");
        app.listen(PORT,()=>{
            console.log(`server is running on port : ${PORT}`);
        })
        
    } catch (error) {
        console.log(`errors are : ${error}`);
        // await prisma.$disconnect();
        process.exit(1);
        
    }
}

main()