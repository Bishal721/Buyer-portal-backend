const asyncHandler = require("express-async-handler");
const Property = require("../model/propertyModel");
const Favourite = require("../model/favouriteModel");

const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: properties });
});

const getFavouriteProperties = asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({ user: req.user._id })
    .populate("property")
    .sort({ createdAt: -1 });

  const result = favourites.map((fav) => ({
    ...fav.property.toObject(),
    favouritedAt: fav.createdAt,
  }));

  res.status(200).json({ success: true, data: result });
});

const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const fav = await Favourite.findOne({
    user: req.user._id,
    property: property._id,
  });

  res.status(200).json({
    success: true,
    data: { ...property.toObject(), isFavourited: !!fav },
  });
});

const toggleFavourite = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const existing = await Favourite.findOne({
    user: req.user._id,
    property: property._id,
  });

  if (existing) {
    await existing.deleteOne();
    return res.status(200).json({
      success: true,
      isFavourited: false,
      message: "Removed from favourites",
    });
  }

  await Favourite.create({ user: req.user._id, property: property._id });
  res.status(201).json({
    success: true,
    isFavourited: true,
    message: "Added to favourites",
  });
});

const getMyFavourites = asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({ user: req.user._id })
    .populate("property")
    .sort({ createdAt: -1 });

  const result = favourites.map((f) => ({
    ...f.property.toObject(),
    isFavourited: true,
    favouritedAt: f.createdAt,
  }));

  res.status(200).json({ success: true, data: result });
});

module.exports = {
  getAllProperties,
  getFavouriteProperties,
  getPropertyById,
  toggleFavourite,
  getMyFavourites,
};
