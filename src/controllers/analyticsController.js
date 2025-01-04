const Task = require('../models/task');
const User = require('../models/user');
const Team = require('../models/team');

const getUserTaskAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: 'Completed' });
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: 'Pending' });
        const overdueTasks = await Task.countDocuments({ assignedTo: userId, dueDate: { $lt: new Date() }, status: { $ne: 'Completed' } });

        res.status(200).json({ completedTasks, pendingTasks, overdueTasks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getTeamTaskAnalytics = async (req, res) => {
    try {
        const teamId = await User.findById(req.user.id).select('team');
        console.log(teamId);
        const team = await Team.findById(teamId.team).populate('members', '_id');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        const memberIds = team.members.map(member => member._id);

        const completedTasks = await Task.countDocuments({ assignedTo: { $in: memberIds }, status: 'Completed' });
        const pendingTasks = await Task.countDocuments({ assignedTo: { $in: memberIds }, status: 'Pending' });
        const overdueTasks = await Task.countDocuments({ assignedTo: { $in: memberIds }, dueDate: { $lt: new Date() }, status: { $ne: 'Completed' } });

        res.status(200).json({ completedTasks, pendingTasks, overdueTasks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getUserTaskAnalytics, getTeamTaskAnalytics };