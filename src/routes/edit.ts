import { Request, Response, Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import db from "../db/index";
import { todoValidation } from "../utils/validationSchema";

const router = Router();

router.patch(
  "/edit/:id",
  checkSchema(todoValidation),
  (req: Request, res: Response) => {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
    }

    const { id: todoId } = req.params;
    const { todo, deadline: newDeadline } = matchedData(req);
    const { id: userId } = req.user;

    try {
      const { deadline: existingDeadline } = db
        .prepare("SELECT deadline FROM todo_list WHERE id = ? AND user_id = ?")
        .get(todoId, userId) as { deadline: string };

      let deadlineToUse = newDeadline;

      if (newDeadline === undefined) {
        deadlineToUse = existingDeadline;
      }

      const update = db
        .prepare("UPDATE todo_list SET todo = ?, deadline = ? WHERE id = ? AND user_id = ?")
        .run(todo, deadlineToUse, todoId, userId);

      if (update.changes === 0) {
        res.status(404).send({ errors: "Todo not found!" });
        return;
      }

      res.status(200).send({ message: "Todo updated!" });
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
