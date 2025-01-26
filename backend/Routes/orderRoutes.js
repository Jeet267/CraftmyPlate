// backend/Routes/orderRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


// Your route logic here
router.post('/', authMiddleware, (req, res) => {
  res.send('Order created');
});

module.exports = router;
