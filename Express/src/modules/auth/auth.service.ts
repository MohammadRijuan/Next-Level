import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";

const loginUserIntoDb = async (payload: {
  email: string;
  password: string;
}) => {
    const {email,password} = payload
    // check user exist
    // compare password
    // generate token

    const userData = await pool.query(`
        SELECT * FROM USERS WHERE email=$1
        `,[email])


        if(userData.rows.length === 0){
            throw new Error ("Invalid credentials!")
        }

        const user = userData.rows[0];
        
        const matchPassword = await bcrypt.compare(password,user.password)
        
        if(!matchPassword){
            throw new Error ("Invalid credentials!")
        }

        // generate token

        const jwtPayload = {
          id : user.id,
          name: user.name,
          is_Active: user.is_Active,
          email: user.email
        }

        const accessToken = jwt.sign(payload,config.secret as string,{expiresIn:"1d"})

        return {accessToken}




};

export const authService = {
  loginUserIntoDb,
};
