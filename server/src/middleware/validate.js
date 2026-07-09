const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    

    let issues = [];
    if (Array.isArray(result.error?.issues)) {
      issues = result.error.issues;
    } else if (Array.isArray(result.error?.errors)) {
      issues = result.error.errors;
    }

    const errors = issues.map((e) => ({
      field: Array.isArray(e.path) ? e.path.join(".") : String(e.path ?? ""),
      message: e.message,
    }));

    return res.status(400).json({ message: "Validation failed", errors });
  }

  req.body = result.data;
  next();
};

module.exports = validate;