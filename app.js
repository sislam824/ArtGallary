const express = require('express');
const { connectDB, syncDB } = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

// Connect Database
connectDB();
syncDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
