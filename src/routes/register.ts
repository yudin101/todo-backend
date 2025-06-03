import { Request, Response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { registerCredentials } from "../utils/validationSchema";
import db from "../db/index";
import { hashPassword } from "../utils/helpers";

const router = Router();

router.post(
  "/register",
  checkSchema(registerCredentials),
  (req: Request, res: Response) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      res.status(400).send({ errors: results.array() });
      return;
    }

    const { username, password } = matchedData(req);

    try {
      const addUser = db.prepare(
        "INSERT INTO users (username, password) VALUES (?, ?)",
      );
      addUser.run(username, hashPassword(password));

      res.status(201).send({ message: "User created" });
      return;
    } catch (error) {
      res
        .status(500)
        .send({ errors: `${error ? error : "Internal Server Error"}` });
      return;
    }
  },
);

export default router;
