const router = require("express").Router();
const playlistsRouter = require("../playlists/playlists-router");

router.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

router.use("/playlists", playlistsRouter);

module.exports = router;
