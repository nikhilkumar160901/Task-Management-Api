const express = require('express');
const router = express.Router();
const { createTeam } = require('../controllers/teamController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create a new team and assign it to a manager
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Development Team"
 *               managerId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["60d0fe4f5311236168a109cb", "60d0fe4f5311236168a109cc"]
 *     responses:
 *       201:
 *         description: Team created and assigned to manager successfully
 *       400:
 *         description: Invalid manager ID or one or more user IDs are invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, checkRole(['Admin']), createTeam);

module.exports = router;