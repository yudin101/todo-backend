import { Request, Response, Router } from "express";
import db from "../db/index";

const router = Router();

router.delete("/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteStmt = db.prepare("DELETE FROM todo_list WHERE id = ?").run(id);

    if (deleteStmt.changes === 0) {
      res.status(404).send({ errors: "Todo not found!" });
      return;
    }

    res.status(200).send({ message: "Todo deleted!" });
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
