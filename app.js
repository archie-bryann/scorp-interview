/**
 * TO RUN THIS FILE
 * npm i
 * npm i -g knex
 * create database `scorp`
 * knex migrate:latest [./db/migrations]
 * knex seed:run [./db/seeds]
 * node app
 */

const {
  getPostsQuery,
  getManyPostsQuery,
  getUserQuery,
  checkPostLikedByUserQuery,
  checkUserFollowsQuery,
} = require("./queries");

// Q1.
async function get_posts(user_id, post_ids) {
  try {
    let posts = await getManyPostsQuery(post_ids);
    await Promise.all(
      posts.map(async function (post, i) {
        // owner
        const owner = await getUserQuery(post.user_id);
        let followed;
        const followedData = await checkUserFollowsQuery(post.user_id, user_id);

        followedData.length > 0 ? (followed = true) : (followed = false);

        posts[i].owner = {
          id: owner[0].id,
          username: owner[0].username,
          full_name: owner[0].full_name,
          profile_picture: owner[0].profile_picture,
          followed,
        };

        // liked
        const liked = await checkPostLikedByUserQuery(post.id, user_id);
        liked.length > 0 ? (posts[i].liked = true) : (posts[i].liked = false);
      })
    );

    return posts;
  } catch (err) {
    console.log("error occured");
  }
}

// Q2.
async function merge_posts(list_of_posts) {
  function compareCreatedAtAscending(a, b) {
    // ascending
    if (a.created_at < b.created_at) {
      return 1;
    }
    if (a.created_at > b.created_at) {
      return -1;
    }
    return 0;
  }

  let duplicates = {};
  let merged = [];

  list_of_posts.forEach((list) => {
    list.sort(compareCreatedAtAscending);

    list.forEach((_item) => {
      let item = {
        id: _item.id,
        description: _item.description,
        image: _item.image,
        created_at: _item.created_at,
      };

      if (duplicates[item.created_at]) {
        if (!duplicates[item.created_at].includes(item)) {
          const last_element =
            duplicates[item.created_at][duplicates[item.created_at].length - 1];
          if (last_element.created_at == item.created_at) {
            if (last_element.id > item.id) {
              duplicates[item.created_at].push(item);

              // find last element =>  append
              const index = merged.lastIndexOf(
                (x) => x.created_at == item.created_at
              );
              merged.join();
              if (merged[index].id > item.id) {
                merged.splice(index + 1, 0, item);
              }
              merged.join();
              //..............................
            } else {
              let former = duplicates[item.created_at];
              duplicates[item.created_at] = [item, ...former];

              // find first element
              const index = merged.indexOf(
                (x) => x.created_at == item.created_at
              );
              merged.join();
              merged.splice(index + 1, 0, item);
              merged.join();
              //..............................
            }
          }
        }
      } else {
        duplicates[item.created_at] = [item];
        // push to array
        if (merged.length > 0) {
          const last_element = merged[merged.length - 1];
          if (last_element.created_at > item.created_at) {
            merged.push(item);
          } else {
            merged = [item, ...merged];
          }
        } else {
          merged.push(item);
        }
      }
    });
  });

  return merged;
}

// Solution
async function app() {
  // Test run get_posts
  const posts = await get_posts(1, [1, 2]);
  console.log("Posts", posts);

  // Test run merge_posts
  const allPosts = await getPostsQuery({});
  const mergedPosts = await merge_posts([
    allPosts,
    [
      {
        id: 5,
        description: "i brought twitter into the world",
        user_id: 2,
        image: "post2.jpg",
        created_at: 3147483648,
      },
      {
        id: 6,
        description: "i brought tea",
        user_id: 2,
        image: "post2.jpg",
        created_at: 3147483648,
      },
      {
        id: 7,
        description: "i brought tea",
        user_id: 2,
        image: "post2.jpg",
        created_at: 3147483648,
      },
    ],
  ]);
  console.log("Merged Posts", mergedPosts);
}

app();
