const Admin = require('../models/Admin');
const Menu = require('../models/Menu');

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

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    const { name, price, image, ratings, category, description, label } = req.body;

    try {
        const newItem = await Menu.create({
            name,
            price,
            image,
            ratings,
            category,
            description,
            adminId: req.user.id,
            label,
        });

        res.status(201).json({
            message: 'Menu item added successfully',
            item: newItem,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find({ adminId: req.user.id });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, ratings, category, description, label } = req.body;

    try {
        const updatedItem = await Menu.findByIdAndUpdate(
            id,
            { name, price, image, ratings, category, description, label },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({
            message: 'Menu item updated successfully',
            item: updatedItem,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Menu.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
