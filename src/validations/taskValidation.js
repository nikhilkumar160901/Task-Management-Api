const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    dueDate: Joi.date(),
    priority: Joi.string().valid('Low', 'Medium', 'High'),
    status: Joi.string().valid('Pending', 'In Progress', 'Completed').optional(),
});

const updateTaskSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    status: Joi.string().valid('Pending', 'In Progress', 'Completed').optional(),
});

const assignTaskSchema = Joi.object({
    taskId: Joi.string().required(),
    userId: Joi.string().required(),
});

const updateTaskAssignmentSchema = Joi.object({
    taskId: Joi.string().required(),
    userId: Joi.string().required(),
});

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    assignTaskSchema,
    updateTaskAssignmentSchema,
};