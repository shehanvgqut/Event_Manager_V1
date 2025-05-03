const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// POST /api/users - create a new user (admin-only)
router.post('/', UserController.createUser);

module.exports = router;  // ✅ this exports the router
