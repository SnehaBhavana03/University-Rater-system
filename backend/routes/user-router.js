import { Router } from "express";
import User from "../models/user-model.js";
import { sendErrorResp } from "../utils.js";

const userRouter = Router();

userRouter.get("/:userId", async (req, res) => {
  const userRec = await User.findById(req.params.userId).select("-password");

  return res.json(userRec);
});

userRouter.post("/:userId", async (req, res) => {
  try {
    const { visibility } = req.body;
    await User.findByIdAndUpdate(req.params.userId, {
      visibility,
    });

    return res.send("Updated user details successfully.");
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

export default userRouter;
