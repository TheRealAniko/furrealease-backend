import { isValidObjectId } from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import getPetById from "../../utils/getPetById.js";

// getAllVetVisits
export const getAllVetVisits = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    res.json(pet.vetVisits);
});

// getSingleVetVisit
export const getSingleVetVisit = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { visitId } = req.params;
    if (!isValidObjectId(visitId))
        throw new errorResponse("Invalid Vet Visit ID", 400);
    const visit = pet.vetVisits.id(visitId);
    if (!visit)
        throw new errorResponse(
            `Vet Visit  with ID of ${visitId} doesn't exist`,
            404
        );
    res.json(visit);
});

// createVetVisit
export const createVetVisit = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const visitData = req.body;
    pet.vetVisits.push(visitData);
    await pet.save();
    const createdVisit = pet.vetVisits.at(-1);
    res.status(201).json({
        message: "Vet Visit added",
        vetVisit: createdVisit,
    });
});

// updateVetVisit
export const updateVetVisit = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { visitId } = req.params;
    if (!isValidObjectId(visitId)) {
        throw new errorResponse("Invalid Vet Visit ID", 400);
    }
    const visitToUpdate = pet.vetVisits.id(visitId);
    if (!visitToUpdate) {
        throw new errorResponse("Vet Visit not found", 404);
    }

    Object.assign(visitToUpdate, req.body);
    await pet.save();
    res.json({ message: "Vet Visit updated", vetVisit: visitToUpdate });
});

// deleteVetVisit
export const deleteVetVisit = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { visitId } = req.params;
    if (!isValidObjectId(visitId)) {
        throw new errorResponse("Invalid Vet Visit ID", 400);
    }
    const visitToDelete = pet.vetVisits.id(visitId);
    if (!visitToDelete) {
        throw new errorResponse("Vet Visit not found", 404);
    }
    visitToDelete.remove();
    await pet.save();
    res.json({ message: "Vet Visit deleted" });
});
