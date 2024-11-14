const express = require('express');
const {
    adminSignup,
    adminLogin,
    studentSignup,
    studentLogin,
} = require('../controllers/authController');

const router = express.Router();

// Admin and Student routes
router.post('/admin/signup', adminSignup);
router.post('/admin/login', adminLogin);
router.post('/student/signup', studentSignup);
router.post('/student/login', studentLogin);

module.exports = router;
