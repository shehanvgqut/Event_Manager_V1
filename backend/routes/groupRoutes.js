const express = require('express');
const router = express.Router();
const {
  getAllGroups,
  getMyGroups,
  joinGroup,
  leaveGroup
} = require('../controllers/groupController');

// Always place specific routes before parameterized ones
router.get('/my-groups', getMyGroups);
router.post('/:id/join', joinGroup);
router.post('/:id/leave', leaveGroup);
router.get('/', getAllGroups);

module.exports = router;
