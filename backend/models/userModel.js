const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcrypt");

// class UserSchema extends Model {}
const userSchema = (db, DataTypes) => {
  return db.define(
    "user",

    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },

      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
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
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 12);

          user.confirmPassword = undefined;
        },
      },

      // instanceMethods: {
      //   correctPassword: async (userPassword, canditatePassword) => {
      //     return bcrypt.compare(userPassword, canditatePassword);
      //   },
      // },
    }
  );
};

const User = userSchema(db, Sequelize);

User.prototype.correctPassword = async (canditatePassword, userPassword) => {
  return await bcrypt.compare(canditatePassword, userPassword);
};

console.log(User);

db.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = User;
