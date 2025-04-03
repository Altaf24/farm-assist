const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const authRouter = express.Router();

// Signup route
authRouter.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, farmType } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            farmType
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            'FarmAssist$262',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                farmType: user.farmType
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login route
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            'FarmAssist$262',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                farmType: user.farmType
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = authRouter;
