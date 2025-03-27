import { Router } from "express";
import {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote,
} from "../../controllers/pets/notesController.js";

const notesRouter = Router();

notesRouter.route("/").get(getAllNotes).post(createNote);

notesRouter
    .route("/:noteId")
    .get(getSingleNote)
    .patch(updateNote)
    .delete(deleteNote);

export default notesRouter;
