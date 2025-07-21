const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.product.price * item.quantity;
    });

    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map(item => ({ product: item.product._id, quantity: item.quantity })),
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};
