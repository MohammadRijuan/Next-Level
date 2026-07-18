import type { IncomingMessage } from "http";

export const ParseBody=(req:IncomingMessage):Promise<any>=>{
    return new Promise((resolve,reject)=>{
        let body =""
        req.on("data",(chunk)=>{
            body+= chunk;
        })
        req.on("end",()=>{
            try{
                resolve(JSON.parse(body))
            }
            catch(err){
                reject(err)
            }
        })

    })

}