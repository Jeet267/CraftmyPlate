// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./Routes/authRoutes');
const orderRoutes = require('./Routes/orderRoutes'); 
const menuRoutes = require('./Routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
