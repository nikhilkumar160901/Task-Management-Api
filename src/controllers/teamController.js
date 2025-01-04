const Team = require('../models/team');
const User = require('../models/user');

const createTeam = async (req, res) => {
    try {
        const { name, managerId, userIds } = req.body;

        const manager = await User.findById(managerId);
        if (!manager || manager.role !== 'Manager') {
            return res.status(400).json({ message: 'Invalid manager ID or the user is not a manager' });
        }

        const users = await User.find({ _id: { $in: userIds } });
        if (users.length !== userIds.length) {
            return res.status(400).json({ message: 'One or more user IDs are invalid' });
        }

        const team = new Team({ name, members: userIds });
        await team.save();

        manager.team = team._id;
        await manager.save();

        res.status(201).json({ message: 'Team created and assigned to manager successfully', team });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createTeam };