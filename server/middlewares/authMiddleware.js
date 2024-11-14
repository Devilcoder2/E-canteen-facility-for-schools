const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token;

    // Check if the token is present in the Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extract token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user is an Admin
            const admin = await Admin.findById(decoded.id);
            if (admin) {
                req.user = admin;
                req.user.role = 'admin';
                return next();
            }

            // Check if the user is a Student
            const student = await Student.findById(decoded.id);
            if (student) {
                req.user = student;
                req.user.role = 'student';
                return next();
            }

            // If neither an admin nor a student is found
            return res.status(401).json({ message: 'Not authorized' });
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Token is not valid' });
        }
    }

    // If no token is found
    if (!token) {
        return res
            .status(401)
            .json({ message: 'No token, authorization denied' });
    }
};
