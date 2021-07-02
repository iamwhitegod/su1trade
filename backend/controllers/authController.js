const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { sendEmail } = require("./emailController");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.header["x-forwarded-proto"] === "http",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;

  console.log(url);

  sendEmail(newUser.fullname, newUser.email, newUser.phone);
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({
    attributes: ["id", "email", "password"],
    where: { email },
  });

  // console.log(await user.correctPassword(user.password, password));

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log into your account.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  const currentUser = await User.findOne({ where: { id: decoded.id } });

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  //  // 4) Check if user changed password after the token was issued
  //  if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findOne({ where: { id: decoded.id } });
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTED email
  const user = await User.findOne({
    attributes: ["id", "email"],
    where: { email: req.body.email },
  });

  if (!user)
    return next(new AppError("There is no user with email address", 404));

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    fields: ["passwordChangedAt", "passwordResetToken", "passwordResetExpires"],
  });

  // 3) Send it to user's email

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/reset-password/${resetToken}`;

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
      resetURL,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    where: {
      passwordResetToken: hashedToken,
      // passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  user.password = await bcrypt.hash(req.body.password, 12);
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  // Update changedPasswordAt property for the user
  user.passwordChangedAt = Date.now();

  await user.save({
    fields: [
      "password",
      "passwordChangedAt",
      "passwordResetToken",
      "passwordResetExpires",
    ],
  });

  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});
