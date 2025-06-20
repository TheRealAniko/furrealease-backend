import { isValidObjectId } from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import getPetById from "../../utils/getPetById.js";

// createMedicationEntry
export const createMedicationEntry = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { body } = req;
    const { type, ...entryData } = body;

    if (type === "vaccinations") {
        pet.vaccinations.push(entryData);
    } else if (type === "medications") {
        pet.medications.push(entryData);
    } else {
        throw new errorResponse("Invalid entry type", 400);
    }
    await pet.save();

    res.status(201).json({ message: "Entry added", entry: entryData });
});

// updateHealthEntry
export const updateHealthEntry = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { entryId } = req.params;
    const { type, ...updateData } = req.body;

    let entryToUpdate;

    if (type === "vaccinations") {
        entryToUpdate = pet.vaccinations.id(entryId);
    } else if (type === "medications") {
        entryToUpdate = pet.medications.id(entryId);
    } else {
        throw new errorResponse("Invalid entry type", 400);
    }
    if (!entryToUpdate) {
        throw new errorResponse("Entry not found", 404);
    }
    Object.assign(entryToUpdate, updateData);
    await pet.save();
    res.status(201).json({ message: "Entry updated", entry: entryToUpdate });
});

// deleteHealthEntry
export const deleteHealthEntry = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { entryId } = req.params;
    const { type } = req.body;

    let entryToDelete;

    if (type === "vaccinations") {
        entryToDelete = pet.vaccinations.id(entryId);
    } else if (type === "medications") {
        entryToDelete = pet.medications.id(entryId);
    } else {
        throw new errorResponse("Invalid entry type", 400);
    }

    if (!entryToDelete) {
        throw new errorResponse("Entry not found", 404);
    }

    entryToDelete.remove();
    await pet.save();

    res.json({ message: "Entry deleted" });
});
