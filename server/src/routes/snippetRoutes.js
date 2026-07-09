const express = require("express");
const {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  toggleFavorite,
} = require("../controllers/snippetController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createSnippetSchema, updateSnippetSchema } = require("../validators/snippetValidator");

const router = express.Router();

router.use(protect);

router.post("/", validate(createSnippetSchema), createSnippet);
router.get("/", getSnippets);
router.get("/:id", getSnippetById);
router.put("/:id", validate(updateSnippetSchema), updateSnippet);
router.delete("/:id", deleteSnippet);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;