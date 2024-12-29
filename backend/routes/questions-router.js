import express from "express";
import Question from "../models/question-model.js";

const questionsRouter = express.Router();

questionsRouter.get("/", async (req, res) => {
  const questionsList = await Question.find();

  if (!questionsList) return res.json([]);

  const groupedList = {};
  questionsList.forEach((q) => {
    if (!(q.category in groupedList)) {
      groupedList[q.category] = {
        label: q.category,
        questions: [],
      };
    }
    groupedList[q.category].questions.push(q);
  });

  return res.json(Object.values(groupedList) ?? []);
});

export default questionsRouter;
