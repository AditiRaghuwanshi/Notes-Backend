import Notes from "../models/notes.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";




export const addNotes = async (req, res) => {
  try {
    console.log("Request Body in addNotes:", req.body);
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
      return res.status(400).json({ error: true, message: "Content is required" });
    }

    const isNotes = await Notes.findOne({ content, title });
    if (isNotes) {
      return res.status(409).json({
        error: true,
        message: "This Note already exists",
      });
    }

    const note = new Notes({
      title,
      tags: tags || [],
      content,
      userId,
      isPinned: false,
    });

    await note.save();

    const accessToken = jwt.sign(
      {
        id: note._id,
        userId: note.userId,
        title: note.title,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "36000m" }
    );

    return res.json({
      error: false,
      accessToken,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    console.error("Add Note Error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};







export const EditNotes = async (req, res) => {
  const noteId = req.params.noteId;
  
  if (!req.body) {
    return res.status(400).json({ error: true, message: "Request body is missing" });
  }

  const { content, title, tags, isPinned } = req.body;
  const userId = req.user.id; // corrected from `req.user.user`

  if (!title && !content && !tags && isPinned === undefined) {
    return res.status(400).json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Notes.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // Only update fields if they are passed
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned === 'boolean') note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error(error); // 🔍 Always log the real error in development
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};






export const AllNotes = async (req, res) => {
  const userId = req.user.id;

try {
    const notes = await Notes.find({ userId }).sort({ isPinned: -1 });

    const accessToken = jwt.sign(
      { id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "36000m" }
    );

    return res.json({
      error: false,
      accessToken,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    console.error("AllNotes Error:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};



export const DeleteNotes = async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(noteId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: true, message: "Invalid ID format" });
  }

  const noteObjectId = new mongoose.Types.ObjectId(noteId);
  const userObjectId = new mongoose.Types.ObjectId(userId);
  
  try {
    const note = await Notes.findOne({ _id: noteObjectId, userId: userObjectId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await Notes.deleteOne({ _id: noteObjectId, userId: userObjectId });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};





export const UpdatePinned = async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return res.status(400).json({ error: true, message: "Invalid note ID" });
  }

  if (typeof isPinned !== 'boolean') {
    return res.status(400).json({ error: true, message: "isPinned must be a boolean" });
  }

  try {
    const note = await Notes.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};




export const searchNote = async (req, res) => {
   const userId = req.user.id;
   const {query} = req.query;

   if(!query) {
    return res 
    .status(400)
    .json({error: true, message: "search query is required"});
   }
   try {
    const matchingNotes = await Notes.find({
      userId,
      $or: [
        {title: {$regex: new RegExp(query, "i")}},
        {content: {$regex: new RegExp(query, "i")}},
      ],
    });
    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Requested Notes Not found. Please search again :(",
    });
    
   } catch(error) {
      return res.status(500).json({
        error: true,
        message: "internal server error",
      })
   }
}



