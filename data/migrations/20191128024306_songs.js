exports.up = function(knex) {
  return knex.schema.createTable("songs", song => {
    song.increments();
    song.string("name").notNullable();
    song.string("url").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("songs");
};
