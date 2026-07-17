import type { IncomingMessage, ServerResponse } from "http";
import { ReadFile } from "../service/readFile";
import type { Iproduct } from "../types/product.type";

export const ProductController=(req:IncomingMessage,res:ServerResponse)=>{


    const url = req.url
    const method = req.method

    const Products = ReadFile(req,res)

    const urlId = url?.split("/")
    // console.log(urlId)
    const id = urlId && urlId[1] === "products" ? Number(urlId[2]) : null;
    console.log(id)

    if(url==="/products" && method === "GET"){
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"products retrieved successfully",data:Products}))
    }
    else if (method === "GET" && id !== null){ // get single product
        const Products = ReadFile(req,res)
        const Product = Products.find((p: Iproduct)=> p.id === id)
        // console.log(product)
        res.writeHead(200,{"content-type":"application/json"})
        res.end(JSON.stringify({message:"product retrieved successfully",data:Product}))

    }

}