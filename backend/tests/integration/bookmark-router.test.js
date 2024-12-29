import supertest from "supertest";
import app from "../../index.js";
import Bookmark from "../../models/bookmark-model";
import University from "../../models/university-model.js";
import User from "../../models/user-model.js";

let user;
let university;

beforeAll(async () => {
  await User.deleteMany({});
  await Bookmark.deleteMany();
  user = await User.create({
    email: "abcd@gmail.com",
    password: "abcdefgh",
    firstName: "Test",
    lastName: "Test",
  });
  university = await University.findOne();
});

afterAll(async () => {
  await User.deleteMany({});
  await Bookmark.deleteMany();
});

describe("Bookmark Routes", () => {
  const execPost = () => {
    return supertest(app)
      .post("/api/bookmark")
      .query({ userId: user?._id?.toHexString() })
      .send({
        universityId: university?._id?.toHexString(),
      });
  };

  const execFetch = (asList = "") => {
    return supertest(app)
      .get(`/api/bookmark/${asList}`)
      .query({ userId: user?._id?.toHexString() });
  };

  it("should mark university as favourite, on sending all the valid data", async () => {
    const res = await execPost();
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Updated bookmarks successfully.");
  });

  it("should return object with key universityId and value true on sending valid data", async () => {
    const res = await execFetch();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(university?._id?.toHexString(), true);
  });

  it("should return list of favourite universities on sending format as 'list'", async () => {
    const res = await execFetch("list");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
