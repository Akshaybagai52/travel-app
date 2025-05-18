const Destination = require("../models/Destination");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllDestinations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Destination.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const destinations = await features.query;

  res.status(200).json({
    status: "success",
    results: destinations.length,
    data: {
      destinations,
    },
  });
});

exports.getDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findById(req.params.id).populate(
    "reviews"
  );

  if (!destination) {
    return next(new AppError("No destination found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      destination,
    },
  });
});

exports.createDestination = catchAsync(async (req, res, next) => {
  const newDestination = await Destination.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      destination: newDestination,
    },
  });
});

exports.updateDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!destination) {
    return next(new AppError("No destination found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      destination,
    },
  });
});

exports.deleteDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndDelete(req.params.id);

  if (!destination) {
    return next(new AppError("No destination found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getDestinationsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitude and longitude in the format lat,lng.",
        400
      )
    );
  }

  const destinations = await Destination.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    status: "success",
    results: destinations.length,
    data: {
      data: destinations,
    },
  });
});
