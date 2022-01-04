const knex = require("./db/knex");

async function getPostsQuery(query) {
  return await knex("post")
    .where(query)
    .then((result) => {
      return result;
    });
}

async function getManyPostsQuery(post_ids) {
  return await knex("post")
    .whereRaw("id in (?)", [post_ids])
    .then((result) => {
      return result;
    });
}

async function getUserQuery(user_id) {
  return await knex("user")
    .where("id", user_id)
    .then((result) => {
      return result;
    });
}

async function checkPostLikedByUserQuery(post_id, user_id) {
  return await knex("like")
    .where({ post_id, user_id })
    .then((result) => {
      return result;
    });
}

async function checkUserFollowsQuery(leader_id, follower_id) {
  return await knex("follow")
    .where({ follower_id: leader_id, following_id: follower_id })
    .then((result) => {
      return result;
    });
}

module.exports = {
  getPostsQuery,
  getManyPostsQuery,
  getUserQuery,
  checkPostLikedByUserQuery,
  checkUserFollowsQuery,
};
