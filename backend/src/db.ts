import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const userModel = mongoose.model("Users", userSchema);

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
});
const tagModel = mongoose.model("Tags", tagSchema);

const contentTypes = ['image', 'video', 'article', 'audio']; 
const contentSchema = new mongoose.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }], 
    userId: { type: mongoose.Types.ObjectId, ref: "Users",required:true } 
});
const contentModel = mongoose.model("Contents", contentSchema);

const linkSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true ,unique:true} });
const linkModel = mongoose.model("Links", linkSchema);

export { userModel, tagModel, contentModel, linkModel };
