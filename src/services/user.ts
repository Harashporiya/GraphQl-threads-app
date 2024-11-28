import { prismaClient } from "../lib/db"
import {createHmac, randomBytes} from "node:crypto"
import jwt from 'jsonwebtoken'

export interface CreateUserPayload{
    firstName:string
    lastName?:string
    email:string
    password:string
}

export interface GetUserTokenPayload{
    email:string
    password:string
}

const JWT_SECRET = "@supermanksnsk"

class UserService{

    private static generateHash(salt:string, password:string){
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex')
       return hashPassword
    }
    
    public static getUserById(id:string){
        return prismaClient.user.findUnique({where:{id}})
    }

   public static createUser(payload:CreateUserPayload){
    const {firstName,lastName,email,password} = payload
    const salt = randomBytes(32).toString("hex");
    const hashPassword = UserService.generateHash(salt, password);
     return prismaClient.user.create({
        data:{
          firstName,
          lastName,
          email,
          salt,
          password:hashPassword
        }
     })
   }

   public static async getUserToken(payload:GetUserTokenPayload){
     const {email,password} = payload
     const user = await prismaClient.user.findUnique({
        where:{
            email
        }
     })
     if(!user){
        throw new Error('user not found')
     }
     const userSalt = user.salt;
     const UserHashPassword = UserService.generateHash(userSalt,password)

     if(UserHashPassword !== user.password){
        throw new Error("Incorrect password")
     }
     
     // Genrate token
     const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET);
     return token
   }

   public static decodeJwtToken(token:string){
    return jwt.verify(token, JWT_SECRET)
   }
}

export default UserService