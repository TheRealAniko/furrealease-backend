import { isValidObjectId } from "mongoose";
import asyncHandler from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import getPetById from "../../utils/getPetById.js";

// getAllNotes
export const getAllNotes = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    res.json(pet.notes);
});

// getSingleNote
export const getSingleNote = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { noteId } = req.params;
    if (!isValidObjectId(noteId))
        throw new errorResponse("Invalid Note ID", 400);
    const note = pet.notes.id(noteId);
    if (!note)
        throw new errorResponse(`Note with ID of ${noteId} doesn't exist`, 404);
    res.json(note);
});

// createNote
export const createNote = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const noteData = req.body;
    pet.notes.push(noteData);
    await pet.save();
    const createdNote = pet.notes.at(-1);
    res.status(201).json({ message: "Note added", note: createdNote });
});

// updateNote
export const updateNote = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { noteId } = req.params;
    if (!isValidObjectId(noteId)) {
        throw new errorResponse("Invalid Note ID", 400);
    }
    const noteToUpdate = pet.notes.id(noteId);
    if (!noteToUpdate) {
        throw new errorResponse("Note not found", 404);
    }

    Object.assign(noteToUpdate, req.body);
    await pet.save();
    res.json({ message: "Note updated", note: noteToUpdate });
});

// deleteNote
export const deleteNote = asyncHandler(async (req, res, next) => {
    const pet = await getPetById(req.params.petId);
    const { noteId } = req.params;
    if (!isValidObjectId(noteId)) {
        throw new errorResponse("Invalid Note ID", 400);
    }
    const noteToDelete = pet.notes.id(noteId);
    if (!noteToDelete) {
        throw new errorResponse("Note not found", 404);
    }
    noteToDelete.remove();
    await pet.save();
    res.json({ message: "Note deleted" });
});
