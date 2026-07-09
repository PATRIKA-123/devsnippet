const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const snippetRoutes = require("./routes/snippetRoutes");
const publicRoutes = require("./routes/publicRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(mongoSanitize());
app.use(morgan("dev"));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: { message: "Too many attempts, please try again later" },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: "Too many requests, please try again later" },
});

app.get("/", (req, res) => {
  res.send("DevSnippets API is running");
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/snippets", apiLimiter, snippetRoutes);
app.use("/api/public", apiLimiter, publicRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;