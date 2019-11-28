exports.seed = function(knex) {
  return knex("songs_playlists").insert([
    { playlist_id: 1, song_id: 1, creator: 22 },
    { playlist_id: 1, song_id: 2, creator: 22 },
    { playlist_id: 2, song_id: 3, creator: 33 },
    { playlist_id: 2, song_id: 4, creator: 33 }
  ]);
};
