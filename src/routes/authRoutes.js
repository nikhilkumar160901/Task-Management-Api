const express = require('express');
const router = express.Router();
const { register, login, logout} = require('../controllers/authController');
const { loginSchema, registerSchema } = require('../validations/authValidation');
const validate = require('../middlewares/validate');
const loginRateLimiter = require('../utils/rateLimiter');
const checkBlacklist = require('../middlewares/checkBlacklist');


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: Username is required
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *                 description: Must be a valid email
 *               password:
 *                 type: string
 *                 example: Password123!
 *                 description: Password must be at least 8 characters long, contain a number, an uppercase letter, a lowercase letter, and a special character
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation errors or User already exists
 *       500:
 *         description: Server error
 */


router.post('/register', validate(registerSchema), register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *                 example: johndoe@example.com
 *                 description: Email or Username is required
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: Password is required
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation errors or Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', loginRateLimiter, validate(loginSchema), login);

router.post('/logout', checkBlacklist, logout);


module.exports = router;
