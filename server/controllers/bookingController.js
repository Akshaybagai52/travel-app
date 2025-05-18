const Booking = require("../models/Booking");
const Destination = require("../models/Destination");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked destination
  const destination = await Destination.findById(req.params.destinationId);

  if (!destination) {
    return next(new AppError("No destination found with that ID", 404));
  }

  // 2) Create checkout session
  res.status(200).json({
    status: "success",
    destination,
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const { destination, user, price, startDate, participants } = req.body;

  if (!destination || !user || !price || !startDate || !participants) {
    return next(new AppError("Please provide all booking details", 400));
  }

  const booking = await Booking.create({
    destination,
    user,
    price,
    startDate,
    participants,
  });

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    return next(new AppError("No booking found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
