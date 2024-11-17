const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
