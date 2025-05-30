import { Request, Response, Router } from "express";
import db from "../db/index";
import { Todo } from "../utils/types";

const router = Router();

router.get("/list", (req: Request, res: Response) => {
  const todos = db.prepare("SELECT * FROM todo_list").all() as Todo[];
  res.status(200).send(todos);
});

router.get("/list/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = db
      .prepare("SELECT * FROM todo_list WHERE id = ?")
      .get(id) as Todo;

    if (todo === undefined) {
      res.status(404).send({ errors: "Todo not found!" });
      return;
    }

    res.status(200).send(todo);
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ errors: `${error ? error : "Internal Server Error"}` });
    return;
  }
});

export default router;
