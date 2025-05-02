const express = require('express');
const router = express.Router();
const ctrl  = require('../controllers/orderController');

// Place an order
router.post('/', ctrl.createOrder);

// List orders by customerId
router.get('/', ctrl.getOrdersByCustomer);

module.exports = router;
