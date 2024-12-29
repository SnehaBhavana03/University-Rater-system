import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    universityId: {
      type: mongoose.Types.ObjectId,
      ref: "universities",
    },
    isBookmarked: Boolean,
  },
  {
    timestamps: true,
  }
);

schema.index({ universityId: 1, userId: 1 }, { unique: true });

const Bookmark = mongoose.model("bookmark", schema);

export default Bookmark;
