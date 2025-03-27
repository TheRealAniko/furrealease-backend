import { isValidObjectId } from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import getPetById from "../../utils/getPetById.js";

// getAllWeightEntries
export const getAllWeightEntries = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    res.json(pet.weightHistory);
});

// getSingleWeightEntry
export const getSingleWeightEntry = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { weightId } = req.params;
    if (!isValidObjectId(weightId))
        throw new errorResponse("Invalid Weight ID", 400);
    const weight = pet.weightHistory.id(weightId);
    if (!weight)
        throw new errorResponse(
            `Weight with ID of ${weight} doesn't exist`,
            404
        );
    res.json(weight);
});

// createWeightEntry
export const createWeightEntry = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const weightData = req.body;
    pet.weightHistory.push(weightData);
    await pet.save();
    const createdWeight = pet.weightHistory.at(-1);
    res.status(201).json({ message: "Weight added", weight: createdWeight });
});

// updateWeight
export const updateWeight = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { weightId } = req.params;
    if (!isValidObjectId(weightId)) {
        throw new errorResponse("Invalid Weight ID", 400);
    }
    const weightToUpdate = pet.weightHistory.id(weightId);
    if (!weightToUpdate) {
        throw new errorResponse("Weight not found", 404);
    }

    Object.assign(weightToUpdate, req.body);
    await pet.save();
    res.json({ message: "Weight updated", note: weightToUpdate });
});

// deleteWeightEntry
export const deleteWeightEntry = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { weightId } = req.params;
    if (!isValidObjectId(weightId)) {
        throw new errorResponse("Invalid Weight ID", 400);
    }
    const weightToDelete = pet.weightHistory.id(weightId);
    if (!weightToDelete) {
        throw new errorResponse("Weight not found", 404);
    }
    weightToDelete.remove();
    await pet.save();
    res.json({ message: "Weight deleted" });
});
