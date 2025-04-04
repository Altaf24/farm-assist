const mongoose = require('mongoose');

const tractorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tractor name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Tractor type is required'],
        enum: ['light', 'medium', 'heavy'],
        trim: true
    },
    horsepower: {
        type: Number,
        required: [true, 'Horsepower is required']
    },
    hourlyRate: {
        type: Number,
        required: [true, 'Hourly rate is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    distance: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    features: [{
        type: String,
        trim: true
    }],
    available: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Tractor = mongoose.model('Tractor', tractorSchema);

module.exports = Tractor;
