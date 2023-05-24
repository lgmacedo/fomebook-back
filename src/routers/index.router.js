import { Router } from "express";

import usersRouter from "./users.router.js";
import postsRouter from "./posts.router.js";

const router = Router();
router.use(usersRouter);
router.use(postsRouter);

export default router;