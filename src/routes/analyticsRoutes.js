const express = require('express');
const router = express.Router();
const { getUserTaskAnalytics, getTeamTaskAnalytics } = require('../controllers/analyticsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/task-analytics/user:
 *   get:
 *     summary: Retrieve task analytics for the authenticated user
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User task analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/user', authMiddleware, getUserTaskAnalytics);

/**
 * @swagger
 * /api/task-analytics/team:
 *   get:
 *     summary: Retrieve task analytics for the authenticated user's team
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team task analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/team', authMiddleware, getTeamTaskAnalytics);

module.exports = router;