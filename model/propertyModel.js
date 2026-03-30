const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, "Title is required"],
      trim:     true,
    },
    address: {
      type:     String,
      required: [true, "Address is required"],
      trim:     true,
    },
    price: {
      type:     Number,
      required: [true, "Price is required"],
      min:      [0, "Price must be positive"],
    },
    bedrooms: {
      type:     Number,
      required: true,
      min:      0,
    },
    bathrooms: {
      type:     Number,
      required: true,
      min:      0,
    },
    areaSqft: {
      type:     Number,
      required: true,
      min:      0,
    },
    imageUrl: {
      type:    String,
      default: "",
    },
    description: {
      type:    String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
