import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import OTP from "../../models/OTP";

describe("Testing Event Controller", () => {
  let userId: string;
  let userEmail: string;
  let token: string;
  let eventId: string;

  beforeAll(async () => {
    // Create test user
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        username: "testuser",
      });

    userId = registerResponse.body._id;
    userEmail = registerResponse.body.email;

    // Login to get token
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = loginResponse.body.token;
  });

  // Test getting all events (public route)
  test("should get all public events", async () => {
    const response = await request(app).get("/api/events/public/all");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test creating an event
  test("should create a new event", async () => {
    const response = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "My First Event",
        description: "This is a test event",
        date: new Date("2024-12-25"),
        location: "Test Location",
        category: "Test Category",
      });

    console.log("Create event response:", response.status, response.body);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("My First Event");
    eventId = response.body._id;
  });

  // Test getting events created by user
  test("should get created events", async () => {
    const response = await request(app)
      .get("/api/events/created")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test getting events user is registered for
  test("should get registered events", async () => {
    const response = await request(app)
      .get("/api/events/registered")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test getting single event
  test("should get single event by id", async () => {
    const response = await request(app)
      .get(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("My First Event");
  });

  // Test updating event
  test("should update an event", async () => {
    const response = await request(app)
      .put(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Event",
        description: "This is an updated test event",
        date: new Date("2024-12-26"),
        location: "New Location",
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Event");
  });

  // Test register for event
  test("should register for an event", async () => {
    const response = await request(app)
      .post(`/api/events/${eventId}/register`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: userId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Registered successfully");
  });

  // Test unregister from event
  test("should unregister from an event", async () => {
    const response = await request(app)
      .post(`/api/events/${eventId}/unregister`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: userId });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Unregistered successfully");
  });

  // Test getting all events
  test("should get all events when authenticated", async () => {
    const response = await request(app)
      .get("/api/events")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test deleting event
  test("should delete an event", async () => {
    const response = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Event deleted successfully");
  });

  // Test error for deleted event
  test("should return 404 for deleted event", async () => {
    const response = await request(app)
      .get(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
