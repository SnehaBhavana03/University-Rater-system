import express from "express";
import Rating from "../models/rating-model.js";
import University from "../models/university-model.js";
import { sendErrorResp } from "../utils.js";

const ratingsRouter = express.Router();

ratingsRouter.post("/:univId", async (req, res) => {
  try {
    const univId = req.params.univId;
    const userId = req.query.userId;
    const answers = req.body;

    let noOfQnsAnswered = 0;
    let finalRating = 0;
    const transformedAnswers = Object.keys(answers).map((qnId) => {
      noOfQnsAnswered += 1;
      finalRating += answers[qnId];

      return {
        questionId: qnId,
        answer: answers[qnId],
      };
    });

    await Rating.findOneAndUpdate(
      {
        universityId: univId,
        userId: userId,
      },
      {
        answers: transformedAnswers,
        universityId: univId,
        userId: userId,
        overallRating: finalRating / noOfQnsAnswered,
      },
      {
        upsert: true,
      }
    );

    await updateUniversityRatingSummary(univId);

    return res.send(
      "Your rating has submitted successfully. Thank you for rating!!"
    );
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

ratingsRouter.get("/:univId", async (req, res) => {
  try {
    const univId = req.params.univId;
    const userId = req.query.userId;
    const ratingRec = await Rating.findOne({
      universityId: univId,
      userId: userId,
    });
    const answers = {
      overallRating: 0,
      answers: {},
    };
    if (ratingRec) {
      ratingRec.answers.forEach((ans) => {
        answers.answers[ans.questionId] = ans.answer;
      });
      answers.overallRating = ratingRec.overallRating;
    }

    return res.json(answers);
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

ratingsRouter.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;

    const ratingRecs = await Rating.find({ userId: userId }).populate(
      "universityId"
    );

    return res.json(ratingRecs);
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

ratingsRouter.delete("/:univId", async (req, res) => {
  try {
    const univId = req.params.univId;
    const userId = req.query.userId;

    await Rating.findOneAndDelete({ universityId: univId, userId: userId });

    await updateUniversityRatingSummary(univId);

    return res.send("Rating deleted successfully.");
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

ratingsRouter.get("/others/:univId", async (req, res) => {
  try {
    const ratings = await Rating.find({
      universityId: req.params.univId,
      userId: { $ne: req.query.userId },
    })
      .populate("userId")
      .populate("answers.questionId");

    const newRatings = [];

    ratings.forEach((rating) => {
      const modifiedRating = {
        _id: rating._id,
        overallRating: rating.overallRating,
        answers: rating.answers,
        universityId: rating.universityId,
        userId: { ...rating.userId },
      };
      if (rating.userId.visibility === "anonymous") {
        modifiedRating.userId.name = "Anonymous";
        delete modifiedRating.userId.firstName;
        delete modifiedRating.userId.lastName;
      } else {
        modifiedRating.userId.name =
          rating.userId.firstName + " " + rating.userId.lastName;
      }
      newRatings.push(modifiedRating);
    });

    return res.json(newRatings);
  } catch (error) {
    return sendErrorResp(res, error);
  }
});

export default ratingsRouter;

/**
 * =========== Utils ============
 */
const updateUniversityRatingSummary = async (univId) => {
  const ratingRecs = await Rating.find(
    { universityId: univId },
    { overallRating: true }
  );

  const noOfRatings = ratingRecs?.length ?? 0;
  const overallRating =
    ratingRecs?.reduce((sum, rec) => {
      sum += rec.overallRating;
      return sum;
    }, 0) ?? 0;

  await University.findByIdAndUpdate(univId, {
    noOfRatings: noOfRatings,
    overallRating: noOfRatings === 0 ? 0 : overallRating / noOfRatings,
  });
};
