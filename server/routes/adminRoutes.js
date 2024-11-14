const express = require('express');
const {
    getAdminProfile,
    updateAdminProfile,
    addMenuItem,
    getMenuItems,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

//Admin Profile Management Rotues
router.get('/profile', protect, getAdminProfile); // Route to fetch admin profile details
router.put('/profile', protect, updateAdminProfile); // Route to update admin profile details (phone, address)

//Menu Management Routes
router.post('/menu', protect, addMenuItem); // Add a new menu item
router.get('/menu', protect, getMenuItems); // Get all menu items
router.put('/menu/:id', protect, updateMenuItem); // Update a menu item
router.delete('/menu/:id', protect, deleteMenuItem); // Delete a menu item

module.exports = router;
