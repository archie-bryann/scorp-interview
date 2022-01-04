const connection = {
  host: "localhost",
  user: "root",
  password: "",
  database: "scorp",
};

module.exports = {
  development: {
    client: "mysql",
    connection,
    debug: false,
    pool: {
      max: 1,
      min: 1,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  test: {
    client: "mysql",
    connection,
    pool: {
      max: 1,
      min: 1,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  production: {
    client: "mysql",
    connection,
    pool: {
      max: 1,
      min: 1,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
