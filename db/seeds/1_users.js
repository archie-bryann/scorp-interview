const table = "user";

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(table)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(table).insert([
        {
          id: 1,
          username: "jack",
          full_name: "Jack Dorsey",
          email: "jack@twitter.com",
          profile_picture: "jack_dorsey.jpg",
          bio: "About Jack Dorsey",
        },
        {
          id: 2,
          username: "nhglass",
          full_name: "Noah Glass",
          email: "noah@twitter.com",
          profile_picture: "noah_glass.jpg",
          bio: "About Noah Glass",
        },
      ]);
    });
};
