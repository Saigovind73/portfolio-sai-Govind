const dns = require('dns');
// Fix for DNS resolution issues with MongoDB Atlas - MUST be set before mongoose/SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { streamText } = require('ai');
const { openai } = require('@ai-sdk/openai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;

if (MONGO_URI) {
    const sanitizedUri = MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log(`Starting connection with URI: ${sanitizedUri}`);
    
    mongoose.connect(MONGO_URI)
        .then(() => {
            const db = mongoose.connection.name;
            console.log(`Connected to MongoDB Atlas - Database: ${db}`);
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
            console.error(`Attempted URI: ${sanitizedUri}`);
        });
} else {
    console.warn('MONGODB_URI not found in environment variables. Database connection skipped.');
}

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    requestType: { type: String, required: true },
    goal: { type: String },
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/api', (req, res) => {
    res.send('Portfolio API is running...');
});

// Diagnostic route to check Vercel's DNS resolution capacity
app.get('/api/debug-dns', async (req, res) => {
    try {
        const cluster = 'cluster0.0p52rhu.mongodb.net';
        const srv = await dns.promises.resolveSrv(`_mongodb._tcp.${cluster}`);
        res.json({ 
            success: true, 
            message: `Successfully resolved SRV for ${cluster}`,
            srv 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message,
            code: error.code,
            cluster: '0p52rhu'
        });
    }
});

app.post('/api/contact', async (req, res) => {
    console.log('--- POST /api/contact RECEIVED ---');
    try {
        const { name, email, requestType, goal } = req.body;
        
        if (!name || !email || !requestType) {
            return res.status(400).json({ error: 'Please provide name, email, and request type.' });
        }

        // Ensure we are connected before saving
        if (mongoose.connection.readyState !== 1) {
            if (!MONGO_URI) {
                return res.status(500).json({ error: 'DATABASE_ERROR: MONGODB_URI is not defined in Vercel environment variables.' });
            }
            await mongoose.connect(MONGO_URI);
        }

        const newContact = new Contact({ name, email, requestType, goal });
        await newContact.save();

        console.log(`Document saved successfully to collection: ${Contact.collection.name}`);
        res.status(201).json({ message: 'Request saved successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error.message,
            code: error.code || 'UNKNOWN_ERROR'
        });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const result = streamText({
            model: openai('gpt-4o'),
            system: 'You are a helpful fitness and AI/ML assistant for Sai Govinds portfolio. Be concise and friendly.',
            messages,
        });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        for await (const textPart of result.textStream) {
            res.write(textPart);
        }
        res.end();
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to generate response', details: error.message });
    }
});

// For local development
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
