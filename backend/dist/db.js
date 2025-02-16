"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.contentModel = exports.tagModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const userModel = mongoose_1.default.model("Users", userSchema);
exports.userModel = userModel;
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
});
const tagModel = mongoose_1.default.model("Tags", tagSchema);
exports.tagModel = tagModel;
const contentTypes = ['image', 'video', 'article', 'audio'];
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: "Tags" }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "Users", required: true }
});
const contentModel = mongoose_1.default.model("Contents", contentSchema);
exports.contentModel = contentModel;
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "Users", required: true, unique: true }
});
const linkModel = mongoose_1.default.model("Links", linkSchema);
exports.linkModel = linkModel;
