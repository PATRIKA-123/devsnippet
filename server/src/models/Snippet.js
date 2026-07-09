const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "javascript",
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    shareId: {
      type: String,
      unique: true,
      sparse: true, 
    },
  },
  { timestamps: true }
);

snippetSchema.index(
  { title: "text", code: "text" },
  { language_override: "textLanguage" }
);

module.exports = mongoose.model("Snippet", snippetSchema);