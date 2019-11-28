const router = require("express").Router();
const Playlists = require("./playlists-model");

// router.post("/find", async (req, res) => {
//   console.log(req.body);
// });

router.get("/", async (req, res) => {
  res.status(200).json({ api: "good" });
});

router.post("/create", async (req, res) => {
  const name = req.body.name;
  const test = await Playlists.findPlaylistBy({ name });
  if (test.length) {
    res.status(400).json({ err: "Playlist already exists" });
  } else {
    try {
      const playlist = req.body;
      const result = Playlists.createNewPlaylist(playlist);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
      console.log({ err: err.message });
    }
  }
});

module.exports = router;
