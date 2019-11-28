exports.seed = function(knex) {
  return knex("songs").insert([
    { name: "Song One", url: "Song url" },
    { name: "Song Two", url: "Song url" },
    { name: "Song Three", url: "Song url" },
    { name: "Song Four", url: "Song url" }
  ]);
};
