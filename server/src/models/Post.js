import mongoose from "mongoose";
import { nanoid } from "nanoid";
const { Schema } = mongoose;
import { CommentSchema } from "./Comment.js";
const today = new Date();
const PostSchema = new Schema(
  {
    shortId: { type: String, default: () => nanoid() },
    view: { type: Number, default: 0 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: String, default: today.toLocaleDateString() },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    comments: [CommentSchema],
  },
  { collection: "Post" }
);
const Post = mongoose.model("Post", PostSchema);

export default Post;
