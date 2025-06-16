import { Router } from "express";
import {
    createMedication,
    updateMedication,
    deleteMedication,
} from "../../controllers/pets/medicationsController.js";

const medicationsRouter = Router({ mergeParams: true });

// medicationsRouter.route("/").get(getAllHealthEntries).post(createHealthEntry);
medicationsRouter.route("/").post(createMedication);

medicationsRouter
    .route("/:medId")
    .patch(updateMedication)
    .delete(deleteMedication);

export default medicationsRouter;
