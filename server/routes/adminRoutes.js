const express = require('express');
const {
    getAdminProfile,
    updateAdminProfile,
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getAdminProfile); // Route to fetch admin profile details
router.put('/profile', protect, updateAdminProfile); // Route to update admin profile details (phone, address)

module.exports = router;
