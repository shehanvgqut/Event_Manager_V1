const express = require('express');
const router = express.Router();
const {
  getAllGroups,
  getMyGroups,
  joinGroup,
  leaveGroup,
  createGroup,
  updateGroup
} = require('../controllers/groupController');

// Always place specific routes before parameterized ones
router.get('/my-groups', getMyGroups);
router.post('/:id/join', joinGroup);
router.post('/:id/leave', leaveGroup);
router.post('/', createGroup);
router.get('/', getAllGroups);
router.put('/:id', updateGroup);



module.exports = router;
