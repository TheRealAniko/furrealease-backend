import { Router } from "express";
import {
    getAllPets,
    createPet,
    getSinglePet,
    updatePet,
    retirePet,
} from "../../controllers/pets/petsController.js";
import healthRouter from "./healthRouter.js";
import vetVisitsRouter from "./visitsRouter.js";
import weightRouter from "./weightRouter.js";
import notesRouter from "./notesRouter.js";
import upload from "../../middleware/upload.js";
import authenticate from "../../middleware/authenticate.js";

const petsRouter = Router();

petsRouter.use("/:petId/health", healthRouter);
petsRouter.use("/:petId/vet-visits", vetVisitsRouter);
petsRouter.use("/:petId/weights", weightRouter);
petsRouter.use("/:petId/notes", notesRouter);

petsRouter
    .route("/")
    .get(authenticate, getAllPets)
    .post(authenticate, upload.single("photo"), createPet);

petsRouter.route("/:id").get(getSinglePet).patch(updatePet);

petsRouter.route("/:petId/cloud").patch(retirePet);

export default petsRouter;
