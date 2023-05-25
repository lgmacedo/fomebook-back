import { Router } from "express";

import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";

import { getFeed, newPost } from "../controllers/posts.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import postSchema from "../schemas/postSchema.schema.js";

const postsRouter = Router();
postsRouter.get("/feed", checkAuthorization, getFeed);
postsRouter.post("/new", validateSchema(postSchema), checkAuthorization, newPost);

export default postsRouter;