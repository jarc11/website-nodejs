module.exports = {
    development: {
        username: "spring_test_webapp",
        password: "kj945S!Df48345£d",
        database: "spring_test",
        host: "localhost",
        dialect: 'mysql',
      },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOSTNAME,
      dialect: 'mysql',
    }
  };
