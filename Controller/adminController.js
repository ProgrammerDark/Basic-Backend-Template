const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSignup = async (req, res, next) => {
    try {
        console.log('Admin Signup request recieved:', req.body);
        const { userName, password, email } = req.body;
        if (!userName || !password || !email) {
            console.log('MIssing fields:', { userName, password, email});
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password Hashed Successfully');
        const user = new User({ 
            userName,
            password: hashedPassword,
            email,
            role: 'admin'
        });
        await user.save();
        console.log('User saved successfully', user);
        return res.status(201).redirect('/api/v1/users/login');
    } catch (e) {
        res.status(500).json({ message: "internal server error" });
    }
}

const adminLogin = async (req, res, next) => {
    try {
        console.log('Admin Login request recieved:', req.body);
        const { userName, password } = req.body;
        if (!userName || !password) {
            console.log('MIssing fields:', { userName, password });
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const user = await User.findOne({ userName });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password');
            return res.status(400).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated successfully:', token);
        return res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({ message: "internal server error" });
    }
}

module.exports = { adminSignup, adminLogin };