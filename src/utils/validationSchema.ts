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

export const registerCredentials: Schema = {
  username: {
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
      errorMessage: "Username must be within 5-20 characters",
    },
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must be at least 8 characters long",
    },
  },
};

export const loginCredentials: Schema = {
  username: {
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};
