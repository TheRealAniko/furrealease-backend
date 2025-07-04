import { Router } from "express";
import multer from "multer";
import { transcribeAudio } from "../controllers/transcribeController.js";

const transcribeRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB limit
    },
    fileFilter: (req, file, cb) => {
        // Akzeptiere Audio-Dateien
        if (file.mimetype.startsWith("audio/")) {
            cb(null, true);
        } else {
            cb(new Error("Only audio files are allowed"), false);
        }
    },
});

// ✅ Nur "/" statt "/transcribe", da der Router bereits unter /api/transcribe gemountet wird
transcribeRouter.post("/transcribe", upload.single("audio"), transcribeAudio);

export default transcribeRouter;
