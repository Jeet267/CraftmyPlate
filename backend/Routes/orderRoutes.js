const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { placeOrder, getOrders } = require('../Controllers/orderController');

const router = express.Router();

// Route to place an order
router.post('/order', authMiddleware, placeOrder);

// Route to fetch all orders for the logged-in user
router.get('/orders', authMiddleware, getOrders);

module.exports = router;
