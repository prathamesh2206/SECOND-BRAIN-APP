import jwt,{ JwtPayload} from "jsonwebtoken";
import  { NextFunction, Request, Response } from "express";
import dotenv from"dotenv";
import { tagModel, userModel } from "./db";
dotenv.config()
interface CustomJwtPayload extends JwtPayload {
  id: string;  
}
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}



export const userMiddleware = async (
  req: Request,
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const SECRET = process.env.JWT_SECRET || "your_secret_key";
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
          res.status(401).json({ message: "Unauthorized" });
          return;
      }

      const decoded = jwt.verify(token, SECRET)  as CustomJwtPayload;
      req.userId = decoded.id;
      next();
  } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
  }
};

  



export const getTagsId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = req.body.tags;

    const existingTags = await tagModel.find({
      title: { $in: tags },
    });

    const existingTagsName = existingTags.map(tag => tag.title);

    const newTagsName = tags.filter((tag: string) => !existingTagsName.includes(tag));

    const newTags = await tagModel.insertMany(
      newTagsName.map((title: string) => ({ title }))
    );

    const allTags = [...existingTags, ...newTags];

    req.body.tags = allTags.map(tag => tag._id);

    next();

  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
