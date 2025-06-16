import { Router } from "express";
import {
    getAllVetVisits,
    getSingleVetVisit,
    createVetVisit,
    updateVetVisit,
    deleteVetVisit,
} from "../../controllers/pets/visitController.js";

const vetVisitsRouter = Router({ mergeParams: true });

vetVisitsRouter.route("/").get(getAllVetVisits).post(createVetVisit);

vetVisitsRouter
    .route("/:visitId")
    .get(getSingleVetVisit)
    .patch(updateVetVisit)
    .delete(deleteVetVisit);

export default vetVisitsRouter;
