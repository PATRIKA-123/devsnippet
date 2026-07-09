const express = require("express");
const { getPublicSnippet } = require("../controllers/snippetController");

const router = express.Router();

router.get("/:shareId", getPublicSnippet);

module.exports = router;