import mongoose from "mongoose";
const { Schema } = mongoose;
const CounterSchema = new Schema(
  {
    counter: { type: Number, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { collection: "Counter" }
);
const Counter = mongoose.model("Counter", CounterSchema);

export default Counter;
