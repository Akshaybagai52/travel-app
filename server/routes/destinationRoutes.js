const express = require("express");
const destinationController = require("../controllers/destinationController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

// Nested routes
router.use("/:destinationId/reviews", reviewRouter);

router
  .route("/")
  .get(destinationController.getAllDestinations)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    destinationController.createDestination
  );

router
  .route("/:id")
  .get(destinationController.getDestination)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    destinationController.updateDestination
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    destinationController.deleteDestination
  );

router.get(
  "/destinations-within/:distance/center/:latlng/unit/:unit",
  destinationController.getDestinationsWithin
);

module.exports = router;
