import supertest from "supertest";
import app from "../../index.js";
import User from "../../models/user-model";

let user;

beforeAll(async () => {
  await User.deleteMany({});
  user = await User.create({
    email: "abcd@gmail.com",
    password: "abcdefgh",
    firstName: "Test",
    lastName: "Test",
  });
});

afterAll(async () => {
  await User.deleteMany({});
});

describe("User Router", () => {
  it("should return the user details for the provided user id", async () => {
    const res = await supertest(app).get(
      `/api/user/${user?._id?.toHexString()}`
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("firstName", user?.firstName);
  });

  it("should update the user details for the provided user id and valid changes", async () => {
    const res = await supertest(app)
      .post(`/api/user/${user?._id?.toHexString()}`)
      .send({
        visibility: "anonymous",
      });
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Updated user details successfully.");
  });
});
