const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: "Destination",
    required: [true, "Booking must belong to a destination"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    required: [true, "Booking must have a start date"],
  },
  participants: {
    type: Number,
    required: [true, "Booking must have number of participants"],
    min: [1, "Participants must be at least 1"],
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "destination",
    select: "name",
  });
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
