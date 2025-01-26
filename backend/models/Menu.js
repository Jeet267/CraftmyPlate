const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Appetizers', 'Main Course', 'Desserts'] },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model('Menu', MenuSchema);
