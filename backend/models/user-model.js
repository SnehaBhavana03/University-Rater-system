import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_PRIVATE_KEY } from "../config.js";

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  visibility: {
    type: String,
    enum: ["public", "anonymous"],
    default: "public",
  },
});

schema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    JWT_PRIVATE_KEY
  );
};

const User = mongoose.model("user", schema);

export default User;
