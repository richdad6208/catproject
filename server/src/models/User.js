import mongoose from "mongoose";
const { Schema } = mongoose;
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);
const UserSchema = new Schema(
  {
    shortId: { type: String, default: nanoid(10) },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    userName: { type: String, required: true },
  },
  { collection: "User" }
);
const User = mongoose.model("User", UserSchema);

export default User;
