const Task = require('../models/task');
const User = require('../models/user');
const redis = require('../redisClient');


const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const task = new Task({
            title,
            description,
            dueDate,
            priority,
            status,
            createdBy: req.user.id,
        });

        await task.save();
        req.io.emit('taskCreated', task);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const { status, priority, dueDate } = req.query;
        const query = { createdBy: req.user.id };
        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (dueDate) query.dueDate = { $lte: new Date(dueDate) };
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const cacheKey = `tasks:${req.user.id}:${status || 'all'}:${priority || 'all'}:${dueDate || 'all'}:${limit}:${page}`;

        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log('Data cached');
            return res.status(200).json(JSON.parse(cachedData)); 
        }
        console.log('Data not cached', query);

        let count = await Task.countDocuments();
        const tasks = await Task.find(query).skip(skip).limit(limit);
        const response = { count, tasks };
        await redis.set(cacheKey, JSON.stringify(response), 'EX', 300);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const keys = await redis.keys(`tasks:${req.user.id}:*`);
        if (keys.length > 0) {
            await redis.del(keys); 
        }
        req.io.emit('taskUpdated', task);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const keys = await redis.keys(`tasks:${req.user.id}:*`);
        if (keys.length > 0) {
            await redis.del(keys);
        }
        req.io.emit('taskDeleted', { id: req.params.id });
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const assignTask = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        const task = await Task.findById(taskId);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        task.assignedTo = userId;
        task.assignedBy = req.user.id;
        await task.save();

        res.status(200).json({ message: 'Task assigned successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const viewAssignedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateTaskAssignment = async (req, res) => {
    try {
        const { taskId, userId } = req.body;
        const task = await Task.findById(taskId);
        const user = await User.findById(userId);

        if (!task || !user) {
            return res.status(404).json({ message: 'Task or User not found' });
        }

        task.assignedTo = userId;
        task.assignedBy = req.user.id;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = { createTask, getTasks, updateTask, deleteTask, assignTask, viewAssignedTasks, updateTaskAssignment };
