exports.up = function(knex) {
  return knex.schema.createTable("playlists", playlist => {
    playlist.increments();
    playlist.unique(["name", "creator"]);
    playlist.string("name").notNullable();
    playlist
      .integer("creator")
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("playlists");
};
