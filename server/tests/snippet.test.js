require("./setup");
const request = require("supertest");
const app = require("../src/app");

async function createUserAndGetToken(email = "snippetuser@example.com") {
  const res = await request(app).post("/api/auth/signup").send({
    name: "Snippet User",
    email,
    password: "password123",
  });
  return res.body.token;
}

describe("Snippet API", () => {
  describe("POST /api/snippets", () => {
    it("should create a snippet with valid data and auth", async () => {
      const token = await createUserAndGetToken();

      const res = await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Snippet",
          code: "console.log('hi')",
          language: "javascript",
          tags: ["test"],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.snippet.title).toBe("Test Snippet");
      expect(res.body.snippet.language).toBe("javascript");
    });

    it("should reject creating a snippet without auth", async () => {
      const res = await request(app).post("/api/snippets").send({
        title: "No Auth Snippet",
        code: "print('hi')",
        language: "python",
      });

      expect(res.statusCode).toBe(401);
    });

    it("should reject a snippet with missing required fields", async () => {
      const token = await createUserAndGetToken("missingfields@example.com");

      const res = await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "" });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /api/snippets", () => {
    it("should return only the logged-in user's snippets", async () => {
      const tokenA = await createUserAndGetToken("usera@example.com");
      const tokenB = await createUserAndGetToken("userb@example.com");

      await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${tokenA}`)
        .send({ title: "A's Snippet", code: "a", language: "javascript" });

      await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${tokenB}`)
        .send({ title: "B's Snippet", code: "b", language: "python" });

      const res = await request(app)
        .get("/api/snippets")
        .set("Authorization", `Bearer ${tokenA}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.snippets.length).toBe(1);
      expect(res.body.snippets[0].title).toBe("A's Snippet");
    });
  });

  describe("PATCH /api/snippets/:id/favorite", () => {
    it("should toggle the favorite status", async () => {
      const token = await createUserAndGetToken("favuser@example.com");

      const createRes = await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Fav Test", code: "x", language: "javascript" });

      const snippetId = createRes.body.snippet._id;

      const res = await request(app)
        .patch(`/api/snippets/${snippetId}/favorite`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.snippet.isFavorite).toBe(true);
    });
  });

  describe("DELETE /api/snippets/:id", () => {
    it("should delete a snippet owned by the user", async () => {
      const token = await createUserAndGetToken("deleteuser@example.com");

      const createRes = await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Delete Me", code: "x", language: "javascript" });

      const snippetId = createRes.body.snippet._id;

      const res = await request(app)
        .delete(`/api/snippets/${snippetId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);
    });

    it("should not allow deleting another user's snippet", async () => {
      const tokenA = await createUserAndGetToken("ownera@example.com");
      const tokenB = await createUserAndGetToken("ownerb@example.com");

      const createRes = await request(app)
        .post("/api/snippets")
        .set("Authorization", `Bearer ${tokenA}`)
        .send({ title: "Protected", code: "x", language: "javascript" });

      const snippetId = createRes.body.snippet._id;

      const res = await request(app)
        .delete(`/api/snippets/${snippetId}`)
        .set("Authorization", `Bearer ${tokenB}`);

      expect(res.statusCode).toBe(404);
    });
  });
});