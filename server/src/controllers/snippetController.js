const { nanoid } = require("nanoid");
const Snippet = require("../models/Snippet");

// @route  POST /api/snippets
const createSnippet = async (req, res) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;

    if (!title || !code) {
      return res.status(400).json({ message: "Title and code are required" });
    }

    const snippet = await Snippet.create({
      userId: req.user._id,
      title,
      description,
      code,
      language,
      tags,
      isPublic: !!isPublic,
      shareId: isPublic ? nanoid(10) : undefined,
    });

    res.status(201).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/snippets?tag=&language=&search=
const getSnippets = async (req, res) => {
  try {
    const { tag, language, search } = req.query;
    const filter = { userId: req.user._id };

    if (tag) filter.tags = tag;
    if (language) filter.language = language;
    if (search) filter.$text = { $search: search };

    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ snippets });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/snippets/:id
const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  PUT /api/snippets/:id
const updateSnippet = async (req, res) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;

    const snippet = await Snippet.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (title !== undefined) snippet.title = title;
    if (description !== undefined) snippet.description = description;
    if (code !== undefined) snippet.code = code;
    if (language !== undefined) snippet.language = language;
    if (tags !== undefined) snippet.tags = tags;

    if (isPublic !== undefined) {
      snippet.isPublic = isPublic;
      if (isPublic && !snippet.shareId) {
        snippet.shareId = nanoid(10);
      }
    }

    await snippet.save();
    res.status(200).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  DELETE /api/snippets/:id
const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  PATCH /api/snippets/:id/favorite
const toggleFavorite = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    snippet.isFavorite = !snippet.isFavorite;
    await snippet.save();

    res.status(200).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/public/:shareId  (no auth)
const getPublicSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      shareId: req.params.shareId,
      isPublic: true,
    });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    res.status(200).json({ snippet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  toggleFavorite,
  getPublicSnippet,
};