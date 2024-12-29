import supertest from "supertest";
import app from "../../index.js";
import University from "../../models/university-model.js";

let university;

beforeAll(async () => {
  university = await University.findOne();
});

describe("University Router", () => {
  const exec = (univId = "") => {
    return supertest(app).get(`/api/universities/${univId}`);
  };

  it("should fetch list of universities when no URL parameter is passed", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.body?.length > 1).toBeTruthy();
  });

  it("should fetch the specific university details when university ID is sent as URL parameter", async () => {
    const res = await exec(university?._id);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("name", university?.name);
  });
});
