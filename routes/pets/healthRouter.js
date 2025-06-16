import { Router } from "express";
import {
    getAllHealthEntries,
    getSingleHealthEntry,
    createHealthEntry,
    updateHealthEntry,
    deleteHealthEntry,
} from "../../controllers/pets/healthController.js";

const healthRouter = Router();

healthRouter.route("/").get(getAllHealthEntries).post(createHealthEntry);

healthRouter
    .route("/:entryId")
    .get(getSingleHealthEntry)
    .patch(updateHealthEntry)
    .delete(deleteHealthEntry);

export default healthRouter;
