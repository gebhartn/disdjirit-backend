const router = require("express").Router();
const Playlists = require("./playlists-model");

router.post("/find", async (req, res) => {
  console.log(req.body);
});

router.post("/create", async (req, res) => {
  console.log(req.body);
});

module.exports = router;
