const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config({ path: "./config.env" });

const db = new Sequelize(process.env.DATABASE, process.env.USER, "", {
  host: process.env.HOST,
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.authenticate()
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.error(err.message));

module.exports = db;
