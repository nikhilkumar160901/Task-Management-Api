const redisClient = require("../redisClient");


const checkBlacklist = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    redisClient.get(token, (err, reply) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }
        if (reply) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
        next();
    });
};

module.exports = checkBlacklist;