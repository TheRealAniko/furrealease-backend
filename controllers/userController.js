import { isValidObjectId } from "mongoose";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

export const upDateUser = asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const body = req.body;

    // Optionales Foto (kommt von Multer + Cloudinary)
    if (req.file) {
        body.photoUrl = req.file.path; // 🌤 Cloudinary liefert URL über `.path`
    }

    // User aktualisieren inkl. evtl. photoUrl
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) {
        throw new errorResponse(`User with id of ${userId} doesn't exist`, 400);
    }

    res.status(200).json(updatedUser);
});
