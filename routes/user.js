import { Router } from "express"
import { createUser, getUserDetails, userLogin } from "../controllers/userControllers.js";
import { addNotes, AllNotes, DeleteNotes, EditNotes, searchNote, UpdatePinned } from "../controllers/notesController.js";
import authenticateToken from "../utilities.js";





const router = Router();

router.post("/createuser", createUser);
router.post("/", userLogin);
router.get("/userdetails",authenticateToken, getUserDetails);
router.post("/addnote",authenticateToken, addNotes);
router.put("/editnote/:noteId",authenticateToken, EditNotes);
router.get("/allnotes",authenticateToken, AllNotes);
router.delete("/deletenote/:noteId",authenticateToken, DeleteNotes);
router.get("/search",authenticateToken, searchNote);
router.put("/pinnednote/:noteId",authenticateToken, UpdatePinned);


export default router;
