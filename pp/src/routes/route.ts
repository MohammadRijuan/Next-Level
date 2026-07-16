import type { IncomingMessage, ServerResponse } from "http";
import { ProductController } from "../controller/productController";



export const RouteHandler = (req:IncomingMessage,res:ServerResponse)=>{

    const url = req.url;
    const method = req.method;

    if(url === "/" && method ==="GET"){
        res.writeHead(200,{"content-type" : "application/json"})
        res.end(JSON.stringify({message:"this is root route"}))
    }
    else if ( url === "/product" && method ==="GET"){
        ProductController(req,res)
    }
    else{
        res.writeHead(404,{"content-type":"text/plain"})
        res.end(JSON.stringify({message:"this is not root route"}))
    }


}