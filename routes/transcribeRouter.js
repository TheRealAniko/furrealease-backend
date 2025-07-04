import { Router } from "express";
import multer from "multer";
import { transcribeAudio } from "../controllers/transcribeController.js";

const transcribeRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

transcribeRouter.post("/transcribe", upload.single("audio"), transcribeAudio);

export default transcribeRouter;
