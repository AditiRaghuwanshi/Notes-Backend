import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  isPinned: {
    type: Boolean, // ← use Boolean, not String
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ← this is better than String
    ref: "User",
    required: true
  },
  createdOn: {
    type: Date,
    default: () => new Date() // cleaner than new Date().getTime()
  },
});


const Notes = mongoose.model("Notes", NotesSchema);
export default Notes;