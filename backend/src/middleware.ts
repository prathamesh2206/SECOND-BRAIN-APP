import jwt from "jsonwebtoken";
import { NextFunction,Request,Response } from "express";
import dotenv from"dotenv";
dotenv.config()
export const userMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["authorization"];
    const SECRET =process.env.JWT_SECRET as string
    try{
        //@ts-ignore it was indicating that secret is undefined
        const decoded = jwt.decode(token as string,SECRET  )
        if (decoded){
            req.userId= decoded.id;
            next()
        }
    }catch(err){
        res.sendStatus(403).json({
            "msg":"you're not loggged in"
        })

    }
}