import { Router } from "express";
import {
    getAllRems,
    getSingleRem,
    createRem,
    updateRem,
    deleteRem,
} from "../controllers/remController.js";

const remRouter = Router();

remRouter.route("/").get(getAllRems).post(createRem);
remRouter.route("/:remId").get(getSingleRem).patch(updateRem).delete(deleteRem);

export default remRouter;
