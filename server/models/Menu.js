const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String }, // URL for the image
        ratings: { type: Number, default: 4 },
        category: { type: String, enum: ['veg', 'non-veg'], required: true },
        label: {type: String, required: true},
        description: { type: String },
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
