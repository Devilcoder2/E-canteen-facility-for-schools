const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const generateToken = require('../utils/generateToken');

// Admin Signup
exports.adminSignup = async (req, res) => {
    try {
        const { name, phone, address, schoolId, password } = req.body;

        const existingAdmin = await Admin.findOne({ schoolId });
        if (existingAdmin) {
            return res
                .status(400)
                .json({ message: 'Admin with this schoolId already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            name,
            phone,
            address,
            schoolId,
            password: hashedPassword,
        });
        await admin.save();

        const token = generateToken(admin._id);
        res.status(201).json({ token, adminId: admin._id, schoolId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
    const { schoolId, password } = req.body;
    try {
        // Check if the admin exists with the provided schoolId
        const admin = await Admin.findOne({ schoolId });
        if (!admin) {
            return res.status(404).json({ message: 'No such school exists' });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate a JWT token
        const token = generateToken(admin._id);
        res.status(200).json({ token, adminId: admin._id, schoolId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Student Signup
exports.studentSignup = async (req, res) => {
    try {
        const { name, email, password, schoolId } = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res
                .status(400)
                .json({ message: 'Student with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new Student({ name, email, password: hashedPassword, schoolId });
        await student.save();

        const token = generateToken(student._id);
        res.status(201).json({ token, studentId: student._id, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Student Login
exports.studentLogin = async (req, res) => {
    const { email, password, schoolId } = req.body;
    try {
        // Check if the schoolId exists in Admin collection
        const existingSchool = await Admin.findOne({ schoolId });
        if (!existingSchool) {
            return res.status(404).json({ message: 'No such school exists' });
        }

        // Check if student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(401).json({ message: 'Student not found' });
        }

        // Check if password matches
        const isPasswordValid = await bcrypt.compare(
            password,
            student.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = generateToken(student._id);
        res.status(200).json({
            token,
            studentId: student._id,
            email,
            schoolId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
