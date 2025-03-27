import { Router } from "express";
import {
    gettAllPets,
    createPet,
    getSinglePet,
    updatePet,
    retirePet,
} from "../../controllers/pets/petsController.js";
import healthRouter from "./healthRouter.js";
import vetVisitsRouter from "./visitsRouter.js";
import weightRouter from "./weightRouter.js";
import notesRouter from "./notesRouter.js";

const petsRouter = Router();

petsRouter.use("/:petId/health", healthRouter);
petsRouter.use("/:petId/vet-visits", vetVisitsRouter);
petsRouter.use("/:petId/weights", weightRouter);
petsRouter.use("/:petId/notes", notesRouter);

petsRouter.route("/").get(gettAllPets).post(createPet);

petsRouter.route("/:petId").get(getSinglePet).patch(updatePet);

petsRouter.route("/:petId/cloud").patch(retirePet);

export default petsRouter;
