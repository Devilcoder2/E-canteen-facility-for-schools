const Admin = require('../models/Admin');

// Controller to fetch admin profile
exports.getAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id; // Admin ID from the authenticated user token
        const admin = await Admin.findById(adminId).select('-password'); // Exclude password
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to update admin profile (phone and address only)
exports.updateAdminProfile = async (req, res) => {
    const { phone, address } = req.body;
    try {
        const adminId = req.user.id;

        // Find admin and update only phone and address fields
        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            { phone, address },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            admin: updatedAdmin,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
