const express = require("express");
const cors = require("cors");
const notes = require("../data/notes");
const connnectToDb = require("../config/db");
const dotenv = require("dotenv");
const path = require("path")
const { errorHandler, notFound } = require("../middlewares/errorMiddleware");

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors());
connnectToDb();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("This api is running here");
});

app.use(express.static(path.join(__dirname, "./uploads")))

// Routes for the api

app.use("/api/auth", require("../routes/auth"));
// app.use("/api/notes", require("../routes/notes"))



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend running on the http://localhost:${port}`);
});
