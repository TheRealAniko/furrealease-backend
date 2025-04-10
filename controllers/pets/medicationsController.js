import { isValidObjectId } from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import getPetById from "../../utils/getPetById.js";

// create medication
export const createMedication = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const medicationData = req.body;
    pet.medications.push(medicationData);
    await pet.save();
    const createMedication = pet.medications.at(-1);
    res.status(201).json({
        message: "Medication added",
        medications: createMedication,
    });
});
// updateMedication
export const updateMedication = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { medId } = req.params;
    if (!isValidObjectId(medId)) {
        throw new errorResponse("Invalid Meidication ID", 400);
    }
    const medToUpdate = pet.medications.id(medId);
    if (!medToUpdate) {
        throw new errorResponse("Medication not found", 404);
    }

    Object.assign(medToUpdate, req.body);
    await pet.save();
    res.json({ message: "Medication updated", note: medToUpdate });
});

// deleteMedication
export const deleteMedication = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { medId } = req.params;

    if (!isValidObjectId(medId)) {
        throw new errorResponse("Invalid Medication ID", 400);
    }

    const exists = pet.medications.some(
        (entry) => entry._id.toString() === medId
    );

    if (!exists) {
        throw new errorResponse("Medication not found", 404);
    }

    pet.medications = pet.medications.filter(
        (entry) => entry._id.toString() !== medId
    );

    await pet.save();
    res.json({ message: "Medication deleted" });
});
