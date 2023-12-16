const router = require("express").Router();
const { ResourceLink, validate } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const resource = await ResourceLink.findOne({ url: req.body.url });
    if (resource)
      return res
        .status(409)
        .send({ message: "URL resource already exits!" });

    await new ResourceLink(req.body).save();
    res.status(201).send({ message: "Resources updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get('/', async (req, res) => {
    const resources = await ResourceLink.find().sort('-date');
    res.json(resources);
})

module.exports = router;
