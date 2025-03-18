import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
