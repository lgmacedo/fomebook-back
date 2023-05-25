import { Router } from "express";

import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";

import { followUser, getFeed, getUser, likePost, newPost } from "../controllers/posts.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import postSchema from "../schemas/postSchema.schema.js";

const postsRouter = Router();
postsRouter.get("/feed", checkAuthorization, getFeed);
postsRouter.post("/new", validateSchema(postSchema), checkAuthorization, newPost);
postsRouter.get("/user/:id", checkAuthorization, getUser);
postsRouter.post("/like", checkAuthorization, likePost);
postsRouter.post("/follow", checkAuthorization, followUser);

export default postsRouter;