const catchAsync = require("../utils/catchAsync");

exports.getDashboard = catchAsync(async (req, res, next) => {
  res.status(200).render("dashboard", {
    title: "Dashboard",
    user: res.locals.user,
  });
});

exports.getHomepage = catchAsync(async (req, res, next) => {
  res.status(200).render("homepage", {
    title:
      "Invest, Buy & Sell Crptocurrencies, Learn Forex Trading & E-commerce.",
  });
});

exports.getInvestPage = catchAsync(async (req, res, next) => {
  res.status(200).render("invest", {
    title: "Invest & Build Wealth",
  });
});

exports.getExchangePage = catchAsync(async (req, res, next) => {
  res.status(200).render("exchange", {
    title: "Exchange, Buy & Sell Currencies",
  });
});

exports.getAboutUsPage = catchAsync(async (req, res, next) => {
  res.status(200).render("about", {
    title: "About Us",
  });
});

exports.getTermsPage = catchAsync(async (req, res, next) => {
  res.status(200).render("terms", {
    title: "Terms & Conditions",
  });
});

exports.getLicensePage = catchAsync(async (req, res, next) => {
  res.status(200).render("license", {
    title: "Legal License",
  });
});

exports.getPrivacyPage = catchAsync(async (req, res, next) => {
  res.status(200).render("privacy", {
    title: "Privacy Policy",
  });
});

exports.getSecurityPage = catchAsync(async (req, res, next) => {
  res.status(200).render("security", {
    title: "Security",
  });
});

exports.getPartnersPage = catchAsync(async (req, res, next) => {
  res.status(200).render("partners", {
    title: "Our Partners",
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Log Into Your Account",
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  console.log("Signup form");

  res.status(200).render("signup", {
    title: "Sign Up for an Account",
  });
});
