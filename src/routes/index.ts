import { Router } from "express";
import registerRouter from "./register";
import loginRouter from "./login";
import logourRouter from "./logout"
import listRouter from "./list";
import addRouter from "./add";
import deleteRouter from "./delete";
import editRouter from "./edit";
import completedRouter from "./completed";

const router = Router();

router.use(registerRouter);
router.use(loginRouter);
router.use(logourRouter);
router.use(listRouter);
router.use(addRouter);
router.use(deleteRouter);
router.use(editRouter);
router.use(completedRouter);

export default router;
