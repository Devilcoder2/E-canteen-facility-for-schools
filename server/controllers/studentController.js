const Menu = require('../models/Menu');
const Order = require('../models/Orders');
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
    console.log('here');
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

// Fetch menu items with optional filters
exports.getMenu = async (req, res) => {
    try {
        const { type } = req.query; // e.g., type=veg or type=non-veg
        let menu;

        if (type) {
            menu = await Menu.find({ type: type.toLowerCase() });
        } else {
            menu = await Menu.find();
        }

        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch menu items' });
    }
};

// Place an order
exports.placeOrder = async (req, res) => {
    const { items, instructions } = req.body;
    const studentId = req.studentId;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Calculate total price
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const menuItem = await Menu.findById(item.menuId);
                return {
                    itemId: menuItem._id,
                    itemName: menuItem.name,
                    price: menuItem.price,
                    quantity: item.quantity,
                };
            })
        );

        const totalPrice = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const newOrder = new Order({
            studentId,
            studentName: student.name,
            items: orderItems,
            instructions,
            totalAmount: totalPrice,
            status: 'Received',
            schoolId: student.schoolId,
            cookingInstructions: instructions
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to place order' });
    }
};

// Get all orders for the logged-in student
exports.getOrders = async (req, res) => {
    try {
        const studentId = req.user._id;
        const orders = await Order.find({ studentId });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Get details of a specific order
exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order details' });
    }
};

// Get current live orders (status: Received, Preparing, Packed)
exports.getCurrentOrders = async (req, res) => {
    try {
        const studentId = req.user._id;
        const currentOrders = await Order.find({
            studentId,
            status: { $in: ['Received', 'Preparing', 'Packed'] },
        });

        res.status(200).json({ success: true, data: currentOrders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch current orders' });
    }
};
