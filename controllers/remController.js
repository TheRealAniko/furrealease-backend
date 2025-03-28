import { isValidObjectId } from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/errorResponse.js";
import Reminder from "../motels/Reminder.js";

// getAllRem
export const getAllRems = asyncHandler(async (req, res, next) => {
    const rems = await Reminder.find({ petOwner: req.userId }).populate(
        "petOwner"
    );
    res.json(rems);
});

// getSingleRem
export const getSingleRem = asyncHandler(async (req, res, next) => {
    const { remId } = req.params;
    if (!isValidObjectId(remId)) throw new errorResponse("Invalid ID", 400);
    const rem = await Reminder.findOne({
        _id: remId,
        petOwner: req.userId,
    }).populate("petOwner");
    if (!rem)
        throw new errorResponse(
            `Reminder with id of ${remId} doesn't exist`,
            400
        );
    res.send(rem);
});

// createRem
export const createRem = asyncHandler(async (req, res, next) => {
    const { body } = req;
    const newRem = await Reminder.create({ ...body, petOwner: req.userId });
    res.status(201).json(newRem);
});

// updateRem
export const updateRem = asyncHandler(async (req, res, next) => {
    const { remId } = req.params;
    const { body } = req;
    if (!isValidObjectId(remId)) throw new errorResponse("Invalid ID", 400);
    const updateRem = await Reminder.findOneAndUpdate(
        { _id: remId, petOwner: req.userId },
        body,
        { new: true }
    ).populate("petOwner");
    if (!updateRem)
        throw new errorResponse(
            `Reminder with id of ${remId} doesn't exist`,
            400
        );
    res.json(updateRem);
});

// deleteRem
export const deleteRem = asyncHandler(async (req, res, next) => {
    const { remId } = req.params;
    if (!isValidObjectId(remId)) throw new errorResponse("Invalid ID", 400);
    const deleteRem = await Reminder.findOneAndDelete({
        _id: remId,
        petOwner: req.userId,
    });
    if (!deleteRem)
        throw new errorResponse(
            `Reminder with id of ${remId} doesn't exist`,
            400
        );
    res.json(deleteRem);
});
