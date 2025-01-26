const Order = require('../models/Order');
const Menu = require('../models/Menu');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order items' });
    }

    const menuItems = await Menu.find({
      _id: { $in: items.map(item => item.menuItem) }
    });

    const totalAmount = items.reduce((total, orderItem) => {
      const menuItem = menuItems.find(m => m._id.toString() === orderItem.menuItem);
      return total + (menuItem.price * orderItem.quantity);
    }, 0);

    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders for the authenticated user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
