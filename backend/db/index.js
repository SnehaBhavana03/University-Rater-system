import mongoose from "mongoose";
import { MONGO_URI, MONGO_URI_TEST } from "../config.js";
import Question from "../models/question-model.js";
import University from "../models/university-model.js";

import questionsList from "../data/questions.json" with { type: "json" };
import universitiesList from "../data/universities.json" with { type: "json" };

const connectToDB = () => {
  mongoose
    .connect(process.env.NODE_ENV === "test" ? MONGO_URI_TEST : MONGO_URI)
    .then(async () => {
      console.log("Connected to MongoDB");

      //   Seed the DB
      await seedUniversities();
      await seedQuestions();
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to connect to MongoDB");
    });
};

export default connectToDB;

const seedUniversities = async () => {
  const alreadySeeded = (await University.countDocuments().limit(1)) > 0;

  if (alreadySeeded) return;

  await University.insertMany(universitiesList);
  console.log("Universities list seeding successful");
};

const seedQuestions = async () => {
  const alreadySeeded = (await Question.countDocuments().limit(1)) > 0;
  if (alreadySeeded) return;

  await Question.insertMany(questionsList);
  console.log("Questions list seeding successful");
};
