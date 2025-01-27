const Order = require('../models/Order');
const Menu = require('../models/Menu');


exports.placeOrder = async (req, res) => {
  const { items } = req.body; 
  
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item' });
  }

  try {

    let totalAmount = 0;
    for (let item of items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem || !menuItem.availability) {
        return res.status(404).json({ message: `Menu item ${item.menuItem} not found or unavailable` });
      }
      totalAmount += menuItem.price * item.quantity;
    }


    const newOrder = new Order({
      username: req.user, 
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ username: req.user }).populate('items.menuItem', 'name price');

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
