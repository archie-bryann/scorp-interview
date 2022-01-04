const _table = "follow";

exports.up = function (knex) {
  return knex.schema.createTable(_table, (table) => {
    table.integer("follower_id").unsigned().references("user.id");
    table.integer("following_id").unsigned().references("user.id");
    table.integer("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(_table);
};
