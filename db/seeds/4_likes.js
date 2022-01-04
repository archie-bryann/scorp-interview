const table = "like";

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(table).insert([
        {
          id: 1,
          post_id: 2,
          user_id: 1,
        },
      ]);
    });
};
