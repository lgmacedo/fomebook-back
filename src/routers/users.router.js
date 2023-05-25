import { Router } from "express";

import validateSchema from "../middlewares/validateSchema.middleware.js";
import signUpSchema from "../schemas/signUpSchema.schema.js";
import signInSchema from "../schemas/signInSchema.schema.js";

import { getFollowers, getFollowing, signIn, signUp } from "../controllers/users.controller.js";
import checkAuthorization from "../middlewares/checkAuthorization.middleware.js";

const usersRouter = Router();
usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);
usersRouter.get("/followers", checkAuthorization, getFollowers);
usersRouter.get("/following", checkAuthorization, getFollowing);

export default usersRouter;