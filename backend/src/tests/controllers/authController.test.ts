import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import OTP from "../../models/OTP";

describe("Auth Tests", () => {
  let userToken; // global token

  
  beforeAll(async () => {
    // Create a user to test with
    await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "johndoe@test.com",
      password: "randompass123",
      username: "johnnydoe",
    });

    // Login to get token
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "johndoe@test.com",
      password: "randompass123",
    });

    userToken = loginResponse.body.token;
  });

  // Cleanup after tests
  afterAll(async () => {
    await User.deleteMany({});
    await OTP.deleteMany({});
  });

  
  it("can create new user account", async () => {
    const newUser = {
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      username: "testuser",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy(); 
  });

  // Duplicate email test
  it("blocks registration with existing email", async () => {
    const duplicateUser = {
      name: "Duplicate User",
      email: "johndoe@test.com",
      password: "anotherpassword",
      username: "duplicateuser",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(duplicateUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("exists");
  });

  // Login test
  it("allows login with correct credentials", async () => {
    const loginDetails = {
      email: "johndoe@test.com",
      password: "randompass123",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(loginDetails);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  // Failed login test
  it("rejects login with wrong password", async () => {
    const badLoginDetails = {
      email: "johndoe@test.com",
      password: "wrongpassword",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(badLoginDetails);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Invalid");
  });

  // OTP test - basic flow
  it("can send and verify OTP", async () => {
    // Send OTP
    const otpSendResponse = await request(app)
      .post("/api/auth/send-otp")
      .send({ email: "johndoe@test.com" });

    expect(otpSendResponse.status).toBe(200);

    // Get OTP from database
    const otpRecord = await OTP.findOne({ email: "johndoe@test.com" });

    // Verify OTP
    const otpVerifyResponse = await request(app)
      .post("/api/auth/verify-otp")
      .send({
        email: "johndoe@test.com",
        otp: otpRecord?.otp,
      });

    expect(otpVerifyResponse.status).toBe(200);
  });

  // Invalid OTP test
  it("rejects invalid OTP", async () => {
    const response = await request(app).post("/api/auth/verify-otp").send({
      email: "johndoe@test.com",
      otp: "000000",
    });

    expect(response.status).toBe(400);
  });
});
