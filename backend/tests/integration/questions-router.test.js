import supertest from "supertest";
import app from "../../index.js";

describe("Questions Router", () => {
  it("should fetch all the questions divided as categories", async () => {
    const res = await supertest(app).get("/api/questions");
    expect(res.status).toBe(200);
    expect(res.body?.length > 1).toBeTruthy();
    expect(res.body?.[0]).toHaveProperty("label");
    expect(res.body?.[0]).toHaveProperty("questions");
  });
});
