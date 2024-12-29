import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: Number,
  question: String,
  type: {
    type: String,
    enum: ["rating", "boolean"],
    default: "rating",
  },
  category: String,
});

const Question = mongoose.model("question", schema);

export default Question;
