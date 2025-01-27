const express = require('express');
// const { getMenu, addMenuItem } = require('../controllers/menuController');

const authMiddleware = require('../middleware/authMiddleware');
const { getMenu, addMenuItem, updateMenuItemById, deleteMenuItemById } = require('../Controllers/menuController');


const router = express.Router();

router.get('/', getMenu);
router.post('/add', authMiddleware, addMenuItem);

router.put('/update/:id', authMiddleware, updateMenuItemById);
router.delete('/delete/:id', authMiddleware, deleteMenuItemById);




module.exports = router;
