import supertest from "supertest";
import app from "../../index.js";
import Question from "../../models/question-model.js";
import Rating from "../../models/rating-model.js";
import University from "../../models/university-model.js";
import User from "../../models/user-model.js";

let user;
let university;
let questions;
let user2;

let randomRating = {};

beforeAll(async () => {
  await User.deleteMany({});
  await Rating.deleteMany();
  user = await User.create({
    email: "abcd@gmail.com",
    password: "abcdefgh",
    firstName: "Test",
    lastName: "Test",
  });
  user2 = await User.create({
    email: "abcde@gmail.com",
    password: "abcdefgh",
    firstName: "Test",
    lastName: "Test",
    visibility: "anonymous",
  });
  university = await University.findOne();
  questions = await Question.find();

  questions?.forEach((qn) => {
    if (qn?.type === "rating") {
      randomRating[qn?._id?.toHexString()] = Math.floor(Math.random() * 5);
    } else if (qn?.type === "boolean") {
      randomRating[qn?._id?.toHexString()] = Math.round(Math.random()) * 5;
    }
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await Rating.deleteMany();
});

describe("Ratings Router", () => {
  it("should create/update the ratings for the university when valid data is sent", async () => {
    const res = await supertest(app)
      .post(`/api/ratings/${university?._id?.toHexString()}`)
      .query({ userId: user?._id?.toHexString() })
      .send(randomRating);
    expect(res.status).toBe(200);
    expect(res.text).toEqual(
      "Your rating has submitted successfully. Thank you for rating!!"
    );
  });

  it("should return the rating provided by user for the given university", async () => {
    const res = await supertest(app)
      .get(`/api/ratings/${university?._id?.toHexString()}`)
      .query({
        userId: user?._id?.toHexString(),
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("answers", randomRating);
  });

  it("should return all the ratings provided by the user if no paramater is provided", async () => {
    const res = await supertest(app).get(`/api/ratings`).query({
      userId: user?._id?.toHexString(),
    });
    expect(res.status).toBe(200);
    expect(res.body?.length > 0).toBeTruthy();
  });

  it("should delete the ratings provided by the user for the provided university id", async () => {
    const res = await supertest(app)
      .delete(`/api/ratings/${university?._id?.toHexString()}`)
      .query({
        userId: user?._id?.toHexString(),
      });
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Rating deleted successfully.");
  });

  it("should return all the ratings provided by the other users for the given university id", async () => {
    await supertest(app)
      .post(`/api/ratings/${university?._id?.toHexString()}`)
      .query({ userId: user2?._id?.toHexString() })
      .send(randomRating);

    const res = await supertest(app)
      .get(`/api/ratings/others/${university?._id?.toHexString()}`)
      .query({
        userId: user?._id?.toHexString(),
      });
    expect(res.status).toBe(200);
    expect(res.body.length > 0).toBeTruthy();
  });
});
