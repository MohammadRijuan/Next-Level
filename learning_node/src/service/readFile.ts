import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs";


const filePath = path.join(process.cwd(),"./src/database/db.json")

export const ReadFile=()=>{
    // if i dont use utf-8 then it wont give me string.... it will give buffer like - 60 65 51 12 .....
    // UTF stands for Unicode Transformation Format. 

    // const products = fs.readFileSync(filePath)
    const products = fs.readFileSync(filePath,"utf-8")
    return JSON.parse(products)
    // return products // if i dont give json.parse then it will render like - "data": "[\r\n  {\r\n    \"id\": 1,\r\n    \"name\":\"abul\"\r\n  }\r\n]\r\n"

}



// to insert product


export const InsertProduct=(payload:any)=>{
    // fs.writeFileSync(filePath,payload) // it will give buffer shows error because not sending any object
    fs.writeFileSync(filePath,JSON.stringify(payload)) // it will send object nd working
}