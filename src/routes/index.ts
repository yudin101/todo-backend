import { Router } from "express";
import listRouter from "./list";
import addRouter from "./add";
import deleteRouter from "./delete"
import editRouter from "./edit"

const router = Router();

router.use(listRouter);
router.use(addRouter);
router.use(deleteRouter);
router.use(editRouter);

export default router;
