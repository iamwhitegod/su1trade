const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const {
  expressCspHeader,
  INLINE,
  NONE,
  SELF,
  NONCE,
} = require("express-csp-header");
const xss = require("xss-clean");

const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

// Start express app
const app = express();

app.use(
  expressCspHeader({
    directives: {
      "default-src": [SELF, NONCE, "blob:", "gap:"],
      "script-src": [
        SELF,
        INLINE,
        "blob:",
        "https://unpkg.com/swiper/swiper-bundle.js https://unpkg.com/swiper/swiper-bundle.min.js https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js",
      ],
      "style-src": [
        SELF,
        INLINE,
        "https://unpkg.com/swiper/swiper-bundle.css https://unpkg.com/swiper/swiper-bundle.min.css",
      ],
      "img-src": [SELF, INLINE, "data:", "*"],
      "worker-src": [SELF, INLINE, "blob: filesystem:", "*"],
      "font-src": [SELF, INLINE, "data:", "*"],
      "connect-src": [SELF, INLINE, "ws: wss:", "*"],
      "frame-src": [SELF, "https://www.youtube.com"],
      "block-all-mixed-content": true,
    },
    reportOnly: true,
  })
);

// app.use(function (req, res, next) {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src '*'; font-src data: application/font-woff; charset=utf-8; base64; img-src 'self'; script-src https://unpkg.com/swiper/swiper-bundle.js https://unpkg.com/swiper/swiper-bundle.min.js; style-src https://unpkg.com/swiper/swiper-bundle.css https://unpkg.com/swiper/swiper-bundle.min.css; frame-src 'self'"
//   );
//   next();
// });

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options("*", cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

// Sanitize against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
