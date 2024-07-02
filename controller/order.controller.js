const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
      userId: req.user.id,
      productId,
      quantity,
      totalPrice
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [Product]
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    await order.destroy();

    res.json({ msg: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
