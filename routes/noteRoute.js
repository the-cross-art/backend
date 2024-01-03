const express = require("express");
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteDetails,
  shareNote,
  searchNotes,
} = require("../controllers/noteController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router
  .route("/notes")
  .get(isAuthenticatedUser, getAllNotes)
  .post(isAuthenticatedUser, createNote);

router
  .route("/notes/:id")
  .get(isAuthenticatedUser, getNoteDetails)
  .put(isAuthenticatedUser, updateNote)
  .delete(isAuthenticatedUser, deleteNote);

router
  .route("/notes/:id/share")
  .post(isAuthenticatedUser, shareNote);

router
  .route("/search")
  .get(isAuthenticatedUser, searchNotes);

module.exports = router;