const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/error"); // Make sure this exists
const destinationRouter = require("./routes/destinationRoutes");
const userRouter = require("./routes/authRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");

const app = express();

// 1) GLOBAL MIDDLEWARES
app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      /* ... */
    ],
  })
);
app.use(compression());

// 2) ROUTES
app.use("/api/v1/destinations", destinationRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

// Handle 404s
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3) ERROR HANDLER (MUST BE LAST)
app.use(globalErrorHandler); // This should be your only error handler

module.exports = app;
