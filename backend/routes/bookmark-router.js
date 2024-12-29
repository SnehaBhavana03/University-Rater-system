import express from "express";
import Bookmark from "../models/bookmark-model.js";
import { sendErrorResp } from "../utils.js";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/", async (req, res) => {
  try {
    const univId = req.body.universityId;
    const userId = req.query.userId;

    const bookmarkRec = await Bookmark.findOne({
      universityId: univId,
      userId: userId,
    });

    await Bookmark.findOneAndUpdate(
      {
        universityId: univId,
        userId: userId,
      },
      { isBookmarked: !bookmarkRec?.isBookmarked },
      {
        upsert: true,
      }
    );

    return res.send("Updated bookmarks successfully.");
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

bookmarkRouter.get("/:asList?", async (req, res) => {
  try {
    const userId = req.query.userId;

    const bookmarks = await Bookmark.find({
      userId: userId,
      isBookmarked: true,
    }).populate("universityId");

    // If the response selected is list
    if (req.params.asList === "list") {
      return res.json(bookmarks);
    }

    // If the response selected is normal booleans
    const bookmarkObj = {};
    if (bookmarks) {
      bookmarks.forEach((b) => {
        bookmarkObj[b.universityId._id] = b.isBookmarked;
      });
    }

    return res.json(bookmarkObj);
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

export default bookmarkRouter;
