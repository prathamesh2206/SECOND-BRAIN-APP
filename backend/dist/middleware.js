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
exports.getTagsId = exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config();
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const SECRET = process.env.JWT_SECRET || "your_secret_key";
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
});
exports.userMiddleware = userMiddleware;
const getTagsId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = req.body.tags;
        const existingTags = yield db_1.tagModel.find({
            title: { $in: tags },
        });
        const existingTagsName = existingTags.map(tag => tag.title);
        const newTagsName = tags.filter((tag) => !existingTagsName.includes(tag));
        const newTags = yield db_1.tagModel.insertMany(newTagsName.map((title) => ({ title })));
        const allTags = [...existingTags, ...newTags];
        req.body.tags = allTags.map(tag => tag._id);
        next();
    }
    catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getTagsId = getTagsId;
