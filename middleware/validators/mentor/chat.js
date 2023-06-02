import { body, checkSchema, validationResult } from "express-validator";
import { existsSync, unlinkSync } from "fs";
import Mentor from "../../../models/Mentor.js";

const errorHandler = (req, res, next) => {
  // handling validation errors
  const validationErrs = validationResult(req);
  if (!validationErrs.isEmpty()) {
    // removing uploaded files
    if (req.hasOwnProperty("file") && existsSync(req.file.path)) {
      unlinkSync(req.file.path);
    }
    return res.status(400).json({ errors: validationErrs.array() });
  }

  next();
};

const createMessageSchema = checkSchema({
  user: {
    in: body,
    isEmpty: {
      negated: true,
      errorMessage: "user is required",
    },
  },
});

export default {
  createMessage: [createMessageSchema, errorHandler],
};
