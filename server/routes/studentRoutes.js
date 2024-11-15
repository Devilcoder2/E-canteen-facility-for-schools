const express = require('express');
const router = express.Router();
const { verifyStudent } = require('../middlewares/authMiddleware');
const {
    getProfile,
    updateProfile,
    getMenu,
    placeOrder,
    getOrders,
    getOrderDetails,
    getCurrentOrders,
    cancelOrder,
    reorderOrder
} = require('../controllers/studentController');

//PROFILE MANAGEMENT 
router.get('/profile', verifyStudent, getProfile); // Fetch student profile
router.put('/profile', verifyStudent, updateProfile); // Update student profile (Only name)

//MENU & ORDER MANAGEMENT 
router.get('/menu', verifyStudent, getMenu); //Fetch all available menu items
router.post('/order', verifyStudent, placeOrder); // Place an order
router.get('/orders', verifyStudent, getOrders); //Get all orders of the student
router.get('/orders/:orderId', verifyStudent, getOrderDetails); //Get details of a specific order
router.get('/currentOrders', verifyStudent, getCurrentOrders); //Get all live (current) orders

//CANCEL & REORDER MANAGEMENT
router.patch('/order/cancel/:orderId', verifyStudent, cancelOrder); // Route to cancel an order
router.post('/order/reorder/:orderId', verifyStudent, reorderOrder); // Route to reorder a previous order

module.exports = router;
