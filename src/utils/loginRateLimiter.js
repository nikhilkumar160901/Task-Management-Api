const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
    message: {
        status: 429,
        message: 'Too many login attempts from this IP, please try again after 15 minutes'
    }
});

module.exports = loginRateLimiter;