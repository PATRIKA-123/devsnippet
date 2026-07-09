require("./setup");
const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  describe("POST /api/auth/signup", () => {
    it("should create a new user with valid data", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("should reject signup with invalid email", async () => {
      const res = await request(app).post("/api/auth/signup").send({
        name: "Test User",
        email: "notanemail",
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Validation failed");
    });

    it("should reject duplicate email signup", async () => {
      await request(app).post("/api/auth/signup").send({
        name: "Test User",
        email: "duplicate@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/auth/signup").send({
        name: "Another User",
        email: "duplicate@example.com",
        password: "password456",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/already in use/i);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/signup").send({
        name: "Login Test",
        email: "logintest@example.com",
        password: "password123",
      });
    });

    it("should login with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "logintest@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should reject login with wrong password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "logintest@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });
});