const express = require('express');
const router = express.Router();
const { createTask, getTasks, assignTask, updateTask, deleteTask, updateTaskAssignment, viewAssignedTasks } = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');
const generalLimiter = require('../utils/rateLimit');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema, assignTaskSchema, updateTaskAssignmentSchema } = require('../validations/taskValidation');

router.post('/', authMiddleware, generalLimiter, validate(createTaskSchema), createTask);
router.get('/', authMiddleware, generalLimiter, getTasks);
router.put('/:id', authMiddleware, generalLimiter, validate(updateTaskSchema), updateTask);
router.delete('/:id', authMiddleware, generalLimiter, deleteTask);
router.post('/assign', authMiddleware, checkRole(['Manager', 'Admin']), generalLimiter, validate(assignTaskSchema), assignTask);
router.get('/view', authMiddleware, generalLimiter, viewAssignedTasks);
router.post('/update', authMiddleware, checkRole(['Admin', 'Manager']), generalLimiter, validate(updateTaskAssignmentSchema), updateTaskAssignment);

module.exports = router;


/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Task"
 *               description:
 *                 type: string
 *                 example: "Task description"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *               priority:
 *                 type: string
 *                 example: "High"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of tasks with optional filtering, and pagination
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter tasks by priority
 *       - in: query
 *         name: dueDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks by due date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Total number of tasks
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                       priority:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdBy:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task details
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *               priority:
 *                 type: string
 *                 example: "Medium"
 *               status:
 *                 type: string
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/assign:
 *   post:
 *     summary: Assign a task to a user
 *     tags: [Task Assignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       200:
 *         description: Task assigned successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task or User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/view:
 *   get:
 *     summary: View assigned tasks
 *     tags: [Task Assignment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of assigned tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/update:
 *   post:
 *     summary: Update task assignment
 *     tags: [Task Assignment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109ca"
 *               userId:
 *                 type: string
 *                 example: "60d0fe4f5311236168a109cb"
 *     responses:
 *       200:
 *         description: Task assignment updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task or User not found
 *       500:
 *         description: Server error
 */
