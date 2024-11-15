const Admin = require('../models/Admin');
const Menu = require('../models/Menu');
const Order = require('../models/Orders');

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
    const { name, price, image, ratings, category, description, label } =
        req.body;

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
    const { name, price, image, ratings, category, description, label } =
        req.body;

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

// Get a list of all orders (filterable by status)
exports.getOrders = async (req, res) => {
    const { status } = req.query;

    try {
        const filter = { schoolId: req.user.schoolId };
        if (status) filter.status = status;

        const orders = await Order.find(filter).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get details of a specific order
exports.getOrderDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
        'Received',
        'Preparing',
        'Packed',
        'Picked',
        'Delivered',
    ];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status, updatedAt: Date.now() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
