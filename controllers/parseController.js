import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

export const parseEntry = asyncHandler(async (req, res, next) => {
    const { userInput } = req.body;

    if (!userInput) {
        throw new errorResponse("User input is required", 400);
    }

    // Placeholder response for parsed data
    res.json({
        message: "Parse endpoint hit successfully",
        received: userInput,
    });
});
