const mongoose = require("mongoose");

const noteFiles = new mongoose.Schema();
const noteChunks = new mongoose.Schema();

const Files = mongoose.model("notes.files", noteFiles);
const Chunks = mongoose.model("notes.chunks", noteChunks);

module.exports = {
    Files,
    Chunks
}

