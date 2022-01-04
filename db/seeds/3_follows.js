const table = "follow";

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(table).insert([
        {
          follower_id: 2,
          following_id: 1,
        },
      ]);
    });
};
