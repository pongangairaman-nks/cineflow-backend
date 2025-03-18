import mongoose from "mongoose";
import { CommentSchema } from "./comment";
import { LikeSchema } from "./like";

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: String,
  genre: String,
  url: {
    type: String,
    required: true
  }, //link to the video file in the storage (cloud or local)
  posterUrl: {
    type: String,
    required: true
  },
  aiDescription: String,
  likes: {
    type: Number,
    default: 0
  },
  likesBy: [LikeSchema],
  comments: [CommentSchema],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("Video", VideoSchema);
