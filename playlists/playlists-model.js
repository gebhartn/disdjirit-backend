const db = require("../data/db-config");

module.exports = {
  findPlaylistBy,
  createNewPlaylist,
  findPlaylistByIdAndPlaylistName
};

// db playlists select
function findPlaylistBy(filter) {
  return db("playlists").where(filter);
}

// db playlists insert
async function createNewPlaylist(playlist) {
  const [id] = await db("playlists").insert(playlist, "id");
  return findPlaylistBy({ id });
}

// joins
function findPlaylistByIdAndPlaylistName(id, name) {
  return db
    .select("p.name", "s.name", "s.url")
    .from("songs_playlists as sp")
    .join("songs as s", "s.id", "sp.song_id")
    .join("playlists as p", "p.id", "sp.playlist_id")
    .where({ "p.creator": id, "p.name": name });
}