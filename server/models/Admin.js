const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String },
        schoolId: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);