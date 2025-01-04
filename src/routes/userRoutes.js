const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Retrieve the profile information of the authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;