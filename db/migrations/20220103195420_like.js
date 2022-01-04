const _table = "like";

exports.up = function (knex) {
  return knex.schema.createTable(_table, (table) => {
    table.increments().primary();
    table.integer("post_id").unsigned().references("post.id");
    table.integer("user_id").unsigned().references("user.id");
    table.integer("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(_table);
};
