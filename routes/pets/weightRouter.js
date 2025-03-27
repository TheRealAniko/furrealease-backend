import { Router } from "express";
import {
    getAllWeightEntries,
    getSingleWeightEntry,
    createWeightEntry,
    updateWeight,
    deleteWeightEntry,
} from "../../controllers/pets/weightsController.js";

const weightRouter = Router();

weightRouter.route("/").get(getAllWeightEntries).post(createWeightEntry);

weightRouter
    .route("/:weightId")
    .get(getSingleWeightEntry)
    .patch(updateWeight)
    .delete(deleteWeightEntry);

export default weightRouter;
