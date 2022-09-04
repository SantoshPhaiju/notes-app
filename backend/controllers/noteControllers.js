const Note = require("../models/NotesModel");
const { validationResult } = require("express-validator");
const validator = require("validator");

// Controller 1 for adding the note into the database.
const addNote = async (req, res) => {
  const { title, description, category } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const note = await Note.create({
      title,
      description,
      category,
      user: req.user._id,
    });
    if (note) {
      res.status(200).send({ success: true, data: note });
    } else {
      res.status(400).send({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
    console.log(error);
  }
};

// Controller 2 for fetching all the notes from the database according to the user
const fetchNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    if (notes) {
      res.status(200).json({ data: notes });
    } else {
      res.status(400).send({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Controller 3 for fetching single note by id

const getNote = async (req, res) => {
  const id = req.params.id;

  try {
    const note = await Note.find({ _id: id, user: req.user._id });
    if (note) {
       res.status(200).send({ note: note });
    } else {
     res.status(400).send("Note not found");
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
    // console.log(error);
  }
};

// Controller 4 for updating the note according to the note id
const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, category } = req.body;

  try {
    const newNote = {};
    if (title) {
      if (!validator.isLength(title, { min: 3 })) {
        return res
          .status(400)
          .send({ error: "Title must be at least 3 character long" });
      } else {
        newNote.title = title;
      }
    }
    if (description) {
        if (!validator.isLength(description, { min: 6 })) {
            return res
              .status(400)
              .send({ error: "description must be at least 6 character long" });
          } else {
            newNote.description = description;
          }
    }
    if (category) {
      newNote.category = category;
    }

    const note = await Note.findById(noteId);
    if (note.user.toString() !== req.user.id) {
      res.status(400).send({ error: "Not a valid user" });
    } else {
      if (note) {
        const updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { $set: newNote },
          { new: true }
        );
        if (updateNote) {
          res.status(201).send({ updatedNote: updatedNote });
        } else {
          res.status(400).send({ error: "Note not updated" });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
    console.log(error);
  }
};


// Controller 5 for deleting note using noteid
const deleteNote = async (req, res) =>{
    const noteId = req.params.id;

    try {
        const note = await Note.findById(noteId);
        if(note){
            if(note.user.toString() !== req.user.id){
                return res.status(400).send({error: "Not a valid user"})
            }else{
                const deletedNote = await Note.findByIdAndDelete(noteId);
                res.status(200).send({success: true, result: "Note has been successfully deleted", note:deletedNote});
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
}

module.exports = { addNote, fetchNotes, getNote, updateNote, deleteNote };
