const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getDashboard);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/signup", authController.signup, viewsController.getSignupForm);
