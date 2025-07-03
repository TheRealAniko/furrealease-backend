import { Router } from "express";
import { parseEntry } from "../controllers/parseController.js";

const parseRouter = Router();

parseRouter.post("/parse-entry", parseEntry);

export default parseRouter;
