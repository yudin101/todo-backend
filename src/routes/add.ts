import { Request, Response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { todoValidation } from "../utils/validationSchema";
import db from "../db/index";

const router = Router();

router.post(
  "/add",
  checkSchema(todoValidation),
  (req: Request, res: Response) => {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }

    const { todo, deadline } = matchedData(req);
    const { id: userId } = req.user;

    try {
      const insert = db.prepare(
        "INSERT INTO todo_list (user_id, todo, deadline) VALUES (?, ?, ?)",
      );
      insert.run(userId, todo, deadline);

      res.status(201).send({ message: "Todo added!" });
      return;
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ errors: `${error ? error : "Internal Server Error"}` });
      return;
    }
  },
);

export default router;
