const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/groupController');

router.get('/my-groups', GroupController.getMyGroups);
router.post('/:id/join', GroupController.joinGroup);
router.post('/:id/leave', GroupController.leaveGroup);
router.post('/', GroupController.createGroup);
router.put('/:id', GroupController.updateGroup);
router.get('/', GroupController.getAllGroups);
router.delete('/:id', GroupController.deleteGroup);


module.exports = router;