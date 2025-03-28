import { Router } from "express";
import { me, signIn, signOut, signUp } from "../controllers/authController.js";
import authenticate from "../middleware/authenticate.js";

const authRouter = Router();

authRouter.get("/me", authenticate, me);
authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.delete("/signout", signOut);

export default authRouter;
