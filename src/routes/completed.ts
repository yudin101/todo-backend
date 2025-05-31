import { Request, Response, Router } from "express";
import db from "../db/index";

const router = Router();

router.patch("/completed/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { is_completed: current_status } = db
      .prepare("SELECT is_completed FROM todo_list WHERE id = ?")
      .get(id) as { is_completed: number };

    const changeStmt = db
      .prepare("UPDATE todo_list SET is_completed = ? WHERE id = ?")
      .run(current_status === 0 ? 1 : 0, id);

    if (changeStmt.changes === 0) {
      res.status(404).send({ errors: "Todo not found!" });
      return;
    }

    res
      .status(200)
      .send({
        message:
          current_status === 0
            ? "Todo marked as completed!"
            : "Todo marked as incomplete!",
      });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ errors: `${error ? error : "Internal Server Error"}` });
  }
});

export default router;
