const { z } = require("zod");

const createSnippetSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(300).optional(),
  code: z.string().min(1, "Code is required"),
  language: z.string().min(1),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().optional(),
});

const updateSnippetSchema = createSnippetSchema.partial();

module.exports = { createSnippetSchema, updateSnippetSchema };