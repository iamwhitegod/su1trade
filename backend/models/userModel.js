const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../config/database");

// class UserSchema extends Model {}
const userSchema = (db, DataTypes) => {
  return db.define(
    "user",

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
    // {
    //   db,
    //   modelName: "User",
    //   tableName: "users",
    // }
  );
};

const User = userSchema(db, Sequelize);

db.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = User;
