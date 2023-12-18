const mongoose = require("mongoose");

const resourceLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const ResourceLink = mongoose.model("resourceLink", resourceLinkSchema);


module.exports = ResourceLink;
