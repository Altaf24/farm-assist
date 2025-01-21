const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://test:test123@cluster0.s5dfd.mongodb.net/farm-assist"
    );
};



module.exports = connectDB;