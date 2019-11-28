exports.seed = function(knex) {
  return knex("playlists").insert([
    { name: "Dance", creator: 22 },
    { name: "Groove", creator: 33 }
  ]);
};
