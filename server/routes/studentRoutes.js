const express = require('express');
const router = express.Router();
const { verifyStudent } = require('../middlewares/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/studentController');

// Fetch student profile
router.get(
    '/profile',
    verifyStudent,
    getProfile
);

// Update student profile (Only name)
router.put(
    '/profile',
    verifyStudent,
    updateProfile
);

module.exports = router;
