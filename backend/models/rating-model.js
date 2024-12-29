import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Types.ObjectId,
      ref: "universities",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    answers: [
      {
        questionId: {
          type: mongoose.Types.ObjectId,
          ref: "question",
        },
        answer: Number,
      },
    ],
    overallRating: Number,
  },
  {
    timestamps: true,
  }
);

schema.index({ universityId: 1, userId: 1 }, { unique: true });

const Rating = mongoose.model("rating", schema);

export default Rating;
