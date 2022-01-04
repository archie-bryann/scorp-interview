const table = "post";

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(table).insert([
        {
          id: 1,
          description: "just setting up my twttr",
          user_id: 1,
          image: "post1.jpg",
        },
        {
          id: 2,
          description: "i brought twitter into the world",
          user_id: 2,
          image: "post2.jpg",
        },
      ]);
    });
};
