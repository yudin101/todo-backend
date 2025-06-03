import { Request, Response, Router } from "express";

const router = Router();

router.post("/logout", (req: Request, res: Response) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  req.logout((err) => {
    if (err) {
      res.sendStatus(400);
      return;
    }

    res.clearCookie("connect.sid").status(200).send({ message: "Logged out" });
  });
});
export default router;
