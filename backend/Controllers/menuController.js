const Menu = require('../models/Menu');

exports.getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { name, category, price, availability } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMenuItem = new Menu({ name, category, price, availability });
    await newMenuItem.save();

    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
