// import { Router } from "express"
// import { createUser, getUserDetails, userLogin } from "../controllers/userControllers.js";
// import { addNotes, AllNotes, DeleteNotes, EditNotes, searchNote, UpdatePinned } from "../controllers/notesController.js";
// import authenticateToken from "../utilities.js";





// const router = Router();

// router.post("/api/user/createuser", createUser);
// router.post("/", userLogin);
// router.get("/api/user/userdetails",authenticateToken, getUserDetails);
// router.post("/addnote",authenticateToken, addNotes);
// router.put("/editnote/:noteId",authenticateToken, EditNotes);
// router.get("/api/user/allnotes",authenticateToken, AllNotes);
// router.delete("/api/user/deletenote/:noteId",authenticateToken, DeleteNotes);
// router.get("/api/user/search",authenticateToken, searchNote);
// router.put("/api/user/pinnednote/:noteId",authenticateToken, UpdatePinned);


// export default router;





import { Router } from "express";
import { 
  createUser, 
  getUserDetails, 
  userLogin 
} from "../controllers/userControllers.js";
import { 
  addNotes, 
  AllNotes, 
  DeleteNotes, 
  EditNotes, 
  searchNote, 
  UpdatePinned 
} from "../controllers/notesController.js";
import authenticateToken from "../utilities.js";

const router = Router();

// 👇 Removed "/api/user" prefix from all paths
router.post("/createuser", createUser);
router.post("/login", userLogin);
router.get("/userdetails", authenticateToken, getUserDetails);
router.post("/addnote", authenticateToken, addNotes);
router.put("/editnote/:noteId", authenticateToken, EditNotes);
router.get("/allnotes", authenticateToken, AllNotes);
router.delete("/deletenote/:noteId", authenticateToken, DeleteNotes);
router.get("/search", authenticateToken, searchNote);
router.put("/pinnednote/:noteId", authenticateToken, UpdatePinned);

export default router;
