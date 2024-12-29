import express from "express";
import University from "../models/university-model.js";

const universityRouter = express.Router();

universityRouter.get("/", async (req, res) => {
  const univRecs = await University.find();
  return res.json(univRecs ?? []);
});

universityRouter.get("/:univId", async (req, res) => {
  const univRec = await University.findById(req.params.univId);
  return res.json(univRec ?? {});
});

export default universityRouter;
