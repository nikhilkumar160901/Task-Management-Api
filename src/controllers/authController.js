const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { sendRegistration } = require('./emailController');
const redisClient = require('../redisClient');

const register = async (req, res) => {
    try {

        const { username, email, password, role } = req.body;
        const userExists = await User.findOne({ email: email });
        const userExistsWithUsername = await User.findOne({ username: username });

        if (userExists || userExistsWithUsername) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ username, email, password, role });
        await user.save();
        sendRegistration(email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        

        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ message: 'Login Successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const logout = (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const expiresIn = 60 * 60; // 1 hour (same as token expiration time)
    redisClient.setex(token, expiresIn, 'blacklisted', (err, reply) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        res.status(200).json({ message: 'User logged out successfully' });
    });
};

module.exports = { register, login, logout };
