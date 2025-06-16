import { isValidObjectId } from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import getPetById from "../../utils/getPetById.js";

// create vaccination
export const createVaccination = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const vaccinationData = req.body;
    pet.vaccinations.push(vaccinationData);
    await pet.save();
    const createVaccination = pet.vaccinations.at(-1);
    res.status(201).json({
        message: "Vaccination added",
        vaccinations: createVaccination,
    });
});

// updateVaccination
export const updateVaccination = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { vaccId } = req.params;
    if (!isValidObjectId(vaccId)) {
        throw new errorResponse("Invalid Vaccination ID", 400);
    }
    const vaccToUpdate = pet.vaccinations.id(vaccId);
    if (!vaccToUpdate) {
        throw new errorResponse("Vaccination not found", 404);
    }

    Object.assign(vaccToUpdate, req.body);
    await pet.save();
    res.json({ message: "Vaccination updated", note: vaccToUpdate });
});

// deleteMedication
export const deleteVaccination = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { vaccId } = req.params;

    if (!isValidObjectId(vaccId)) {
        throw new errorResponse("Invalid Vaccination ID", 400);
    }

    const exists = pet.vaccinations.some(
        (entry) => entry._id.toString() === vaccId
    );

    if (!exists) {
        throw new errorResponse("Vaccination not found", 404);
    }

    pet.vaccinations = pet.vaccinations.filter(
        (entry) => entry._id.toString() !== vaccId
    );

    await pet.save();
    res.json({ message: "Vaccination deleted" });
});
