const Group = require('../models/Groups');
const jwt = require('jsonwebtoken');

// Extract user ID from Authorization header
function getUserIdFromToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Unauthorized');
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
}

// Get all groups
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find(); // return full group, including `members`
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};

// Get groups joined by user
exports.getMyGroups = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(401).json({ message: 'Invalid or missing token' });
  }
};

exports.joinGroup = async (req, res) => {
    try {
      const groupId = req.params.id;
      const userId = req.body.userId;
  
      if (!userId) {
        return res.status(400).json({ message: 'Missing userId in request' });
      }
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      if (group.members.includes(userId)) {
        return res.status(400).json({ message: 'Already joined this group' });
      }
  
      group.members.push(userId);
      group.memberCount = group.members.length;
      await group.save();
  
      res.status(200).json({ message: 'Joined group successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Leave a group
exports.leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const userId = req.body.userId;

    if (!group.members.includes(userId)) {
      return res.status(400).json({ message: 'Not a member of this group' });
    }

    group.members = group.members.filter(id => id !== userId);
    group.memberCount = group.members.length;
    await group.save();

    res.status(200).json({ message: 'Left group successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

