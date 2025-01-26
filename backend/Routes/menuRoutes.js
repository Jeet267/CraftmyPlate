const express = require('express');
// const { getMenu, addMenuItem } = require('../controllers/menuController');

const authMiddleware = require('../middleware/authMiddleware');
const { getMenu, addMenuItem } = require('../Controllers/menuController');
const router = express.Router();

router.get('/', getMenu);
router.post('/add', authMiddleware, addMenuItem);

module.exports = router;
