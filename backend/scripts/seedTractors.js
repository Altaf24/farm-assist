const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Tractor = require('../models/tractor');

const tractors = [
  {
    name: "John Deere 5E Series",
    type: "medium",
    horsepower: 75,
    hourlyRate: 450,
    location: "Amritsar, Punjab",
    distance: 3.2,
    rating: 4.8,
    reviews: 124,
    image: "https://www.deere.com/assets/images/region-4/products/tractors/5e-series/5075e_r4f009614_rrd_large_a98236e5e8e9e301b1f1e5d0f3b5f5c5c5e2e9d9.jpg",
    features: ["GPS Navigation", "Air Conditioned Cabin", "Implements Available"],
    available: true
  },
  {
    name: "Mahindra 575 DI",
    type: "medium",
    horsepower: 45,
    hourlyRate: 350,
    location: "Ludhiana, Punjab",
    distance: 5.7,
    rating: 4.5,
    reviews: 89,
    image: "https://www.mahindratractor.com/images/Gallery/575-DI-XP-PLUS/575-DI-XP-PLUS-1.png",
    features: ["Power Steering", "Adjustable Seat", "Dual Clutch"],
    available: true
  },
  {
    name: "Sonalika Sikandar DI 750 III",
    type: "heavy",
    horsepower: 75,
    hourlyRate: 550,
    location: "Jalandhar, Punjab",
    distance: 8.1,
    rating: 4.7,
    reviews: 67,
    image: "https://www.sonalika.com/media/1ufnwcgz/sikander-dx-55.png",
    features: ["4WD", "Digital Dashboard", "Heavy Duty Hydraulics"],
    available: true
  },
  {
    name: "New Holland 3600-2",
    type: "light",
    horsepower: 35,
    hourlyRate: 300,
    location: "Patiala, Punjab",
    distance: 4.3,
    rating: 4.3,
    reviews: 52,
    image: "https://www.newholland.com/apac/en-in/products/tractors/3600-2-all-rounder-plus-series/3600-2-all-rounder-plus-series-overview/_jcr_content/root/teaser.coreimg.jpeg/1679995266247/3600-2-all-rounder-plus-series-overview.jpeg",
    features: ["Fuel Efficient", "Easy Maintenance", "Compact Design"],
    available: false
  },
  {
    name: "Kubota MU5501",
    type: "heavy",
    horsepower: 55,
    hourlyRate: 500,
    location: "Bathinda, Punjab",
    distance: 10.5,
    rating: 4.9,
    reviews: 43,
    image: "https://www.kubota.co.in/product/tractor/img/mu5501/mu5501_main.png",
    features: ["Japanese Technology", "Low Noise", "High Torque"],
    available: true
  }
];

const seedTractors = async () => {
  try {
    await connectDB();
    
    // Clear existing tractors
    await Tractor.deleteMany({});
    console.log('Cleared existing tractors');
    
    // Insert new tractors
    await Tractor.insertMany(tractors);
    console.log('Added sample tractors to database');
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding tractors:', error);
    process.exit(1);
  }
};

seedTractors();
module.exports = seedTractors;