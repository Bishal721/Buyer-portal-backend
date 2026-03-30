require("dotenv").config();
const mongoose = require("mongoose");
const Property = require("./model/propertyModel");
const connectDB = require("./config/ConnectDB");

const sampleProperties = [
  {
    title: "Sunrise Villa",
    address: "12 Maple Lane, Austin TX",
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2800,
    imageUrl:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600",
    description: "Stunning modern villa with open-plan living and a pool.",
  },
  {
    title: "The Urban Loft",
    address: "301 5th Ave, New York NY",
    price: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1100,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    description: "Chic industrial loft in the heart of Manhattan.",
  },
  {
    title: "Coastal Retreat",
    address: "7 Ocean Drive, Miami FL",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1900,
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600",
    description: "Beachfront property with panoramic ocean views.",
  },
  {
    title: "The Craftsman",
    address: "88 Oak Street, Portland OR",
    price: 620000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1650,
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
    description: "Classic craftsman home with original hardwood floors.",
  },
  {
    title: "Mountain Hideaway",
    address: "45 Pine Ridge Rd, Denver CO",
    price: 780000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2400,
    imageUrl:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600",
    description: "Secluded mountain retreat with breathtaking views.",
  },
  {
    title: "Garden Townhouse",
    address: "22 Elm Court, Chicago IL",
    price: 530000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1500,
    imageUrl:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600",
    description: "Charming townhouse with a private garden and patio.",
  },
  {
    title: "The Penthouse",
    address: "1000 Sky Tower, Seattle WA",
    price: 1800000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    description: "Luxury penthouse with 360° city and water views.",
  },
  {
    title: "Desert Oasis",
    address: "55 Saguaro Blvd, Scottsdale AZ",
    price: 710000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2100,
    imageUrl:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600",
    description: "Southwest-inspired home with resort-style outdoor space.",
  },
];

const seed = async () => {
  await connectDB();

  const existing = await Property.countDocuments();
  if (existing > 0) {
    console.log(
      `ℹ️  Database already has ${existing} properties. Skipping seed.`,
    );
    console.log("   Run with --force to reseed: node seeder.js --force");

    if (!process.argv.includes("--force")) {
      await mongoose.disconnect();
      return;
    }

    await Property.deleteMany();
    console.log("🗑  Cleared existing properties.");
  }

  await Property.insertMany(sampleProperties);
  console.log(`🌱  Seeded ${sampleProperties.length} properties successfully!`);

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
