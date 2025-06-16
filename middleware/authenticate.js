import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

const authenticate = asyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new errorResponse("No token provided", 403);
    }
    const token = authHeader.split(" ")[1];

    if (!token) throw new errorResponse("Forbidden", 403);

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new errorResponse("Invalid or expired token", 401);
    }
    req.userId = payload.id;

    next();
});

export default authenticate;
