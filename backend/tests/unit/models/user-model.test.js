import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_PRIVATE_KEY } from "../../../config";
import User from "../../../models/user-model";

describe("user.generateAuthToken", () => {
  it("Should return valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      firstName: "First Name",
      lastName: "Last Name",
      email: "test@test.com",
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const { _id, ...rest } = payload;
    expect(decoded).toMatchObject({ ...rest, id: _id });
  });
});
