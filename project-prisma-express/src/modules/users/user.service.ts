import bcrypt from "bcryptjs"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import RegisterUserPayload from "./user.interface"



const registerUserIntoDb = async(payload:RegisterUserPayload)=>{

    const {name,email,password,profilePhoto} = payload

    const isUserExist = await prisma.user.findUnique({
        where: {email}
    })

    if(isUserExist){
        throw new Error("User with this email already exist")
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser = await prisma.user.create({
        data:{
            name,
            email,
            password : hashedPassword,
            profileId : {
                create : {
                    profilePhoto
                }
            }
        }

    });
    
    
    // we can do above profile logic instead of below logic....

    // await prisma.profile.create({
    //     data :{
    //         userId : createdUser.id,
    //         profilePhoto
    //     }
    // })

    const user = await prisma.user.findUnique({
        where : {
            id : createdUser.id,
            email : createdUser.email || email 
        },
        // not showing password in response
        omit:{
            password:true
        },
        // showing profile as well
        include:{
            profileId : true
        }
    })

    return user

    // console.log(payload)
}


export const userService = {
    registerUserIntoDb
}