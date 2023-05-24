import { Router } from "express";

import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";

import { getFeed } from "../controllers/posts.controller.js";

const postsRouter = Router();
postsRouter.get("/feed", checkAuthorization, getFeed);

export default postsRouter;