import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  image: String,
  overallRating: Number,
  noOfRatings: Number,
});

const University = mongoose.model("universities", schema, "universities");
export default University;
