import type { ServerResponse } from "http";

export const SendResponse=(res:ServerResponse,statusCode:number,success:boolean,data?:any,message?:string)=>{
    const response={
        success,
        message,
        data
    }

    res.writeHead(statusCode,{"content-type":"application/json"})
    res.end(JSON.stringify(response))

}