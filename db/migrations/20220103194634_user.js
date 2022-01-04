const _table = "user";

exports.up = function (knex) {
  return knex.schema.createTable(_table, (table) => {
    table.increments().primary();
    table.string("username");
    table.string("email");
    table.string("full_name");
    table.string("profile_picture");
    table.string("bio");
    table.integer("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(_table);
};
