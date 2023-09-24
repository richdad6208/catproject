import mongoose from "mongoose";
import { nanoid } from "nanoid";
const { Schema } = mongoose;
const today = new Date();

export const CommentSchema = new Schema({
  shortId: {
    type: String,
    default() {
      return nanoid();
    },
    require: true,
    index: true,
  },
  content: { type: String, required: true },
  createdAt: { type: String, default: today.toLocaleDateString() },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
