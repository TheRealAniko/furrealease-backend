import OpenAI from "openai";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const transcribeAudio = asyncHandler(async (req, res) => {
    const MOCK_MODE = process.env.MOCK_AI === "true";

    // ✅ MOCK RESPONSE
    if (MOCK_MODE) {
        console.log("Mock AI mode enabled. Returning mock transcription.");
        return res.json({
            success: true,
            text: "This is a mock transcription response.",
        });
    }

    // ✅ CHECK FILE
    if (!req.file) {
        throw new errorResponse("Audio file is required", 400);
    }

    // ✅ OPENAI CLIENT
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Temporäre Datei erstellen
    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(
        tempDir,
        `temp_${Date.now()}_${req.file.originalname}`
    );
    fs.writeFileSync(tempFilePath, req.file.buffer);

    try {
        // ✅ WHISPER CALL mit fs.createReadStream
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(tempFilePath),
            model: "whisper-1",
        });

        res.json({
            success: true,
            text: transcription.text,
        });
    } finally {
        // Temporäre Datei löschen
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
    }
});
