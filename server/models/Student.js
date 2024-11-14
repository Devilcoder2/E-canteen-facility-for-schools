const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        schoolId: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
