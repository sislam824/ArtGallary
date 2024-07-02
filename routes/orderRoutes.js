const express = require('express');
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require('../controller/order.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.put('/', updateOrder);
router.delete('/:orderId', deleteOrder);

module.exports = router;
