const Task = require('../models/task');
const User = require('../models/user');

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
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
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


module.exports = { createTask, getTasks, updateTask, deleteTask, assignTask , viewAssignedTasks, updateTaskAssignment};
