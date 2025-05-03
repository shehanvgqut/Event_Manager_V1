const express = require('express');
const UserController = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', UserController.createUser);

// ✅ GET /api/users - get all users (admin only)
router.get('/',  UserController.getAllUsers);

module.exports = router;
