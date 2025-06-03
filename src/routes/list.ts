import { Request, Response, Router } from "express";
import db from "../db/index";
import { Todo } from "../types/Todo";

const router = Router();

router.get("/list", (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  try {
    const todos = db
      .prepare("SELECT * FROM todo_list WHERE user_id = ?")
      .all(req.user.id) as Todo[];
    res.status(200).send(todos);
    return;
  } catch (error) {
    res.sendStatus(500);
    return;
  }
});

export default router;
