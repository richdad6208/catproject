import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);
const { Schema } = mongoose;
import { CommentSchema } from "./Comment.js";
const PostSchema = new Schema(
  {
    shortId: { type: String, default: nanoid(10) },
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
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
