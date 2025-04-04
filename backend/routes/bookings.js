const express = require('express');
const Booking = require('../models/booking');
const Tractor = require('../models/tractor');
const { userAuth } = require('../middlewares/auth');
const bookingRouter = express.Router();

// Create a new booking (protected route)
// Make sure the route is using the userAuth middleware correctly
bookingRouter.post('/bookings', userAuth, async (req, res) => {
    try {
        const { tractorId, date, startTime, duration, location } = req.body;
        
        // Find the tractor
        const tractor = await Tractor.findById(tractorId);
        if (!tractor) {
            return res.status(404).json({ message: 'Tractor not found' });
        }
        
        // Check if tractor is available
        if (!tractor.available) {
            return res.status(400).json({ message: 'Tractor is not available for booking' });
        }
        
        // Calculate total price
        const totalPrice = tractor.hourlyRate * duration;
        
        // Create booking
        const booking = new Booking({
            tractor: tractorId,
            user: req.user._id, // This should be available from the auth middleware
            date,
            startTime,
            duration,
            totalPrice,
            location
        });
        
        await booking.save();
        
        res.status(201).json({ 
            message: 'Booking created successfully', 
            booking,
            totalPrice
        });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

// Get all bookings for the current user (protected route)
bookingRouter.get('/bookings', userAuth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('tractor')
            .sort({ date: -1 });
        
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

// Get booking by ID (protected route)
bookingRouter.get('/bookings/:id', userAuth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('tractor');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Check if user is authorized to view this booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this booking' });
        }
        
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error: error.message });
    }
});

// Cancel a booking (protected route)
bookingRouter.patch('/bookings/:id/cancel', userAuth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Check if user is authorized to cancel this booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }
        
        // Check if booking can be cancelled (not already completed or cancelled)
        if (booking.status === 'completed' || booking.status === 'cancelled') {
            return res.status(400).json({ message: `Booking is already ${booking.status}` });
        }
        
        booking.status = 'cancelled';
        await booking.save();
        
        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
});

module.exports = bookingRouter;
