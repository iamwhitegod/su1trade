const crypto = require("crypto");
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
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
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

User.prototype.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means PASSWORD WAS NOT changed.
  return false;
};

User.prototype.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 + 1000;

  return resetToken;
};

console.log(User);

// db.sync({ alter: true }).then(() => {
db.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = User;
