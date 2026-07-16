import type { IncomingMessage, ServerResponse } from "http";
import { ReadFile } from "../service/readFile";


export const ProductController = (req:IncomingMessage,res:ServerResponse)=>{


        const products = ReadFile(req,res)
    
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"product retrived successfully", data:products}))


}