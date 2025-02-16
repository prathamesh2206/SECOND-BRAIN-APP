"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("DB_URL:", process.env.DB_URL); // Debugging
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging
console.log("SALT_ROUNDS:", process.env.SALT_ROUNDS); // Debugging
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_SECRET = "prathamxxc";
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const usernameSchema = zod_1.z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(30, { message: "Username must not exceed 30 characters" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "Username must be alphanumeric" })
        .nonempty({ message: "Username is required" });
    const passwordSchema = zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(30, { message: "Password must not exceed 30 characters" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "Password must be alphanumeric" })
        .nonempty({ message: "Password is required" });
    try {
        const validatedUsername = usernameSchema.parse(username);
        const validatedPassword = passwordSchema.parse(password);
        const saltRounds = 3;
        const hashedPassword = yield bcrypt_1.default.hash(validatedPassword, saltRounds);
        const userExist = yield db_1.userModel.findOne({
            username: username,
        });
        const response = yield db_1.userModel.create({
            username: validatedUsername,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(411).json({
                message: "Validation failed",
                errors: error.errors.map((e) => e.message),
            });
            return;
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            res.status(403).json({ error: `${field} already exists` });
        }
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const response = yield db_1.userModel.findOne({ username });
        if (!response) {
            res.status(403).json({
                msg: "Wrong username",
            });
            return;
        }
        const userValid = yield bcrypt_1.default.compare(password, response.password);
        if (!userValid) {
            res.status(403).json({
                msg: "Wrong password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: response._id }, JWT_SECRET);
        res.status(200).json({
            msg: "Sign in was successful",
            token,
        });
    }
    catch (err) {
        console.error("Error during sign-in:", err);
        res.status(500).json({
            msg: "Internal server error",
            err,
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, middleware_1.getTagsId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { type, link, title, tags } = req.body;
    try {
        const response = yield db_1.contentModel.create({
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
    }
    catch (err) {
        res.status(500).json({
            message: "error occurred while creating a content",
            err: err,
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const response = yield db_1.contentModel
            .find({ userId })
            .populate("userId", "username");
        if (response.length > 0) {
            res.status(200).json({ contents: response });
        }
        else {
            res.status(404).json({
                msg: "No content found for this user.",
            });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Internal server error. Please try again later.",
        });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const userId = req.body.userId;
    try {
        const response = yield db_1.contentModel.deleteOne({
            _id: contentId,
            userId: userId,
        });
        if (response) {
            res.status(200).json({
                message: "content deleted sucessfully",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: "internal server error",
            error: err,
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    const userId = req.userId;
    try {
        if (share) {
            if (!userId) {
                res.status(400).json({
                    msg: "User id is required",
                });
                return;
            }
            const id = userId.toString();
            const hash = crypto_1.default.createHash("sha256").update(id).digest("hex");
            const link = yield db_1.linkModel.create({
                hash,
                userId,
            });
            if (link) {
                res.status(200).json({
                    link: hash,
                });
            }
        }
        else {
            db_1.linkModel.deleteOne({
                userId: userId
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: "Internal server error",
            error: err,
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const response = yield db_1.linkModel
            .findOne({ hash });
        if (response) {
            const content = yield db_1.contentModel.find({ userId: response.userId })
                .populate("userId", "username");
            res.status(200).json({
                data: content
            });
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
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://prathammx:password07@cluster0.tiys7.mongodb.net/second-brain", {
                serverSelectionTimeoutMS: 50000,
            });
        }
        catch (err) {
            console.log(err);
        }
        app.listen(3000);
    });
}
main();
