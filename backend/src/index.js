const express = require("express");
const cors = require("cors")
const port = process.env.PORT || 8000
const notes = require("../data/notes")

const app = express();
app.use(cors());

app.get("/", (req, res) =>{
    res.send("This api is running here");
})

app.get("/api/notes", (req, res) =>{
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) =>{
    const note = notes.find((n) => n._id === req.params.id);
    res.json(note);
})

app.listen(port, () =>{
    console.log(`Backend running on the http://localhost:${port}`)
})