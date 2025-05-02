const groups = require('../models/Groups');

exports.getAllGroups = (req, res) => {
  res.json(groups);
};

exports.getGroupById = (req, res) => {
  const group = groups.find(g => g.id === parseInt(req.params.id));
  if (!group) return res.status(404).json({ error: "Group not found" });
  res.json(group);
};