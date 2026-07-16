import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(),"./src/database/db.json")

export const ReadFile = (req:IncomingMessage,res:ServerResponse)=>{
    const products = fs.readFileSync(filePath,"utf-8")
    // console.log(JSON.parse(products)) 
    return JSON.parse(products) 
    // console.log(filePath)

}