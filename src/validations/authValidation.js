const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Username is required'
    }),
    role: Joi.string().optional(),
    email: Joi.string().email().required().messages({
        'string.email': 'Must be a valid email',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.empty': 'Password is required'
    }).pattern(new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&#])')).messages({
        'string.pattern.base': 'Password must contain a number, an uppercase letter, a lowercase letter, and a special character'
    })
});



const loginSchema = Joi.object({
    emailOrUsername: Joi.string().required().messages({
        'string.empty': 'Email or Username is required'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required'
    })
});

module.exports = {
    registerSchema,
    loginSchema
};