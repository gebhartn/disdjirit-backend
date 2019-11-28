exports.up = function(knex) {
  return knex.schema.createTable("songs_playlists", table => {
    table.increments();
    table.unique(["playlist_id", "creator"]);
    table
      .integer("song_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("songs")
      .onDelete("CASCADE");
    table
      .integer("playlist_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("playlists")
      .onDelete("CASCADE");
    table
      .integer("creator")
      .unsigned()
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("songs_playlists");
};
