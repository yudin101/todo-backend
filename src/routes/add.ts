import { Request, Response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { todoValidation } from "../utils/validationSchema";
import db from "../db/index";

const router = Router();

router.post(
  "/add",
  checkSchema(todoValidation),
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }

    const { todo } = matchedData(req);

    try {
      const insert = db.prepare("INSERT INTO todo_list (todo) VALUES (?)");
      insert.run(todo);

      res.status(200).send({ message: "Todo added!" });
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
