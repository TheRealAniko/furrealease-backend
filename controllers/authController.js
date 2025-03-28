import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../motels/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";

// me
export const me = asyncHandler(async (req, res, next) => {
    const {
        user: { id },
    } = req;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
});

// signIn
export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new errorResponse("Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new errorResponse("Invalid credentials", 400);

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });

    res.status(200).json(token);
});

// signOut
export const signOut = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "User signed out (token removed on client)",
    });
});

// signUp
export const signUp = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw new errorResponse("User already exists", 400);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    const payload = { id: newUser._id, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });

    res.status(201).json(token);
});
