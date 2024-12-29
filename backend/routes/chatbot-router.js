import express from "express";
import University from "../models/university-model.js";

const chatbotRouter = express.Router();

chatbotRouter.post("/:id?", async (req, res) => {
  const questions = {
    q1: {
      id: "q1",
      question: "Highest rated university",
      answer: async () => {
        const univ = await University.find({ overallRating: { $ne: null } })
          .sort({ overallRating: "desc" })
          .limit(1);

        if (univ && univ[0]) {
          return {
            answer: `${univ[0].name}, is the highest rated.`,
            univId: univ[0]._id,
          };
        }
        return {
          answer: "Sorry, no enough information is available this time.",
        };
      },
    },
    q2: {
      id: "q2",
      question: "Least rated university",
      answer: async () => {
        const univ = await University.find({ overallRating: { $ne: null } })
          .sort({ overallRating: "asc" })
          .limit(1);
        if (univ && univ[0]) {
          return {
            answer: `${univ[0].name}, is the least rated.`,
            univId: univ[0]._id,
          };
        }
        return {
          answer: "Sorry, no enough information is available this time.",
        };
      },
    },
  };

  const { question } = req.body;
  const faqId = req.params.id;

  if (faqId) {
    let answer = questions[faqId];
    if (!answer) {
      return res.json({ answer: "Sorry, no information available this time." });
    }

    const ansResp = await answer.answer?.();
    return res.json(ansResp);
  }

  if (question) {
    return res.json(
      Object.values(questions).map((item) => {
        const temp = { ...item };
        delete item.answer;
        return temp;
      })
    );
  }

  return res.json(await answer.answer());
});

export default chatbotRouter;
