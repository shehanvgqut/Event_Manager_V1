const express = require('express');
const {
    registerUser,
    loginUser,
    updateUserProfile,
    getProfile,
} = require('../controllers/authController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');  // ⬅️ updated import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

// ✅ NEW: Example of an admin-only route
router.get('/admin-data', protect, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin! Here is your protected data.' });
});

// ✅ NEW: Example of a route accessible by both admin and user roles
router.get('/dashboard', protect, authorizeRoles('admin', 'user'), (req, res) => {
    res.json({ message: `Hello, ${req.user.role}! You can access the dashboard.` });
});

module.exports = router;
