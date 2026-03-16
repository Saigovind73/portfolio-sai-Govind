const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;

if (MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn('MONGODB_URI not found in environment variables. Database connection skipped.');
}

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    requestType: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/api', (req, res) => {
    res.send('Portfolio API is running...');
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, requestType } = req.body;
        
        if (!name || !email || !requestType) {
            return res.status(400).json({ error: 'Please provide name, email, and request type.' });
        }

        const newContact = new Contact({ name, email, requestType });
        await newContact.save();

        res.status(201).json({ message: 'Request saved successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// For local development
const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
