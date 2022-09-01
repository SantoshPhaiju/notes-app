const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/NewNotesApp";

const connnectToDb = async () => {
  mongoose
    .connect(URI)
    .then(() => console.log("Database successfully connected"))
    .catch((error) => console.log(error));
};

module.exports = connnectToDb;
