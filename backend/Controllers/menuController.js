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
exports.updateMenuItemById = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, category, price, availability } = req.body; 


    if (!name && !category && !price && availability === undefined) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }


    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id, 
      { name, category, price, availability }, 
      { new: true, runValidators: true } 
    );


    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }


    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.deleteMenuItemById = async (req, res) => {
  try {
    const { id } = req.params; 

    const deletedMenuItem = await Menu.findByIdAndDelete(id); 

    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' }); 
    }

    res.json({ message: 'Menu item deleted successfully', deletedMenuItem }); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message }); 
  }
};
