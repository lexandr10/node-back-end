import express from "express";
import authController, { signout } from "../controllers/authController.js";
import emptyMiddleware from "../middlewares/emptyMiddleware.js";
import validateBody from "../decorators/validateBody.js";
import { SchemaSignin, SchemaSignup } from "../schema/userSchema.js";
import authenticate from "../middlewares/authenticate.js";
import { getCurrent } from "../controllers/authController.js";

const authRouter = express.Router();


authRouter.post("/signup", emptyMiddleware, validateBody(SchemaSignup), authController.singup);
authRouter.post("/signin", emptyMiddleware, validateBody(SchemaSignin), authController.signin);
authRouter.get("/current", authenticate, getCurrent)
authRouter.post("/signout", authenticate, signout)


export default authRouter;