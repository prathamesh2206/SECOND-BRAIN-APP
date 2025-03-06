import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { userModel, tagModel, contentModel, linkModel } from "./db";
import bcrypt from "bcrypt";
import { getTagsId, userMiddleware } from "./middleware";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS as string);
app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const usernameSchema = z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must not exceed 30 characters" })
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

    const hashedPassword = await bcrypt.hash(validatedPassword,  SALT_ROUNDS );

    const userExist = await userModel.findOne({
      username: username,
    });
    if (userExist) {
      res.status(403).json({
        message: "Username already exists",
      });
      return;
    }

    const response = await userModel.create({
      username: validatedUsername,
      password: hashedPassword,
    });
    if (response) {
      res.status(200).json({
        message: "User created successfully",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(411).json({
        message: "Validation failed",
        errors: error.errors.map((e) => e.message),
      });
      return;
    }
    if ((error as any).code === 11000) {
      const field = Object.keys((error as any).keyValue)[0];
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

app.post("/api/v1/content", userMiddleware, getTagsId, async (req, res) => {
  const userId = req.userId;
  const { type, link, title, tags } = req.body;
  
  try {
    const response = await contentModel.create({
      userId: userId,
      type: type,
      link: link,
      title: title,
      tags: tags,
    });

    if (response) {
      res.status(200).json({
        message: "content successfully created",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error occurred while creating a content",
      err: err,
    });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const response = await contentModel
      .find({ userId })
      .populate("userId", "username")
      .populate("tags","title");

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

app.delete("/api/v1/content/:contentId", userMiddleware, async (req, res) => {
  const contentId = req.params.contentId;
  const userId = req.userId; // Assuming userMiddleware adds userId to req
  
  try {
    const response = await contentModel.deleteOne({
      _id: contentId,
      userId: userId,
    });
    
    if (response.deletedCount > 0) {
       res.status(200).json({
        message: "Content deleted successfully",
      });
    } else {
       res.status(404).json({
        message: "Content not found or you don't have permission to delete it",
      });
    }
  } catch (err) {
    console.error("Error deleting content:", err);
     res.status(500).json({
      message: "Internal server error",
      error: (err as Error).message,
    });
  }
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share} = req.body;
  const userId = req.userId;

  try {
    if (share) {
      if(!userId) {
        res.status(400).json({
          msg: "User id is required",
        });
        return;
      }
      const linkExist = await linkModel.findOne({
        userId:userId
      });
      if(linkExist){
        res.status(200).json({
          link: linkExist.hash,
        });
        return;
      }
      const id =userId.toString();
      const hash = crypto.createHash("sha256").update(id).digest("hex");
      const link = await linkModel.create({
        hash,
        userId, 
      });

      if (link) {
        res.status(200).json({
          link: hash,
        });
      }
    } else {
      linkModel.deleteOne({
        userId: userId
      })
    }
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
      error: err,
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  try {
    const response = await linkModel
      .findOne({ hash });
    if(response){
      const content = await contentModel.find({ userId: response.userId })
        .populate("userId", "username")
        .populate({
          path: "tags",
          select: "title"
        });
      res.status(200).json({
        data: content
    })  
    }
    else {
      res.status(404).json({
        success: false,
        message: "Invalid or non-existent link",
      });
    } 
  }
   catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: err,
    });
  }
});

async function main() {
  try {
    await mongoose.connect(
      process.env.DB_URL as string,
      {
        serverSelectionTimeoutMS: 50000,
      }
    );
  } catch (err) {
    console.log(err);
  }
  app.listen(3000);
}
main();
