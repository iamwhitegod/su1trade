const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.use(viewsController.alerts);

router.get("/", authController.isLoggedIn, viewsController.getHomepage);
router.get("/invest", authController.isLoggedIn, viewsController.getInvestPage);
router.get(
  "/exchange",
  authController.isLoggedIn,
  viewsController.getExchangePage
);
router.get("/about", authController.isLoggedIn, viewsController.getAboutUsPage);
router.get("/terms", authController.isLoggedIn, viewsController.getTermsPage);
router.get(
  "/license",
  authController.isLoggedIn,
  viewsController.getLicensePage
);
router.get(
  "/privacy",
  authController.isLoggedIn,
  viewsController.getPrivacyPage
);
router.get(
  "/security",
  authController.isLoggedIn,
  viewsController.getSecurityPage
);
router.get(
  "/partners",
  authController.isLoggedIn,
  viewsController.getPartnersPage
);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/signup", authController.isLoggedIn, viewsController.getSignupForm);

router.get(
  "/user/dashboard",
  authController.protect,
  viewsController.getDashboard
);
// router.get("/me", authController.protect, viewsController.getAccount);

module.exports = router;
