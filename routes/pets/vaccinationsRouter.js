import { Router } from "express";
import {
    createVaccination,
    updateVaccination,
    deleteVaccination,
} from "../../controllers/pets/vaccinationsController.js";

const vaccinationsRouter = Router({ mergeParams: true });

vaccinationsRouter.route("/").post(createVaccination);

vaccinationsRouter
    .route("/:vaccId")
    .patch(updateVaccination)
    .delete(deleteVaccination);

export default vaccinationsRouter;
