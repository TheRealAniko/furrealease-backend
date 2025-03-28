import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

const authenticate = asyncHandler((req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new errorResponse("Forbidden", 403);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
});

export default authenticate;
