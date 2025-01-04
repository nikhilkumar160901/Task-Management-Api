const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
    message: {
        status: 429,
        message: 'Too many login attempts from this IP, please try again after 15 minutes'
    }
});

module.exports = loginRateLimiter;