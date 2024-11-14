const Student = require('../models/Student');

// GET profile (student's name, email, schoolId)
exports.getProfile = async (req, res) => {
    try {
        const studentId = req.studentId; // From the authMiddleware (decoded JWT)

        const student = await Student.findById(studentId).select(
            'name email schoolId'
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
            name: student.name,
            email: student.email,
            schoolId: student.schoolId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT update profile (only name)
exports.updateProfile = async (req, res) => {
    console.log("here");
    try {
        const studentId = req.studentId; // From the authMiddleware (decoded JWT)
        const { name } = req.body; // Only allow updating name

        // Validate name
        if (!name || name.trim().length === 0) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { name },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            name: updatedStudent.name,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
