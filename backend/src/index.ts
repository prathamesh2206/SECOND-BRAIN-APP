import express, { request, Request, response, Response } from "express";
import mongoose,{ Error } from "mongoose";
import dotenv from "dotenv";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { userModel, tagModel, contentModel, linkModel } from "./db";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middleware";
dotenv.config();
const app = express();
app.use(express.json());

const JWT_SECRET :string =process.env.JWT_SECRET as string;
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const usernameSchema = z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(30, { message: "Username must not exceed 30 characters" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "Username must be alphanumeric" })
      .nonempty({ message: "Username is required" });
  
    const passwordSchema = z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(30, { message: "Password must not exceed 30 characters" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "Password must be alphanumeric" })
      .nonempty({ message: "Password is required" });
  
    try {
      const validatedUsername = usernameSchema.parse(username);
      const validatedPassword = passwordSchema.parse(password);
      
  
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
      const hashedPassword = await bcrypt.hash(validatedPassword, saltRounds);
  
      const userExist = await userModel.findOne({
        username: username,
      })
      
      const response = await userModel.create({
        username: validatedUsername,
        password: hashedPassword,
      });
  
      res.status(201).json({
        message: "User created successfully",
        user: { id: response._id, username: response.username },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(411).json({
          message: "Validation failed",
          errors: error.errors.map((e) => e.message),
        });
        return; 
      }
      if((error as any).code === 11000 ){
        const field= Object.keys((error as any).keyValue)[0];
        res.status(403).json({ error: `${field} already exists` });
    }
  
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
      
    }
  });
  

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const response = await userModel.findOne({ username });
  
      if (!response) {
        res.status(403).json({
          msg: "Wrong username",
        });
        return; 
      }
  
      const userValid = await bcrypt.compare(password, response.password);
  
      if (!userValid) {
        res.status(403).json({
          msg: "Wrong password",
        });
        return;
      }
  
      const token = jwt.sign({ id: response._id }, JWT_SECRET);
  
      res.status(200).json({
        msg: "Sign in was successful",
        token,
      });
    } catch (err) {
      console.error("Error during sign-in:", err);
      res.status(500).json({
        msg: "Internal server error",
        err,
      });
    }
  });

app.post("/api/v1/content",userMiddleware, async (req, res) => {
  const {userId,type ,link ,title ,tags} = req.body;
  try{
    const response= await contentModel.create({
      userId:userId,
      type :type,
      link :link,
      title :title,
      tags:tags })

      if (response){
        res.status(200).json({
          "message":"content sucessfully created"
        })
      }
  }catch(err){
    res.status(500).json({
      "message":"error occured while creating a content",
      "err":err
    })
  }

});

app.get("/api/v1/content",userMiddleware, async (req, res) => {
  const userId=req.userId;
  try {
    const response = await contentModel
      .find({ userId }) 
      .populate("userId", "username"); 

    if (response.length > 0) {
       res.status(200).json({ contents: response });
    } else {
       res.status(404).json({
        msg: "No content found for this user.",
      });
    }
  } catch (err) {
    console.error(err); 
     res.status(500).json({
      msg: "Internal server error. Please try again later.",

    
    });
  }
});


app.delete("/api/v1/content", async (req, res) => {
  const contentId =req.body.contentId;
  try{
    const response= await contentModel.deleteOne({
      _id:contentId
    })
    if(response){
      res.status(200).json({
        "message":"content deleted sucessfully"
      })
    }
  }catch(err){
    res.status(500).json({
      "msg":"internal server error",
      "error":err
    })
  }
  

});

app.post("/api/v1/brain/share", async (req, res) => {});

app.get("/api/v1/brain/:shareLink", async (req, res) => {});

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
  } catch (err) {
    console.log(err);
  }
  app.listen(3000);
}
main();
