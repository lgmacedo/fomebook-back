import { Router } from "express";

import validateSchema from "../middlewares/validateSchema.middleware.js";
import signUpSchema from "../schemas/signUpSchema.schema.js";
import signInSchema from "../schemas/signInSchema.schema.js";

import { getFollowers, getFollowing, getUsers, signIn, signUp } from "../controllers/users.controller.js";
import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";

const usersRouter = Router();
usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/followers", checkAuthorization, getFollowers);
usersRouter.get("/following", checkAuthorization, getFollowing);
usersRouter.post("/search", checkAuthorization, getUsers);

export default usersRouter;