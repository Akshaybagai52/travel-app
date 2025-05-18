const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A destination must have a name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A destination must have a description"],
      trim: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    images: [String],
    price: {
      type: Number,
      required: [true, "A destination must have a price"],
    },
    duration: {
      type: Number,
      required: [true, "A destination must have a duration"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "difficult"],
      default: "medium",
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    features: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
destinationSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "destination",
  localField: "_id",
});

destinationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Destination", destinationSchema);
