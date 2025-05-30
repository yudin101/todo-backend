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
};
