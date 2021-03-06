const router = require("express").Router();
const Playlists = require("./playlists-model");

router.get("/", async (req, res) => {
  res.status(200).json({ api: "good" });
});

router.post("/view", async (req, res) => {
  const { playlist, creator } = req.body;
  const result = await Playlists.findPlaylistByIdAndPlaylistName(
    playlist,
    creator
  );
  result.length
    ? res.status(200).json(result)
    : res.status(200).json({ err: "No playlist found" });
  console.log(result);
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

router.post("/add", async (req, res) => {
  const { playlist, creator, name, url } = req.body;
  try {
    const result = await Playlists.addSongFindPlaylistInsertSongToPlaylist(
      playlist,
      creator,
      name,
      url
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
    console.log({ err: err.message });
  }
});

router.post("/find", async (req, res) => {
  const { creator } = req.body;
  const result = await Playlists.findPlaylistBy({ creator });
  res.status(200).json(result);
  console.log(result);
});

module.exports = router;
