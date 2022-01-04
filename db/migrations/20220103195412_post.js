const _table = "post";

exports.up = function (knex) {
  return knex.schema.createTable(_table, (table) => {
    table.increments().primary();
    table.string("description");
    table.integer("user_id").unsigned().references("user.id");
    table.string("image");
    table.integer("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(_table);
};
