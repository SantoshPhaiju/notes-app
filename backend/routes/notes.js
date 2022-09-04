const express = require("express");
const {
  addNote,
  fetchNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");
const fetchuser = require("../middlewares/fetchuser");
const { body } = require("express-validator");

const router = express();

// Route 1: For storing note in the database according to the user loggedin. Login required
router.post(
  "/addnote",
  fetchuser,
  body("title")
    .isString()
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 character long"),
  body("description")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Description must be of atleast 6 character"),
  body("category")
    .isString()
    .not()
    .isEmpty()
    .withMessage("Category cannot be blank"),
  addNote
);

// Route 2: For fetching all the notes from the database. Login required.
router.get("/fetchallnotes", fetchuser, fetchNotes);

// Route 3: Get a single note according to the id, login required
router.get("/getnote/:id", fetchuser, getNote);

// Route 4: For updating the single note using note id. Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  updateNote
);

// Route 5: For deleting the single note from the database according to the notes id. login required
router.delete("/deletenote/:id", fetchuser, deleteNote);




module.exports = router;
