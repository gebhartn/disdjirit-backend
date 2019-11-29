const db = require("../data/db-config");

module.exports = {
  findPlaylistBy,
  createNewPlaylist,
  findPlaylistByIdAndPlaylistName,
  findSongBy,
  createNewSong,
  addSongFindPlaylistInsertSongToPlaylist
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

// db songs select
function findSongBy(filter) {
  return db("songs").where(filter);
}

// db songs insert
async function createNewSong(song) {
  const [id] = await db("songs").insert(song, "id");
  return findSongBy({ id });
}

// db songs_playlist
async function addSongToPlaylist(song) {
  return db("songs_playlists").insert(song, "id");
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

// composition
async function addSongFindPlaylistInsertSongToPlaylist(
  playlist,
  creator,
  name,
  url
) {
  // insert song to songs db
  const Song = await createNewSong({ name, url });
  // check if playlist exists
  const Playlist = await findPlaylistBy({ name: playlist });
  // if playlist creator matches user id: creator
  if (Playlist.length && Playlist[0].creator === creator) {
    // insert song + playlist to songs_playlists db
    const SongAddedToPlaylist = await addSongToPlaylist({
      playlist_id: parseInt(Playlist[0].id),
      song_id: parseInt(Song[0].id),
      creator: parseInt(creator)
    });
    // return songs_playlist id
    return SongAddedToPlaylist;
  } else {
    // return falsy
    return false;
  }
}
