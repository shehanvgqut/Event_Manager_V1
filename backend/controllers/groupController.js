// controllers/GroupController.js
const Group = require('../models/Groups');
const jwt = require('jsonwebtoken');

class SortByMembers {
  apply(groups) {
    return [...groups].sort((a, b) => b.memberCount - a.memberCount);
  }
}

class SortByCreationDate {
  apply(groups) {
    return [...groups].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

class GroupController {
  static getUserIdFromToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('Unauthorized');
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  }

  static async getAllGroups(req, res) {
    try {
      let groups = await Group.find();
      const sort = req.query.sort;

      if (sort === 'members') {
        groups = new SortByMembers().apply(groups);
      } else if (sort === 'recent') {
        groups = new SortByCreationDate().apply(groups);
      }

      res.json(groups);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch groups' });
    }
  }

  static async getMyGroups(req, res) {
    try {
      const userId = GroupController.getUserIdFromToken(req);
      const groups = await Group.find({ members: userId });
      res.json(groups);
    } catch (err) {
      res.status(401).json({ message: 'Invalid or missing token' });
    }
  }

  static async joinGroup(req, res) {
    try {
      const groupId = req.params.id;
      const userId = req.body.userId;

      if (!userId) return res.status(400).json({ message: 'Missing userId in request' });

      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: 'Group not found' });

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
  }

  static async leaveGroup(req, res) {
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
  }

  static async createGroup(req, res) {
    try {
      const userId = req.body.creatorId || req.body.userId;
      if (!userId) return res.status(400).json({ message: 'Missing userId' });

      const {
        name,
        description,
        location,
        topics,
        isPrivate,
        visibility
      } = req.body;

      if (!name || !location) {
        return res.status(400).json({ message: 'Name and location are required' });
      }

      const newGroup = new Group({
        name,
        description,
        location,
        topics,
        isPrivate: !!isPrivate,
        visibility,
        creatorId: userId,
        members: [userId],
        memberCount: 1
      });

      await newGroup.save();
      res.status(201).json(newGroup);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create group' });
    }
  }

  static async updateGroup(req, res) {
    try {
      const group = await Group.findById(req.params.id);
      if (!group) return res.status(404).json({ message: 'Group not found' });

      Object.assign(group, req.body);
      await group.save();

      res.status(200).json(group);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update group' });
    }
  }
}

module.exports = GroupController;
