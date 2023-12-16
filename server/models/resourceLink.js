const mongoose = require("mongoose");

const resourceLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const ResourceLink = mongoose.model("resourceLink", resourceLinkSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
      url: Joi.url().required().label("url"),
  });
  return schema.validate(data);
};

module.exports = { ResourceLink, validate };
