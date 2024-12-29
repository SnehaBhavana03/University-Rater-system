import { verify } from "jsonwebtoken";
import supertest from "supertest";
import { JWT_PRIVATE_KEY } from "../../config.js";
import server from "../../index.js";
import User from "../../models/user-model.js";
const TEST_DETAILS = {
  email: "test@test.com",
  password: "testpass",
  firstName: "First Name",
  lastName: "Last Name",
};

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
});

describe("Authentication Routes", () => {
  let registrationData;

  const execRegister = () => {
    return supertest(server).post("/api/auth/register").send(registrationData);
  };

  const execLogin = () => {
    return supertest(server).post("/api/auth/login").send(registrationData);
  };

  it("should return 400 if request body is missing details", async () => {
    const res = await execRegister();
    expect(res.status).toBe(400);
  });

  it("should return JWT token on successful registration", async () => {
    registrationData = TEST_DETAILS;

    const res = await execRegister();
    expect(res.status).toBe(200);
  });

  it("should return 400 and should show Email already taken when existing email is used", async () => {
    registrationData = TEST_DETAILS;

    const res = await execRegister();
    expect(res.status).toBe(400);
    expect(res.error.text).toEqual("Email already taken.");
  });

  it("should return status 200 and JWT after sending valid credentials to login", async () => {
    registrationData = TEST_DETAILS;

    const res = await execLogin();
    expect(res.status).toBe(200);
    const payload = verify(res.text, JWT_PRIVATE_KEY);
    expect(payload).toHaveProperty("firstName", TEST_DETAILS.firstName);
  });

  it("should return status 400 and should show Invalid Email / Password, if invalid credentials are used for login", async () => {
    registrationData = { ...TEST_DETAILS, password: "changed" };

    const res = await execLogin();
    expect(res.status).toBe(400);
    expect(res.error.text).toEqual("Invalid Email / Password");
  });

  it("should return status 400 and should show Missing Email / Password, if sent incomplete data for login", async () => {
    registrationData = { ...TEST_DETAILS, password: undefined };

    const res = await execLogin();
    expect(res.status).toBe(400);
    expect(res.error.text).toEqual("Missing Email / Password");
  });
});
