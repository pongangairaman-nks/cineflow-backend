import mongoose from "mongoose";
import { CommentSchema } from "./comment.js";
import { LikeSchema } from "./like.js";

//designing the schema of the user
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  profileUrl: String,
  likesBy: [LikeSchema],
  comments: [CommentSchema]
});

//creation of user model
export default mongoose.model("User", UserSchema);
