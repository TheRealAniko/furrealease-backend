import { isValidObjectId } from "mongoose";
import Pet from "../../motels/Pet.js";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";

export const getAllPets = asyncHandler(async (req, res, next) => {
    const pets = await Pet.find().populate("petOwner");
    res.json(pets);
});

export const createPet = asyncHandler(async (req, res, next) => {
    const { body, userId } = req;
    const newPet = await (
        await Pet.create({ ...body, petOwner: userId })
    ).populate("petOwner");
    res.status(201).json(newPet);
});

// getSinglePet
export const getSinglePet = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new errorResponse("Invalid id", 400);
    const pet = await Pet.findById(id).populate("petOwner");
    if (!pet)
        throw new errorResponse(`Pet with id of ${id} doesn't exist`, 400);
    res.send(pet);
});

// updatePet
export const updatePet = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    if (!isValidObjectId(id)) throw new errorResponse("Invalid id", 400);
    const updatePet = await Pet.findByIdAndUpdate(id, body, {
        new: true,
    }).populate("petOwner");
    if (!updatePet)
        throw new errorResponse(`Pet with id of ${id} doesn't exist`, 400);
    res.json(updatePet);
});

// retirePet
export const retirePet = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw new errorResponse("Invalid id", 400);
    const pet = await Pet.findByIdAndUpdate(
        id,
        { retired: true },
        { new: true }
    );
    if (!pet)
        throw new errorResponse(`Pet with id of ${id} doesn\t exist`, 400);
    res.json({ message: "Pet successfully retired", pet });
});
