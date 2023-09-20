import mongoose from "mongoose";
const { Schema } = mongoose;
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { collection: "Post" }
);
const Post = mongoose.model("Post", PostSchema);

export default Post;
