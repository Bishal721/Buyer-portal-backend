const express = require("express");
const {
  getAllProperties,
  getFavouriteProperties,
  toggleFavourite,
  getPropertyById,
} = require("../controller/propertyController");
const { Protected } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", Protected, getAllProperties);
router.get("/favourites/mine", Protected, getFavouriteProperties);
router.get("/:id", Protected, getPropertyById);
router.post("/:id/favourite", Protected, toggleFavourite);

module.exports = router;
