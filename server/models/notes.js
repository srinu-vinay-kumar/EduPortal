const mongoose = require("mongoose");

const notes = new mongoose.Schema({
    name: { type: String },
    file: { type: String}
});

module.exports = mongoose.model("notes", notes);
