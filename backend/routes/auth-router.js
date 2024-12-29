import express from "express";
import User from "../models/user-model.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email: origEmail, password } = req.body;

  if (!origEmail || !password) {
    return res.status(400).send("Missing Email / Password");
  }

  const email = origEmail.toLowerCase().trim();

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(400).send("Invalid Email / Password");
  }

  return res.send(user.generateAuthToken());
});

authRouter.post("/register", async (req, res) => {
  const userInfo = req.body;

  if (
    !userInfo ||
    !userInfo?.email ||
    !userInfo?.password ||
    !userInfo?.firstName ||
    !userInfo?.lastName
  ) {
    return res.status(400).send("Missing Data");
  }

  const email = userInfo.email.toLowerCase().trim();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).send("Email already taken.");
  }

  const newUser = await User.create(req.body);

  return res.send(newUser.generateAuthToken());
});

export default authRouter;
