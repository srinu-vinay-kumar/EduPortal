const router = require("express").Router();
const ResourceLink = require("../models/resourceLink");

router.post("/", async (req, res) => {
  try {
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
