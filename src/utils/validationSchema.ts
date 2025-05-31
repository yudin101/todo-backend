import { Schema } from "express-validator";

export const todoValidation: Schema = {
  todo: {
    in: ["body"],
    isString: {
      errorMessage: "Given todo must be a string",
    },
    isLength: {
      options: {
        min: 5,
        max: 100,
      },
      errorMessage: "Todo must be 5-100 characters long",
    },
  },
  deadline: {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Deadline must be a string.",
    },
    matches: {
      options: [/^\d{4}-\d{2}-\d{2}$/],
      errorMessage: "Deadline must be in YYYY-MM-DD format",
    },
    isISO8601: {
      errorMessage: "Deadline must be a valid calendar date",
    },
  },
};
