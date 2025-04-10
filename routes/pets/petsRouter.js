import { Router } from "express";
import {
    getAllPets,
    createPet,
    getSinglePet,
    updatePet,
    sleepPet,
    unsleepPet,
} from "../../controllers/pets/petsController.js";
// import healthRouter from "./healthRouter.js";
import medicationsRouter from "./medicationsRouter.js";
import vetVisitsRouter from "./visitsRouter.js";
import weightRouter from "./weightRouter.js";
import notesRouter from "./notesRouter.js";
import upload from "../../middleware/upload.js";
import authenticate from "../../middleware/authenticate.js";

const petsRouter = Router();

// petsRouter.use("/:petId/health", healthRouter);
petsRouter.use("/:petId/medications", medicationsRouter);
petsRouter.use("/:petId/vet-visits", vetVisitsRouter);
petsRouter.use("/:petId/weights", weightRouter);
petsRouter.use("/:petId/notes", notesRouter);

petsRouter
    .route("/")
    .get(authenticate, getAllPets)
    .post(authenticate, upload.single("photo"), createPet);

petsRouter
    .route("/:id")
    .get(getSinglePet)
    .patch(upload.single("photo"), updatePet);

petsRouter.patch("/:id/sleep", sleepPet);
petsRouter.patch("/:id/unsleep", unsleepPet);

export default petsRouter;
