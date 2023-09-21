import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);
const { Schema } = mongoose;
export const CommentSchema = new Schema(
  {
    shortId: { type: String, default: nanoid(10) },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
