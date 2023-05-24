import { Router } from "express";

import validateSchema from "../middlewares/validateSchema.middleware.js";
import signUpSchema from "../schemas/signUpSchema.schema.js";
import signInSchema from "../schemas/signInSchema.schema.js";

import { signIn, signUp } from "../controllers/users.controller.js";

const usersRouter = Router();
usersRouter.post("/signup", validateSchema(signUpSchema), signUp);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);

export default usersRouter;