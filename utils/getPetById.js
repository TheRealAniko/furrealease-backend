import Pet from "../motels/Pet.js";
import { isValidObjectId } from "mongoose";
import errorResponse from "./errorResponse.js";

const getPetById = async (petId) => {
    if (!isValidObjectId(petId)) {
        throw new errorResponse("Invalid Pet ID", 400);
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
        throw new errorResponse("Pet not found", 400);
    }

    return pet;
};

export default getPetById;
