const express = require('express');
const Tractor = require('../models/tractor');
const { userAuth } = require('../middlewares/auth');
const tractorRouter = express.Router();

// Get all tractors
tractorRouter.get('/tractors', async (req, res) => {
    try {
        const filters = {};
        
        // Apply filters if provided
        if (req.query.type && req.query.type !== 'all') {
            filters.type = req.query.type;
        }
        
        if (req.query.available) {
            filters.available = req.query.available === 'true';
        }
        
        // Apply location filter if provided (simplified)
        if (req.query.location) {
            filters.location = { $regex: req.query.location, $options: 'i' };
        }
        
        const tractors = await Tractor.find(filters);
        res.status(200).json(tractors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tractors', error: error.message });
    }
});

// Get tractor by ID
tractorRouter.get('/tractors/:id', async (req, res) => {
    try {
        const tractor = await Tractor.findById(req.params.id);
        if (!tractor) {
            return res.status(404).json({ message: 'Tractor not found' });
        }
        res.status(200).json(tractor);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tractor', error: error.message });
    }
});

// Create a new tractor (protected route)
tractorRouter.post('/tractors', userAuth, async (req, res) => {
    try {
        const { name, type, horsepower, hourlyRate, location, image, features } = req.body;
        
        const tractor = new Tractor({
            name,
            type,
            horsepower,
            hourlyRate,
            location,
            image,
            features,
            owner: req.user._id
        });
        
        await tractor.save();
        res.status(201).json({ message: 'Tractor created successfully', tractor });
    } catch (error) {
        res.status(500).json({ message: 'Error creating tractor', error: error.message });
    }
});

// Update a tractor (protected route)
tractorRouter.put('/tractors/:id', userAuth, async (req, res) => {
    try {
        const tractor = await Tractor.findById(req.params.id);
        
        if (!tractor) {
            return res.status(404).json({ message: 'Tractor not found' });
        }
        
        // Check if user is the owner
        if (tractor.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this tractor' });
        }
        
        const updatedTractor = await Tractor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({ message: 'Tractor updated successfully', tractor: updatedTractor });
    } catch (error) {
        res.status(500).json({ message: 'Error updating tractor', error: error.message });
    }
});

// Delete a tractor (protected route)
tractorRouter.delete('/tractors/:id', userAuth, async (req, res) => {
    try {
        const tractor = await Tractor.findById(req.params.id);
        
        if (!tractor) {
            return res.status(404).json({ message: 'Tractor not found' });
        }
        
        // Check if user is the owner
        if (tractor.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this tractor' });
        }
        
        await Tractor.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Tractor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tractor', error: error.message });
    }
});

module.exports = tractorRouter;
