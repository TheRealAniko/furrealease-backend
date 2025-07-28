import { Router } from "express";
import { upDateUser } from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";

const userRouter = Router();

userRouter.patch("/", authenticate, upload.single("photo"), upDateUser);

export default userRouter;
